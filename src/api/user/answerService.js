import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export async function saveAnswers(answers) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("answers")
    .add({
      ...answers,  // flatten answers
      createdAt: serverTimestamp(),
    });
}

export async function getAnswers() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snap = await firestore()
    .collection("users")
    .doc(uid)
    .collection("answers")
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
