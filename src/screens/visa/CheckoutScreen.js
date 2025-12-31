// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { getAuth } from "@react-native-firebase/auth";
// import { startPayment } from "../../services/payment/PaymentService";
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

// // ⬇️ NEW IMPORT
// import { useSelector } from "react-redux";


// const ORANGE = "#FF5C00"; // neon-orange like screenshot
// const LIGHT_PURPLE = "#ECEAFF";
// const CARD_BG = "#FFFFFF";

// export default function CheckoutScreen({ navigation, route }) {

//   // ⬇️ Read selected destination from Redux
//   const selected = useSelector((state) => state.destinations.selected);
//   const passport = route?.params?.passport || route?.params?.updatedPassport || {};
//   console.log("SELECTED COUNTRY ===", selected, passport);
//   const handlePay = async () => {
//     const totalAmount = Number(
//       typeof selected?.GovernmentFee === "string"
//         ? selected?.GovernmentFee
//         : selected?.GovernmentFee?.Single
//     ) + Number(selected?.VisaManagerFee?.replace(/[^\d.]/g, "")) + Number(selected?.AuthorityCharges?.replace(/[^\d.]/g, ""))
//     navigation.navigate("RatingScreen", { passport, totalAmount, selected });

//     const result = await startPayment(amount, userId, passport);

//     if (result.success) {
//       Alert.alert("Success", "Payment Completed!");
//       navigation.navigate("RatingScreen")
//     } else {
//       Alert.alert("Failed", "Payment failed. Try again!");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         {/* ⬇️ Replace static text with selected.countrName */}
//         <Text style={styles.headerTitle}>{selected?.countrName}</Text>

//         {/* <TouchableOpacity onPress={() => navigation.navigate("Destination")}>
//           <Icon name="home-outline" size={26} color={ORANGE} />
//         </TouchableOpacity> */
//           <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
//             screen: "Destination",
//           })
//           }>
//             <Icon name="home" size={moderateScale(24)} color={ORANGE} />
//           </TouchableOpacity>

//         }

//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//         {/* View Travellers */}
//         <TouchableOpacity style={styles.travellerBtn}>
//           <Text style={styles.travellerText}>View Travellers</Text>
//           <Icon name="chevron-down" size={18} color="#444" />
//         </TouchableOpacity>

//         {/* VISA CARD */}
//         <View style={styles.card}>
//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="document-text-outline" size={20} color="#444" />
//               <Text style={styles.itemTitle}>Visa Fees x 1</Text>
//             </View>

//             {/* ⬇️ Use selected GovernmentFee */}
//             <Text style={styles.price}>
//               ₹{typeof selected?.GovernmentFee === "string"
//                 ? selected?.GovernmentFee
//                 : selected?.GovernmentFee?.Single}
//             </Text>
//           </View>

//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
//               <Text style={styles.itemTitle}>TVM Fees x 1</Text>
//             </View>

//             {/* ⬇️ Use redux VisaManagerFee */}
//             <Text style={styles.freePrice}>₹{selected?.VisaManagerFee}</Text>
//           </View>

//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
//               <Text style={styles.itemTitle}>Authority Fee</Text>
//             </View>

//             {/* ⬇️ Use redux VisaManagerFee */}
//             <Text style={styles.freePrice}>₹{selected?.AuthorityCharges}</Text>
//           </View>

//           <View style={styles.bannerBox}>
//             <Text style={styles.bannerText}>
//               You pay only when we deliver your visa on time
//             </Text>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.rowSpace}>
//             <Text style={styles.totalLabel}>Total</Text>

//             {/* TOTAL = Visa + TVM  + Authorityfee*/}
//             <Text style={styles.totalAmount}>
//               ₹
//               {Number(
//                 typeof selected?.GovernmentFee === "string"
//                   ? selected?.GovernmentFee
//                   : selected?.GovernmentFee?.Single
//               ) + Number(selected?.VisaManagerFee?.replace(/[^\d.]/g, "")) + Number(selected?.AuthorityCharges?.replace(/[^\d.]/g, ""))}
//             </Text>
//           </View>

//         </View>

//         {/* Protection Section */}
//         <View style={styles.protectCard}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Icon name="shield-half-outline" size={32} color={ORANGE} />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.protectTitle}>The Visa Manager</Text>
//               <Text style={styles.protectBadge}>Included for Free</Text>
//             </View>
//           </View>

//           <Text style={styles.protectInfo}>
//             If Visa Delayed: No The Visa Manager Fee
//           </Text>
//           <Text style={styles.protectInfo}>
//             If Visa Rejected: 100% Visa Fee Back
//           </Text>
//         </View>
//       </ScrollView>

//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.payButton} onPress={handlePay}>
//           <Text style={styles.btnText}>Proceed to Pay</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//     marginTop: verticalScale(30),
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(10),
//     justifyContent: "space-between",
//   },

//   headerTitle: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: "#000",
//   },

//   travellerBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     marginTop: verticalScale(10),
//     marginLeft: wp("4%"),
//     borderWidth: scale(1),
//     borderColor: "#ccc",
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(6),
//     borderRadius: moderateScale(10),
//   },

//   travelerText: {
//     fontSize: RFValue(14),
//     fontWeight: "600",
//   },

//   card: {
//     backgroundColor: CARD_BG,
//     margin: wp("4%"),
//     padding: moderateScale(16),
//     borderRadius: moderateScale(16),
//     borderWidth: scale(1.2),
//     borderColor: "#E4E4E7",
//   },

//   rowSpace: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: verticalScale(6),
//   },

//   itemTitle: {
//     fontSize: RFValue(14),
//     marginLeft: scale(8),
//     fontWeight: "500",
//   },

//   price: {
//     fontSize: RFValue(16),
//     fontWeight: "600",
//     color: "#111",
//   },

//   freePrice: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     color: ORANGE,
//   },

//   divider: {
//     height: scale(1),
//     backgroundColor: "#E4E4E7",
//     marginVertical: verticalScale(10),
//   },

//   totalLabel: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: "#111",
//   },

//   totalAmount: {
//     fontSize: RFValue(20),
//     fontWeight: "900",
//     color: ORANGE,
//   },

//   bannerBox: {
//     backgroundColor: LIGHT_PURPLE,
//     padding: verticalScale(10),
//     borderRadius: moderateScale(10),
//     marginTop: verticalScale(6),
//   },

//   bannerText: {
//     fontSize: RFValue(13),
//     textAlign: "center",
//     color: "#4A4A4A",
//   },

//   protectCard: {
//     backgroundColor: CARD_BG,
//     marginHorizontal: wp("4%"),
//     padding: moderateScale(16),
//     borderRadius: moderateScale(16),
//     marginTop: verticalScale(8),
//     borderWidth: scale(1),
//     borderColor: "#e4e4e7",
//   },

//   protectTitle: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     color: "#2F2F2F",
//   },

//   protectBadge: {
//     fontSize: RFValue(12),
//     color: "#2AA952",
//     marginTop: verticalScale(2),
//     fontWeight: "700",
//   },

//   protectInfo: {
//     marginTop: verticalScale(5),
//     fontSize: RFValue(13),
//     color: "#444",
//   },

//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: moderateScale(14),
//     backgroundColor: "#fff",
//   },

//   payButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(12),
//     alignItems: "center",
//   },

//   btnText: {
//     fontSize: RFValue(16),
//     color: "#fff",
//     fontWeight: "800",
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useSelector } from "react-redux";
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
// import { startPayment } from "../../services/payment/PaymentService";
// import auth from "@react-native-firebase/auth";

// const ORANGE = "#FF5C00";
// const LIGHT_PURPLE = "#ECEAFF";
// const CARD_BG = "#FFFFFF";

// /* ---------------- HELPERS ---------------- */

// // convert string / object fee → number
// const parseFee = (fee) => {
//   if (!fee) return 0;

//   // "1770", "1770 per traveler"
//   if (typeof fee === "string") {
//     return Number(fee.replace(/[^\d.]/g, "")) || 0;
//   }

//   // { Single: "1721", Double: "3012" }
//   if (typeof fee === "object") {
//     return Number(fee.Single || 0);
//   }

//   return Number(fee) || 0;
// };

// export default function CheckoutScreen({ navigation, route }) {
//   const selected = useSelector((state) => state.destinations.selected);
//   const passport =
//     route?.params?.passport || route?.params?.updatedPassport || {};

//   /* ---------------- TRAVELLERS ---------------- */
//   const travellerCount =
//     1 + (passport?.coTravellers?.length || 0);

//   /* ---------------- FEES PER PERSON ---------------- */
//   const govFeePerPerson = parseFee(selected?.GovernmentFee);
//   const tvmFeePerPerson = parseFee(selected?.VisaManagerFee);
//   const authorityFeePerPerson = parseFee(selected?.AuthorityCharges);

//   /* ---------------- TOTAL FEES ---------------- */
//   const totalGovFee = govFeePerPerson * travellerCount;
//   const totalTvmFee = tvmFeePerPerson * travellerCount;
//   const totalAuthorityFee = authorityFeePerPerson * travellerCount;

//   const totalAmount =
//     totalGovFee + totalTvmFee + totalAuthorityFee;

//   /* ---------------- PAY ---------------- */
//   const handlePay = async () => {
//     try {
//       const userId = auth().currentUser?.uid;

//       // navigate immediately (your existing behavior)
//       navigation.navigate("RatingScreen", {
//         passport,
//         totalAmount,
//         selected,
//         travellerCount,
//       });

//       //OPTIONAL: payment gateway
//       const result = await startPayment(totalAmount, userId, passport);
//       if (!result?.success) {
//         Alert.alert("Failed", "Payment failed. Try again!");
//       }
//     } catch (error) {
//       Alert.alert("Error", error.message || "Payment error");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>
//           {selected?.countrName}
//         </Text>

//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("Tabs", { screen: "Destination" })
//           }
//         >
//           <Icon name="home" size={moderateScale(24)} color={ORANGE} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//         {/* View Travellers */}
//         <TouchableOpacity style={styles.travellerBtn}>
//           <Text style={styles.travelerText}>
//             Travellers: {travellerCount}
//           </Text>
//           {/* <Icon name="chevron-down" size={18} color="#444" /> */}
//         </TouchableOpacity>

//         {/* VISA CARD */}
//         <View style={styles.card}>
//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="document-text-outline" size={20} color="#444" />
//               <Text style={styles.itemTitle}>
//                 Visa Fees x {travellerCount}
//               </Text>
//             </View>
//             <Text style={styles.price}>₹{totalGovFee}</Text>
//           </View>

//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
//               <Text style={styles.itemTitle}>
//                 TVM Fees x {travellerCount}
//               </Text>
//             </View>
//             <Text style={styles.freePrice}>₹{totalTvmFee}</Text>
//           </View>

//           <View style={styles.rowSpace}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="shield-checkmark-outline" size={22} color={ORANGE} />
//               <Text style={styles.itemTitle}>
//                 Authority Fees x {travellerCount}
//               </Text>
//             </View>
//             <Text style={styles.freePrice}>₹{totalAuthorityFee}</Text>
//           </View>

//           <View style={styles.bannerBox}>
//             <Text style={styles.bannerText}>
//               You pay only when we deliver your visa on time
//             </Text>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.rowSpace}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalAmount}>₹{totalAmount}</Text>
//           </View>
//         </View>

//         {/* Protection Section */}
//         <View style={styles.protectCard}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <Icon name="shield-half-outline" size={32} color={ORANGE} />
//             <View style={{ marginLeft: 10 }}>
//               <Text style={styles.protectTitle}>The Visa Manager</Text>
//               <Text style={styles.protectBadge}>Included for Free</Text>
//             </View>
//           </View>

//           <Text style={styles.protectInfo}>
//             If Visa Delayed: No The Visa Manager Fee
//           </Text>
//           <Text style={styles.protectInfo}>
//             If Visa Rejected: 100% Visa Fee Back
//           </Text>
//         </View>
//       </ScrollView>

//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.payButton} onPress={handlePay}>
//           <Text style={styles.btnText}>Proceed to Pay</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// /* ---------------- STYLES (UNCHANGED) ---------------- */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FAFAFA",
//     marginTop: verticalScale(30),
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(10),
//     justifyContent: "space-between",
//   },
//   headerTitle: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: "#000",
//   },
//   travellerBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     alignSelf: "flex-start",
//     marginTop: verticalScale(10),
//     marginLeft: wp("4%"),
//     borderWidth: scale(1),
//     borderColor: "#ccc",
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(6),
//     borderRadius: moderateScale(10),
//   },
//   travelerText: {
//     fontSize: RFValue(14),
//     fontWeight: "600",
//   },
//   card: {
//     backgroundColor: CARD_BG,
//     margin: wp("4%"),
//     padding: moderateScale(16),
//     borderRadius: moderateScale(16),
//     borderWidth: scale(1.2),
//     borderColor: "#E4E4E7",
//   },
//   rowSpace: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: verticalScale(6),
//   },
//   itemTitle: {
//     fontSize: RFValue(14),
//     marginLeft: scale(8),
//     fontWeight: "500",
//   },
//   price: {
//     fontSize: RFValue(16),
//     fontWeight: "600",
//     color: "#111",
//   },
//   freePrice: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     color: ORANGE,
//   },
//   divider: {
//     height: scale(1),
//     backgroundColor: "#E4E4E7",
//     marginVertical: verticalScale(10),
//   },
//   totalLabel: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: "#111",
//   },
//   totalAmount: {
//     fontSize: RFValue(20),
//     fontWeight: "900",
//     color: ORANGE,
//   },
//   bannerBox: {
//     backgroundColor: LIGHT_PURPLE,
//     padding: verticalScale(10),
//     borderRadius: moderateScale(10),
//     marginTop: verticalScale(6),
//   },
//   bannerText: {
//     fontSize: RFValue(13),
//     textAlign: "center",
//     color: "#4A4A4A",
//   },
//   protectCard: {
//     backgroundColor: CARD_BG,
//     marginHorizontal: wp("4%"),
//     padding: moderateScale(16),
//     borderRadius: moderateScale(16),
//     marginTop: verticalScale(8),
//     borderWidth: scale(1),
//     borderColor: "#e4e4e7",
//   },
//   protectTitle: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     color: "#2F2F2F",
//   },
//   protectBadge: {
//     fontSize: RFValue(12),
//     color: "#2AA952",
//     marginTop: verticalScale(2),
//     fontWeight: "700",
//   },
//   protectInfo: {
//     marginTop: verticalScale(5),
//     fontSize: RFValue(13),
//     color: "#444",
//   },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: moderateScale(14),
//     backgroundColor: "#fff",
//   },
//   payButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(12),
//     alignItems: "center",
//   },
//   btnText: {
//     fontSize: RFValue(16),
//     color: "#fff",
//     fontWeight: "800",
//   },
// });

import React, { useState } from "react";
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
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import {
  wp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../../utils/metrics";
import { startPayment } from "../../services/payment/PaymentService";
import auth from "@react-native-firebase/auth";

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

  const baseTotal = visaFee + tvmFee + authorityFee;

  /* ---------------- MINOR CALCULATION ---------------- */
  const minors = hasMinor ? Number(minorCount) || 0 : 0;
  const minorFeePerPerson = baseTotal / 2;
  const totalMinorFee = minorFeePerPerson * minors;

  const totalAmount =
    (Math.round(baseTotal * 100) +
      Math.round(totalMinorFee * 100)) / 100;


  const handlePay = async () => {

    try {
      setLoading(true);
      const userId = auth().currentUser?.uid;

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
            <Text style={styles.itemTitle}>Visa Fee x 1</Text>
            <Text style={styles.price}>₹{visaFee}</Text>
          </View>

          <View style={styles.rowSpace}>
            <Text style={styles.itemTitle}>TVM Fee x 1</Text>
            <Text style={styles.price}>₹{tvmFee}</Text>
          </View>

          <View style={styles.rowSpace}>
            <Text style={styles.itemTitle}>Authority Fee x 1</Text>
            <Text style={styles.price}>₹{authorityFee}</Text>
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

              <View style={styles.rowSpace}>
                <Text style={styles.itemTitle}>
                  Minor Fee x {minors}
                </Text>
                <Text style={styles.price}>₹{totalMinorFee}</Text>
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
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  minorBox: {
    marginTop: verticalScale(10),
  },
  minorLabel: {
    fontSize: RFValue(13),
    marginBottom: verticalScale(6),
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
