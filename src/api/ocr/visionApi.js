import functions from "@react-native-firebase/functions";

export async function extractTextFromImage(base64Image) {
  // Log the input base64
  console.log("Base64 BEFORE cleanup:", base64Image.substring(0, 80));

  // Remove prefix if exists
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

  console.log("Base64 AFTER cleanup:", base64Image.substring(0, 80));

  const callable = functions().httpsCallable("extractTextFromImage");
  const response = await callable({ base64Image });
  return response.data?.text || "";
}
