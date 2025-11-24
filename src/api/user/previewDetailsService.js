// // src/api/user/previewDetailsService.js
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import uuid from "react-native-uuid";

// export async function uploadTicketFile(file) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;
//   const fileId = uuid.v4();
//   const ext = file.name?.split(".").pop() || "dat";
//   const path = `users/${uid}/tickets/${fileId}.${ext}`;

//   const ref = storage().ref(path);

//   // file.uri from DocumentPicker works with putFile
//   await ref.putFile(file.uri);

//   return await ref.getDownloadURL();
// }

// export async function savePreviewDetails(previewPayload) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("previewdetails")
//     .add({
//       ...previewPayload,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }

// src/api/user/previewDetailsService.js
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import uuid from "react-native-uuid";

// // Upload image ticket to Firebase Storage
// export async function uploadTicketFile(file) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;
//   const fileId = uuid.v4();

//   const ext =
//     file.name?.split(".").pop() ||
//     file.type?.split("/")[1] ||
//     "jpg";

//   const path = `users/${uid}/tickets/${fileId}.${ext}`;

//   const ref = storage().ref(path);

//   // Works for react-native-image-picker
//   await ref.putFile(file.uri);

//   return await ref.getDownloadURL();
// }

// // Save preview details
// export async function savePreviewDetails(previewPayload) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   // MUST MATCH FIRESTORE RULES:
//   // previewdetails/{uid}/items
//   return firestore()
//     .collection("previewdetails")
//     .doc(uid)
//     .collection("items")
//     .add({
//       ...previewPayload,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }

// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import uuid from "react-native-uuid";

// // Upload image ticket to Firebase Storage
// export async function uploadTicketFile(file) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;
//   const fileId = uuid.v4();

//   const ext =
//     file.name?.split(".").pop() ||
//     file.type?.split("/")[1] ||
//     "jpg";

//   const path = `users/${uid}/tickets/${fileId}.${ext}`;

//   const ref = storage().ref(path);
//   await ref.putFile(file.uri);

//   return await ref.getDownloadURL();
// }

// // Save preview details
// export async function savePreviewDetails(previewPayload) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;
// console.log("PREVIEWFIRESTORE==>",previewPayload)
//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("previewdetails")
//     .add({
//       ...previewPayload,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }



import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";

// Upload ticket
export async function uploadTicketFile(file) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;
  const fileId = uuid.v4();

  const ext =
    file.name?.split(".").pop() ||
    file.type?.split("/")[1] ||
    "jpg";

  const path = `users/${uid}/tickets/${fileId}.${ext}`;

  const ref = storage().ref(path);
  await ref.putFile(file.uri);

  return await ref.getDownloadURL();
}

// Save preview details
// export async function savePreviewDetails(previewPayload) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   console.log("🔥 PREVIEWFIRESTORE ==> ", previewPayload);

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("previewdetails")
//     .add({
//       ...previewPayload,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
//     console.log("🔥 STORED DOC ID ==>", res.id);
// }

export async function savePreviewDetails(previewPayload) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  console.log("PREVIEWFIRESTORE==>", previewPayload);

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("previewdetails")
    .add({
      ...previewPayload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}


