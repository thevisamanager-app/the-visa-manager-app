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
