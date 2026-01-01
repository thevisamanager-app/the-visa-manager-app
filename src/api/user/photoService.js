import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";

export async function uploadUserPhoto(photo) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;
  const fileId = uuid.v4();
  const path = `users/${uid}/photo/${fileId}.jpg`;

  const ref = storage().ref(path);
  await ref.putFile(photo.uri);
  const url = await ref.getDownloadURL();

  await firestore()
    .collection("users")
    .doc(uid)
    .collection("photo")
    .add({
      ...url,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

  return url;
}

export async function getUserPhoto() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snap = await firestore()
    .collection("users")
    .doc(uid)
    .collection("photo")
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return doc.data().url;
}