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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { launchImageLibrary } from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
  ApplyCountryHeader,
  CoPassengerCard,
} from "../../components/ApplyFlowCards";
import { extractPassportFrontPageFromAsset } from "../../utils/passportFrontPage";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passport-photo.png";
import TicketSample from "../../assets/examples/ticket.png";

const ORANGE = "#FF5C00";

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    photo: null,
    airTicket: null,
    hotelBooking: null,
    itinerary: null,
    salarySlipOrItr: null,
    bankStatement: null,
  },
});

export default function PhilippinesApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([
    { isPrimary: true, ...createTraveller() },
  ]);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [showCalendarFor, setShowCalendarFor] = useState(null);

  const formatDate = (date) => {
    const [y, m, d] = String(date || "").split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
  };

  const getSample = (key) => {
    if (key === "passportFront") return PassportFrontSample;
    if (key === "passportBack") return PassportBackSample;
    if (key === "photo") return PassportPhotoSample;
    if (key === "airTicket") return TicketSample;
    return null;
  };

  const getUploadUri = (file) => {
    if (!file) return null;
    return file.uri || file.fileCopyUri || file.localUri || null;
  };

  const getFileExtension = (file, fallback = "jpg") => {
    const fileName = file?.fileName || file?.name || "";
    if (fileName.includes(".")) return fileName.split(".").pop().toLowerCase();
    if (file?.type?.includes("/")) return file.type.split("/")[1].toLowerCase();
    return fallback;
  };

  const uploadFile = async (file, path) => {
    const uri = getUploadUri(file);
    if (!uri) throw new Error("Selected file URI is missing.");
    const ref = storage().ref(path);
    await ref.putFile(uri);
    return await ref.getDownloadURL();
  };

  const pickDocument = async (target, key) => {
    const res = await launchImageLibrary({
      mediaType: "mixed",
      quality: 0.9,
      includeBase64: key === "passportFront",
    });
    if (!res.assets?.[0]) return;
    const selectedAsset = res.assets[0];

    if (target === "main") {
      const updated = [...travellers];
      updated[0].documents[key] = selectedAsset;
      setTravellers(updated);
      return;
    }

    setTempTraveller((prev) => ({
      ...prev,
      documents: { ...prev.documents, [key]: selectedAsset },
    }));
  };

  const validateTraveller = (traveller) => {
    const requiredFields = ["travelDate", "phone", "email"];
    for (const field of requiredFields) {
      if (!String(traveller.form[field] || "").trim()) {
        Alert.alert("Missing Info", "Please fill all required fields.");
        return false;
      }
    }

    for (const value of Object.values(traveller.documents)) {
      if (!value) {
        Alert.alert("Missing Document", "Please upload all required documents.");
        return false;
      }
    }

    return true;
  };

  const saveCoTraveller = () => {
    if (!validateTraveller(tempTraveller)) return;
    setTravellers((prev) => [...prev, { isPrimary: false, ...tempTraveller }]);
    setTempTraveller(createTraveller());
    setShowCoTravellerModal(false);
  };

  const submit = async () => {
    for (const t of travellers) {
      if (!validateTraveller(t)) return;
    }

    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert("Login Required", "Please login first.");
        return;
      }

      const applicationId = `philippines_${Date.now()}`;

      const formattedTravellers = await Promise.all(
        travellers.map(async (t, index) => {
          const basePath = `applications/${user.uid}/${applicationId}/traveller_${index + 1}`;
          const passportFrontPage = await extractPassportFrontPageFromAsset(
            t.documents.passportFront,
            t.form.phone
          );

          const passportFrontUrl = await uploadFile(
            t.documents.passportFront,
            `${basePath}/passport_front.${getFileExtension(
              t.documents.passportFront,
              "jpg"
            )}`
          );
          const passportBackUrl = await uploadFile(
            t.documents.passportBack,
            `${basePath}/passport_back.${getFileExtension(
              t.documents.passportBack,
              "jpg"
            )}`
          );
          const photoUrl = await uploadFile(
            t.documents.photo,
            `${basePath}/passport_photo.${getFileExtension(t.documents.photo, "jpg")}`
          );
          const airTicketUrl = await uploadFile(
            t.documents.airTicket,
            `${basePath}/air_ticket.${getFileExtension(t.documents.airTicket, "pdf")}`
          );
          const hotelBookingUrl = await uploadFile(
            t.documents.hotelBooking,
            `${basePath}/hotel_booking.${getFileExtension(
              t.documents.hotelBooking,
              "pdf"
            )}`
          );
          const itineraryUrl = await uploadFile(
            t.documents.itinerary,
            `${basePath}/itinerary.${getFileExtension(t.documents.itinerary, "pdf")}`
          );
          const salarySlipOrItrUrl = await uploadFile(
            t.documents.salarySlipOrItr,
            `${basePath}/salary_slip_or_itr.${getFileExtension(
              t.documents.salarySlipOrItr,
              "pdf"
            )}`
          );
          const bankStatementUrl = await uploadFile(
            t.documents.bankStatement,
            `${basePath}/bank_statement.${getFileExtension(
              t.documents.bankStatement,
              "pdf"
            )}`
          );

          return {
            isPrimary: t.isPrimary,
            travelDate: t.form.travelDate,
            phone: t.form.phone,
            email: t.form.email,
            passportFrontPage,
            documents: {
              passportFrontUrl,
              passportBackUrl,
              photoUrl,
              airTicketUrl,
              hotelBookingUrl,
              itineraryUrl,
              salarySlipOrItrUrl,
              bankStatementUrl,
            },
          };
        })
      );

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("passportData")
        .doc(applicationId)
        .set({
          userId: user.uid,
          country: "Philippines",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Philippines",
        totalTravellers: travellers.length,
        travellers,
        coTravellers: travellers.slice(1),
      });
    } catch (error) {
      console.log("Philippines submit error:", error);
      Alert.alert("Error", "Unable to submit application. Please try again.");
    }
  };

  const getFileLabel = (file) => file?.fileName || file?.name || "File selected";

  const renderDocumentCard = (traveller, target, key, label) => {
    const file = traveller.documents[key];
    const sample = getSample(key);
    const isImage = file?.type?.startsWith("image/");
    const hideImagePreview = key === "itinerary" || key === "hotelBooking";

    return (
      <View key={key} style={styles.docCard}>
        <Text style={styles.docLabel}>{label} *</Text>

        {file ? (
          isImage && !hideImagePreview ? (
            <Image source={{ uri: file.uri }} style={styles.previewImage} />
          ) : (
            <View style={styles.filePreviewBox}>
              <Ionicons name="document-outline" size={30} color="#6B7280" />
              <Text style={styles.filePreviewText}>{getFileLabel(file)}</Text>
            </View>
          )
        ) : sample ? (
          <View style={styles.sampleWrapper}>
            <Image source={sample} style={styles.sampleImage} resizeMode="contain" />
          </View>
        ) : null}

        <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(target, key)}>
          <Text style={styles.uploadText}>{file ? "Replace Document" : "Upload Document"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderForm = (traveller, onChange, target) => (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setShowCalendarFor(target)}>
        <Text style={traveller.form.travelDate ? styles.inputText : styles.inputPlaceholder}>
          {traveller.form.travelDate
            ? formatDate(traveller.form.travelDate)
            : "Select Travel Date"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.phone}
        onChangeText={(v) => onChange("phone", v)}
        placeholderTextColor="#111827"
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        value={traveller.form.email}
        onChangeText={(v) => onChange("email", v)}
        placeholderTextColor="#111827"
        autoCapitalize="none"
      />

      {[
        ["passportFront", "Upload Passport Front Page"],
        ["passportBack", "Upload Passport Back Page"],
        ["photo", "Upload Passport Size Photo"],
        ["airTicket", "Upload Air Ticket"],
        ["hotelBooking", "Upload Hotel Booking"],
        ["itinerary", "Upload Itinerary"],
        ["salarySlipOrItr", "Upload 3 Months Salary Slip or ITR (3 Years)"],
        ["bankStatement", "Upload 6 Months Bank Statement"],
      ].map(([key, label]) => renderDocumentCard(traveller, target, key, label))}
    </>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <ApplyCountryHeader navigation={navigation} countryName="Philippines" />

        <View style={styles.formCard}>
          {renderForm(
            travellers[0],
            (k, v) => {
              const updated = [...travellers];
              updated[0].form[k] = v;
              setTravellers(updated);
            },
            "main"
          )}
        </View>

        <CoPassengerCard
          coTravellerCount={Math.max(0, travellers.length - 1)}
          onAddPress={() => setShowCoTravellerModal(true)}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={submit}>
          <Text style={styles.submitText}>Complete Process</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showCoTravellerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setShowCoTravellerModal(false)}>
                <Ionicons name="chevron-back" size={26} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Add Co-Traveller</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCoTravellerModal(false);
                  navigation.navigate("Tabs", { screen: "Destination" });
                }}
              >
                <Ionicons name="home-outline" size={24} color={ORANGE} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {renderForm(
                tempTraveller,
                (k, v) =>
                  setTempTraveller((prev) => ({
                    ...prev,
                    form: { ...prev.form, [k]: v },
                  })),
                "co"
              )}
            </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowCoTravellerModal(false)}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveCoTraveller}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={!!showCalendarFor} transparent>
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarBox}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              onDayPress={(day) => {
                if (showCalendarFor === "main") {
                  const updated = [...travellers];
                  updated[0].form.travelDate = day.dateString;
                  setTravellers(updated);
                } else {
                  setTempTraveller((prev) => ({
                    ...prev,
                    form: { ...prev.form, travelDate: day.dateString },
                  }));
                }
                setShowCalendarFor(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: "700" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  inputText: { color: "#111827" },
  inputPlaceholder: { color: "#111827" },
  docCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  docLabel: {
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  sampleWrapper: {
    backgroundColor: "#F5F6F8",
    borderRadius: 10,
    padding: 6,
    marginBottom: 8,
  },
  sampleImage: {
    height: 95,
    width: "100%",
  },
  previewImage: {
    height: 110,
    borderRadius: 10,
    marginBottom: 8,
  },
  filePreviewBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  filePreviewText: {
    marginTop: 8,
    color: "#374151",
    fontSize: 12,
    textAlign: "center",
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  uploadText: { color: ORANGE, fontWeight: "700" },
  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 14,
    maxHeight: "92%",
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
  modalActions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
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
  closeBtnText: {
    color: ORANGE,
    fontWeight: "700",
  },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});

