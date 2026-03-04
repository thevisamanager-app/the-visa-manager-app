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
import { Picker } from "@react-native-picker/picker";
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

const ORANGE = "#FF5C00";
const MARITAL_STATUS_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];
const OCCUPATION_OPTIONS = [
  "Private Employee",
  "Government Employee",
  "Business",
  "Self Employed",
  "Student",
  "Retired",
  "Other",
];

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    hotelName: "",
    occupation: "",
    maritalStatus: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    photo: null,
  },
});

export default function KazakhstanApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([
    { isPrimary: true, ...createTraveller() },
  ]);
  const [kazakhstanVisaType, setKazakhstanVisaType] = useState("");
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [showMaritalFor, setShowMaritalFor] = useState(null);
  const [showOccupationFor, setShowOccupationFor] = useState(null);

  const formatDate = (date) => {
    const [y, m, d] = String(date || "").split("-");
    if (!y || !m || !d) return "";
    return `${d}/${m}/${y}`;
  };

  const getSample = (key) => {
    if (key === "passportFront") return PassportFrontSample;
    if (key === "passportBack") return PassportBackSample;
    if (key === "photo") return PassportPhotoSample;
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
      mediaType: "photo",
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
    const requiredFields = [
      "travelDate",
      "phone",
      "email",
      "hotelName",
      "occupation",
      "maritalStatus",
    ];

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

      const applicationId = `kazakhstan_${Date.now()}`;

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
            `${basePath}/passport_photo.${getFileExtension(
              t.documents.photo,
              "jpg"
            )}`
          );

          return {
            isPrimary: t.isPrimary,
            travelDate: t.form.travelDate,
            phone: t.form.phone,
            email: t.form.email,
            visaType: kazakhstanVisaType || "tourist",
            hotelName: t.form.hotelName,
            occupation: t.form.occupation,
            maritalStatus: t.form.maritalStatus,
            passportFrontPage,
            documents: {
              passportFrontUrl,
              passportBackUrl,
              photoUrl,
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
          country: "Kazakhstan",
          visaType: kazakhstanVisaType || "tourist",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Kazakhstan",
        applicationId,
        kazakhstanVisaType: kazakhstanVisaType || "tourist",
        totalTravellers: travellers.length,
        travellers,
        coTravellers: travellers.slice(1),
      });
    } catch (error) {
      console.log("Kazakhstan submit error:", error);
      Alert.alert("Error", "Unable to submit application. Please try again.");
    }
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

      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={kazakhstanVisaType}
          onValueChange={(v) => setKazakhstanVisaType(v)}
          style={styles.picker}
        >
          <Picker.Item label="Select Visa Type" value="" />
          <Picker.Item label="Tourist Visa" value="tourist" />
          <Picker.Item label="Business Visa" value="business" />
        </Picker>
      </View>

      <TextInput
        placeholder="Hotel Name"
        style={styles.input}
        value={traveller.form.hotelName}
        onChangeText={(v) => onChange("hotelName", v)}
        placeholderTextColor="#111827"
      />

      <TouchableOpacity style={styles.input} onPress={() => setShowOccupationFor(target)}>
        <Text style={traveller.form.occupation ? styles.inputText : styles.inputPlaceholder}>
          {traveller.form.occupation || "Select Occupation"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input} onPress={() => setShowMaritalFor(target)}>
        <Text style={traveller.form.maritalStatus ? styles.inputText : styles.inputPlaceholder}>
          {traveller.form.maritalStatus || "Select Marital Status"}
        </Text>
      </TouchableOpacity>

      {[
        { key: "passportFront", label: "Upload Passport Front Page" },
        { key: "passportBack", label: "Upload Passport Back Page" },
        { key: "photo", label: "Upload Passport Size Photo" },
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
          <TouchableOpacity style={styles.uploadBtn} onPress={() => pickDocument(target, key)}>
            <Text style={styles.uploadText}>
              {traveller.documents[key] ? "Replace Document" : "Upload Document"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <ApplyCountryHeader navigation={navigation} countryName="Kazakhstan" />

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

      <Modal visible={!!showMaritalFor} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.selectModalBox}>
            <Text style={styles.selectModalTitle}>Select Marital Status</Text>
            <ScrollView>
              {MARITAL_STATUS_OPTIONS.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.optionBtn}
                  onPress={() => {
                    if (showMaritalFor === "main") {
                      const updated = [...travellers];
                      updated[0].form.maritalStatus = status;
                      setTravellers(updated);
                    } else {
                      setTempTraveller((prev) => ({
                        ...prev,
                        form: { ...prev.form, maritalStatus: status },
                      }));
                    }
                    setShowMaritalFor(null);
                  }}
                >
                  <Text style={styles.optionText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowMaritalFor(null)}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={!!showOccupationFor} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.selectModalBox}>
            <Text style={styles.selectModalTitle}>Select Occupation</Text>
            <ScrollView>
              {OCCUPATION_OPTIONS.map((occupation) => (
                <TouchableOpacity
                  key={occupation}
                  style={styles.optionBtn}
                  onPress={() => {
                    if (showOccupationFor === "main") {
                      const updated = [...travellers];
                      updated[0].form.occupation = occupation;
                      setTravellers(updated);
                    } else {
                      setTempTraveller((prev) => ({
                        ...prev,
                        form: { ...prev.form, occupation },
                      }));
                    }
                    setShowOccupationFor(null);
                  }}
                >
                  <Text style={styles.optionText}>{occupation}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowOccupationFor(null)}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
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
    marginBottom: 14,
  },
  headerTitle: { fontSize: 17, fontWeight: "800" },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  inputText: { color: "#111827" },
  inputPlaceholder: { color: "#111827" },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  picker: {
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
  uploadText: { color: ORANGE, fontWeight: "800" },
  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 16,
    padding: 12,
  },
  selectModalBox: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 16,
    padding: 14,
    maxHeight: "65%",
  },
  selectModalTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  optionBtn: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  optionText: {
    fontSize: 15,
    color: "#111827",
    textAlign: "center",
  },
  cancelBtn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelText: {
    color: ORANGE,
    fontWeight: "800",
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


