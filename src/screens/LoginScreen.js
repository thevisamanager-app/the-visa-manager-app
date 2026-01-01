// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { sendOtp } from '../services/auth/otpLogin';
// import { signInWithGoogle } from '../services/auth/googleLogin';

// export default function LoginScreen({ navigation }) {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handlePhoneLogin = async () => {
//     try {
//       if (phone.length < 10) {
//         alert("Enter valid phone number");
//         return;
//       }
//       setLoading(true);
//       const confirmation = await sendOtp("+91" + phone);
//       setLoading(false);
//       navigation.navigate("OtpScreen", { confirmation });
//     } catch (error) {
//       setLoading(false);
//       alert("OTP send error: " + error.message);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const user = await signInWithGoogle();
//      navigation.navigate("HomeScreen", { user });
//       console.log("Google Login Success:", user);
//     } catch (error) {
//       alert("Google login failed: " + error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Welcome To TheVisaManager</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Phone Number"
//         keyboardType="number-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TouchableOpacity style={styles.button} onPress={handlePhoneLogin}>
//         <Text style={styles.buttonText}>{loading ? "Sending..." : "Login with OTP"}</Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>OR</Text>

//       <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
//         <Text style={styles.googleText}>Sign in with Google</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: { fontSize: 26, textAlign: "center", marginBottom: 30, fontWeight: "700" },
//   input: {
//     borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20
//   },
//   button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
//   orText: { textAlign: "center", marginVertical: 20, color: "#666" },
//   googleButton: { backgroundColor: "#db4437", padding: 15, borderRadius: 8 },
//   googleText: { color: "#fff", textAlign: "center", fontSize: 16 }
// });



import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Linking
} from 'react-native';

import { sendOtp } from '../services/auth/otpLogin';
import { googleLogin } from "../services/auth/googleLogin";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // ========== OTP Login ==========
  const handlePhoneLogin = async () => {
    try {
      if (phone.length < 10) {
        Alert.alert("Validation", "Enter valid phone number");
        return;
      }
      setLoading(true);
      const confirmation = await sendOtp("+91" + phone);
      setLoading(false);

      navigation.navigate("OtpScreen", { confirmation });

    } catch (error) {
      setLoading(false);
      Alert.alert("OTP Error", error.message);
    }
  };

  // ========== Google Login ==========
  const handleGoogleLogin = async () => {
    try {
      const authResult = await googleLogin();
      console.log("GOOGLE LOGIN SUCCESS:", authResult);

      if (!authResult?.user) {
        Alert.alert("Google Sign-In Failed", "Please try again.");
        return;
      }

      //navigation.navigate("Destination", { user: authResult.user });

    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);
      Alert.alert("Google Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to App</Text>

      <Image
        source={require("../../tvm_assets/tvmlogo.png")}
        style={{
          width: wp("65%"),
          height: hp("25%"),
          borderRadius: moderateScale(10),
          alignSelf: "center",
          marginBottom: verticalScale(30),   // ✅ FIXED SPACING UNDER LOGO
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        placeholderTextColor="#000"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handlePhoneLogin}>
        <Text style={styles.buttonText}>
          {loading ? "Sending..." : "Login with OTP"}
        </Text>
      </TouchableOpacity>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By continuing you agree to our{' '}
        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL('https://www.thevisamanager.com/privacy-policy')
          }
        >
          terms of use and privacy policy
        </Text>
        .
      </Text>

    </View>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: wp("5%"),
    backgroundColor: "#fff",
  },

  title: {
    fontSize: RFValue(34),
    textAlign: "center",
    fontWeight: "700",
    marginBottom: verticalScale(20),
  },

  input: {
    borderWidth: scale(1),
    borderColor: "#ccc",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(20),
    color: "#000",
    fontSize: RFValue(14),
  },

  button: {
    backgroundColor: "#FF5C00",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(8),
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "600",
  },

  orText: {
    textAlign: "center",
    marginVertical: verticalScale(20),
    color: "#666",
    fontSize: RFValue(14),
  },

  googleButton: {
    backgroundColor: "#111",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(4),
  },

  googleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
  termsText: {
  marginTop: verticalScale(20),
  textAlign: 'center',
  fontSize: RFValue(12),
  color: '#666',
},

linkText: {
  color: '#FF5C00',
  textDecorationLine: 'underline',
  fontWeight: '600',
},
});
