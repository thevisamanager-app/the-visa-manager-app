// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// export default function CheckoutScreen({ route, navigation }) {
//   // You can pass preview data from previous screen if needed
//   const { preview } = route.params || {};

//   const visaManagerFee = 1000;   // you can change
//   const visaFee = 2500;          // you can change
//   const total = visaManagerFee + visaFee;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Checkout</Text>

//       <View style={styles.box}>
//         <Text style={styles.row}>
//           Visa Manager Fees: <Text style={styles.amount}>₹{visaManagerFee}</Text>
//         </Text>
//         <Text style={styles.row}>
//           Visa Fees: <Text style={styles.amount}>₹{visaFee}</Text>
//         </Text>

//         <Text style={styles.total}>
//           Total: ₹{total}
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => Alert.alert("Success", "Payment processing coming soon!")}
//       >
//         <Text style={styles.buttonText}>Proceed</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 20,
//   },
//   box: {
//     padding: 20,
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: "#ccc",
//     marginBottom: 30,
//   },
//   row: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   amount: {
//     fontWeight: "700",
//   },
//   total: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginTop: 20,
//     color: "#007bff",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });


// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Alert ,SafeAreaViewBase} from "react-native";
// import { startPayment } from "../../services/payment/PaymentService";

// export default function CheckoutScreen({ navigation, route }) {
//   const passport = route?.params?.passport || route?.params?.updatedPassport || {};
//   const amount = 2;
//   const userId = "USER001";
//   console.log("PASSPORT==>", passport)
//   // const handlePay = async () => {
//   //   const result = await startPayment(amount, userId);
//   //   console.log("RESULT==>", result)
//   //   if (result) Alert.alert("Success", "Payment Completed!");
//   //   else Alert.alert("Failed", "Payment failed. Try again!");
//   // };
//   const handlePay = async () => {
//     const result = await startPayment(amount, userId, passport);
//     console.log("RESULT==>", result);

//     if (result.success) {
//       Alert.alert("Success", "Payment Completed!");
//     } else {
//       Alert.alert("Failed", "Payment failed. Try again!");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Checkout</Text>

//       <View style={styles.card}>
//         <Text style={styles.text}>Visa Manager Fees: ₹1</Text>
//         <Text style={styles.text}>Visa Fees: ₹1</Text>
//         <Text style={styles.total}>Total: ₹{amount}</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handlePay}>
//         <Text style={styles.btnText}>Proceed</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   heading: { fontSize: 32, fontWeight: "bold", color: "#FF6F00", marginBottom: 20 },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     borderColor: "#FF6F00",
//     borderWidth: 1,
//     marginBottom: 20,
//   },
//   text: { color: "#111", fontSize: 18, marginBottom: 5 },
//   total: { color: "#FF6F00", fontSize: 22, fontWeight: "bold", marginTop: 10 },
//   button: {
//     backgroundColor: "#FF6F00",
//     padding: 16,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   btnText: { fontSize: 20, color: "#fff", fontWeight: "bold" },
// });



import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { startPayment } from "../../services/payment/PaymentService";

const ORANGE = "#FF5C00";

export default function CheckoutScreen({ navigation, route }) {
  const passport = route?.params?.passport || route?.params?.updatedPassport || {};
  const amount = 2;
  const userId = "USER001";

  const handlePay = async () => {
    const result = await startPayment(amount, userId, passport);
    console.log("RESULT==>", result);

    if (result.success) {
      Alert.alert("Success", "Payment Completed!");
    } else {
      Alert.alert("Failed", "Payment failed. Try again!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        {/* <Text style={styles.headerLabel}>Checkout</Text> */}
        <Icon name="home" size={26} color={ORANGE} />
      </View>

      {/* Progress Section */}
      <View style={styles.progressContainer}>
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Photo</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Passport</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Detail</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="radio-button-checked" size={22} color={ORANGE} />
          <Text style={[styles.stepLabel, { color: ORANGE }]}>Checkout</Text>
        </View>
      </View>

      {/* Pricing Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Visa Manager Fees</Text>
          <Text style={styles.amount}>₹1</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Visa Fees</Text>
          <Text style={styles.amount}>₹1</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{amount}</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handlePay}>
        <Text style={styles.btnText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerLabel: { fontSize: 20, fontWeight: "700" },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  stepItem: { alignItems: "center" },
  stepLabel: { fontSize: 11, color: "#777", marginTop: 4 },
  line: { width: 28, height: 2, backgroundColor: ORANGE, marginHorizontal: 6 },

  card: {
    backgroundColor: "#F6F6F8",
    borderRadius: 14,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    justifyContent: "center",
    alignContent: "center"
  },
  rowText: {
    fontSize: 17,
    marginBottom: 10,
    fontWeight: "500",
    color: "#222",
    backgroundColor: "green",

  },
  amountRight: {
    position: "absolute",
    left: 0,
    fontWeight: "700",
  },
  divider: {
    height: 1.2,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
  totalRow: {
    fontSize: 18,
    fontWeight: "700",
  },
  totalAmt: {
    color: ORANGE,
    fontSize: 20,
    fontWeight: "900",
  },

  button: {
    backgroundColor: ORANGE,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: { fontSize: 20, color: "#fff", fontWeight: "800" },


  row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
},

label: {
  fontSize: 18,
  color: "#222",
  fontWeight: "500",
},

amount: {
  fontSize: 18,
  fontWeight: "700",
  color: "#222",
},

totalLabel: {
  fontSize: 20,
  fontWeight: "700",
  color: "#000",
},

totalAmount: {
  fontSize: 22,
  fontWeight: "900",
  color: "#FF6F00",
},

});
