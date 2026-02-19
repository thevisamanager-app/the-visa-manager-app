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
import { CountryApplyBanner, CoPassengerCard } from "../../components/ApplyFlowCards";
import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passport-photo.png";
import TicketSample from "../../assets/examples/ticket.png";

const ORANGE = "#FF5C00";

/* ================= Traveller Factory ================= */

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    maritalStatus: "",
    emergencyName: "",
    emergencyPhone: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    photo: null,
    ticket: null,
    hotelConfirmation: null,
    invitationLetter: null,
  },
  frontPageData: null,
});

export default function KenyaApplyScreen({ navigation }) {

  const [travellers, setTravellers] = useState([
    { isPrimary: true, ...createTraveller() },
  ]);

  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showMaritalDropdown, setShowMaritalDropdown] = useState(false);

  const formatDate = (date) => {
    const [y, m, d] = date.split("-");
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

  const getSample = (key) => {
    if (key === "passportFront") return PassportFrontSample;
    if (key === "passportBack") return PassportBackSample;
    if (key === "photo") return PassportPhotoSample;
    return TicketSample;
  };

  const pickDocument = async (target, key) => {
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
        console.log("Kenya front page OCR failed:", error);
      }
    }

    if (target === "main") {
      const updated = [...travellers];
      updated[0].documents[key] = selectedAsset;
      if (isFrontPage) {
        updated[0].frontPageData = frontPageData;
      }
      setTravellers(updated);
    } else {
      setTempTraveller((p) => ({
        ...p,
        documents: { ...p.documents, [key]: selectedAsset },
        ...(isFrontPage ? { frontPageData } : {}),
      }));
    }
  };

  const validateTraveller = (t) => {
    const { form, documents } = t;

    if (
      !form.travelDate ||
      !form.phone ||
      !form.email ||
      !form.maritalStatus ||
      !form.emergencyName ||
      !form.emergencyPhone
    ) {
      Alert.alert("Missing Info", "Please complete all required fields.");
      return false;
    }

    for (const value of Object.values(documents)) {
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

    for (const t of travellers) {
      if (!validateTraveller(t)) return;
    }

    try {

      const user = auth().currentUser;
      if (!user) {
        Alert.alert("Login Required", "Please login first.");
        return;
      }

      const applicationId = `kenya_${Date.now()}`;

      const formattedTravellers = await Promise.all(
        travellers.map(async (t, index) => {
          const basePath = `applications/${user.uid}/${applicationId}/traveller_${index + 1}`;

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
          const hotelConfirmationUrl = await uploadFile(
            t.documents.hotelConfirmation,
            `${basePath}/hotel_confirmation.${getFileExtension(t.documents.hotelConfirmation, "pdf")}`
          );
          const invitationLetterUrl = await uploadFile(
            t.documents.invitationLetter,
            `${basePath}/invitation_letter.${getFileExtension(t.documents.invitationLetter, "pdf")}`
          );

          return {
            isPrimary: t.isPrimary,
            ...t.form,
            frontPageData: t.frontPageData || null,
            documents: {
              passportFrontUrl,
              passportBackUrl,
              photoUrl,
              ticketUrl,
              hotelConfirmationUrl,
              invitationLetterUrl,
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
          country: "Kenya",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Kenya",
        travellers,
      });

    } catch (error) {
      console.log("Kenya submit error:", error);
      Alert.alert("Error", "Unable to submit application.");
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
        value={traveller.form.phone}
        onChangeText={(v) => onChange("phone", v)}
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        value={traveller.form.email}
        onChangeText={(v) => onChange("email", v)}
      />

      {/* Marital Status Dropdown */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowMaritalDropdown(!showMaritalDropdown)}
      >
        <Text>
          {traveller.form.maritalStatus || "Select Marital Status"}
        </Text>
      </TouchableOpacity>

      {showMaritalDropdown && (
        <View style={styles.dropdown}>
          {["Single", "Married", "Divorced"].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => {
                onChange("maritalStatus", status);
                setShowMaritalDropdown(false);
              }}
            >
              <Text style={styles.dropdownItem}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TextInput
        placeholder="Emergency Contact Name"
        style={styles.input}
        value={traveller.form.emergencyName}
        onChangeText={(v) => onChange("emergencyName", v)}
      />

      <TextInput
        placeholder="Emergency Contact Number"
        style={styles.input}
        value={traveller.form.emergencyPhone}
        onChangeText={(v) => onChange("emergencyPhone", v)}
      />

      {[
        { key: "passportFront", label: "Passport Front Page" },
        { key: "passportBack", label: "Passport Back Page" },
        { key: "photo", label: "Passport Photo" },
        { key: "ticket", label: "Return Air Ticket" },
        { key: "hotelConfirmation", label: "Hotel Confirmation" },
        { key: "invitationLetter", label: "Invitation Letter (Business)" },
      ].map(({ key, label }) => (
        <View key={key} style={styles.docCard}>
          <Text style={styles.docLabel}>{label} *</Text>

          {!traveller.documents[key] ? (
            key.includes("passport") || key === "photo" || key === "ticket" ? (
              <Image
                source={getSample(key)}
                style={styles.sampleImage}
                resizeMode="contain"
              />
            ) : null
          ) : (
            <Image
              source={{ uri: traveller.documents[key].uri }}
              style={styles.previewImage}
            />
          )}

          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => pickDocument(target, key)}
          >
            <Text style={styles.uploadText}>
              {traveller.documents[key]
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} />
          </TouchableOpacity>

          <View />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Tabs", { screen: "Destination" })
            }
          >
            <Ionicons name="home-outline" size={24} color={ORANGE} />
          </TouchableOpacity>
        </View>
        <CountryApplyBanner countryName="Kenya" />

        {renderForm(
          travellers[0],
          (k, v) => {
            const updated = [...travellers];
            updated[0].form[k] = v;
            setTravellers(updated);
          },
          "main"
        )}

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
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setShowCoTravellerModal(false)}>
                <Ionicons name="chevron-back" size={26} />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Add Co-Traveller</Text>

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

            <TouchableOpacity style={styles.submitBtn} onPress={saveCoTraveller}>
              <Text style={styles.submitText}>Save Co-Traveller</Text>
            </TouchableOpacity>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    headerTitle: { fontSize: 17, fontWeight: "700" },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, marginBottom: 12 },
  docCard: { backgroundColor: "#fff", borderRadius: 14, padding: 12, marginBottom: 16 },
  docLabel: { fontWeight: "600", fontSize: 14, textAlign: "center", marginBottom: 8 },
  sampleImage: { height: 95, width: "100%" },
  previewImage: { height: 110, borderRadius: 10, marginBottom: 8 },
  uploadBtn: { borderWidth: 1, borderColor: ORANGE, borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  uploadText: { color: ORANGE, fontWeight: "700" },
  submitBtn: { backgroundColor: ORANGE, borderRadius: 999, paddingVertical: 16, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  addTravellerBtn: { borderWidth: 1, borderColor: ORANGE, borderRadius: 999, paddingVertical: 14, alignItems: "center", marginVertical: 16 },
  addTravellerText: { color: ORANGE, fontWeight: "700" },
  calendarOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" },
  calendarBox: { backgroundColor: "#fff", margin: 20, borderRadius: 16, padding: 12 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center" },
  modalBox: { backgroundColor: "#fff", margin: 20, borderRadius: 16, padding: 16, maxHeight: "85%" },
  dropdown: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", marginBottom: 12 },
  dropdownItem: { padding: 12 },
});
