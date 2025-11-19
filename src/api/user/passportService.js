// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";

// export async function savePassportData(data) {
//   const uid = auth().currentUser.uid;

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .doc("latest")
//     .set(data);
// }

// export async function getPassportData() {
//   const uid = auth().currentUser.uid;

//   const doc = await firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .doc("latest")
//     .get();

//   return doc.exists ? doc.data() : null;
// }


// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";

// export async function savePassportData(data) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .doc("latest")
//     .set(
//       {
//         ...data,
//         updatedAt: firestore.FieldValue.serverTimestamp(),
//       },
//       { merge: true }
//     );
// }

// export async function getPassportData() {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   const doc = await firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .doc("latest")
//     .get();

//   return doc.exists ? doc.data() : null;
// }


import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export async function savePassportData(data) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .add({
      ...data,
      scannedAt: firestore.FieldValue.serverTimestamp(),
    });
}
export async function savePassportData(frontData, backData) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .add({
      ...frontData,       // name, passport number, MRZ, front OCR result
      ...backData,        // address, parents name, DOB, etc.
      scannedAt: firestore.FieldValue.serverTimestamp(),
    });
}

export async function savePassportData(data) {
  const user = auth().currentUser;
  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .add({
      ...data,
      scannedAt: firestore.FieldValue.serverTimestamp(),
    });
}

export async function getPassportData() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snapshot = await firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .orderBy("scannedAt", "desc")
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function getAllPassportHistory() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snapshot = await firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .orderBy("scannedAt", "desc")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}


// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import { Platform } from "react-native";

// async function uploadImage(uri, path) {
//   if (!uri) return null;

//   const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

//   const ref = storage().ref(path);
//   await ref.putFile(uploadUri);

//   return await ref.getDownloadURL();
// }



// export async function savePassportData({ frontData, backData, frontImage, backImage }) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   // Upload images
//   const frontImageUrl = await uploadImage(frontImage, `passport/${uid}/front.jpg`);
//   const backImageUrl = await uploadImage(backImage, `passport/${uid}/back.jpg`);

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .add({
//       frontData,
//       backData,
//       frontImageUrl,
//       backImageUrl,
//       scannedAt: firestore.FieldValue.serverTimestamp(),
//     });
// }
