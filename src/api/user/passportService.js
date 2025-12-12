// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";
// import storage from "@react-native-firebase/storage";
// import uuid from "react-native-uuid";

// // Upload a passport image (front/back) to Storage and return its URL
// export async function uploadPassportImage(file, side = "front") {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;
//   const fileId = uuid.v4();

//   const ext =
//     file.fileName?.split(".").pop() ||
//     file.name?.split(".").pop() ||
//     file.type?.split("/")[1] ||
//     "jpg";

//   const path = `users/${uid}/passport/${side}_${fileId}.${ext}`;

//   const ref = storage().ref(path);
//   await ref.putFile(file.uri);

//   const url = await ref.getDownloadURL();
//   return url;
// }

// // Save passport data (MRZ + image URLs) in Firestore
// export async function savePassportData(passportPayload) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   return firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")

//     .add({
//       ...passportPayload,
//       userId: uid,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }

// // Get the most recent passport doc (you were already using something like this)
// export async function getPassportData() {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   const snap = await firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .orderBy("createdAt", "desc")
//     .limit(1)
//     .get();

//   if (snap.empty) return null;

//   const doc = snap.docs[0];
//   return { id: doc.id, ...doc.data() };
// }

// export async function getAllPassportData() {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   const snap = await firestore()
//     .collection("users")
//     .doc(uid)
//     .collection("passportData")
//     .orderBy("createdAt", "desc")
//     .get();

//   if (snap.empty) return [];

//   return snap.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }


// // export async function getAllPassportDataAdmin() {
// //   const usersSnap = await firestore().collection("users").get();

// //   const allPassports = [];

// //   for (const userDoc of usersSnap.docs) {
// //     const userId = userDoc.id;

// //     const passportSnap = await firestore()
// //       .collection("users")
// //       .doc(userId)
// //       .collection("passportData")
// //       .orderBy("createdAt", "desc")
// //       .get();

// //     passportSnap.forEach((p) => {
// //       allPassports.push({
// //         id: p.id,
// //         userId: userId,        // 🔥 IMPORTANT, for admin actions
// //         ...p.data(),
// //       });
// //     });
// //   }

// //   return allPassports;
// // }


// // export const getAllPassportDataAdmin = async () => {
// //   const usersSnap = await firestore().collection("users").get();

// //   let allPassports = [];

// //   for (const userDoc of usersSnap.docs) {
// //     const userId = userDoc.id;

// //     const passportSnap = await firestore()
// //       .collection("users")
// //       .doc(userId)
// //       .collection("passportData")
// //       .get();

// //     passportSnap.forEach((doc) => {
// //       allPassports.push({
// //         id: doc.id,
// //         userId,                 // 🔥 IMPORTANT
// //         ...doc.data(),
// //       });
// //     });
// //   }

// //   return allPassports;
// // };




// export const getAllPassportDataAdmin = async () => {
//   const snapshot = await firestore()
//     .collectionGroup("passportData") // 🔥 KEY LINE
//     .get();

//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//     userId: doc.ref.parent.parent.id, // 👈 extract userId
//   }));
// };


// // export const getAllPassportDataAdmin = async () => {
// //   const usersSnap = await firestore().collection("users").get();

// //   console.log("ALL USERS COUNT:", usersSnap.size);

// //   let allPassports = [];

// //   for (const userDoc of usersSnap.docs) {
// //     const userId = userDoc.id;

// //     const passportSnap = await firestore()
// //       .collection("users")
// //       .doc(userId)
// //       .collection("passportData")
// //       .get();

// //     console.log(
// //       `USER ${userId} PASSPORT COUNT:`,
// //       passportSnap.size
// //     );

// //     passportSnap.forEach((doc) => {
// //       allPassports.push({
// //         id: doc.id,
// //         userId, // 🔥 REQUIRED
// //         ...doc.data(),
// //       });
// //     });
// //   }

// //   console.log("TOTAL PASSPORTS:", allPassports);
// //   return allPassports;
// // };




import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import uuid from "react-native-uuid";

/* =====================================================
   UPLOAD PASSPORT IMAGE (FRONT / BACK)
===================================================== */
export async function uploadPassportImage(file, side = "front") {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;
  const fileId = uuid.v4();

  const ext =
    file.fileName?.split(".").pop() ||
    file.name?.split(".").pop() ||
    file.type?.split("/")[1] ||
    "jpg";

  const path = `users/${uid}/passport/${side}_${fileId}.${ext}`;

  const ref = storage().ref(path);
  await ref.putFile(file.uri);

  const url = await ref.getDownloadURL();
  return url;
}

/* =====================================================
   SAVE PASSPORT DATA (USER)
===================================================== */
export async function savePassportData(passportPayload) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .add({
      ...passportPayload,
      userId: uid, // keep for convenience
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

/* =====================================================
   GET LATEST PASSPORT (USER)
===================================================== */
export async function getPassportData() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snap = await firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}

/* =====================================================
   GET ALL PASSPORTS (USER – history)
===================================================== */
export async function getAllPassportData() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snap = await firestore()
    .collection("users")
    .doc(uid)
    .collection("passportData")
    .orderBy("createdAt", "desc")
    .get();

  if (snap.empty) return [];

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* =====================================================
   🔥 ADMIN: GET ALL USERS PASSPORT DATA
===================================================== */
export const getAllPassportDataAdmin = async () => {
  const snapshot = await firestore()
    .collectionGroup("passportData") // 🔥 CRITICAL
    .get();

  return snapshot.docs.map((doc) => {
    const parentUserRef = doc.ref.parent.parent;

    return {
      id: doc.id,
      ...doc.data(),
      userId: parentUserRef?.id || null, // 🔥 SAFE extraction
    };
  });
};
