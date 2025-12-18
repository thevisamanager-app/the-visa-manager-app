import RNFS from "react-native-fs";
import { Platform } from "react-native";
import { Share } from "react-native-share";


/**
 * Android-safe "Save As" for files
 */
export const saveZipToDevice = async (zipPath, zipName) => {
  if (Platform.OS === "ios") {
    // iOS: Share sheet works as Save
    await Share.open({
      urls: [`file://${zipPath}`],
      type: "application/zip",
      failOnCancel: false,
    });
    return;
  }

  // ANDROID — use SAF
  const dest = await RNFS.pickDirectory();

  if (!dest?.uri) {
    throw new Error("No directory selected");
  }

  const destPath = `${dest.uri}/${zipName}`;

  await RNFS.copyFile(zipPath, destPath);
};
