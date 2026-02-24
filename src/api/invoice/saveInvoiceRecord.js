import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export const saveInvoiceRecord = async (userId, invoiceId, downloadURL, amount) => {
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, userId);
  const invoicesRef = collection(userRef, "invoices");
  const invoiceRef = doc(invoicesRef, invoiceId);

  try {
    await setDoc(invoiceRef, {
      id: invoiceId,
      url: downloadURL,
      amount,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to save invoice record:", error);
    throw error;
  }
};
