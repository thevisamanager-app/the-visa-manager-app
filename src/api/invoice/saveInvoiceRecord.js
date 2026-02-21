import firestore, { serverTimestamp } from "@react-native-firebase/firestore";

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
      createdAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (error) {
    const code = String(error?.code || "");
    const message = String(error?.message || "");
    const isPermissionDenied =
      code === "firestore/permission-denied" ||
      code === "permission-denied" ||
      message.includes("permission-denied");

    // Do not block invoice download if Firestore rules deny write.
    if (isPermissionDenied) {
      return { ok: false, reason: "permission-denied" };
    }
    throw error;
  }
};
