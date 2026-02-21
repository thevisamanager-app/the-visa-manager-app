import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { launchImageLibrary } from "react-native-image-picker";
import {
  pick,
  types,
  isErrorWithCode,
  errorCodes,
  keepLocalCopy,
} from "@react-native-documents/picker";
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import { WebView } from "react-native-webview";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import ScreenWrapper from "../../components/ScreenWrapper";
import { COUNTRY_APPLY_CONFIG } from "../../config/countryApplyConfig";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passport-photo.png";

const ORANGE = "#FF5C00";

/* ================= Traveller Factory ================= */

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    hotelDetails: "",
  },
  documents: {
    bankPdf: null,
    passportFront: null,
    passportBack: null,
    photo: null,
  },
  frontPageData: null,
});

export default function SingaporeApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([
    { isPrimary: true, ...createTraveller() },
  ]);

  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [isCoTravellerModalOpen, setIsCoTravellerModalOpen] = useState(false);
  const [coTravellerDraft, setCoTravellerDraft] = useState(createTraveller());
  const [coTravellerEditIndex, setCoTravellerEditIndex] = useState(null);
  const [activeSignSample, setActiveSignSample] = useState(null);
  const [samplePreviewFailed, setSamplePreviewFailed] = useState(false);
  const [formPreviewError, setFormPreviewError] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState(null);
  const singaporeForms = COUNTRY_APPLY_CONFIG?.Singapore?.forms || {};

  /* ================= Helpers ================= */

  const formatDate = (date) => {
    if (!date || typeof date !== "string" || !date.includes("-")) return "";
    const [y, m, d] = date.split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
  };
  const toDDMMYY = (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (digits.length === 6) {
      const yy = digits.slice(0, 2);
      const mm = digits.slice(2, 4);
      const dd = digits.slice(4, 6);
      const monthIndex = Number(mm) - 1;
      if (monthIndex < 0 || monthIndex > 11) return "";
      const fullYear = Number(yy) >= 40 ? `19${yy}` : `20${yy}`;
      return `${dd} ${months[monthIndex]} ${fullYear}`;
    }

    if (digits.length === 8 && (digits.startsWith("19") || digits.startsWith("20"))) {
      const yyyy = digits.slice(0, 4);
      const mm = digits.slice(4, 6);
      const dd = digits.slice(6, 8);
      const monthIndex = Number(mm) - 1;
      if (monthIndex < 0 || monthIndex > 11) return "";
      return `${dd} ${months[monthIndex]} ${yyyy}`;
    }

    return "";
  };

  const getPdfName = (file) => {
    if (!file) return "";
    if (file.name) return file.name;
    if (file.fileName) return file.fileName;
    if (file.uri) return file.uri.split("/").pop() || "PDF Uploaded";
    return "PDF Uploaded";
  };

  const getAssetPreviewUri = (assetPath) => {
    if (!assetPath || Platform.OS !== "android") return null;
    const normalized = assetPath.replace(/^\/+/, "");
    return `file:///android_asset/${normalized}`;
  };

  const getFormPreviewUri = (form) => {
    if (!form) return null;
    // WebView can't reliably render local asset PDFs on many Android devices.
    // Use WebView preview only for remote URLs.
    if (form.url) return form.url;
    return null;
  };

  const getPreviewImageUri = (assetPath) => {
    if (!assetPath || Platform.OS !== "android") return null;
    return `file:///android_asset/${assetPath.replace(/^\/+/, "")}`;
  };

  const openSignSample = (form) => {
    setSamplePreviewFailed(false);
    setActiveSignSample(form);
  };

  const openSignatureReference = async () => {
    const signatureRefAssetPath =
      singaporeForms.applicationFormSignatureRefAssetPath ||
      "forms/Form14a-signature-reference.pdf";

    await downloadDocument({
      assetPath: signatureRefAssetPath,
      label: "Signature Reference",
      fileName: "Form14a-signature-reference.pdf",
    });
  };

  /* ================= Image Picker ================= */

  const pickImage = async (key, target = "main") => {
    try {
      const isFrontPage = key === "passportFront";
      const res = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
      });

      if (!res.assets?.[0]) return;

      if (target === "co") {
        setCoTravellerDraft((prev) => ({
          ...prev,
          documents: {
            ...prev.documents,
            [key]: res.assets[0],
          },
          ...(isFrontPage ? { frontPageData } : {}),
        }));
        return;
      }

      const updated = [...travellers];
      updated[0].documents[key] = res.assets[0];
      setTravellers(updated);
    } catch (err) {
      Alert.alert("Error", err?.message || "Unable to pick image");
    }
  };

  const extractPickedFile = (result) => {
    if (!result) return null;
    if (Array.isArray(result)) return result[0] || null;
    if (result?.assets && Array.isArray(result.assets)) return result.assets[0] || null;
    return result;
  };


  const getFileExtension = (file, fallbackExt = "jpg") => {
    const fromName = file?.fileName || file?.name || "";
    const nameExt = fromName.includes(".") ? fromName.split(".").pop() : "";
    if (nameExt) return nameExt.toLowerCase();

    const mime = file?.type || "";
    const mimeExt = mime.includes("/") ? mime.split("/").pop() : "";
    if (mimeExt) return mimeExt.toLowerCase();

    return fallbackExt;
  };

  const normalizeFileUriForUpload = (uri) => {
    if (!uri) return null;
    if (uri.startsWith("file://")) return uri.replace("file://", "");
    return uri;
  };

  const resolveUploadUri = async (file, {
    prefix = "upload",
    fallbackExt = "jpg",
  } = {}) => {
    const uri = file?.uri || file?.fileCopyUri || file?.localUri || null;
    if (!uri) return null;

    if (Platform.OS === "android" && uri.startsWith("content://")) {
      try {
        // RNFS can often resolve MediaStore content:// URIs to a direct file path.
        const stat = await RNFS.stat(uri);
        const originalPath = stat?.originalFilepath || stat?.path;
        if (
          originalPath &&
          typeof originalPath === "string" &&
          !originalPath.startsWith("content://")
        ) {
          return normalizeFileUriForUpload(originalPath);
        }
      } catch (statError) {
        console.log("resolveUploadUri stat fallback:", statError);
      }

      const ext = getFileExtension(file, fallbackExt);
      const targetPath = `${RNFS.CachesDirectoryPath}/${prefix}-${Date.now()}-${Math.floor(
        Math.random() * 100000
      )}.${ext}`;
      await RNFS.copyFile(uri, targetPath);
      return targetPath;
    }

    return normalizeFileUriForUpload(uri);
  };  const ensureLocalPdfFile = async (file) => {
    if (!file?.uri) return file;
    if (Platform.OS !== "android") return file;
    if (!file.uri.startsWith("content://")) return file;

    const sourceName = file.name || file.fileName || `bank-${Date.now()}.pdf`;

    const copied = await keepLocalCopy({
      destination: "cachesDirectory",
      files: [{ uri: file.uri, fileName: sourceName }],
    });

    const copiedFile = copied?.[0];
    if (!copiedFile || copiedFile.status !== "success" || !copiedFile.localUri) {
      throw new Error(
        copiedFile?.copyError ||
          "Unable to access selected PDF. Please reselect the file."
      );
    }

    return {
      ...file,
      uri: copiedFile.localUri,
      fileCopyUri: copiedFile.localUri,
      localUri: copiedFile.localUri,
    };
  };

  /* ================= PDF Picker ================= */

  const pickPdf = async (target = "main") => {
    try {
      const result = await pick({
        type: [types.pdf],
        allowMultiSelection: false,
      });
      const pickedFile = extractPickedFile(result);
      if (!pickedFile) return;
      const file = await ensureLocalPdfFile(pickedFile);
      if (!file) return;

      if (target === "co") {
        setCoTravellerDraft((prev) => ({
          ...prev,
          documents: {
            ...prev.documents,
            bankPdf: file,
          },
        }));
        return;
      }

      const updated = [...travellers];
      updated[0].documents.bankPdf = file;
      setTravellers(updated);
    } catch (err) {
      if (
        isErrorWithCode(err) &&
        err.code === errorCodes.OPERATION_CANCELED
      ) {
        return;
      }
      Alert.alert("Error", err?.message || "Unable to pick PDF");
    }
  };

  /* ================= Validation ================= */

  const validate = (t, travellerLabel = "Traveller") => {
    const { form, documents } = t;

    if (!form.travelDate || !form.phone || !form.email || !form.hotelDetails) {
      Alert.alert("Missing Info", `${travellerLabel}: Please fill all required fields.`);
      return false;
    }

    if (
      !documents.bankPdf ||
      !documents.passportFront ||
      !documents.passportBack ||
      !documents.photo
    ) {
      Alert.alert(
        "Missing Documents",
        `${travellerLabel}: Please upload all required documents.`
      );
      return false;
    }

    return true;
  };

  /* ================= Upload to Firebase Storage ================= */

  const getUploadUri = (file) => {
    if (!file) return null;
    const uri = file.uri || file.fileCopyUri || file.localUri || null;
    return normalizeFileUriForUpload(uri);
  };

  const uploadFile = async (uri, path) => {
    if (!uri) {
      throw new Error("Selected file URI is missing.");
    }
    const fileRef = storage().ref(path);
    await fileRef.putFile(uri);
    return await fileRef.getDownloadURL();
  };

  const downloadDocument = async ({ url, assetPath, label, fileName }) => {
    if (!assetPath && !url) {
      Alert.alert("Document Missing", `${label} source is not configured.`);
      return;
    }

    try {
      setDownloadingDoc(fileName);
      const safeFileName = fileName.replace(/\s+/g, "-");
      const targetPath = `${RNFS.DocumentDirectoryPath}/${safeFileName}`;

      if (assetPath) {
        if (Platform.OS !== "android") {
          Alert.alert(
            "Not Supported",
            "Local asset PDF open is currently configured for Android only."
          );
          return;
        }

        // Try multiple asset path variants to avoid crashes from minor name/path mismatches.
        const variants = [
          assetPath,
          assetPath.replace(/^forms\//, ""),
          `forms/${fileName}`,
          fileName,
          `forms/${fileName.replace(/-/g, " ")}`,
          fileName.replace(/-/g, " "),
        ].filter(Boolean);

        let copied = false;
        let copyError = null;

        for (const candidate of variants) {
          try {
            if (typeof RNFS.existsAssets === "function") {
              const assetExists = await RNFS.existsAssets(candidate);
              if (!assetExists) {
                continue;
              }
            }
            await RNFS.copyFileAssets(candidate, targetPath);
            copied = true;
            break;
          } catch (err) {
            copyError = err;
          }
        }

        if (!copied) {
          throw new Error(
            `Asset not found. Place file in android/app/src/main/assets/forms and ensure exact name match. Tried: ${variants.join(
              ", "
            )}. ${copyError?.message || ""}`
          );
        }
      } else if (url) {
        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: targetPath,
        }).promise;

        if (result.statusCode !== 200) {
          throw new Error(`Download failed with status ${result.statusCode}`);
        }
      }

      const existsAfterCopy = await RNFS.exists(targetPath);
      if (!existsAfterCopy) {
        throw new Error(`File was not created at ${targetPath}`);
      }

      await FileViewer.open(targetPath, { showOpenWithDialog: true });
      return true;
    } catch (error) {
      console.log("Download error:", error);
      Alert.alert(
        "Open Failed",
        error?.message ||
          `Unable to open ${label}. Ensure PDF exists and a PDF viewer app is installed.`
      );
      return false;
    } finally {
      setDownloadingDoc(null);
    }
  };

  const handleFormDownload = async (form) => {
    await downloadDocument({
      url: form.url,
      assetPath: form.assetPath,
      label: form.label,
      fileName: form.fileName,
    });
  };

  /* ================= Submit ================= */

  const submit = async () => {
    const user = auth().currentUser;

    if (!user) {
      Alert.alert("Login Required", "Please login first.");
      return;
    }

    const applicationId = `singapore_${Date.now()}`;
    const basePath = `applications/${user.uid}/${applicationId}`;
    const applicationRef = firestore()
      .collection("users")
      .doc(user.uid)
      .collection("passportData")
      .doc(applicationId);

    try {
      for (let i = 0; i < travellers.length; i += 1) {
        const traveller = travellers[i];
        const travellerLabel = traveller.isPrimary
          ? "Main Traveller"
          : `Co-Passenger ${i}`;
        if (!validate(traveller, travellerLabel)) return;
      }

      setLoading(true);

      await applicationRef.set({
        country: "Singapore",
        status: "processing",
        createdAt: firestore.FieldValue.serverTimestamp(),
        totalTravellers: travellers.length,
        travellers: travellers.map((t) => ({
          isPrimary: t.isPrimary,
          form: { ...t.form },
        })),
      });

      setLoading(false);

      navigation.navigate("CheckoutScreen", {
        country: "Singapore",
        applicationId,
        totalTravellers: travellers.length,
        travellers: travellers.map((t) => ({ isPrimary: t.isPrimary, form: t.form })),
        coTravellers: travellers
          .slice(1)
          .map((t) => ({ isPrimary: t.isPrimary, form: t.form })),
      });

      (async () => {
        try {
          const payloadTravellers = await Promise.all(
            travellers.map(async (traveller, i) => {
              const travellerLabel = traveller.isPrimary
                ? "Main Traveller"
                : `Co-Passenger ${i}`;

              const [bankUri, passportFrontUri, passportBackUri, photoUri] =
                await Promise.all([
                  resolveUploadUri(traveller.documents.bankPdf, {
                    prefix: `bank-${i + 1}`,
                    fallbackExt: "pdf",
                  }),
                  resolveUploadUri(traveller.documents.passportFront, {
                    prefix: `passport-front-${i + 1}`,
                    fallbackExt: "jpg",
                  }),
                  resolveUploadUri(traveller.documents.passportBack, {
                    prefix: `passport-back-${i + 1}`,
                    fallbackExt: "jpg",
                  }),
                  resolveUploadUri(traveller.documents.photo, {
                    prefix: `photo-${i + 1}`,
                    fallbackExt: "jpg",
                  }),
                ]);

              if (!bankUri || !passportFrontUri || !passportBackUri || !photoUri) {
                throw new Error(
                  `${travellerLabel}: One or more selected files could not be read. Please re-upload the documents.`
                );
              }

              const [bankUrl, passportFrontUrl, passportBackUrl, photoUrl] =
                await Promise.all([
                  uploadFile(bankUri, `${basePath}/traveller_${i + 1}/bank.pdf`),
                  uploadFile(
                    passportFrontUri,
                    `${basePath}/traveller_${i + 1}/passport_front.jpg`
                  ),
                  uploadFile(
                    passportBackUri,
                    `${basePath}/traveller_${i + 1}/passport_back.jpg`
                  ),
                  uploadFile(photoUri, `${basePath}/traveller_${i + 1}/photo.jpg`),
                ]);

              return {
                isPrimary: traveller.isPrimary,
                form: { ...traveller.form },
                documents: {
                  bankPdf: bankUrl,
                  passportFront: passportFrontUrl,
                  passportBack: passportBackUrl,
                  photo: photoUrl,
                },
                frontPageData: traveller.frontPageData || null,
              };
            })
          );

          await applicationRef.set(
            {
              status: "submitted",
              submittedAt: firestore.FieldValue.serverTimestamp(),
              travellers: payloadTravellers,
              totalTravellers: payloadTravellers.length,
            },
            { merge: true }
          );
        } catch (error) {
          console.log("Background upload failed:", error);
          await applicationRef.set(
            {
              status: "failed",
              errorMessage: error?.message || "Unknown submit error",
              failedAt: firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
        }
      })();
    } catch (error) {
      console.log("Submit Error:", error);
      Alert.alert("Error", error?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  const traveller = travellers[0];
  const coTravellers = travellers.slice(1);

  const openCoTravellerModal = (travellerIndex = null) => {
    const existing =
      travellerIndex !== null ? travellers[travellerIndex] : createTraveller();
    setCoTravellerDraft({
      ...existing,
      form: { ...existing.form },
      documents: { ...existing.documents },
    });
    setCoTravellerEditIndex(travellerIndex);
    setIsCoTravellerModalOpen(true);
  };

  const saveCoTraveller = () => {
    setTravellers((prev) => {
      if (coTravellerEditIndex !== null) {
        const updated = [...prev];
        updated[coTravellerEditIndex] = {
          isPrimary: false,
          form: { ...coTravellerDraft.form },
          documents: { ...coTravellerDraft.documents },
        };
        return updated;
      }

      return [
        ...prev,
        {
          isPrimary: false,
          form: { ...coTravellerDraft.form },
          documents: { ...coTravellerDraft.documents },
        },
      ];
    });
    setCoTravellerEditIndex(null);
    setIsCoTravellerModalOpen(false);
  };

  const removeCoTraveller = (travellerIndex) => {
    setTravellers((prev) => prev.filter((_, idx) => idx !== travellerIndex));
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Singapore Visa Application
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}>
            <Ionicons name="home-outline" size={24} color={ORANGE} />
          </TouchableOpacity>
        </View>

        {/* Travel Date */}
        <TouchableOpacity style={styles.inputLarge} onPress={() => setShowCalendarFor("main")}>
          <Text
            style={
              traveller.form.travelDate
                ? styles.inputText
                : styles.inputPlaceholder
            }
          >
            {traveller.form.travelDate
              ? formatDate(traveller.form.travelDate)
              : "Select Travel Date"}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Mobile Number"
          style={styles.inputLarge}
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
          value={traveller.form.phone}
          onChangeText={(v) => {
            const updated = [...travellers];
            updated[0].form.phone = v;
            setTravellers(updated);
          }}
        />

        <TextInput
          placeholder="Email ID"
          style={styles.inputLarge}
          placeholderTextColor="#9CA3AF"
          value={traveller.form.email}
          onChangeText={(v) => {
            const updated = [...travellers];
            updated[0].form.email = v;
            setTravellers(updated);
          }}
        />

        <TextInput
          placeholder="Hotel Details"
          style={styles.inputLarge}
          multiline
          placeholderTextColor="#9CA3AF"
          value={traveller.form.hotelDetails}
          onChangeText={(v) => {
            const updated = [...travellers];
            updated[0].form.hotelDetails = v;
            setTravellers(updated);
          }}
        />

        {/* Bank PDF */}
        <View style={styles.uploadCard}>
          <Text style={styles.uploadCardTitle}>Upload Bank Details (PDF) *</Text>
          <TouchableOpacity style={styles.uploadCardBtn} onPress={pickPdf}>
            <Text style={styles.uploadCardBtnText}>
              {traveller.documents.bankPdf ? "Replace PDF" : "Upload"}
            </Text>
          </TouchableOpacity>
          {traveller.documents.bankPdf ? (
            <Text style={styles.pdfUploadedText}>
              PDF Uploaded: {getPdfName(traveller.documents.bankPdf)}
            </Text>
          ) : null}
        </View>

        {/* Passport + Photo */}
        {[
          { key: "passportFront", label: "Passport Front", sample: PassportFrontSample },
          { key: "passportBack", label: "Passport Back", sample: PassportBackSample },
          { key: "photo", label: "Applicant Photo", sample: PassportPhotoSample },
        ].map(({ key, label, sample }) => (
          <View key={key} style={styles.uploadCard}>
            <Text style={styles.uploadCardTitle}>{label} *</Text>

            <View style={styles.uploadSampleWrap}>
              {!traveller.documents[key] ? (
                <Image source={sample} style={styles.uploadSample} resizeMode="contain" />
              ) : (
                <Image
                  source={{ uri: traveller.documents[key].uri }}
                  style={styles.uploadSample}
                  resizeMode="cover"
                />
              )}
            </View>

            <TouchableOpacity
              style={styles.uploadCardBtn}
              onPress={() => pickImage(key)}
            >
              <Text style={styles.uploadCardBtnText}>
                {traveller.documents[key] ? "Replace" : "Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}


        {/* Forms */}
        <View style={styles.formsSection}>
          <View style={styles.formsRow}>
            {[
              {
                key: "form14a",
                title: "Download Application Form",
                label: "Application Form",
                fileName: "Form14a.pdf",
                assetPath: singaporeForms.applicationFormAssetPath,
                previewImageAssetPath:
                  singaporeForms.applicationFormPreviewImageAssetPath,
                url: singaporeForms.applicationFormUrl,
              },
              {
                key: "authority",
                title: "Download Authority Letter",
                label: "Authority Letter",
                fileName: "Authority-letter.pdf",
                assetPath: singaporeForms.authorityLetterAssetPath,
                previewImageAssetPath:
                  singaporeForms.authorityLetterPreviewImageAssetPath,
                url: singaporeForms.authorityLetterUrl,
              },
            ].map((form) => (
              <View key={form.key} style={styles.formCard}>
                <View style={styles.formHeader}>
                  <Text style={styles.formTitle}>{form.title}</Text>
                  <Ionicons name="information-circle" size={18} color="#4F46E5" />
                </View>

                <View style={styles.formPreview}>
                  {!formPreviewError[form.key] &&
                  getPreviewImageUri(form.previewImageAssetPath) ? (
                    <TouchableOpacity
                      style={styles.formPreviewTouch}
                      onPress={() =>
                        form.key === "form14a"
                          ? openSignatureReference()
                          : openSignSample(form)
                      }
                      activeOpacity={0.85}
                    >
                      <Image
                        source={{ uri: getPreviewImageUri(form.previewImageAssetPath) }}
                        style={styles.formPreviewImage}
                        resizeMode="contain"
                        onError={() =>
                          setFormPreviewError((prev) => ({ ...prev, [form.key]: true }))
                        }
                      />
                    </TouchableOpacity>
                  ) : !formPreviewError[form.key] && getFormPreviewUri(form) ? (
                    <WebView
                      source={{ uri: getFormPreviewUri(form) }}
                      style={styles.formPreviewWebView}
                      originWhitelist={["*"]}
                      scrollEnabled
                      onError={() =>
                        setFormPreviewError((prev) => ({ ...prev, [form.key]: true }))
                      }
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.noPreviewBox}
                      onPress={() =>
                        form.key === "form14a"
                          ? openSignatureReference()
                          : openSignSample(form)
                      }
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="document-outline"
                        size={30}
                        color="#6B7280"
                      />
                      <Text style={styles.formFileName}>{form.fileName}</Text>
                      <Text style={styles.formHint}>
                        Tap to open form sample (preview not supported here)
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.formDownloadBtn}
                  onPress={() => handleFormDownload(form)}
                >
                  <Text style={styles.formDownloadText}>
                    {downloadingDoc === form.fileName ? "Downloading..." : "Download"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              <Ionicons name="information" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.noticeText}>
              Download and print the form, sign it in blue ink as per the sample,
              and keep it ready for courier.
            </Text>
          </View>

          <View style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              <Ionicons name="information" size={16} color="#FFFFFF" />
            </View>
            <Text style={styles.noticeText}>
              Download and print this authority letter, sign below, and keep it
              ready for courier.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addCoTravellerBtn}
            onPress={openCoTravellerModal}
          >
            <Ionicons name="person-add-outline" size={18} color="#FFFFFF" />
            <Text style={styles.addCoTravellerBtnText}>
              {hasCoTraveller ? "Edit co - traveller" : "Add co - traveller"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Complete Process</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Calendar */}
      <Modal visible={!!showCalendarFor} transparent>
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarBox}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              onDayPress={(day) => {
                if (showCalendarFor === "coTraveller") {
                  setCoTravellerDraft((prev) => ({
                    ...prev,
                    form: {
                      ...prev.form,
                      travelDate: day.dateString,
                    },
                  }));
                  setShowCalendarFor(null);
                  return;
                }

                const updated = [...travellers];
                updated[0].form.travelDate = day.dateString;
                setTravellers(updated);
                setShowCalendarFor(null);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={isCoTravellerModalOpen} transparent animationType="slide">
        <View style={styles.coModalOverlay}>
          <View style={styles.coModalCard}>
            <ScrollView contentContainerStyle={styles.coModalContent}>
              <View style={styles.coTravellerHeader}>
                <Text style={styles.coTravellerTitle}>
                  {coTravellerEditIndex !== null
                    ? `Co-Passenger ${coTravellerEditIndex} Details`
                    : "Add Co-Passenger"}
                </Text>
                <View style={styles.travellerBadge}>
                  <Text style={styles.travellerBadgeText}>
                    {coTravellerEditIndex !== null
                      ? `Traveller ${coTravellerEditIndex + 1}`
                      : `Traveller ${travellers.length + 1}`}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.inputLarge}
                onPress={() => setShowCalendarFor("coTraveller")}
              >
                <Text
                  style={
                    coTravellerDraft.form.travelDate
                      ? styles.inputText
                      : styles.inputPlaceholder
                  }
                >
                  {coTravellerDraft.form.travelDate
                    ? formatDate(coTravellerDraft.form.travelDate)
                    : "Select Travel Date"}
                </Text>
              </TouchableOpacity>

              <TextInput
                placeholder="Mobile Number"
                style={styles.inputLarge}
                keyboardType="phone-pad"
                placeholderTextColor="#9CA3AF"
                value={coTravellerDraft.form.phone}
                onChangeText={(v) =>
                  setCoTravellerDraft((prev) => ({
                    ...prev,
                    form: {
                      ...prev.form,
                      phone: v,
                    },
                  }))
                }
              />

              <TextInput
                placeholder="Email ID"
                style={styles.inputLarge}
                placeholderTextColor="#9CA3AF"
                value={coTravellerDraft.form.email}
                onChangeText={(v) =>
                  setCoTravellerDraft((prev) => ({
                    ...prev,
                    form: {
                      ...prev.form,
                      email: v,
                    },
                  }))
                }
              />

              <TextInput
                placeholder="Hotel Details"
                style={styles.inputLarge}
                placeholderTextColor="#9CA3AF"
                value={coTravellerDraft.form.hotelDetails}
                onChangeText={(v) =>
                  setCoTravellerDraft((prev) => ({
                    ...prev,
                    form: {
                      ...prev.form,
                      hotelDetails: v,
                    },
                  }))
                }
              />

              <View style={styles.uploadCard}>
                <Text style={styles.uploadCardTitle}>Upload Bank Details (PDF) *</Text>
                <TouchableOpacity
                  style={styles.uploadCardBtn}
                  onPress={() => pickPdf("co")}
                >
                  <Text style={styles.uploadCardBtnText}>
                    {coTravellerDraft.documents.bankPdf ? "Replace PDF" : "Upload"}
                  </Text>
                </TouchableOpacity>
                {coTravellerDraft.documents.bankPdf ? (
                  <Text style={styles.pdfUploadedText}>
                    PDF Uploaded: {getPdfName(coTravellerDraft.documents.bankPdf)}
                  </Text>
                ) : null}
              </View>

              {[
                {
                  key: "passportFront",
                  label: "Passport Front",
                  sample: PassportFrontSample,
                },
                {
                  key: "passportBack",
                  label: "Passport Back",
                  sample: PassportBackSample,
                },
                {
                  key: "photo",
                  label: "Applicant Photo",
                  sample: PassportPhotoSample,
                },
              ].map(({ key, label, sample }) => (
                <View key={key} style={styles.uploadCard}>
                  <Text style={styles.uploadCardTitle}>{label} *</Text>
                  <View style={styles.uploadSampleWrap}>
                    {!coTravellerDraft.documents[key] ? (
                      <Image source={sample} style={styles.uploadSample} resizeMode="contain" />
                    ) : (
                      <Image
                        source={{ uri: coTravellerDraft.documents[key].uri }}
                        style={styles.uploadSample}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.uploadCardBtn}
                    onPress={() => pickImage(key, "co")}
                  >
                    <Text style={styles.uploadCardBtnText}>
                      {coTravellerDraft.documents[key] ? "Replace" : "Upload"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.formsRow}>
                {[
                  {
                    key: "form14a",
                    title: "Download Application Form",
                    label: "Application Form",
                    fileName: "Form14a.pdf",
                    assetPath: singaporeForms.applicationFormAssetPath,
                    previewImageAssetPath:
                      singaporeForms.applicationFormPreviewImageAssetPath,
                    url: singaporeForms.applicationFormUrl,
                  },
                  {
                    key: "authority",
                    title: "Download Authority Letter",
                    label: "Authority Letter",
                    fileName: "Authority-letter.pdf",
                    assetPath: singaporeForms.authorityLetterAssetPath,
                    previewImageAssetPath:
                      singaporeForms.authorityLetterPreviewImageAssetPath,
                    url: singaporeForms.authorityLetterUrl,
                  },
                ].map((form) => (
                  <View key={form.key} style={styles.formCard}>
                    <View style={styles.formHeader}>
                      <Text style={styles.formTitle}>{form.title}</Text>
                      <Ionicons
                        name="information-circle"
                        size={18}
                        color="#4F46E5"
                      />
                    </View>

                    <View style={styles.formPreview}>
                      {!formPreviewError[form.key] &&
                      getPreviewImageUri(form.previewImageAssetPath) ? (
                        <TouchableOpacity
                          style={styles.formPreviewTouch}
                          onPress={() =>
                            form.key === "form14a"
                              ? openSignatureReference()
                              : openSignSample(form)
                          }
                          activeOpacity={0.85}
                        >
                          <Image
                            source={{
                              uri: getPreviewImageUri(form.previewImageAssetPath),
                            }}
                            style={styles.formPreviewImage}
                            resizeMode="contain"
                            onError={() =>
                              setFormPreviewError((prev) => ({
                                ...prev,
                                [form.key]: true,
                              }))
                            }
                          />
                        </TouchableOpacity>
                      ) : !formPreviewError[form.key] && getFormPreviewUri(form) ? (
                        <WebView
                          source={{ uri: getFormPreviewUri(form) }}
                          style={styles.formPreviewWebView}
                          originWhitelist={["*"]}
                          scrollEnabled
                          onError={() =>
                            setFormPreviewError((prev) => ({
                              ...prev,
                              [form.key]: true,
                            }))
                          }
                        />
                      ) : (
                        <TouchableOpacity
                          style={styles.noPreviewBox}
                          onPress={() =>
                            form.key === "form14a"
                              ? openSignatureReference()
                              : openSignSample(form)
                          }
                          activeOpacity={0.8}
                        >
                          <Ionicons
                            name="document-outline"
                            size={30}
                            color="#6B7280"
                          />
                          <Text style={styles.formFileName}>{form.fileName}</Text>
                          <Text style={styles.formHint}>
                            Tap to open form sample (preview not supported here)
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.formDownloadBtn}
                      onPress={() => handleFormDownload(form)}
                    >
                      <Text style={styles.formDownloadText}>Download</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={styles.coFooterActions}>
                <TouchableOpacity
                  style={styles.coCloseBtn}
                  onPress={() => {
                    setIsCoTravellerModalOpen(false);
                    setCoTravellerEditIndex(null);
                  }}
                >
                  <Text style={styles.coCloseBtnText}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.coSaveBtn} onPress={saveCoTraveller}>
                  <Text style={styles.coSaveBtnText}>
                    {coTravellerEditIndex !== null ? "Update" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!activeSignSample}
        transparent
        animationType="slide"
        onRequestClose={() => setActiveSignSample(null)}
      >
        <View style={styles.sampleModalOverlay}>
          <View style={styles.sampleModalCard}>
            <View style={styles.sampleModalHeader}>
              <Text style={styles.sampleModalTitle}>
                {activeSignSample?.title} Signing Sample
              </Text>
              <TouchableOpacity onPress={() => setActiveSignSample(null)}>
                <Ionicons name="close" size={22} color="#111827" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sampleHelpText}>
              Sign in the applicant signature section exactly as in passport.
            </Text>

            {activeSignSample ? (
              <>
                {!samplePreviewFailed &&
                (activeSignSample.url ||
                  getAssetPreviewUri(activeSignSample.assetPath)) ? (
                  <WebView
                    source={{
                      uri:
                        activeSignSample.url ||
                        getAssetPreviewUri(activeSignSample.assetPath),
                    }}
                    style={styles.sampleWebView}
                    startInLoadingState
                    onError={() => setSamplePreviewFailed(true)}
                  />
                ) : (
                  <View style={styles.sampleFallbackBox}>
                    <Ionicons name="information-circle" size={22} color="#F59E0B" />
                    <Text style={styles.sampleFallbackText}>
                      In-app PDF preview is not available on this device. Use
                      Download to view the form and signature position.
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.formDownloadBtn}
                  onPress={() =>
                    downloadDocument({
                      url: activeSignSample.url,
                      assetPath: activeSignSample.assetPath,
                      label: activeSignSample.label,
                      fileName: activeSignSample.fileName,
                    })
                  }
                >
                  <Text style={styles.formDownloadText}>Download</Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      </Modal>

    </ScreenWrapper>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: { fontSize: 17, fontWeight: "700" },
  headerTitlePlaceholder: { width: 1, height: 1 },
  headerCenterContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#F2DCC6",
    borderRadius: 18,
    backgroundColor: "#F5EFE8",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenterTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  countryNameUnderHeader: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  topCard: {
    borderWidth: 1,
    borderColor: "#F2DCC6",
    borderRadius: 18,
    backgroundColor: "#F5EFE8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  countryTitle: { fontSize: 20, fontWeight: "700", color: "#111827", textAlign: "center" },
  countrySub: { fontSize: 12, color: "#F97316", marginTop: 2, textAlign: "center" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  inputText: { color: "#111827" },
  inputPlaceholder: { color: "#9CA3AF" },
  textArea: { height: 90 },
  inputLarge: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    height: 48,
    color: "#111827",
    justifyContent: "center",
    textAlignVertical: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },

  label: {
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
    color: "#111827",
  },

  sampleBox: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F5F6F8",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  sample: {
    width: "100%",
    height: "100%",
  },

  uploadBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  uploadText: { color: ORANGE, fontWeight: "700" },
  uploadCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  uploadCardTitle: {
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
    color: "#111827",
    fontSize: 16,
  },
  uploadSampleWrap: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F5F6F8",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadSample: {
    width: "100%",
    height: "100%",
  },
  uploadCardBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  uploadCardBtnText: { color: ORANGE, fontWeight: "700", fontSize: 16 },

  pdfUploadedText: {
    marginTop: 8,
    fontSize: 12,
    color: "#059669",
    textAlign: "center",
    fontWeight: "600",
  },

  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  formsSection: {
    marginBottom: 16,
  },

  formsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },

  formCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD9BF",
    padding: 10,
  },

  formTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  formPreview: {
    height: 150,
    borderWidth: 1,
    borderColor: "#F59E0B",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    overflow: "hidden",
  },

  formPreviewWebView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  formPreviewTouch: {
    width: "100%",
    height: "100%",
  },

  formPreviewImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  noPreviewBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  formFileName: {
    marginTop: 8,
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
  },

  formHint: {
    marginTop: 4,
    fontSize: 11,
    color: "#9CA3AF",
  },

  formDownloadBtn: {
    borderWidth: 1,
    borderColor: "#C7D2FE",
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  formDownloadText: {
    color: "#4338CA",
    fontSize: 16,
    fontWeight: "700",
  },

  noticeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5EFE8",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F2DCC6",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },

  noticeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  noticeText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
    textAlign: "center",
  },

  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },

  calendarBox: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 12,
  },

  addCoTravellerBtn: {
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  addCoTravellerBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  coPassengersPanel: {
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 12,
  },

  coPassengersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  coPassengersTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  coPassengersAddText: {
    color: ORANGE,
    fontSize: 15,
    fontWeight: "700",
  },

  coPassengersEmptyText: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 8,
  },

  coPassengerItem: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  coPassengerHeadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  coPassengerActions: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },

  coPassengerName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  coPassengerOpenText: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: "600",
  },

  coPassengerRemoveText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
  },

  coPassengerMeta: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 2,
  },

  coModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
  },

  coModalCard: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
  },

  coModalContent: {
    padding: 12,
    paddingBottom: 20,
  },

  coTravellerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  coTravellerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },

  travellerBadge: {
    backgroundColor: "#E0E7FF",
    borderColor: "#C7D2FE",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  travellerBadgeText: {
    color: "#4338CA",
    fontSize: 12,
    fontWeight: "700",
  },

  coTravellerSubTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },

  coTravellerRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },

  coTravellerHalfInput: {
    flex: 1,
    marginBottom: 0,
  },

  coDocRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  coDocCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  coDocLabel: {
    fontSize: 12,
    color: "#1F2937",
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "center",
    minHeight: 34,
  },

  coDocSampleBox: {
    width: "100%",
    height: 90,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#F59E0B",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  coDocUploadBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#FFF4EC",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 92,
    alignItems: "center",
  },

  coDocUploadBtnText: {
    color: ORANGE,
    fontWeight: "700",
    fontSize: 13,
  },

  coFooterActions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  coCloseBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },

  coCloseBtnText: {
    color: ORANGE,
    fontWeight: "700",
  },

  coSaveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },

  coSaveBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  sampleModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 12,
  },

  sampleModalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    maxHeight: "90%",
    padding: 12,
  },

  sampleModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  sampleModalTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginRight: 8,
  },

  sampleHelpText: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 10,
  },

  sampleWebView: {
    height: 420,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 10,
  },

  sampleFallbackBox: {
    borderWidth: 1,
    borderColor: "#FCD34D",
    backgroundColor: "#FFFBEB",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 10,
  },

  sampleFallbackText: {
    flex: 1,
    fontSize: 12,
    color: "#92400E",
    lineHeight: 18,
  },
});





