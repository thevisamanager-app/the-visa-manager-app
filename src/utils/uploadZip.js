import storage from "@react-native-firebase/storage";
import RNFS from "react-native-fs";

export const uploadZipAndGetLink = async (zipPath, zipName) => {
  const exists = await RNFS.exists(zipPath);
  if (!exists) throw new Error("ZIP file not found");

  const storagePath = `adminZips/${Date.now()}_${zipName}`;
  const ref = storage().ref(storagePath);

  await ref.putFile(`file://${zipPath}`);
  const downloadUrl = await ref.getDownloadURL();

  return downloadUrl;
};
