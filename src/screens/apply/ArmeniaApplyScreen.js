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
import { ApplyCountryHeader, CoPassengerCard } from "../../components/ApplyFlowCards";

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
    hotelName: "",
    professionDetails: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    photo: null,
    airTicket: null,
    travelInsurance: null,
    itinerary: null,
    bankStatement: null,
    professionProof: null,
  },
});

export default function ArmeniaApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([{ isPrimary: true, ...createTraveller() }]);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [showCalendarFor, setShowCalendarFor] = useState(null);

  const formatDate = (date) => {
    const [y, m, d] = date.split("-");
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
    if (
      !traveller.form.travelDate ||
      !traveller.form.phone ||
      !traveller.form.email ||
      !traveller.form.hotelName ||
      !traveller.form.professionDetails
    ) {
      Alert.alert("Missing Info", "Please complete all required fields.");
      return false;
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
    for (const traveller of travellers) {
      if (!validateTraveller(traveller)) return;
    }

    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert("Login Required", "Please login first.");
        return;
      }

      const applicationId = `armenia_${Date.now()}`;

      const formattedTravellers = await Promise.all(
        travellers.map(async (traveller, index) => {
          const basePath = `applications/${user.uid}/${applicationId}/traveller_${index + 1}`;

          const passportFrontUrl = await uploadFile(
            traveller.documents.passportFront,
            `${basePath}/passport_front.${getFileExtension(traveller.documents.passportFront, "jpg")}`
          );
          const passportBackUrl = await uploadFile(
            traveller.documents.passportBack,
            `${basePath}/passport_back.${getFileExtension(traveller.documents.passportBack, "jpg")}`
          );
          const photoUrl = await uploadFile(
            traveller.documents.photo,
            `${basePath}/passport_photo.${getFileExtension(traveller.documents.photo, "jpg")}`
          );
          const airTicketUrl = await uploadFile(
            traveller.documents.airTicket,
            `${basePath}/air_ticket.${getFileExtension(traveller.documents.airTicket, "pdf")}`
          );
          const travelInsuranceUrl = await uploadFile(
            traveller.documents.travelInsurance,
            `${basePath}/travel_insurance.${getFileExtension(traveller.documents.travelInsurance, "pdf")}`
          );
          const itineraryUrl = await uploadFile(
            traveller.documents.itinerary,
            `${basePath}/itinerary.${getFileExtension(traveller.documents.itinerary, "pdf")}`
          );
          const bankStatementUrl = await uploadFile(
            traveller.documents.bankStatement,
            `${basePath}/bank_statement.${getFileExtension(traveller.documents.bankStatement, "pdf")}`
          );
          const professionProofUrl = await uploadFile(
            traveller.documents.professionProof,
            `${basePath}/profession_proof.${getFileExtension(traveller.documents.professionProof, "pdf")}`
          );

          return {
            isPrimary: traveller.isPrimary,
            ...traveller.form,
            documents: {
              passportFrontUrl,
              passportBackUrl,
              photoUrl,
              airTicketUrl,
              travelInsuranceUrl,
              itineraryUrl,
              bankStatementUrl,
              professionProofUrl,
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
          country: "Armenia",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Armenia",
        travellers,
      });
    } catch (error) {
      console.log("Armenia submit error:", error);
      Alert.alert("Error", "Unable to submit application.");
    }
  };

  const renderForm = (traveller, onChange, target) => (
    <>
      <TouchableOpacity style={styles.input} onPress={() => setShowCalendarFor(target)}>
        <Text style={traveller.form.travelDate ? styles.inputText : styles.inputPlaceholder}>
          {traveller.form.travelDate ? formatDate(traveller.form.travelDate) : "Select Travel Date"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Mobile Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.phone}
        onChangeText={(v) => onChange("phone", v)}
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        value={traveller.form.email}
        onChangeText={(v) => onChange("email", v)}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Hotel Name"
        style={styles.input}
        value={traveller.form.hotelName}
        onChangeText={(v) => onChange("hotelName", v)}
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Profession Details"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.professionDetails}
        onChangeText={(v) => onChange("professionDetails", v)}
        placeholderTextColor="#9CA3AF"
      />
      {[
        { key: "passportFront", label: "Upload Passport Front Page" },
        { key: "passportBack", label: "Upload Passport Back Page" },
        { key: "photo", label: "Upload Passport Size Photo" },
        { key: "airTicket", label: "Upload Air Ticket" },
        { key: "travelInsurance", label: "Upload Travel Insurance" },
        { key: "itinerary", label: "Upload Travel Itinerary" },
        { key: "bankStatement", label: "Upload Bank Statement (Last 3 Months)" },
        { key: "professionProof", label: "Upload Salary Slip / Business Registration" },
      ].map(({ key, label }) => (
        <View key={key} style={styles.docCard}>
          <Text style={styles.docLabel}>{label} *</Text>
          {traveller.documents[key] ? (
            <Image source={{ uri: traveller.documents[key].uri }} style={styles.previewImage} />
          ) : getSample(key) ? (
            <View style={styles.sampleWrapper}>
              <Image source={getSample(key)} style={styles.sampleImage} resizeMode="contain" />
            </View>
          ) : null}
          {traveller.documents[key] ? (
            <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(target, key)}>
              <Text style={styles.uploadText}>Replace Document</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(target, key)}>
              <Text style={styles.uploadText}>Upload Document</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <ApplyCountryHeader navigation={navigation} countryName="Armenia" />

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

            <TouchableOpacity style={styles.submitBtn} onPress={saveCoTraveller}>
              <Text style={styles.submitText}>Save Co-Traveller</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: "700" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 8,
    marginBottom: 12,
    textAlign: "center",
  },
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
  inputPlaceholder: { color: "#9CA3AF" },
  textArea: { minHeight: 90, textAlignVertical: "top" },
  noteText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
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
    justifyContent: "center",
  },
  sampleImage: {
    height: 95,
    width: "100%",
  },
  noSampleText: {
    textAlign: "center",
    color: "#9CA3AF",
    paddingVertical: 28,
    fontWeight: "600",
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
  uploadText: { color: ORANGE, fontWeight: "700" },
  addTravellerBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 12,
  },
  addTravellerText: { color: ORANGE, fontWeight: "700" },
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
});
