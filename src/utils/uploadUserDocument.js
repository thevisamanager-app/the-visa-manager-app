import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

export const uploadUserDocument = async (localPath, fileName) => {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const storagePath = `users/${user.uid}/documents/${Date.now()}_${fileName}`;
  const ref = storage().ref(storagePath);

  await ref.putFile(`file://${localPath}`);
  return await ref.getDownloadURL();
};
