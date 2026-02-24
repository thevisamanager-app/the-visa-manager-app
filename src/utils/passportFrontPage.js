import { extractTextFromImage } from "../api/ocr/visionApi";
import { parseMRZ } from "../api/ocr/mrzParser";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const toDisplayDate = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 6) {
    const yy = digits.slice(0, 2);
    const mm = digits.slice(2, 4);
    const dd = digits.slice(4, 6);
    const monthIndex = Number(mm) - 1;
    if (monthIndex < 0 || monthIndex > 11) return "";
    const year = Number(yy) >= 40 ? `19${yy}` : `20${yy}`;
    return `${dd} ${MONTHS[monthIndex]} ${year}`;
  }

  if (digits.length === 8 && (digits.startsWith("19") || digits.startsWith("20"))) {
    const yyyy = digits.slice(0, 4);
    const mm = digits.slice(4, 6);
    const dd = digits.slice(6, 8);
    const monthIndex = Number(mm) - 1;
    if (monthIndex < 0 || monthIndex > 11) return "";
    return `${dd} ${MONTHS[monthIndex]} ${yyyy}`;
  }

  return "";
};

const safe = (value) => String(value || "").trim();

export const buildPassportFrontPageFromParsed = (parsed = {}, phoneNumber = "") => ({
  gender: safe(parsed.gender),
  issuingCountry: safe(parsed.issuingCountry),
  lastName: safe(parsed.lastName),
  nationality: safe(parsed.nationality),
  passportNumber: safe(parsed.passportNumber),
  personalNumber: safe(parsed.personalNumber),
  phoneNumber: safe(phoneNumber),
  dateOfBirth: toDisplayDate(parsed.birthDate),
});

export const extractPassportFrontPageFromAsset = async (asset, phoneNumber = "") => {
  if (!asset?.base64) return null;
  try {
    const rawText = await extractTextFromImage(asset.base64);
    const parsed = parseMRZ(rawText);
    return buildPassportFrontPageFromParsed(parsed, phoneNumber);
  } catch (error) {
    return null;
  }
};
