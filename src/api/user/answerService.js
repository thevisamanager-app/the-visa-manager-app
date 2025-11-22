// // // src/api/user/answerService.js
// // import { firestore, auth } from '../../services/firebase';

// // export async function saveAnswers(answers) {
// //   const user = auth().currentUser;
// //   if (!user) throw new Error('User not logged in');

// //   return firestore()
// //     .collection('users')
// //     .doc(user.uid)
// //     .collection('answers')
// //     .add({
// //       answers,
// //       createdAt: new Date(),
// //     });
// // }

// // export async function getAnswers() {
// //   const user = auth().currentUser;
// //   if (!user) throw new Error('User not logged in');

// //   const snap = await firestore()
// //     .collection('users')
// //     .doc(user.uid)
// //     .collection('answers')
// //     .orderBy('createdAt', 'desc')
// //     .get();

// //   return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // }


// // import firestore from "@react-native-firebase/firestore";
// // import auth from "@react-native-firebase/auth";

// // export async function saveAnswers(answers) {
// //   const user = auth().currentUser;
// //   if (!user) throw new Error("User not logged in");

// //   return firestore()
// //     .collection("users")
// //     .doc(user.uid)
// //     .collection("answers")
// //     .add({
// //       answers,
// //       createdAt: firestore.FieldValue.serverTimestamp(),
// //     });
// // }

// // export async function getAnswers() {
// //   const user = auth().currentUser;
// //   if (!user) throw new Error("User not logged in");

// //   const snap = await firestore()
// //     .collection("users")
// //     .doc(user.uid)
// //     .collection("answers")
// //     .orderBy("createdAt", "desc")
// //     .get();

// //   return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// // }


import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export async function saveAnswers(answers) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const userDetails = {
    uid: user.uid,
    phone: user.phoneNumber ?? null,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
  };

  return firestore()
    .collection("users")
    .doc(user.uid)
    .collection("answers")
    .add({
      user: userDetails,
      answers,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

export async function getAnswers() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const snap = await firestore()
    .collection("users")
    .doc(user.uid)
    .collection("answers")
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
// import firestore from "@react-native-firebase/firestore";
// import auth from "@react-native-firebase/auth";

// // Save user's answers (aligned with Firestore rules)
// export async function saveAnswers(answers) {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   const userDetails = {
//     uid,
//     phone: user.phoneNumber ?? null,
//     email: user.email ?? null,
//     displayName: user.displayName ?? null,
//   };

//   return firestore()
//     .collection("answers")    // ROOT collection
//     .doc(uid)                 // USER document
//     .collection("items")      // SUB collection for each submission
//     .add({
//       user: userDetails,
//       answers,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
// }

// // Get answers for logged-in user
// export async function getAnswers() {
//   const user = auth().currentUser;
//   if (!user) throw new Error("User not logged in");

//   const uid = user.uid;

//   const snap = await firestore()
//     .collection("answers")
//     .doc(uid)
//     .collection("items")
//     .orderBy("createdAt", "desc")
//     .get();

//   return snap.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// }
