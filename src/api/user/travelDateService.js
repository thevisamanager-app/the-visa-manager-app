// src/api/user/travelDateService.js
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";


/**
 * Save travel date info for the logged-in user.
 * 
 * travelPayload example:
 * {
 *   departureDate: "2025-11-27",    // ISO string
 *   displayDate: "27/11/2025",      // for UI
 *   mode: "fixed" | "flexible"
 * }
 */
export async function saveTravelDates(travelPayload) {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  return firestore()
    .collection("users")
    .doc(uid)
    .collection("travelDate") // matches rules you added
    .add({
      ...travelPayload,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

/**
 * Get the latest saved travel date for the logged-in user.
 */
export async function getLatestTravelDates() {
  const user = auth().currentUser;
  if (!user) throw new Error("User not logged in");

  const uid = user.uid;

  const snap = await firestore()
    .collection("users")
    .doc(uid)
    .collection("travelDate")
    .orderBy("createdAt", "desc")
    .limit(1)
    .get();

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() };
}
