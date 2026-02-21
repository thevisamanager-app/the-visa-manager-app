import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { confirmOtp } from "../services/auth/otpLogin";
import { saveUserToStorage } from "../Redux/authSlice";

export default function OtpScreen({ route, navigation }) {
  const confirmation = route?.params?.confirmation;
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const verifyOtp = async () => {
    if (!confirmation) {
      Alert.alert("Session Expired", "Please request OTP again.");
      navigation.goBack();
      return;
    }

    if (!otp || otp.length < 4) {
      Alert.alert("Invalid OTP", "Please enter a valid OTP.");
      return;
    }

    try {
      const result = await confirmOtp(confirmation, otp);

      await dispatch(
        saveUserToStorage({
          isLoggedIn: true,
          uid: result?.user?.uid || null,
          phone: result?.user?.phoneNumber || null,
        })
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (e) {
      Alert.alert("Invalid OTP", "Please enter correct OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="123456"
        placeholderTextColor="#9CA3AF"
        value={otp}
        onChangeText={setOtp}
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20, color: "#111827" },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    color: "#111827",
  },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});

