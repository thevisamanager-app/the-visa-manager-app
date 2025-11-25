// // import React, { useState } from 'react';
// // import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { confirmOtp } from '../services/auth/otpLogin';
// // //import { useNavigation } from "@react-navigation/native";


// // export default function OtpScreen({ route, navigation }) {
// //   const { confirmation } = route.params;
// //   const [otp, setOtp] = useState("");

// //   const verifyOtp = async () => {


// //     try {
// //       const result = await confirmOtp(confirmation, otp);
// //       console.log("OTP Verified:", result.user);
// //       navigation.replace("Tabs");

// //     } catch (e) {
// //       alert("Invalid OTP");
// //     }
// //   };

// //   return (

// //     <View style={styles.container}>
// //       <Text style={styles.title}>Enter OTP</Text>

// //       <TextInput
// //         style={styles.input}
// //         keyboardType="number-pad"
// //         placeholder="123456"
// //         value={otp}
// //         onChangeText={setOtp}
// //       />

// //       <TouchableOpacity style={styles.button} onPress={verifyOtp}>
// //         <Text style={styles.buttonText}>Verify OTP</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
// //   title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
// //   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 20 },
// //   button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8 },
// //   buttonText: { color: "#fff", textAlign: "center" }
// // });


// import React, { useState } from 'react';
// import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { confirmOtp } from '../services/auth/otpLogin';
// import { useDispatch } from "react-redux";
// import { saveUserToStorage } from "../Redux/authSlice";

// export default function OtpScreen({ route, navigation }) {
//   const { confirmation } = route.params;
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch();

//   const verifyOtp = async () => {
//     try {
//       const result = await confirmOtp(confirmation, otp);
//       console.log("OTP Verified:", result.user);

//       // Save user to redux + AsyncStorage
//       dispatch(saveUserToStorage(result.user));

//       // Navigate to Tabs
//       navigation.replace("Tabs");

//     } catch (e) {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter OTP</Text>

//       <TextInput
//         style={styles.input}
//         keyboardType="number-pad"
//         placeholder="123456"
//         value={otp}
//         onChangeText={setOtp}
//       />

//       <TouchableOpacity style={styles.button} onPress={verifyOtp}>
//         <Text style={styles.buttonText}>Verify OTP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
//   title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
//   input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 20 },
//   button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8 },
//   buttonText: { color: "#fff", textAlign: "center" }
// });


import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { confirmOtp } from '../services/auth/otpLogin';
import { useDispatch } from "react-redux";
import { saveUserToStorage } from "../Redux/authSlice";

export default function OtpScreen({ route, navigation }) {
  const { confirmation } = route.params;
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const verifyOtp = async () => {
    try {
      const result = await confirmOtp(confirmation, otp);
      console.log("OTP Verified:", result.user);

      // Store login status only — NOT entire user
      dispatch(saveUserToStorage({
        isLoggedIn: true,
        uid: result.user.uid,
        phone: result.user.phoneNumber
      }));

     // navigation.replace("Tabs");

    } catch (e) {
      alert("Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="123456"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 20 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center" }
});
