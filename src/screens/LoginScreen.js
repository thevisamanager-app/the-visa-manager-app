// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   Linking
// } from 'react-native';

// import { sendOtp } from '../services/auth/otpLogin';
// import { googleLogin } from "../services/auth/googleLogin";
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";
// import ScreenWrapper from "../components/ScreenWrapper";

// export default function LoginScreen({ navigation }) {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);

//   // ========== OTP Login ==========
//   const handlePhoneLogin = async () => {
//     try {
//       if (phone.length < 10) {
//         Alert.alert("Validation", "Enter valid phone number");
//         return;
//       }
//       setLoading(true);
//       const confirmation = await sendOtp("+91" + phone);
//       setLoading(false);

//       navigation.navigate("OtpScreen", { confirmation });

//     } catch (error) {
//       setLoading(false);
//       Alert.alert("OTP Error", error.message);
//     }
//   };

//   // ========== Google Login ==========
//   const handleGoogleLogin = async () => {
//     try {
//       const authResult = await googleLogin();
//       console.log("GOOGLE LOGIN SUCCESS:", authResult);

//       if (!authResult?.user) {
//         Alert.alert("Google Sign-In Failed", "Please try again.");
//         return;
//       }

//       //navigation.navigate("Destination", { user: authResult.user });

//     } catch (error) {
//       console.log("GOOGLE LOGIN ERROR:", error);
//       Alert.alert("Google Login Failed", error.message);
//     }
//   };

//   return (
//       <ScreenWrapper style={styles.container}>
//     <View style={styles.container}>
//       <Image
//         source={require("../../tvm_assets/tvmlogo.png")}
//         style={{
//           width: wp("65%"),
//           height: hp("25%"),
//           borderRadius: moderateScale(10),
//           alignSelf: "center",
//           marginBottom: verticalScale(30),   // ✅ FIXED SPACING UNDER LOGO
//         }}
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
//         <Text style={styles.buttonText}>
//           {loading ? "Sending..." : "Login with OTP"}
//         </Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>OR</Text>

//       <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
//         <Text style={styles.googleText}>Sign in with Google</Text>
//       </TouchableOpacity>
//       <Text style={styles.termsText}>
//         By continuing you agree to our{' '}
//         <Text
//           style={styles.linkText}
//           onPress={() =>
//             Linking.openURL('https://www.thevisamanager.com/privacy-policy')
//           }
//         >
//           terms of use and privacy policy
//         </Text>
//         .
//       </Text>

//     </View>
//     </ScreenWrapper>
//   );
// }

// // ===== STYLES =====
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: wp("5%"),
//     backgroundColor: "#fff",
//   },

//   title: {
//     fontSize: RFValue(34),
//     textAlign: "center",
//     fontWeight: "700",
//     marginBottom: verticalScale(20),
//   },

//   input: {
//     borderWidth: scale(1),
//     borderColor: "#ccc",
//     padding: moderateScale(12),
//     borderRadius: moderateScale(8),
//     marginBottom: verticalScale(20),
//     color: "#000",
//     fontSize: RFValue(14),
//   },

//   button: {
//     backgroundColor: "#FF5C00",
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(8),
//   },

//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "600",
//   },

//   orText: {
//     textAlign: "center",
//     marginVertical: verticalScale(20),
//     color: "#666",
//     fontSize: RFValue(14),
//   },

//   googleButton: {
//     backgroundColor: "#111",
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(4),
//   },

//   googleText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "600",
//   },
//   termsText: {
//   marginTop: verticalScale(20),
//   textAlign: 'center',
//   fontSize: RFValue(12),
//   color: '#666',
// },

// linkText: {
//   color: '#FF5C00',
//   textDecorationLine: 'underline',
//   fontWeight: '600',
// },
// });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   Linking,
//   StatusBar,
// } from "react-native";
// import Video from "react-native-video";

// import { sendOtp } from "../services/auth/otpLogin";
// import { googleLogin } from "../services/auth/googleLogin";
// import {
//   wp,
//   hp,
//   scale,
//   verticalScale,
//   moderateScale,
//   RFValue,
// } from "../utils/metrics";
// import ScreenWrapper from "../components/ScreenWrapper";

// export default function LoginScreen({ navigation }) {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ================= OTP LOGIN ================= */
//   const handlePhoneLogin = async () => {
//     try {
//       if (phone.length < 10) {
//         Alert.alert("Validation", "Enter valid phone number");
//         return;
//       }
//       setLoading(true);
//       const confirmation = await sendOtp("+91" + phone);
//       setLoading(false);
//       navigation.navigate("OtpScreen", { confirmation });
//     } catch (error) {
//       setLoading(false);
//       Alert.alert("OTP Error", error.message);
//     }
//   };

//   /* ================= GOOGLE LOGIN ================= */
//   const handleGoogleLogin = async () => {
//     try {
//       const authResult = await googleLogin();
//       if (!authResult?.user) {
//         Alert.alert("Google Sign-In Failed", "Please try again.");
//       }
//     } catch (error) {
//       Alert.alert("Google Login Failed", error.message);
//     }
//   };

//   return (
//     <ScreenWrapper style={styles.wrapper}>
//       <StatusBar translucent backgroundColor="transparent" />

//       {/* ===== BACKGROUND VIDEO ===== */}
//       <Video
//         source={require("../assets/videos/login-hero.mp4")}
//         style={StyleSheet.absoluteFill}
//         resizeMode="cover"
//         repeat
//         muted
//         rate={1.0}
//         ignoreSilentSwitch="obey"
//       />

//       {/* ===== DARK OVERLAY ===== */}
//       <View style={styles.overlay} />

//       {/* ===== CONTENT ===== */}
//       <View style={styles.container}>
      

//         <TextInput
//           style={styles.input}
//           placeholder="Enter Phone Number"
//           placeholderTextColor="#000"
//           keyboardType="number-pad"
//           value={phone}
//           onChangeText={setPhone}
//           maxLength={10}
//         />

//         <TouchableOpacity
//           style={styles.button}
//           onPress={handlePhoneLogin}
//           disabled={loading}
//         >
//           <Text style={styles.buttonText}>
//             {loading ? "Sending..." : "Get OTP"}
//           </Text>
//         </TouchableOpacity>

//         <Text style={styles.orText}>OR</Text>

//         <TouchableOpacity
//           style={styles.googleButton}
//           onPress={handleGoogleLogin}
//         >
//           <Text style={styles.googleText}>Sign in with Google</Text>
//         </TouchableOpacity>

//         <Text style={styles.termsText}>
//           By continuing you agree to our{" "}
//           <Text
//             style={styles.linkText}
//             onPress={() =>
//               Linking.openURL(
//                 "https://www.thevisamanager.com/privacy-policy"
//               )
//             }
//           >
//             terms of use and privacy policy
//           </Text>
//           .
//         </Text>
//       </View>
//     </ScreenWrapper>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: "#000",
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },

//  container: {
//   flex: 1,
//   justifyContent: "flex-end",
//   paddingHorizontal: wp("5%"),
//   paddingBottom: hp("12%"), // 👈 moves login box downward
// },


//   logo: {
//     width: wp("65%"),
//     height: hp("25%"),
//     borderRadius: moderateScale(10),
//     alignSelf: "center",
//     marginBottom: verticalScale(30),
//   },

//   input: {
//     backgroundColor: "#fff",
//     borderWidth: scale(1),
//     borderColor: "#ccc",
//     padding: moderateScale(12),
//     borderRadius: moderateScale(8),
//     marginBottom: verticalScale(20),
//     color: "#000",
//     fontSize: RFValue(14),
//   },

//   button: {
//     backgroundColor: "#FF5C00",
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(8),
//   },

//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "600",
//   },

//   orText: {
//     textAlign: "center",
//     marginVertical: verticalScale(20),
//     color: "#fff",
//     fontSize: RFValue(14),
//   },

//   googleButton: {
//     backgroundColor: "#111",
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(4),
//   },

//   googleText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "600",
//   },

//   termsText: {
//     marginTop: verticalScale(20),
//     textAlign: "center",
//     fontSize: RFValue(12),
//     color: "#e5e7eb",
//   },

//   linkText: {
//     color: "#FF5C00",
//     textDecorationLine: "underline",
//     fontWeight: "600",
//   },
// });

// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Linking,
//   StatusBar,
// } from "react-native";
// import Video from "react-native-video";
// import OTPVerify from "react-native-otp-verify";

// import { sendOtp, confirmOtp } from "../services/auth/otpLogin";
// import { googleLogin } from "../services/auth/googleLogin";
// import {
//   wp,
//   hp,
//   scale,
//   verticalScale,
//   moderateScale,
//   RFValue,
// } from "../utils/metrics";
// import ScreenWrapper from "../components/ScreenWrapper";

// const OTP_LENGTH = 6;

// export default function LoginScreen({ navigation }) {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmation, setConfirmation] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const inputsRef = useRef([]);

//   /* ================= SEND OTP ================= */
//   const handlePhoneLogin = async () => {
//     try {
//       if (phone.length < 10) {
//         Alert.alert("Validation", "Enter valid phone number");
//         return;
//       }
//       setLoading(true);
//       const result = await sendOtp("+91" + phone);
//       setConfirmation(result);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       Alert.alert("OTP Error", error.message);
//     }
//   };

//   /* ================= VERIFY OTP ================= */
//   const handleVerifyOtp = async () => {
//     try {
//       // if (otp.length !== OTP_LENGTH) {
//       //   Alert.alert("Invalid OTP", "Enter full OTP");
//       //   return;
//       // }
//       await confirmOtp(confirmation, otp);
//       // navigation.replace("Tabs");
//     } catch {
//       Alert.alert("Invalid OTP");
//     }
//   };

//   /* ================= AUTO READ OTP (ANDROID) ================= */
//   useEffect(() => {
//     if (!confirmation) return;

//     OTPVerify.getOtp()
//       .then(() => OTPVerify.addListener(onOtpReceived))
//       .catch(() => {});

//     return () => OTPVerify.removeListener();
//   }, [confirmation]);

//   const onOtpReceived = (message) => {
//     const code = message.match(/\b\d{6}\b/);
//     if (code) {
//       setOtp(code[0]);
//       OTPVerify.removeListener();
//     }
//   };

//   /* ================= OTP BOX HANDLER ================= */
//   const handleOtpChange = (value, index) => {
//     const otpArr = otp.split("");
//     otpArr[index] = value;
//     const newOtp = otpArr.join("").slice(0, OTP_LENGTH);
//     setOtp(newOtp);

//     if (value && index < OTP_LENGTH - 1) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   return (
//     <ScreenWrapper style={styles.wrapper}>
//       <StatusBar translucent backgroundColor="transparent" />

//       <Video
//         source={require("../assets/videos/login-hero.mp4")}
//         style={StyleSheet.absoluteFill}
//         resizeMode="cover"
//         repeat
//         muted
//       />

//       <View style={styles.overlay} />

//       <View style={styles.container}>
//         {!confirmation ? (
//           <>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Phone Number"
//               keyboardType="number-pad"
//               value={phone}
//               onChangeText={setPhone}
//               maxLength={10}
//             />

//             <TouchableOpacity style={styles.button} onPress={handlePhoneLogin}>
//               <Text style={styles.buttonText}>
//                 {loading ? "Sending..." : "Get OTP"}
//               </Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <Text style={styles.otpTitle}>Enter OTP</Text>

//             <View style={styles.otpRow}>
//               {Array.from({ length: OTP_LENGTH }).map((_, i) => (
//                 <TextInput
//                   key={i}
//                   ref={(r) => (inputsRef.current[i] = r)}
//                   style={styles.otpBox}
//                   keyboardType="number-pad"
//                   maxLength={1}
//                   value={otp[i] || ""}
//                   onChangeText={(v) => handleOtpChange(v, i)}
//                 />
//               ))}
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
//               <Text style={styles.buttonText}>Verify OTP</Text>
//             </TouchableOpacity>
//           </>
//         )}

//         <Text style={styles.termsText}>
//           By continuing you agree to our{" "}
//           <Text
//             style={styles.linkText}
//             onPress={() =>
//               Linking.openURL(
//                 "https://www.thevisamanager.com/privacy-policy"
//               )
//             }
//           >
//             terms of use and privacy policy
//           </Text>
//           .
//         </Text>
//       </View>
//     </ScreenWrapper>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: "#000" },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//     paddingHorizontal: wp("5%"),
//     paddingBottom: hp("12%"),
//   },
//   input: {
//     backgroundColor: "#fff",
//     padding: moderateScale(12),
//     borderRadius: 8,
//     marginBottom: verticalScale(16),
//   },
//   button: {
//     backgroundColor: "#FF5C00",
//     paddingVertical: verticalScale(14),
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: RFValue(16),
//   },
//   otpTitle: {
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 12,
//     fontSize: RFValue(16),
//   },
//   otpRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   otpBox: {
//     width: wp("12%"),
//     height: wp("12%"),
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     textAlign: "center",
//     fontSize: RFValue(18),
//     fontWeight: "600",
//   },
//   termsText: {
//     marginTop: 16,
//     textAlign: "center",
//     fontSize: RFValue(12),
//     color: "#e5e7eb",
//   },
//   linkText: {
//     color: "#FF5C00",
//     textDecorationLine: "underline",
//     fontWeight: "600",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  StatusBar,
} from "react-native";
import Video from "react-native-video";

import { sendOtp } from "../services/auth/otpLogin";
import { googleLogin } from "../services/auth/googleLogin";
import {
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../utils/metrics";
import ScreenWrapper from "../components/ScreenWrapper";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputs = [];

  /* ================= SEND OTP ================= */
  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert("Validation", "Enter valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const result = await sendOtp("+91" + phone);
      setConfirmation(result); // stay on same screen
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("OTP Error", error.message);
    }
  };

  /* ================= OTP INPUT HANDLERS ================= */
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Enter 6-digit OTP");
      return;
    }

    try {
      await confirmation.confirm(finalOtp);
    
    } catch (error) {
      Alert.alert("Invalid OTP");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      if (result?.user) {
       
      }
    } catch (error) {
      Alert.alert("Google Login Failed", error.message);
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* ===== BACKGROUND VIDEO ===== */}
      <Video
        source={require("../assets/videos/login-hero.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        repeat
        muted
      />

      {/* ===== DARK OVERLAY ===== */}
      <View style={styles.overlay} />

      {/* ===== CONTENT ===== */}
      <View style={styles.container}>
        {!confirmation ? (
          <>
            {/* PHONE INPUT */}
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="#000"
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSendOtp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending..." : "Get OTP"}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* OTP TITLE */}
            <Text style={styles.otpTitle}>Enter OTP</Text>

            {/* OTP BOXES */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs[index] = ref)}
                  style={[
                    styles.otpBox,
                    digit ? styles.otpFilled : null,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(val) =>
                    handleOtpChange(val, index)
                  }
                  onKeyPress={(e) =>
                    handleOtpBackspace(e, index)
                  }
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyOtp}
            >
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setConfirmation(null);
                setOtp(["", "", "", "", "", ""]);
              }}
            >
              <Text style={styles.changeText}>
                Change phone number
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* GOOGLE LOGIN */}
        {!confirmation && (
          <>
            <Text style={styles.orText}>OR</Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
            >
              <Text style={styles.googleText}>
                Sign in with Google
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* TERMS */}
        <Text style={styles.termsText}>
          By continuing you agree to our{" "}
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL(
                "https://www.thevisamanager.com/privacy-policy"
              )
            }
          >
            terms of use and privacy policy
          </Text>
          .
        </Text>
      </View>
    </ScreenWrapper>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#000",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("12%"),
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: scale(1),
    borderColor: "#ccc",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(20),
    color: "#000",
    fontSize: RFValue(14),
  },

  otpTitle: {
    color: "#fff",
    fontSize: RFValue(18),
    textAlign: "center",
    marginBottom: verticalScale(12),
    fontWeight: "600",
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(24),
  },

  otpBox: {
    width: wp("12%"),
    height: wp("12%"),
    backgroundColor: "#fff",
    borderRadius: moderateScale(10),
    textAlign: "center",
    fontSize: RFValue(18),
    borderWidth: 1,
    borderColor: "#d1d5db",
  },

  otpFilled: {
    borderColor: "#FF5C00",
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

  changeText: {
    color: "#fff",
    textAlign: "center",
    marginTop: verticalScale(12),
    textDecorationLine: "underline",
  },

  orText: {
    textAlign: "center",
    marginVertical: verticalScale(20),
    color: "#fff",
    fontSize: RFValue(14),
  },

  googleButton: {
    backgroundColor: "#111",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(8),
  },

  googleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "600",
  },

  termsText: {
    marginTop: verticalScale(20),
    textAlign: "center",
    fontSize: RFValue(12),
    color: "#e5e7eb",
  },

  linkText: {
    color: "#FF5C00",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});


