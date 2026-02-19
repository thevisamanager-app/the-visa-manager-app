import firestore, { serverTimestamp } from "@react-native-firebase/firestore";

export const saveInvoiceRecord = async (userId, invoiceId, downloadURL, amount) => {
  await firestore()
    .collection("users")
    .doc(userId)
    .collection("invoices")
    .doc(invoiceId)
    .set({
      id: invoiceId,
      url: downloadURL,
      amount,
      createdAt: serverTimestamp(),
    });
};
