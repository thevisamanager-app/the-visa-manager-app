import RNFS from "react-native-fs";
import FaceDetector from "@react-native-ml-kit/face-detection";
import { extractTextFromImage } from "../api/ocr/visionApi";
import { parseMRZ } from "../api/ocr/mrzParser";

const normalizeUri = (uri) => {
  if (!uri) return null;
  return uri.startsWith("file://") ? uri.replace("file://", "") : uri;
};

const readImageAsBase64 = async (asset) => {
  if (asset?.base64) return asset.base64;
  const uri = asset?.uri || asset?.fileCopyUri || asset?.localUri;
  if (!uri) return null;

  const normalized = normalizeUri(uri);
  if (normalized && !normalized.startsWith("content://")) {
    return RNFS.readFile(normalized, "base64");
  }

  try {
    const stat = await RNFS.stat(uri);
    const originalPath = stat?.originalFilepath || stat?.path;
    if (originalPath && !originalPath.startsWith("content://")) {
      return RNFS.readFile(normalizeUri(originalPath), "base64");
    }
  } catch (_e) {}

  return null;
};

const extractTextForValidation = async (asset) => {
  try {
    const base64 = await readImageAsBase64(asset);
    if (!base64) return "";
    const text = await extractTextFromImage(base64);
    return String(text || "");
  } catch (_e) {
    return "";
  }
};

const hasAnyKeyword = (text, keywords) => {
  const lower = String(text || "").toLowerCase();
  return keywords.some((k) => lower.includes(k));
};

const validatePhoto = async (asset) => {
  try {
    const uri = asset?.uri || asset?.fileCopyUri || asset?.localUri;
    if (!uri) {
      return { ok: false, message: "Unable to read image file." };
    }
    const mlUri = uri.startsWith("file://") ? uri : `file://${uri}`;
    const faces = await FaceDetector.detect(mlUri, {
      performanceMode: "accurate",
      landmarkMode: "none",
      contourMode: "none",
    });

    if (!faces || faces.length === 0) {
      return {
        ok: false,
        message:
          "Passport size photo must contain one clear human face (animal photos are not allowed).",
      };
    }
    if (faces.length > 1) {
      return { ok: false, message: "Please upload a photo with only one person." };
    }
    return { ok: true };
  } catch (_e) {
    return {
      ok: false,
      message: "Face validation failed. Please upload a clear passport size photo.",
    };
  }
};

const validatePassportFront = async (asset) => {
  const text = await extractTextForValidation(asset);
  if (!text || text.length < 20) {
    return { ok: false, message: "Please upload a clear Passport Front page image." };
  }

  const parsed = parseMRZ(text);
  if (parsed?.passportNumber) return { ok: true };

  const mrzLike = /[A-Z0-9<]{20,}/.test(text);
  if (!mrzLike) {
    return {
      ok: false,
      message: "Passport Front page is invalid. Please upload passport front only.",
    };
  }
  return { ok: true };
};

const validatePassportBack = async (asset) => {
  const text = await extractTextForValidation(asset);
  const ok =
    text.length >= 25 &&
    hasAnyKeyword(text, [
      "passport",
      "nationality",
      "birth",
      "sex",
      "address",
      "authority",
      "signature",
    ]);
  if (!ok) {
    return {
      ok: false,
      message: "Please upload a clear Passport Back/Last page image.",
    };
  }
  return { ok: true };
};

const validateTicket = async (asset) => {
  const text = await extractTextForValidation(asset);
  const ok =
    text.length >= 25 &&
    hasAnyKeyword(text, [
      "ticket",
      "booking",
      "flight",
      "pnr",
      "airline",
      "departure",
      "arrival",
      "itinerary",
      "e-ticket",
      "passenger",
    ]);
  if (!ok) {
    return {
      ok: false,
      message: "Please upload a valid air ticket image (not random/animal photo).",
    };
  }
  return { ok: true };
};

export async function validatePickedDocument(key, asset) {
  if (!asset) return { ok: false, message: "No file selected." };

  if (key === "passportFront") return validatePassportFront(asset);
  if (key === "passportBack") return validatePassportBack(asset);
  if (key === "photo") return validatePhoto(asset);
  if (key === "ticket" || key === "airTicket" || key === "flightTicket") {
    return validateTicket(asset);
  }

  return { ok: true };
}

