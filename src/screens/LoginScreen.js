import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { sendOtp } from '../services/auth/otpLogin';
//import { signInWithGoogle } from '../services/auth/googleLogin';
import { googleLogin } from "../services/auth/googleLogin";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneLogin = async () => {
    try {
      if (phone.length < 10) {
        alert("Enter valid phone number");
        return;
      }
      setLoading(true);
      const confirmation = await sendOtp("+91" + phone);
      setLoading(false);
      navigation.navigate("OtpScreen", { confirmation });
    } catch (error) {
      setLoading(false);
      alert("OTP send error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
     navigation.navigate("HomeScreen", { user });
      console.log("Google Login Success:", user);
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome To TheVisaManager</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handlePhoneLogin}>
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Login with OTP"}</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, textAlign: "center", marginBottom: 30, fontWeight: "700" },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20
  },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 20, color: "#666" },
  googleButton: { backgroundColor: "#db4437", padding: 15, borderRadius: 8 },
  googleText: { color: "#fff", textAlign: "center", fontSize: 16 }
});
