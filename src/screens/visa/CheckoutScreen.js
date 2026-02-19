import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useSelector } from "react-redux";
import {
  wp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../../utils/metrics";
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

const ORANGE = "#FF5C00";
const LIGHT_PURPLE = "#ECEAFF";
const CARD_BG = "#FFFFFF";

/* ---------------- HELPERS ---------------- */
const parseFee = (fee) => {
  if (!fee) return 0;
  if (typeof fee === "string") {
    return Number(fee.replace(/[^\d.]/g, "")) || 0;
  }
  if (typeof fee === "object") {
    return Number(fee.Single || 0);
  }
  return Number(fee) || 0;
};

export default function CheckoutScreen({ navigation, route }) {
  const selected = useSelector((state) => state.destinations.selected);
  const routeTravellers = route?.params?.travellers;
  const coTravellers = route?.params?.coTravellers ?? [];
  const applicationId = route?.params?.applicationId;

  const routeTravellersCount = Array.isArray(routeTravellers)
    ? routeTravellers.length
    : 0;
  const coTravellersCount = Array.isArray(coTravellers)
    ? coTravellers.length
    : 0;
  const routeTotalTravellers = Number(route?.params?.totalTravellers || 0);
  const initialTravellerCount =
    routeTravellersCount > 0
      ? routeTravellersCount
      : routeTotalTravellers > 0
      ? routeTotalTravellers
      : coTravellersCount + 1;
  const [travellerCount, setTravellerCount] = useState(initialTravellerCount);

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

        if (resolvedCount > 0) {
          setTravellerCount(resolvedCount);
        }
      } catch (error) {
        console.log("Checkout traveller count load error:", error);
      }
    };

    loadTravellerCount();

    return () => {
      isMounted = false;
    };
  }, [applicationId]);

  const totalTravelers = Math.max(1, travellerCount); // main + co

  const passport =
    route?.params?.passport || route?.params?.updatedPassport || {};

  /* ---------------- MINOR INPUTS (NEW) ---------------- */
  const [hasMinor, setHasMinor] = useState(false);
  const [minorCount, setMinorCount] = useState("1");
  const [loading, setLoading] = useState(false);

  /* ---------------- BASE FEES (1 MAIN TRAVELLER) ---------------- */
  const visaFee = parseFee(selected?.GovernmentFee);
  const tvmFee = parseFee(selected?.VisaManagerFee);
  const authorityFee = parseFee(selected?.AuthorityCharges);

  const adultFeePerPerson = visaFee + tvmFee + authorityFee;

  /* ---------------- MINOR CALCULATION ---------------- */
  const maxMinorCount = Math.max(0, totalTravelers - 1); // only co-travellers can be minors
  const enteredMinorCount = Number(minorCount) || 0;
  const minors = hasMinor
    ? Math.min(Math.max(enteredMinorCount, 0), maxMinorCount)
    : 0;
  const adults = totalTravelers - minors;

  // Each minor pays half for all fee components.
  const visaTotal = visaFee * adults + visaFee * 0.5 * minors;
  const tvmTotal = tvmFee * adults + tvmFee * 0.5 * minors;
  const authorityTotal =
    authorityFee * adults + authorityFee * 0.5 * minors;

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

      //✅ PAYMENT SUCCESS
      if (result?.success) {
        navigation.navigate("RatingScreen", {
          passport,
          totalAmount: totalAmount,
          selected,
          minors,
        });
        return;
      }

      //❌ PAYMENT FAILED / CANCELLED
      Alert.alert(
        "Payment Failed",
        "Payment was not completed. Please try again."
      );
    } catch (error) {
      // ❌ PAYMENT ERROR
      Alert.alert(
        "Payment Error",
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false); // 🔥 HIDE LOADER
    }
    // navigation.navigate("RatingScreen",{passport,totalAmount,selected})
  };
  console.log("totalTravelers==>", totalTravelers);
  return (
    <ScreenWrapper style={styles.container}>
      {/* 🔥 FULL SCREEN LOADER */}
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
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{selected?.countrName}</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tabs", { screen: "Destination" })
          }
        >
          <Icon name="home" size={moderateScale(24)} color={ORANGE} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* VISA CARD */}
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.itemTitle}>
              Visa Fee x {totalTravelers}
            </Text>

            <Text style={styles.price}>  ₹{visaTotal.toLocaleString("en-IN")}</Text>
          </View>

          <View style={styles.rowSpace}>
            <Text style={styles.itemTitle}>TVM Fee <Text style={styles.gstText}>(including Gst)</Text> x {totalTravelers}</Text>
            <Text style={styles.price}>  ₹{tvmTotal.toLocaleString("en-IN")}</Text>
          </View>

          <View style={styles.rowSpace}>
            <Text style={styles.itemTitle}> Authority Fee <Text style={styles.gstText}>(including Gst)</Text> x {totalTravelers}</Text>
            <Text style={styles.price}> ₹{authorityTotal.toLocaleString("en-IN")}</Text>
          </View>

          <View style={styles.divider} />

          {/* ✅ MINOR YES / NO */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setHasMinor((p) => !p)}
          >
            <MaterialIcons
              name={hasMinor ? "check-box" : "check-box-outline-blank"}
              size={26}
              color={ORANGE}
            />
            <Text style={styles.checkboxText}>
              Do you have a co-traveller who is a minor?
            </Text>
          </TouchableOpacity>

          {/* ✅ MINOR COUNT + FEES */}
          {hasMinor && (
            <View style={styles.minorBox}>
              <Text style={styles.minorLabel}>
                How many minor co-travellers will be traveling?
              </Text>

              <TextInput
                value={minorCount}
                onChangeText={setMinorCount}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.minorHint}>
                Max minors allowed: {maxMinorCount}
              </Text>

              <View style={styles.rowSpace}>
                <Text style={styles.itemTitle}>
                  Minor Fee x {minors}
                </Text>
                <Text style={styles.price}>₹{minorTotal.toLocaleString("en-IN")}</Text>
              </View>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.rowSpace}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          <View style={styles.protectCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="shield-half-outline" size={32} color={ORANGE} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.protectTitle}>The Visa Manager</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.btnText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    marginTop: verticalScale(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: verticalScale(10),
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
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
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#555",
  },

  card: {
    backgroundColor: CARD_BG,
    margin: wp("4%"),
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    borderWidth: scale(1.2),
    borderColor: "#E4E4E7",
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: verticalScale(6),
  },
  itemTitle: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  gstText: {
    fontSize: RFValue(10),
    color: "#6B7280",
    fontWeight: "400",
  },
  price: {
    fontSize: RFValue(16),
    fontWeight: "600",
  },
  divider: {
    height: scale(1),
    backgroundColor: "#E4E4E7",
    marginVertical: verticalScale(10),
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(8),
  },
  checkboxText: {
    marginLeft: scale(8),
    fontSize: RFValue(12),
    fontWeight: "600",
  },
  minorBox: {
    marginTop: verticalScale(10),
  },
  minorLabel: {
    fontSize: RFValue(10),
    marginBottom: verticalScale(6),
  },
  minorHint: {
    fontSize: RFValue(10),
    color: "#6B7280",
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: verticalScale(8),
  },
  totalLabel: {
    fontSize: RFValue(18),
    fontWeight: "700",
  },
  totalAmount: {
    fontSize: RFValue(20),
    fontWeight: "900",
    color: ORANGE,
  },
  bannerBox: {
    backgroundColor: LIGHT_PURPLE,
    padding: verticalScale(10),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(6),
  },
  bannerText: {
    fontSize: RFValue(13),
    textAlign: "center",
    color: "#4A4A4A",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: moderateScale(14),
    backgroundColor: "#fff",
  },
  payButton: {
    backgroundColor: ORANGE,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: "center",
  },
  btnText: {
    fontSize: RFValue(16),
    color: "#fff",
    fontWeight: "800",
  },
  protectCard: {
    backgroundColor: CARD_BG,
    //marginHorizontal: wp("4%"),
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    marginTop: verticalScale(8),
    borderWidth: scale(1),
    borderColor: "#e4e4e7",
  },

  protectTitle: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#2F2F2F",
  },

  protectBadge: {
    fontSize: RFValue(12),
    color: "#2AA952",
    marginTop: verticalScale(2),
    fontWeight: "700",
  },

  protectInfo: {
    marginTop: verticalScale(5),
    fontSize: RFValue(10),
    color: "#444",
  },
});


