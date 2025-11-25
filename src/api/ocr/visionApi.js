import axios from "axios";

const VISION_API_KEY = "AIzaSyDfM3G4mFUg2sgEiYAZ2zzZ6qDgjV4dCgU";

export async function extractTextFromImage(base64Image) {
  // Log the input base64
  console.log("Base64 BEFORE cleanup:", base64Image.substring(0, 80));

  // Remove prefix if exists
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");

  console.log("Base64 AFTER cleanup:", base64Image.substring(0, 80));

  const body = {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: "TEXT_DETECTION" }],
      },
    ],
  };

  const response = await axios.post(
    `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`,
    body
  );

  const text = response.data.responses[0].fullTextAnnotation?.text || "";
  return text;
}
