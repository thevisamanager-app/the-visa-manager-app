import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const saveSchengenData = async (countryName, data) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  return firestore()
    .collection("users")
    .doc(user.uid)
    .collection("passportData") // ✅ ALLOWED BY RULES
    .doc(countryName)
    .set(
      {
        countryType: "Schengen",
        userId: user.uid, // keep for convenience
        schengen: data,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
};
