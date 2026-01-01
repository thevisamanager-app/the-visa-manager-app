import RNFS from "react-native-fs";
import { Platform } from "react-native";

export const downloadZipToDevice = async (downloadUrl, zipName) => {
  const baseDir =
    Platform.OS === "android"
      ? RNFS.ExternalDirectoryPath   // ✅ SAFE on Android
      : RNFS.DocumentDirectoryPath;  // iOS

  // Ensure directory exists
  await RNFS.mkdir(baseDir);

  const destPath = `${baseDir}/${zipName}`;

  const result = await RNFS.downloadFile({
    fromUrl: downloadUrl,
    toFile: destPath,
    background: true,
    discretionary: true,
  }).promise;

  if (result.statusCode !== 200) {
    throw new Error("Failed to download ZIP");
  }

  return destPath;
};
