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
import { validatePickedDocument } from "../../utils/documentValidation";
import auth from "@react-native-firebase/auth";
import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ScreenWrapper from "../../components/ScreenWrapper";
import { ApplyCountryHeader, CoPassengerCard } from "../../components/ApplyFlowCards";
import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passportimage.png";
import TicketSample from "../../assets/examples/ticket.png";

const ORANGE = "#FF5C00";

/* ---------- Traveller Factory ---------- */
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
    ticket: null,
    bankStatement: null,
    hotelConfirmation: null,
  },
});

export default function CombodiaApplyScreen({ navigation }) {

  const [travellers, setTravellers] = useState([
    { isPrimary: true, ...createTraveller() },
  ]);

  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());

  const formatDate = (date) => {
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  };

  const getSample = (key) => {
    if (key === "passportFront") return PassportFrontSample;
    if (key === "passportBack") return PassportBackSample;
    if (key === "photo") return PassportPhotoSample;
    return TicketSample;
  };
  const getUploadUri = (file) => {
    if (!file) return null;
    return file.uri || file.fileCopyUri || file.localUri || null;
  };
  const getFileExtension = (file, fallback = "jpg") => {
    const fileName = file?.fileName || file?.name || "";
    if (fileName.includes(".")) {
      return fileName.split(".").pop().toLowerCase();
    }
    if (file?.type?.includes("/")) {
      return file.type.split("/")[1].toLowerCase();
    }
    return fallback;
  };
  const uploadFile = async (file, path) => {
    const uri = getUploadUri(file);
    if (!uri) throw new Error("Selected file URI is missing.");
    const ref = storage().ref(path);
    await ref.putFile(uri);
    return await ref.getDownloadURL();
  };

  const pickDocument = async (key) => {
    const isFrontPage = key === "passportFront";
    const res = await launchImageLibrary({
      mediaType: "mixed",
      quality: 0.9,
      includeBase64: isFrontPage,
    });

    if (!res.assets?.[0]) return;
    const selectedAsset = res.assets[0];
    let frontPageData = null;

    if (isFrontPage && selectedAsset.base64) {
      try {
        const rawText = await extractTextFromImage(selectedAsset.base64);
        const parsed = parseMRZ(rawText);
        frontPageData = {
          parsed: {
            ...parsed,
            birthDate: toDDMMYY(parsed.birthDate),
            expiryDate: toDDMMYY(parsed.expiryDate),
          },
        };
      } catch (error) {
        console.log("Combodia front page OCR failed:", error);
      }
    }

    const updated = [...travellers];
    updated[0].documents[key] = selectedAsset;
    setTravellers(updated);
  };

  const validate = () => {
    const t = travellers[0];

    if (!t.form.travelDate || !t.form.phone || !t.form.email) {
      Alert.alert("Missing Info", "Please fill all required fields.");
      return false;
    }

    for (const value of Object.values(t.documents)) {
      if (!value) {
        Alert.alert("Missing Document", "Please upload all required documents.");
        return false;
      }
    }

    return true;
  };

  const saveCoTraveller = () => {
    if (!validateTraveller(tempTraveller)) return;

    setTravellers((p) => [...p, { isPrimary: false, ...tempTraveller }]);
    setTempTraveller(createTraveller());
    setShowCoTravellerModal(false);
  };

  const submit = async () => {

    if (!validate()) return;

    try {

      const user = auth().currentUser;

      if (!user) {
        Alert.alert("Login Required", "Please login first.");
        return;
      }

      const applicationId = `combodia_${Date.now()}`;

      const t = travellers[0];
      const basePath = `applications/${user.uid}/${applicationId}/traveller_1`;
      const passportFrontPage = await extractPassportFrontPageFromAsset(
        t.documents.passportFront,
        t.form.phone
      );

      const passportFrontUrl = await uploadFile(
        t.documents.passportFront,
        `${basePath}/passport_front.${getFileExtension(t.documents.passportFront, "jpg")}`
      );
      const passportBackUrl = await uploadFile(
        t.documents.passportBack,
        `${basePath}/passport_back.${getFileExtension(t.documents.passportBack, "jpg")}`
      );
      const photoUrl = await uploadFile(
        t.documents.photo,
        `${basePath}/passport_photo.${getFileExtension(t.documents.photo, "jpg")}`
      );
      const ticketUrl = await uploadFile(
        t.documents.ticket,
        `${basePath}/air_ticket.${getFileExtension(t.documents.ticket, "pdf")}`
      );
      const bankStatementUrl = await uploadFile(
        t.documents.bankStatement,
        `${basePath}/bank_statement.${getFileExtension(t.documents.bankStatement, "pdf")}`
      );
      const hotelConfirmationUrl = await uploadFile(
        t.documents.hotelConfirmation,
        `${basePath}/hotel_confirmation.${getFileExtension(t.documents.hotelConfirmation, "pdf")}`
      );

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("passportData")
        .doc(applicationId)
        .set({
          userId: user.uid,
          country: "Combodia",
          travelDate: t.form.travelDate,
          phone: t.form.phone,
          email: t.form.email,
          passportFrontPage,
          documents: {
            passportFrontUrl,
            passportBackUrl,
            photoUrl,
            ticketUrl,
            bankStatementUrl,
            hotelConfirmationUrl,
          },
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Combodia",
        applicationId,
      });

    } catch (error) {
      console.log("Combodia submit error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const renderForm = (traveller, onChange, target) => (
    <>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowCalendarFor(target)}
      >
        <Text>
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
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        value={traveller.form.email}
        onChangeText={(v) => onChange("email", v)}
      />

      {[
        { key: "passportFront", label: "Upload Passport Front Page" },
        { key: "passportBack", label: "Upload Passport Back Page" },
        { key: "photo", label: "Passport Size Photo" },
        { key: "ticket", label: "Upload Return Air Ticket" },
        { key: "bankStatement", label: "Upload Bank Statement" },
        { key: "hotelConfirmation", label: "Upload Hotel Confirmation" },
      ].map(({ key, label }) => (
        <View key={key} style={styles.docCard}>
          <Text style={styles.docLabel}>{label} *</Text>

          {!travellers[0].documents[key] ? (
            key.includes("passport") || key === "photo" || key === "ticket" ? (
              <View style={styles.sampleWrapper}>
                <Image
                  source={getSample(key)}
                  style={styles.sampleImage}
                  resizeMode="contain"
                />
              </View>
            ) : null
          ) : (
            <Image
              source={{ uri: travellers[0].documents[key].uri }}
              style={styles.previewImage}
            />
          )}

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => pickDocument(key)}
          >
            <Text style={styles.uploadText}>
              {travellers[0].documents[key]
                ? "Replace Document"
                : "Upload Document"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <ApplyCountryHeader navigation={navigation} countryName="Combodia" />

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

      {/* Co Traveller Modal */}

      <Modal visible={showCoTravellerModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.sectionTitle}>Add Co-Traveller</Text>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={26} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Tabs", { screen: "Destination" })
                }
              >
                <Ionicons name="home-outline" size={24} color={ORANGE} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {renderForm(
                tempTraveller,
                (k, v) =>
                  setTempTraveller((p) => ({
                    ...p,
                    form: { ...p.form, [k]: v },
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

      {/* Calendar Modal */}
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
                    setTempTraveller((p) => ({
                      ...p,
                      form: { ...p.form, travelDate: day.dateString },
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



/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: { fontSize: 17, fontWeight: "800" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",      // 👈 center it
  },


  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },

  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
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
    backgroundColor: "#F8FAFC",
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

  uploadBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  addTravellerBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 16,
  },

  uploadText: { color: ORANGE, fontWeight: "800" },

  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  submitText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
  },

  modalBox: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
  },

  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },

  addTravellerText: { color: ORANGE, fontWeight: "800" },

  calendarBox: {
    backgroundColor: "#FFFFFF",
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
    fontWeight: "800",
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
    fontWeight: "800",
  },
});


