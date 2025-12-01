import RNFS from "react-native-fs";
import JSZip from "jszip";

export async function downloadAndZipImages(urls, zipFileName = "documents.zip") {
  const zip = new JSZip();

  // download each image locally then add to zip
  for (let i = 0; i < urls.length; i++) {
    if (!urls[i]) continue; // skip missing URLs

    const filePath = `${RNFS.DocumentDirectoryPath}/tmp_img_${i}.jpg`;

    await RNFS.downloadFile({ fromUrl: urls[i], toFile: filePath }).promise;

    const data = await RNFS.readFile(filePath, "base64");
    zip.file(`document_${i + 1}.jpg`, data, { base64: true });
  }

  const content = await zip.generateAsync({ type: "base64" });
  const zipPath = `${RNFS.DocumentDirectoryPath}/${zipFileName}`;
  await RNFS.writeFile(zipPath, content, "base64");

  return zipPath;
}
