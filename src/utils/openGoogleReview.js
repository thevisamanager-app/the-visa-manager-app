import { Linking, Alert, Platform } from "react-native";

export const openGoogleReview = async () => {
  const url =
    "https://g.page/r/CYH_b-_OP3XhEAE/review";

  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Unable to open Google Reviews");
    }
  } catch (err) {
    Alert.alert("Error", "Something went wrong");
  }
};
