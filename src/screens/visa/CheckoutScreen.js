import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CheckoutScreen({ route, navigation }) {
  // You can pass preview data from previous screen if needed
  const { preview } = route.params || {};

  const visaManagerFee = 1000;   // you can change
  const visaFee = 2500;          // you can change
  const total = visaManagerFee + visaFee;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <View style={styles.box}>
        <Text style={styles.row}>
          Visa Manager Fees: <Text style={styles.amount}>₹{visaManagerFee}</Text>
        </Text>
        <Text style={styles.row}>
          Visa Fees: <Text style={styles.amount}>₹{visaFee}</Text>
        </Text>

        <Text style={styles.total}>
          Total: ₹{total}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Success", "Payment processing coming soon!")}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  box: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginBottom: 30,
  },
  row: {
    fontSize: 18,
    marginBottom: 10,
  },
  amount: {
    fontWeight: "700",
  },
  total: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    color: "#007bff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
