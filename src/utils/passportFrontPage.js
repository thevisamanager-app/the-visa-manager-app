import { extractTextFromImage } from "../api/ocr/visionApi";
import { parseMRZ } from "../api/ocr/mrzParser";

const safe = (value) => String(value || "").trim();

export const buildPassportFrontPageFromParsed = (parsed = {}) => {
  const firstName = safe(parsed.firstName || parsed.givenName);

  return {
    gender: safe(parsed.gender),
    issuingCountry: safe(parsed.issuingCountry),
    lastName: safe(parsed.lastName),
    firstName,
    nationality: safe(parsed.nationality),
    passportNumber: safe(parsed.passportNumber),
  };
};

export const extractPassportFrontPageFromAsset = async (asset) => {
  if (!asset?.base64) return null;
  try {
    const rawText = await extractTextFromImage(asset.base64);
    const parsed = parseMRZ(rawText);
    return buildPassportFrontPageFromParsed(parsed);
  } catch (error) {
    return null;
  }
};
