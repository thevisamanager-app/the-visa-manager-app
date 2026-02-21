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
const DESIGNATION_OPTIONS = [
  "Manager",
  "Engineer",
  "Executive",
  "Analyst",
  "Consultant",
  "Supervisor",
  "Director",
  "Other",
];

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    addressInIndia: "",
    addressInQatar: "",
    occupation: "",
    maritalStatus: "",
    designation: "",
    emergencyContactNumber: "",
    emergencyContactDetail: "",
    emergencyContactEmail: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    hotelVoucher: null,
  },
});

export default function QatarApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([{ isPrimary: true, ...createTraveller() }]);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [showMaritalFor, setShowMaritalFor] = useState(null);
  const [showOccupationFor, setShowOccupationFor] = useState(null);
  const [showDesignationFor, setShowDesignationFor] = useState(null);

  const formatDate = (date) => {
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  };

  const getSample = (key) => {
    if (key === "passportFront") return PassportFrontSample;
    if (key === "passportBack") return PassportBackSample;
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

  const requiredFields = [
    "travelDate",
    "phone",
    "email",
    "addressInIndia",
    "addressInQatar",
    "occupation",
    "maritalStatus",
    "designation",
    "emergencyContactNumber",
    "emergencyContactDetail",
    "emergencyContactEmail",
  ];

  const validateTraveller = (traveller) => {
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

      const applicationId = `qatar_${Date.now()}`;

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
          const hotelVoucherUrl = await uploadFile(
            t.documents.hotelVoucher,
            `${basePath}/hotel_voucher.${getFileExtension(t.documents.hotelVoucher, "jpg")}`
          );

          return {
            isPrimary: t.isPrimary,
            travelDate: t.form.travelDate,
            phone: t.form.phone,
            email: t.form.email,
            addressInIndia: t.form.addressInIndia,
            addressInQatar: t.form.addressInQatar,
            occupation: t.form.occupation,
            maritalStatus: t.form.maritalStatus,
            designation: t.form.designation,
            emergencyContact: {
              number: t.form.emergencyContactNumber,
              detail: t.form.emergencyContactDetail,
              email: t.form.emergencyContactEmail,
            },
            documents: {
              passportFrontUrl,
              passportBackUrl,
              hotelVoucherUrl,
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
          country: "Qatar",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Qatar",
        travellers,
      });
    } catch (error) {
      console.log("Qatar submit error:", error);
      Alert.alert("Error", "Unable to submit application. Please try again.");
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
        placeholder="Address In India"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.addressInIndia}
        onChangeText={(v) => onChange("addressInIndia", v)}
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Address In Qatar"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.addressInQatar}
        onChangeText={(v) => onChange("addressInQatar", v)}
        placeholderTextColor="#9CA3AF"
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

      <TouchableOpacity style={styles.input} onPress={() => setShowDesignationFor(target)}>
        <Text style={traveller.form.designation ? styles.inputText : styles.inputPlaceholder}>
          {traveller.form.designation || "Select Designation"}
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Emergency Contact Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.emergencyContactNumber}
        onChangeText={(v) => onChange("emergencyContactNumber", v)}
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Emergency Contact Detail"
        style={styles.input}
        value={traveller.form.emergencyContactDetail}
        onChangeText={(v) => onChange("emergencyContactDetail", v)}
        placeholderTextColor="#9CA3AF"
      />

      <TextInput
        placeholder="Emergency Contact Email"
        style={styles.input}
        value={traveller.form.emergencyContactEmail}
        onChangeText={(v) => onChange("emergencyContactEmail", v)}
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
      />

      {[
        { key: "passportFront", label: "Upload Passport Front Page" },
        { key: "passportBack", label: "Upload Passport Back Page" },
        { key: "hotelVoucher", label: "Upload Hotel Confirmation Voucher" },
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
        <ApplyCountryHeader navigation={navigation} countryName="Qatar" />

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

      <Modal visible={!!showDesignationFor} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.selectModalBox}>
            <Text style={styles.selectModalTitle}>Select Designation</Text>
            <ScrollView>
              {DESIGNATION_OPTIONS.map((designation) => (
                <TouchableOpacity
                  key={designation}
                  style={styles.optionBtn}
                  onPress={() => {
                    if (showDesignationFor === "main") {
                      const updated = [...travellers];
                      updated[0].form.designation = designation;
                      setTravellers(updated);
                    } else {
                      setTempTraveller((prev) => ({
                        ...prev,
                        form: { ...prev.form, designation },
                      }));
                    }
                    setShowDesignationFor(null);
                  }}
                >
                  <Text style={styles.optionText}>{designation}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowDesignationFor(null)}>
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
  selectModalBox: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 14,
    maxHeight: "65%",
  },
  selectModalTitle: {
    fontSize: 16,
    fontWeight: "700",
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
    fontWeight: "700",
  },
});
