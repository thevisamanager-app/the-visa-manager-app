// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
// import { sendOtp } from '../services/auth/otpLogin';
// //import { signInWithGoogle } from '../services/auth/googleLogin';
// import { googleLogin } from "../services/auth/googleLogin";

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

//   // const handleGoogleLogin = async () => {
//   //   try {
//   //     const user = await googleLogin();
//   //    navigation.navigate("HomeScreen", { user });
//   //     console.log("Google Login Success:", user);
//   //   } catch (error) {
//   //     alert("Google login failed: " + error.message);
//   //   }
//   // };
//   const handleGoogleLogin = async () => {
//     try {
//       const user = await googleLogin();

//       if (!user) {
//         alert("Google login failed. Please try again.");
//         return; // ❌ STOP navigation
//       }

//       console.log("Google Login Success:", user);
//       navigation.navigate("DestinationScreen", { user });

//     } catch (error) {
//       alert("Google login failed: " + error.message);
//     }
//   };


//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Welcome To</Text>
//       <Image
//         source={require("../assets/icons/TVMLogo.png")}//since photo is now a URL string
//         style={{ width: "60%", height: "20%", borderRadius: 10 ,alignSelf:"center"}}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Enter Phone Number"
//         placeholderTextColor="#000"
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
//   container: { flex: 1, justifyContent: "center", padding: 20 ,backgroundColor:"#fff"},
//   title: { fontSize: 40, textAlign: "center", fontWeight: "700" },
//   input: {
//     borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20, color: "#000"
//   },
//   button: { backgroundColor: "#FF5C00", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
//   orText: { textAlign: "center", marginVertical: 20, color: "#666" },
//   googleButton: { backgroundColor: "#111", padding: 15, borderRadius: 8 },
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
  Alert
} from 'react-native';

import { sendOtp } from '../services/auth/otpLogin';
import { googleLogin } from "../services/auth/googleLogin";

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

      navigation.navigate("Destination", { user: authResult.user });


    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);
      Alert.alert("Google Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To</Text>

      <Image
        source={require("../assets/icons/TVMLogo.png")}
        style={{ width: "60%", height: "20%", borderRadius: 10, alignSelf: "center" }}
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

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 40, textAlign: "center", fontWeight: "700" },
  input: {
    borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 20, color: "#000"
  },
  button: { backgroundColor: "#FF5C00", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 20, color: "#666" },
  googleButton: { backgroundColor: "#111", padding: 15, borderRadius: 8 },
  googleText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
