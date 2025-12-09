import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth } from "@react-native-firebase/auth";
import { startPayment } from "../../services/payment/PaymentService";

// ⬇️ NEW IMPORT
import { useSelector } from "react-redux";
const ORANGE = "#FF7A00"; // neon-orange like screenshot
const LIGHT_PURPLE = "#ECEAFF";
const CARD_BG = "#FFFFFF";

export default function CheckoutScreen({ navigation, route }) {

  // ⬇️ Read selected destination from Redux
  const selected = useSelector((state) => state.destinations.selected);

  const passport = route?.params?.passport || route?.params?.updatedPassport || {};
  const amount = 2;
  const userId = "USER001";

  console.log("SELECTED COUNTRY ===", selected);

  const handlePay = async () => {
    navigation.navigate("RatingScreen");

    // const result = await startPayment(amount, userId, passport);

    // if (result.success) {
    //   Alert.alert("Success", "Payment Completed!");
    //   navigation.navigate("RatingScreen")
    // } else {
    //   Alert.alert("Failed", "Payment failed. Try again!");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        {/* ⬇️ Replace static text with selected.countrName */}
        <Text style={styles.headerTitle}>{selected?.countrName}</Text>

        <Icon name="home-outline" size={26} color={ORANGE} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* View Travellers */}
        <TouchableOpacity style={styles.travellerBtn}>
          <Text style={styles.travellerText}>View Travellers</Text>
          <Icon name="chevron-down" size={18} color="#444" />
        </TouchableOpacity>

        {/* VISA CARD */}
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="document-text-outline" size={20} color="#444" />
              <Text style={styles.itemTitle}>Visa Fees x 1</Text>
            </View>

            {/* ⬇️ Use selected GovernmentFee */}
            <Text style={styles.price}>
              ₹{typeof selected?.GovernmentFee === "string"
                ? selected?.GovernmentFee
                : selected?.GovernmentFee?.Single}
            </Text>
          </View>

          <View style={styles.rowSpace}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
              <Text style={styles.itemTitle}>TVM Fees x 1</Text>
            </View>

            {/* ⬇️ Use redux VisaManagerFee */}
            <Text style={styles.freePrice}>₹{selected?.VisaManagerFee}</Text>
          </View>
          
          <View style={styles.rowSpace}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
              <Text style={styles.itemTitle}>Authority Fee</Text>
            </View>

            {/* ⬇️ Use redux VisaManagerFee */}
            <Text style={styles.freePrice}>₹{selected?.AuthorityCharges}</Text>
          </View>

          <View style={styles.bannerBox}>
            <Text style={styles.bannerText}>
              You pay only when we deliver your visa on time
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowSpace}>
            <Text style={styles.totalLabel}>Total</Text>

            {/* TOTAL = Visa + TVM */}
            <Text style={styles.totalAmount}>
              ₹
              {Number(
                typeof selected?.GovernmentFee === "string"
                  ? selected?.GovernmentFee
                  : selected?.GovernmentFee?.Single
              ) + Number(selected?.VisaManagerFee?.replace(/[^\d.]/g, ""))}
            </Text>
          </View>
          
        </View>

        {/* Protection Section */}
        <View style={styles.protectCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="shield-half-outline" size={32} color="#4147D5" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.protectTitle}>The Visa Manager</Text>
              <Text style={styles.protectBadge}>Included for Free</Text>
            </View>
          </View>

          <Text style={styles.protectInfo}>
            If Visa Delayed: No The Visa Manager Fee
          </Text>
          <Text style={styles.protectInfo}>
            If Visa Rejected: 100% Visa Fee Back
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
          <Text style={styles.btnText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA", marginTop: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  travellerBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  travelerText: { fontSize: 15, fontWeight: "600" },
  card: {
    backgroundColor: CARD_BG,
    margin: 16,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.3,
    borderColor: "#E4E4E7",
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  itemTitle: { fontSize: 16, marginLeft: 8, fontWeight: "500" },
  price: { fontSize: 17, fontWeight: "600", color: "#111" },
  freePrice: { fontSize: 17, fontWeight: "700", color: ORANGE },
  divider: { height: 1, backgroundColor: "#E4E4E7", marginVertical: 10 },
  totalLabel: { fontSize: 20, fontWeight: "700", color: "#111" },
  totalAmount: { fontSize: 22, fontWeight: "900", color: ORANGE },
  bannerBox: {
    backgroundColor: LIGHT_PURPLE,
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  bannerText: { fontSize: 14, textAlign: "center", color: "#4A4A4A" },
  protectCard: {
    backgroundColor: CARD_BG,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 16,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e4e4e7",
  },
  protectTitle: { fontSize: 18, fontWeight: "700", color: "#2F2F2F" },
  protectBadge: {
    fontSize: 13,
    color: "#2AA952",
    marginTop: 2,
    fontWeight: "700",
  },
  protectInfo: { marginTop: 5, fontSize: 14, color: "#444" },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  payButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { fontSize: 18, color: "#fff", fontWeight: "800" },
});
