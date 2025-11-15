import auth from '@react-native-firebase/auth';

// Send OTP to phone number
export async function sendOtp(phoneNumber) {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return confirmation;
  } catch (error) {
    console.log('OTP Send Error:', error);
    throw error;
  }
}

// Confirm OTP code
export async function confirmOtp(confirmation, code) {
  try {
    const result = await confirmation.confirm(code);
    return result;
  } catch (error) {
    console.log('OTP Verify Error:', error);
    throw error;
  }
}
