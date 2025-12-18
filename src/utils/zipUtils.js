// import RNFS from "react-native-fs";
// import JSZip from "jszip";

// export async function downloadAndZipImages(urls, zipFileName = "documents.zip") {
//   const zip = new JSZip();

//   // download each image locally then add to zip
//   for (let i = 0; i < urls.length; i++) {
//     if (!urls[i]) continue; // skip missing URLs

//     const filePath = `${RNFS.DocumentDirectoryPath}/tmp_img_${i}.jpg`;

//     await RNFS.downloadFile({ fromUrl: urls[i], toFile: filePath }).promise;

//     const data = await RNFS.readFile(filePath, "base64");
//     zip.file(`document_${i + 1}.jpg`, data, { base64: true });
//   }

//   const content = await zip.generateAsync({ type: "base64" });
//   const zipPath = `${RNFS.DocumentDirectoryPath}/${zipFileName}`;
//   await RNFS.writeFile(zipPath, content, "base64");

//   return zipPath;
// }

// import RNFS from "react-native-fs";
// import { zip } from "react-native-zip-archive";

// export const downloadAndZipImages = async (urls = [], zipFileName) => {
//   try {
//     // 🔥 Android Downloads folder
//     const downloadDir = RNFS.DocumentDirectoryPath;


//     const zipPath = `${downloadDir}/${zipFileName}`;

//     // Temporary folder for images
//     const tempDir = `${RNFS.CachesDirectoryPath}/zip_images_${Date.now()}`;
//     await RNFS.mkdir(tempDir);

//     const validUrls = urls.filter(Boolean);

//     if (validUrls.length === 0) {
//       throw new Error("No images available to zip");
//     }

//     // Download each image
//     for (let i = 0; i < validUrls.length; i++) {
//       const imagePath = `${tempDir}/image_${i}.jpg`;

//       await RNFS.downloadFile({
//         fromUrl: validUrls[i],
//         toFile: imagePath,
//       }).promise;
//     }

//     // Zip folder
//     await zip(tempDir, zipPath);

//     // Cleanup temp files
//     await RNFS.unlink(tempDir);

//     return zipPath;
//   } catch (error) {
//     console.log("ZIP ERROR:", error);
//     throw error;
//   }
// };



import RNFS from "react-native-fs";
import { zip } from "react-native-zip-archive";

// export const downloadAndZipImages = async (urls = [], zipFileName) => {
//   try {
//     // ✅ SAFE directory
//     const baseDir = RNFS.DocumentDirectoryPath;
//     const zipPath = `${baseDir}/${zipFileName}`;

//     const tempDir = `${RNFS.CachesDirectoryPath}/zip_images_${Date.now()}`;
//     await RNFS.mkdir(tempDir);

//     const validUrls = urls.filter(Boolean);
//     if (validUrls.length === 0) {
//       throw new Error("No images available");
//     }

//     for (let i = 0; i < validUrls.length; i++) {
//       const imagePath = `${tempDir}/image_${i}.jpg`;

//       const res = await RNFS.downloadFile({
//         fromUrl: validUrls[i],
//         toFile: imagePath,
//       }).promise;

//       if (res.statusCode !== 200) {
//         throw new Error(`Failed to download image ${i + 1}`);
//       }
//     }

//     await zip(tempDir, zipPath);
//     await RNFS.unlink(tempDir);

//     return zipPath;
//   } catch (err) {
//     console.log("ZIP ERROR:", err);
//     throw err;
//   }
// };


export const downloadAndZipImages = async (files = [], zipFileName) => {
  const baseDir = RNFS.DocumentDirectoryPath;
  const zipPath = `${baseDir}/${zipFileName}`;
  const tempDir = `${RNFS.CachesDirectoryPath}/zip_${Date.now()}`;

  await RNFS.mkdir(tempDir);

  for (let i = 0; i < files.length; i++) {
    const filePath = `${tempDir}/${files[i].name}`;

    await RNFS.downloadFile({
      fromUrl: files[i].url,
      toFile: filePath,
    }).promise;
  }

  await zip(tempDir, zipPath);
  await RNFS.unlink(tempDir);

  return zipPath;
};

