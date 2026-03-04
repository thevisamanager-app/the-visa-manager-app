import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useSelector } from "react-redux";
import { startPayment } from "../../services/payment/PaymentService";
import { getAuth } from "@react-native-firebase/auth/lib/modular";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "@react-native-firebase/firestore/lib/modular";
import { getDoc } from "@react-native-firebase/firestore/lib/modular/query";
import { serverTimestamp } from "@react-native-firebase/firestore/lib/modular/FieldValue";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ORANGE = "#FF5C00";
const BG = "#F4F7FC";
const CARD = "#FFFFFF";
const TEXT_DARK = "#0F172A";
const TEXT_MUTE = "#64748B";
const BORDER = "#E2E8F0";

const parseFee = (fee) => {
  if (!fee) return 0;
  if (typeof fee === "string") return Number(fee.replace(/[^\d.]/g, "")) || 0;
  if (typeof fee === "object") return Number(fee.Single || 0);
  return Number(fee) || 0;
};

const formatCurrency = (amount) =>
  `\u20B9${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const PriceRow = ({ label, value, subLabel }) => (
  <View style={styles.rowSpace}>
    <View style={styles.rowLabelWrap}>
      <Text style={styles.itemTitle}>{label}</Text>
      {subLabel ? <Text style={styles.subLabel}>{subLabel}</Text> : null}
    </View>
    <Text style={styles.price}>{formatCurrency(value)}</Text>
  </View>
);

export default function CheckoutScreen({ navigation, route }) {
  const selected = useSelector((state) => state.destinations.selected);
  const insets = useSafeAreaInsets();

  const routeTravellers = route?.params?.travellers;
  const coTravellers = route?.params?.coTravellers ?? [];
  const applicationId = route?.params?.applicationId;

  const routeTravellersCount = Array.isArray(routeTravellers)
    ? routeTravellers.length
    : 0;
  const coTravellersCount = Array.isArray(coTravellers) ? coTravellers.length : 0;
  const routeTotalTravellers = Number(route?.params?.totalTravellers || 0);
  const initialTravellerCount =
    routeTravellersCount > 0
      ? routeTravellersCount
      : routeTotalTravellers > 0
      ? routeTotalTravellers
      : coTravellersCount + 1;

  const [travellerCount, setTravellerCount] = useState(initialTravellerCount);
  const [hasMinor, setHasMinor] = useState(false);
  const [minorCount, setMinorCount] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const resolvedRouteCount =
      routeTravellersCount > 0
        ? routeTravellersCount
        : routeTotalTravellers > 0
        ? routeTotalTravellers
        : coTravellersCount + 1;
    setTravellerCount(Math.max(1, resolvedRouteCount));
  }, [routeTravellersCount, routeTotalTravellers, coTravellersCount]);

  useEffect(() => {
    let isMounted = true;

    const loadTravellerCount = async () => {
      if (!applicationId) return;
      const userId = getAuth().currentUser?.uid;
      if (!userId) return;

      try {
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const userRef = doc(usersRef, userId);
        const passportDataRef = collection(userRef, "passportData");
        const passportDocRef = doc(passportDataRef, applicationId);
        const snap = await getDoc(passportDocRef);

        if (!isMounted || !snap.exists) return;
        const data = snap.data() || {};
        const countFromArray = Array.isArray(data.travellers)
          ? data.travellers.length
          : 0;
        const countFromTotal = Number(data.totalTravellers || 0);
        const resolvedCount = countFromArray || countFromTotal;
        if (resolvedCount > 0) setTravellerCount(resolvedCount);
      } catch (error) {
        console.log("Checkout traveller count load error:", error);
      }
    };

    loadTravellerCount();

    return () => {
      isMounted = false;
    };
  }, [applicationId]);

  const totalTravelers = Math.max(1, travellerCount);
  const passport = route?.params?.passport || route?.params?.updatedPassport || {};

  const visaFee = parseFee(selected?.GovernmentFee);
  const tvmFee = parseFee(selected?.VisaManagerFee);
  const authorityFee = parseFee(selected?.AuthorityCharges);
  const adultFeePerPerson = visaFee + tvmFee + authorityFee;

  const maxMinorCount = Math.max(0, totalTravelers - 1);
  const enteredMinorCount = Number(minorCount) || 0;
  const minors = hasMinor
    ? Math.min(Math.max(enteredMinorCount, 0), maxMinorCount)
    : 0;
  const adults = totalTravelers - minors;

  const visaTotal = visaFee * adults + visaFee * 0.5 * minors;
  const tvmTotal = tvmFee * adults + tvmFee * 0.5 * minors;
  const authorityTotal = authorityFee * adults + authorityFee * 0.5 * minors;
  const minorFeePerPerson = adultFeePerPerson * 0.5;
  const minorTotal = minorFeePerPerson * minors;
  const totalAmount = Number((visaTotal + tvmTotal + authorityTotal).toFixed(2));

  const handlePay = async () => {
    try {
      setLoading(true);
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        Alert.alert("Login Required", "Please login first.");
        return;
      }

      const db = getFirestore();
      const usersRef = collection(db, "users");
      const userRef = doc(usersRef, userId);
      const passportDataRef = collection(userRef, "passportData");
      const checkoutDocId = applicationId || `checkout_${Date.now()}`;
      const checkoutDocRef = doc(passportDataRef, checkoutDocId);

      await setDoc(
        checkoutDocRef,
        {
          country: route?.params?.country || selected?.countrName || "",
          applicationId: applicationId || null,
          checkout: {
            travellerCount: totalTravelers,
            adults,
            minors,
            fees: {
              visaFeePerAdult: visaFee,
              visaManagerFeePerAdult: tvmFee,
              authorityFeePerAdult: authorityFee,
              visaTotal,
              visaManagerTotal: tvmTotal,
              authorityTotal,
              minorFeePerPerson,
              minorTotal,
              grandTotal: totalAmount,
            },
            updatedAt: serverTimestamp(),
          },
        },
        { merge: true }
      );

      const result = await startPayment(totalAmount, userId, passport);
      if (result?.success) {
        navigation.navigate("RatingScreen", {
          passport,
          totalAmount,
          selected,
          minors,
        });
        return;
      }

      Alert.alert(
        "Payment Failed",
        "Payment was not completed. Please try again."
      );
    } catch (error) {
      Alert.alert(
        "Payment Error",
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <LottieView
            source={require("../../assets/lottie/Loading.json")}
            autoPlay
            loop
            style={styles.loader}
          />
          <Text style={styles.loadingText}>Redirecting to payment...</Text>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={20} color={TEXT_DARK} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerSub}>{selected?.countrName || "Visa Application"}</Text>
        </View>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
        >
          <Icon name="home-outline" size={18} color={ORANGE} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(160, insets.bottom + 150) },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient colors={["#FF7E31", "#FF5C00"]} style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Icon name="shield-checkmark-outline" size={13} color="#FFFFFF" />
            <Text style={styles.heroBadgeText}>SECURE CHECKOUT</Text>
          </View>
          <Text style={styles.heroAmount}>{formatCurrency(totalAmount)}</Text>
          <Text style={styles.heroSubText}>Final payable amount for your application</Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{totalTravelers} Traveller(s)</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{adults} Adult(s)</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaPillText}>{minors} Minor(s)</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Fee Breakdown</Text>
            <Text style={styles.cardCaption}>Per current selection</Text>
          </View>

          <PriceRow
            label={`Visa Fee x ${totalTravelers}`}
            value={visaTotal}
          />
          <PriceRow
            label={`TVM Fee x ${totalTravelers}`}
            subLabel="Including GST"
            value={tvmTotal}
          />
          <PriceRow
            label={`Authority Fee x ${totalTravelers}`}
            subLabel="Including GST"
            value={authorityTotal}
          />

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setHasMinor((prev) => !prev)}
            activeOpacity={0.85}
          >
            <MaterialIcons
              name={hasMinor ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={ORANGE}
            />
            <View style={styles.checkboxTextWrap}>
              <Text style={styles.checkboxText}>Include minor co-travellers</Text>
              <Text style={styles.checkboxSubText}>
                Minor fares are charged at 50% of each fee component.
              </Text>
            </View>
          </TouchableOpacity>

          {hasMinor ? (
            <View style={styles.minorBox}>
              <Text style={styles.minorLabel}>Number of minor co-travellers</Text>
              <TextInput
                value={minorCount}
                onChangeText={setMinorCount}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Enter minor count"
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.minorHint}>Max allowed: {maxMinorCount}</Text>
              <PriceRow label={`Minor Fee x ${minors}`} value={minorTotal} />
            </View>
          ) : null}

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Icon name="lock-closed-outline" size={18} color={ORANGE} />
          <Text style={styles.infoText}>
            Your payment is encrypted and processed securely.
          </Text>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: Math.max(12, insets.bottom) }]}>
        <View>
          <Text style={styles.bottomLabel}>Payable now</Text>
          <Text style={styles.bottomAmount}>{formatCurrency(totalAmount)}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePay} disabled={loading}>
          <Text style={styles.btnText}>{loading ? "Processing..." : "Proceed to Pay"}</Text>
          <Icon name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: TEXT_DARK,
  },
  headerSub: {
    marginTop: 1,
    fontSize: 12,
    color: TEXT_MUTE,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heroCard: {
    borderRadius: 18,
    padding: 16,
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  heroAmount: {
    marginTop: 10,
    fontSize: 32,
    lineHeight: 38,
    color: "#FFFFFF",
    fontWeight: "800",
  },
  heroSubText: {
    marginTop: 6,
    color: "rgba(255,255,255,0.92)",
    fontSize: 13,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  metaPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.34)",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  metaPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  card: {
    marginTop: 12,
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontWeight: "800",
  },
  cardCaption: {
    fontSize: 11,
    color: TEXT_MUTE,
    fontWeight: "600",
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 7,
    gap: 12,
  },
  rowLabelWrap: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: "600",
  },
  subLabel: {
    marginTop: 2,
    fontSize: 11,
    color: TEXT_MUTE,
  },
  price: {
    fontSize: 15,
    color: TEXT_DARK,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  checkboxTextWrap: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 14,
    color: TEXT_DARK,
    fontWeight: "700",
  },
  checkboxSubText: {
    marginTop: 2,
    fontSize: 12,
    color: TEXT_MUTE,
    lineHeight: 17,
  },
  minorBox: {
    marginTop: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    padding: 10,
  },
  minorLabel: {
    fontSize: 13,
    color: TEXT_DARK,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    backgroundColor: CARD,
    color: TEXT_DARK,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 4,
  },
  minorHint: {
    fontSize: 11,
    color: TEXT_MUTE,
    marginBottom: 4,
  },
  totalBox: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FFD7BF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 15,
    color: TEXT_DARK,
    fontWeight: "700",
  },
  totalAmount: {
    fontSize: 20,
    color: ORANGE,
    fontWeight: "900",
  },
  infoCard: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    flex: 1,
    color: TEXT_MUTE,
    fontSize: 12,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: CARD,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: {
    color: TEXT_MUTE,
    fontSize: 11,
    fontWeight: "600",
  },
  bottomAmount: {
    marginTop: 2,
    color: TEXT_DARK,
    fontSize: 20,
    fontWeight: "900",
  },
  payButton: {
    minHeight: 46,
    borderRadius: 999,
    backgroundColor: ORANGE,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.92)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },
  loader: {
    width: 130,
    height: 130,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
});
