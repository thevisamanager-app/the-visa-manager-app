// import auth from '@react-native-firebase/auth';

// // Send OTP to phone number
// export async function sendOtp(phoneNumber) {
//   console.log("PHONE==>",phoneNumber)
//   try {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     return confirmation;
//   } catch (error) {
//     console.log('OTP Send Error:', error);
//     throw error;
//   }
// }

// import { getAuth, signInWithPhoneNumber } from "@react-native-firebase/auth";
// import { getApp } from "@react-native-firebase/app";

// const auth = getAuth(getApp());

// export const sendOtp = async (phoneNumber) => {
//   console.log("PHONESEND==>", phoneNumber)
//   // const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
//   const confirmation = await auth().signInWithPhoneNumber(phoneNumber, true);
//   try {
//     await auth().signInWithPhoneNumber(phone);
//   } catch (err) {
//     if (err.code === 'auth/too-many-requests') {
//       Alert.alert('Too many attempts, please try again in a few minutes');
//     }
//   }
//   return confirmation;
// };

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

export async function sendOtp(phoneNumber) {
  console.log("PHONE==>", phoneNumber);

  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  } catch (err) {
    console.log("OTP Send Error:", err);

    if (err.code === "auth/too-many-requests") {
      Alert.alert("Too many attempts", "Try again after some time.");
    }

    throw err;
  }
}

// Confirm OTP code
// export async function confirmOtp(confirmation, code) {
//   try {
//     const result = await confirmation.confirm(code);
//     return result;
//   } catch (error) {
//     console.log("PHONECONFIRM==>", phoneNumber, error)
//     console.log('OTP Verify Error:', error);
//     throw error;
//   }
// }


export async function confirmOtp(confirmation, code) {
  try {
    const result = await confirmation.confirm(code);
    return result;
  } catch (err) {
    console.log("OTP Verify Error:", err);
    Alert.alert("Invalid OTP", "Please enter correct OTP");
    throw err;
  }
}
