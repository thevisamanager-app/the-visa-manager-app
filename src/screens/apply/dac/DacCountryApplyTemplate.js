import React, { useMemo, useState } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import RNFS from "react-native-fs";
import { validatePickedDocument } from "../../../utils/documentValidation";

import { getAuth } from "@react-native-firebase/auth/lib/modular";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
} from "@react-native-firebase/firestore/lib/modular";
import { serverTimestamp } from "@react-native-firebase/firestore/lib/modular/FieldValue";
import {
  getStorage,
  ref as storageRef,
  putFile as storagePutFile,
  getDownloadURL as storageGetDownloadURL,
} from "@react-native-firebase/storage/lib/modular";

import ScreenWrapper from "../../../components/ScreenWrapper";
import { ApplyCountryHeader } from "../../../components/ApplyFlowCards";
import PassportFrontSample from "../../../assets/examples/passport-front.png";
import PassportBackSample from "../../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../../assets/examples/passportimage.png";
import TicketSample from "../../../assets/examples/ticket.png";

const ORANGE = "#FF5C00";

const PURPOSE_OPTIONS = [
  "Holiday",
  "Visit Friends/Relatives",
  "Wedding",
  "Sport",
  "Pilgrim",
  "Event",
  "Medical",
  "Meeting/conference",
];

const MALDIVES_PURPOSE_OPTIONS = [
  "Holiday",
  "Employment",
  "Business Official",
  "Conference",
  "Sponsorship",
  "Crew",
];

const OCCUPATION_OPTIONS = [
  "Student",
  "Business",
  "Self-employed",
  "Salaried",
  "Housewife",
  "Retired",
  "Unemployed",
];

const ACCOMMODATION_OPTIONS = ["Hotels", "Friends/Relatives", "Others"];

const DAC_CONFIG = {
  "Hong Kong": {
    ticketLabel: "Return Ticket",
    requires: { purpose: false, hotelDetails: false, accommodation: false, occupation: false, photo: false, travelHistory: false },
    centerTicket: true,
  },
  "Sri-lanka": {
    ticketLabel: "Upload Return Ticket",
    requires: { purpose: true, hotelDetails: false, accommodation: false, occupation: false, photo: false, travelHistory: false },
    centerTicket: true,
  },
  Maldives: {
    ticketLabel: "Attach Air Ticket",
    requires: { purpose: true, hotelDetails: true, accommodation: false, occupation: false, photo: true, travelHistory: true },
    centerTicket: true,
  },
  Malaysia: {
    ticketLabel: "Air Ticket Attachment",
    requires: { purpose: false, hotelDetails: true, accommodation: true, occupation: false, photo: false, travelHistory: false },
    centerTicket: true,
  },
  Thailand: {
    ticketLabel: "Upload Air/Ship Ticket",
    requires: { purpose: true, hotelDetails: true, accommodation: false, occupation: true, photo: false, travelHistory: true },
    centerTicket: true,
  },
  Mauritius: {
    ticketLabel: "Upload Air/Ship Ticket",
    requires: { purpose: false, hotelDetails: true, accommodation: false, occupation: false, photo: false, travelHistory: false },
    centerTicket: true,
  },
};

const createForm = () => ({
  travelDate: "",
  phone: "",
  email: "",
  purpose: "",
  hotelDetails: "",
  accommodation: "",
  occupation: "",
  travelHistory: "",
});

const createDocs = () => ({
  passportFront: null,
  passportBack: null,
  ticket: null,
  photo: null,
});

const normalizeFileUriForUpload = (uri) => {
  if (!uri) return null;
  if (uri.startsWith("file://")) return uri.replace("file://", "");
  return uri;
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

async function resolveUploadUri(file, { prefix = "upload", fallbackExt = "jpg" } = {}) {
  const uri = file?.uri || file?.fileCopyUri || file?.localUri || null;
  if (!uri) return null;

  if (Platform.OS === "android" && uri.startsWith("content://")) {
    try {
      const stat = await RNFS.stat(uri);
      const originalPath = stat?.originalFilepath || stat?.path;
      if (originalPath && !originalPath.startsWith("content://")) {
        return normalizeFileUriForUpload(originalPath);
      }
    } catch (_e) {}

    const ext = getFileExtension(file, fallbackExt);
    const targetPath = `${RNFS.CachesDirectoryPath}/${prefix}-${Date.now()}-${Math.floor(
      Math.random() * 100000
    )}.${ext}`;
    await RNFS.copyFile(uri, targetPath);
    return targetPath;
  }

  return normalizeFileUriForUpload(uri);
}

export default function DacCountryApplyTemplate({ navigation, countryName }) {
  const cfg = useMemo(() => DAC_CONFIG[countryName] || DAC_CONFIG["Hong Kong"], [countryName]);
  const [form, setForm] = useState(createForm());
  const [docs, setDocs] = useState(createDocs());
  const [coTravellers, setCoTravellers] = useState([]);
  const [coModalOpen, setCoModalOpen] = useState(false);
  const [coForm, setCoForm] = useState(createForm());
  const [coDocs, setCoDocs] = useState(createDocs());
  const [calendarTarget, setCalendarTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  const purposeOptions = countryName === "Maldives" ? MALDIVES_PURPOSE_OPTIONS : PURPOSE_OPTIONS;

  const setMainField = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const setCoField = (k, v) => setCoForm((p) => ({ ...p, [k]: v }));

  const pickImage = async (key, target = "main") => {
    try {
      const res = await launchImageLibrary({ mediaType: "photo", quality: 0.6, maxWidth: 1600, maxHeight: 1600 });
      if (!res.assets?.[0]) return;
      const selectedAsset = res.assets[0];

      const validation = await validatePickedDocument(key, selectedAsset);
      if (!validation.ok) {
        Alert.alert("Invalid Document", validation.message);
        return;
      }

      if (target === "co") {
        setCoDocs((p) => ({ ...p, [key]: selectedAsset }));
      } else {
        setDocs((p) => ({ ...p, [key]: selectedAsset }));
      }
    } catch (e) {
      Alert.alert("Error", e?.message || "Unable to pick image");
    }
  };

  const uploadFile = async (uri, path) => {
    const storage = getStorage();
    const ref = storageRef(storage, path);
    await storagePutFile(ref, uri);
    return storageGetDownloadURL(ref);
  };

  const validateTraveller = (formData, docsData, label = "Traveller") => {
    if (!formData.travelDate || !formData.phone || !formData.email) return `${label}: Please fill travel date, mobile number, and email.`;
    if (cfg.requires.purpose && !formData.purpose) return `${label}: Please select purpose of visit.`;
    if (cfg.requires.hotelDetails && !formData.hotelDetails) return `${label}: Please enter hotel details.`;
    if (cfg.requires.accommodation && !formData.accommodation) return `${label}: Please select accommodation details.`;
    if (cfg.requires.occupation && !formData.occupation) return `${label}: Please select occupation.`;
    if (cfg.requires.travelHistory && !formData.travelHistory) return `${label}: Please select travel history.`;
    if (!docsData.passportFront || !docsData.passportBack || !docsData.ticket) return `${label}: Please upload passport front, passport back, and ticket.`;
    if (cfg.requires.photo && !docsData.photo) return `${label}: Please upload applicant photo.`;
    return null;
  };

  const saveCoTraveller = () => {
    const err = validateTraveller(coForm, coDocs, `Co-Passenger ${coTravellers.length + 1}`);
    if (err) {
      Alert.alert("Missing Info", err);
      return;
    }
    setCoTravellers((prev) => [...prev, { form: { ...coForm }, docs: { ...coDocs } }]);
    setCoForm(createForm());
    setCoDocs(createDocs());
    setCoModalOpen(false);
  };

  const submit = async () => {
    const mainErr = validateTraveller(form, docs, "Main Traveller");
    if (mainErr) {
      Alert.alert("Missing Info", mainErr);
      return;
    }
    for (let i = 0; i < coTravellers.length; i += 1) {
      const err = validateTraveller(coTravellers[i].form, coTravellers[i].docs, `Co-Passenger ${i + 1}`);
      if (err) {
        Alert.alert("Missing Info", err);
        return;
      }
    }

    const user = getAuth().currentUser;
    if (!user) {
      Alert.alert("Login Required", "Please login first.");
      return;
    }

    try {
      setLoading(true);
      const applicationId = `dac_${countryName.replace(/\s+/g, "_").toLowerCase()}_${Date.now()}`;
      const db = getFirestore();
      const userRef = doc(collection(db, "users"), user.uid);
      const applicationRef = doc(collection(userRef, "passportData"), applicationId);
      const allTravellers = [{ isPrimary: true, form, docs }, ...coTravellers.map((t) => ({ isPrimary: false, ...t }))];
      const basePath = `applications/${user.uid}/${applicationId}`;

      await setDoc(applicationRef, {
        country: countryName,
        status: "processing",
        createdAt: serverTimestamp(),
        totalTravellers: allTravellers.length,
        form: { ...form },
        travellers: allTravellers.map((t) => ({
          isPrimary: t.isPrimary,
          form: { ...t.form },
        })),
      });

      setLoading(false);

      navigation.navigate("CheckoutScreen", {
        country: countryName,
        applicationId,
        totalTravellers: allTravellers.length,
        travellers: allTravellers.map((t) => ({ isPrimary: t.isPrimary, form: t.form })),
        coTravellers: allTravellers
          .slice(1)
          .map((t) => ({ isPrimary: t.isPrimary, form: t.form })),
      });

      // Continue uploads in background to speed up the button flow.
      (async () => {
        try {
          const payloadTravellers = await Promise.all(
            allTravellers.map(async (traveller, idx) => {
              const i = idx + 1;
              const travellerPath = `${basePath}/traveller_${i}`;

              const frontUri = await resolveUploadUri(traveller.docs.passportFront, {
                prefix: `front-${i}`,
              });
              const backUri = await resolveUploadUri(traveller.docs.passportBack, {
                prefix: `back-${i}`,
              });
              const ticketUri = await resolveUploadUri(traveller.docs.ticket, {
                prefix: `ticket-${i}`,
              });
              const photoUri = traveller.docs.photo
                ? await resolveUploadUri(traveller.docs.photo, { prefix: `photo-${i}` })
                : null;

              if (!frontUri || !backUri || !ticketUri) {
                throw new Error(
                  `Traveller ${i}: File URI missing. Please re-upload.`
                );
              }

              const uploadTasks = [
                uploadFile(frontUri, `${travellerPath}/passport_front.jpg`),
                uploadFile(backUri, `${travellerPath}/passport_back.jpg`),
                uploadFile(ticketUri, `${travellerPath}/ticket.jpg`),
              ];
              if (photoUri)
                uploadTasks.push(uploadFile(photoUri, `${travellerPath}/photo.jpg`));

              const uploaded = await Promise.all(uploadTasks);

              return {
                isPrimary: traveller.isPrimary,
                form: { ...traveller.form },
                documents: {
                  passportFront: uploaded[0],
                  passportBack: uploaded[1],
                  ticket: uploaded[2],
                  photo: uploaded[3] || null,
                },
              };
            })
          );

          await setDoc(
            applicationRef,
            {
              country: countryName,
              status: "submitted",
              submittedAt: serverTimestamp(),
              totalTravellers: payloadTravellers.length,
              form: payloadTravellers[0]?.form || {},
              documents: payloadTravellers[0]?.documents || {},
              travellers: payloadTravellers,
            },
            { merge: true }
          );

          await setDoc(
            userRef,
            {
              lastApplicationId: applicationId,
              lastApplicationCountry: countryName,
              lastApplicationStatus: "submitted",
              lastApplicationUpdatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (bgError) {
          console.log(`${countryName} background submit error:`, bgError);
          try {
            await setDoc(
              applicationRef,
              {
                country: countryName,
                status: "failed",
                errorMessage: bgError?.message || "Unknown submit error",
                failedAt: serverTimestamp(),
                totalTravellers: allTravellers.length,
              },
              { merge: true }
            );
          } catch (innerError) {
            console.log("Failed to update failed status:", innerError);
          }
        }
      })();
    } catch (e) {
      Alert.alert("Error", e?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderPicker = (fieldKey, placeholder, options, formData, setFieldFn) => {
    const placeholderValue = `__${fieldKey}_placeholder__`;
    const selectedValue = formData[fieldKey] || placeholderValue;
    const isPlaceholder = selectedValue === placeholderValue;
    const dropdownTextColor = Platform.OS === "android" ? "#FFFFFF" : "#111827";
    const dropdownPlaceholderColor = Platform.OS === "android" ? "#D1D5DB" : "#9CA3AF";
    return (
      <View style={styles.fieldFull}>
        <Text style={styles.labelText}>{placeholder} *</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(v) => setFieldFn(fieldKey, v === placeholderValue ? "" : v)}
            style={[styles.picker, isPlaceholder ? styles.pickerPlaceholderText : styles.pickerSelectedText]}
            dropdownIconColor="#111827"
            mode={Platform.OS === "android" ? "dropdown" : undefined}
            itemStyle={styles.pickerItem}
            prompt={placeholder}
            themeVariant={Platform.OS === "android" ? "dark" : undefined}
          >
            <Picker.Item label={placeholder} value={placeholderValue} color={dropdownPlaceholderColor} />
            {options.map((o) => (
              <Picker.Item key={o} label={o} value={o} color={dropdownTextColor} />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  const renderDocCard = (docsState, key, label, sample, target = "main") => (
    <View style={styles.uploadCard} key={`${target}-${key}`}>
      <Text style={styles.uploadCardTitle}>{label} *</Text>
      <View style={styles.uploadSampleWrap}>
        {!docsState[key] ? (
          <Image source={sample} style={styles.uploadSample} resizeMode="contain" />
        ) : (
          <Image source={{ uri: docsState[key].uri }} style={styles.uploadSample} resizeMode="cover" />
        )}
      </View>
      <TouchableOpacity style={styles.uploadCardBtn} onPress={() => pickImage(key, target)}>
        <Text style={styles.uploadCardBtnText}>{docsState[key] ? "Replace" : "Upload"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTravellerForm = (formData, setFieldFn, docsState, target = "main") => (
    <>
      <View style={styles.fieldFull}>
        <TouchableOpacity style={styles.inputLarge} onPress={() => setCalendarTarget(target)}>
          <Text style={formData.travelDate ? styles.inputText : styles.inputPlaceholder}>
            {formData.travelDate || "Select Travel Date"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldFull}>
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="#9CA3AF"
          style={styles.inputLarge}
          value={formData.phone}
          onChangeText={(v) => setFieldFn("phone", v)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.fieldFull}>
        <TextInput
          placeholder="Email ID"
          placeholderTextColor="#9CA3AF"
          style={styles.inputLarge}
          value={formData.email}
          onChangeText={(v) => setFieldFn("email", v)}
        />
      </View>

      {cfg.requires.purpose
        ? renderPicker("purpose", "Purpose of Visit", purposeOptions, formData, setFieldFn)
        : null}
      {cfg.requires.accommodation
        ? renderPicker("accommodation", "Accommodation Details", ACCOMMODATION_OPTIONS, formData, setFieldFn)
        : null}
      {cfg.requires.hotelDetails ? (
        <View style={styles.fieldFull}>
          <TextInput
            placeholder="Hotel Details"
            placeholderTextColor="#9CA3AF"
            style={styles.inputLarge}
            value={formData.hotelDetails}
            onChangeText={(v) => setFieldFn("hotelDetails", v)}
          />
        </View>
      ) : null}
      {cfg.requires.occupation
        ? renderPicker("occupation", "Occupation", OCCUPATION_OPTIONS, formData, setFieldFn)
        : null}

      <View style={styles.docsStack}>
        {renderDocCard(docsState, "passportFront", "Upload Passport Front Page", PassportFrontSample, target)}
        {renderDocCard(docsState, "passportBack", "Upload Passport Last Page", PassportBackSample, target)}
        {cfg.requires.photo ? renderDocCard(docsState, "photo", "Applicant's photo", PassportPhotoSample, target) : null}
      </View>

      <Text style={[styles.sectionTitle, styles.ticketSectionTitle]}>Ticket Details</Text>
      <View style={styles.docsStack}>
        {renderDocCard(docsState, "ticket", cfg.ticketLabel, TicketSample, target)}
      </View>

      {cfg.requires.travelHistory ? (
        <View style={styles.travelHistoryWrap}>
          <Text style={styles.travelHistoryLabel}>Travel History</Text>
          <Text style={styles.travelHistorySub}>Please list the name of the countries where you stayed within two weeks before arrival *</Text>
          <View style={styles.travelHistoryRow}>
            <TouchableOpacity style={styles.radioItem} onPress={() => setFieldFn("travelHistory", "yes")}>
              <View style={[styles.radioOuter, formData.travelHistory === "yes" && styles.radioOuterActive]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioItem} onPress={() => setFieldFn("travelHistory", "no")}>
              <View style={[styles.radioOuter, formData.travelHistory === "no" && styles.radioOuterActive]} />
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <ApplyCountryHeader navigation={navigation} countryName={countryName} />

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Passport Information</Text>
          {renderTravellerForm(form, setMainField, docs, "main")}
        </View>

        <View style={styles.coCard}>
          <View style={styles.coHeader}>
            <Text style={styles.coTitle}>Co-Passengers</Text>
            <TouchableOpacity
              onPress={() => {
                setCoForm(createForm());
                setCoDocs(createDocs());
                setCoModalOpen(true);
              }}
            >
              <Text style={styles.coAdd}>+ Add Co-Passenger</Text>
            </TouchableOpacity>
          </View>

          {coTravellers.length === 0 ? (
            <Text style={styles.coEmpty}>No co-passengers added yet.</Text>
          ) : (
            coTravellers.map((t, i) => (
              <Text style={styles.coItem} key={`co-${i + 1}`}>Co-Passenger {i + 1}: {t.form.email || "No email"}</Text>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Complete Process</Text>}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={!!calendarTarget} transparent>
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarBox}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              onDayPress={(d) => {
                if (calendarTarget === "co") {
                  setCoField("travelDate", d.dateString);
                } else {
                  setMainField("travelDate", d.dateString);
                }
                setCalendarTarget(null);
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={coModalOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Co-Passenger</Text>
              {renderTravellerForm(coForm, setCoField, coDocs, "co")}

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setCoModalOpen(false)}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={saveCoTraveller}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  headerCenterContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#F2DCC6",
    borderRadius: 18,
    backgroundColor: "#F5EFE8",
    height: 50,
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginBottom: 8 },
  ticketSectionTitle: { textAlign: "center" },
  row: { flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "flex-start", flexWrap: "wrap" },
  fieldHalf: { flex: 1, minWidth: 140 },
  fieldFull: { width: "100%", marginBottom: 12 },
  labelText: { fontSize: 11, color: "#374151", marginBottom: 4, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#FDBA74",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    height: 44,
    color: "#111827",
    justifyContent: "center",
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    height: 48,
    color: "#111827",
    fontSize: 14,
    justifyContent: "center",
  },
  inputText: { color: "#111827" },
  inputPlaceholder: { color: "#9CA3AF" },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 48,
    justifyContent: "center",
    overflow: "hidden",
  },
  picker: { marginTop: Platform.OS === "android" ? -2 : 0, width: "100%" },
  pickerItem: { color: "#111827" },
  pickerPlaceholderText: { color: "#9CA3AF" },
  pickerSelectedText: { color: "#111827" },
  docsStack: { width: "100%", marginTop: 4 },
  uploadCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  uploadCardTitle: { textAlign: "center", fontSize: 16, fontWeight: "600", color: "#111827", marginBottom: 8 },
  uploadSampleWrap: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    backgroundColor: "#F5F6F8",
    overflow: "hidden",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadSample: { width: "100%", height: "100%" },
  uploadCardBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    backgroundColor: "#FFFFFF",
  },
  uploadCardBtnText: { color: ORANGE, fontSize: 16, fontWeight: "700" },
  ticketCenterRow: { alignItems: "center" },
  ticketCenterCard: { width: "70%" },
  travelHistoryWrap: { marginTop: 4 },
  travelHistoryLabel: { fontSize: 14, fontWeight: "700", color: "#111827", marginBottom: 4 },
  travelHistorySub: { fontSize: 11, color: "#374151", marginBottom: 8 },
  travelHistoryRow: { flexDirection: "row", gap: 20 },
  radioItem: { flexDirection: "row", alignItems: "center" },
  radioOuter: { width: 14, height: 14, borderRadius: 7, borderWidth: 1, borderColor: "#9CA3AF", marginRight: 6 },
  radioOuterActive: { borderColor: ORANGE, backgroundColor: ORANGE },
  radioText: { color: "#111827", fontSize: 13 },
  coCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
  },
  coHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  coTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  coAdd: { color: ORANGE, fontWeight: "700", fontSize: 13 },
  coEmpty: { color: "#6B7280", fontSize: 12, marginTop: 8 },
  coItem: { color: "#374151", fontSize: 12, marginTop: 8 },
  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 6,
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  calendarOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" },
  calendarBox: { backgroundColor: "#fff", margin: 20, borderRadius: 16, padding: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 12 },
  modalCard: { backgroundColor: "#E5E7EB", borderRadius: 12, maxHeight: "90%" },
  modalContent: { padding: 12, paddingBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1F2937", marginBottom: 10 },
  modalActions: { marginTop: 8, flexDirection: "row", justifyContent: "center", gap: 10 },
  closeBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  closeBtnText: { color: ORANGE, fontWeight: "700" },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "700" },
});

