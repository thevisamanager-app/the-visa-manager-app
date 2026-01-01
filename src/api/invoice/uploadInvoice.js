import storage from "@react-native-firebase/storage";

export const uploadInvoiceToFirebase = async (filePath, invoiceId, userId) => {
  const fileName = `invoice_${invoiceId}.pdf`;
  const ref = storage().ref(`users/${userId}/invoices/${fileName}`);

  await ref.putFile(filePath);
  return await ref.getDownloadURL();
};
