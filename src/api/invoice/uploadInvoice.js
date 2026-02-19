import {
  getStorage,
  ref as storageRef,
  putFile as storagePutFile,
  getDownloadURL as storageGetDownloadURL,
} from "@react-native-firebase/storage/lib/modular";

const normalizeUploadPath = (path = "") => {
  if (!path) return "";
  return path.startsWith("file://") ? path.replace("file://", "") : path;
};

export const uploadInvoiceToFirebase = async (filePath, invoiceId, userId) => {
  const fileName = `invoice_${invoiceId}.pdf`;
  const storage = getStorage();
  const fileRef = storageRef(storage, `users/${userId}/invoices/${fileName}`);
  const uploadPath = normalizeUploadPath(filePath);

  await storagePutFile(fileRef, uploadPath);
  return storageGetDownloadURL(fileRef);
};
