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
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getApp } from '@react-native-firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithPhoneNumber } from '@react-native-firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com', // Firebase Console → Project Settings → Web Client ID
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  // Google Login handler
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const auth = getAuth(getApp());
      const userCredential = await signInWithCredential(auth, googleCredential);

      console.log('Google User:', userCredential.user);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Google Sign-in error:', error);
      alert(error?.message || 'Google Sign-in failed');
    }
  };

  // OTP Login handler
//   const handleOtpLogin = async () => {
//     try {
//       const auth = getAuth(getApp());
//       const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
//       navigation.navigate('OtpScreen', { confirmation });
//    } catch (err) {
//   console.error('OTP Request error:', JSON.stringify(err, null, 2));
//   alert(err.message || 'Failed to send OTP');
// }

//   };
const handleOtpLogin = async () => {
  let formattedPhone = phoneNumber.trim();

  // Auto prepend country code if missing
  if (!formattedPhone.startsWith('+')) {
    formattedPhone = `+91${formattedPhone}`;
  }

  try {
    const auth = getAuth(getApp());
    const confirmation = await signInWithPhoneNumber(auth, formattedPhone);
    navigation.navigate('OtpScreen', { confirmation });
  } catch (err) {
    console.error('OTP Request error:', err);
    alert(err.message || 'Failed to send OTP');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to App</Text>

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="+1234567890"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleOtpLogin}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 20 },
  button: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 8, marginBottom: 10 },
  googleButton: { backgroundColor: '#db4437', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
