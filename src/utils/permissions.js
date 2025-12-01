import { Platform, PermissionsAndroid } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export async function requestAllFilesPermission() {
  try {
    if (Platform.OS === "android") {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
        {
          title: "All Files Access Needed",
          message:
            "This app requires full access to storage to save ZIP files.",
          buttonPositive: "Allow",
        }
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("All Files Access Granted");
      } else {
        console.log("All Files Access Denied");
      }
    }
  } catch (err) {
    console.warn(err);
  }
  
}


export async function openAllFilesAccessSettings() {
  if (Platform.OS === "android") {
    await Linking.sendIntent(
      "android.settings.MANAGE_APP_ALL_FILES_ACCESS_PERMISSION"
    );
  }}