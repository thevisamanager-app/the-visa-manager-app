import auth from "@react-native-firebase/auth";

export const logout = async () => {
  try {
    await auth().signOut();
    console.log("User logged out");
  } catch (error) {
    console.log("Logout Error:", error);
  }
};
