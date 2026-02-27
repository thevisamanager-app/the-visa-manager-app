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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { launchImageLibrary } from "react-native-image-picker";
import { validatePickedDocument } from "../../utils/documentValidation";
import auth from "@react-native-firebase/auth";
import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ScreenWrapper from "../../components/ScreenWrapper";
import { CountryApplyBanner, CoPassengerCard } from "../../components/ApplyFlowCards";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passportimage.png";
import TicketSample from "../../assets/examples/ticket.png";
import DESTINATIONS from "../../assets/data/destinations";

const ORANGE = "#FF5C00";
const COUNTRY_OPTIONS = [...new Set(DESTINATIONS.map((item) => item.countrName).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b));

const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    hotelDetails: "",
    educationDetails: "",
    companyName: "",
    companyAddress: "",
    companyContactNumber: "",
    companyEmail: "",
    spouseName: "",
    spousePhone: "",
    motherName: "",
    motherPhone: "",
    fatherName: "",
    fatherPhone: "",
    travelHistoryCountries: [],
    facebook: "",
    instagram: "",
    twitter: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
    photo: null,
  },
});

export default function RussiaApplyScreen({ navigation }) {
  const [travellers, setTravellers] = useState([{ isPrimary: true, ...createTraveller() }]);
  const [tempTraveller, setTempTraveller] = useState(createTraveller());
  const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
  const [showCalendarFor, setShowCalendarFor] = useState(null);
  const [showCountryPickerFor, setShowCountryPickerFor] = useState(null);
  const [countrySearch, setCountrySearch] = useState("");

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

    const validation = await validatePickedDocument(key, selectedAsset);
    if (!validation.ok) {
      Alert.alert("Invalid Document", validation.message);
      return;
    }

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
    "hotelDetails",
    "educationDetails",
    "companyName",
    "companyAddress",
    "companyContactNumber",
    "companyEmail",
    "spouseName",
    "spousePhone",
    "motherName",
    "motherPhone",
    "fatherName",
    "fatherPhone",
    "travelHistoryCountries",
    "facebook",
    "instagram",
    "twitter",
  ];

  const validateTraveller = (traveller) => {
    for (const field of requiredFields) {
      if (field === "travelHistoryCountries") {
        if (!traveller.form.travelHistoryCountries?.length) {
          Alert.alert("Missing Info", "Please select travel history countries.");
          return false;
        }
        continue;
      }
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

  const filteredCountryOptions = useMemo(() => {
    const search = countrySearch.trim().toLowerCase();
    if (!search) return COUNTRY_OPTIONS;
    return COUNTRY_OPTIONS.filter((country) => country.toLowerCase().includes(search));
  }, [countrySearch]);

  const toggleTravelCountry = (target, country) => {
    const toggle = (list = []) =>
      list.includes(country) ? list.filter((item) => item !== country) : [...list, country];

    if (target === "main") {
      const updated = [...travellers];
      updated[0].form.travelHistoryCountries = toggle(updated[0].form.travelHistoryCountries);
      setTravellers(updated);
      return;
    }

    setTempTraveller((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        travelHistoryCountries: toggle(prev.form.travelHistoryCountries),
      },
    }));
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

      const applicationId = `russia_${Date.now()}`;

      const formattedTravellers = await Promise.all(
        travellers.map(async (t, index) => {
          const basePath = `applications/${user.uid}/${applicationId}/traveller_${index + 1}`;
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

          return {
            isPrimary: t.isPrimary,
            travelDate: t.form.travelDate,
            phone: t.form.phone,
            email: t.form.email,
            hotelDetails: t.form.hotelDetails,
            educationDetails: t.form.educationDetails,
            occupationDetails: {
              companyName: t.form.companyName,
              address: t.form.companyAddress,
              contactNumber: t.form.companyContactNumber,
              emailId: t.form.companyEmail,
            },
            familyDetails: {
              spouseName: t.form.spouseName,
              spousePhone: t.form.spousePhone,
              motherName: t.form.motherName,
              motherPhone: t.form.motherPhone,
              fatherName: t.form.fatherName,
              fatherPhone: t.form.fatherPhone,
            },
            lastThreeYearsTravelHistory: t.form.travelHistoryCountries,
            socialLinks: {
              facebook: t.form.facebook,
              instagram: t.form.instagram,
              twitter: t.form.twitter,
            },
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
          country: "Russia",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Russia",
        travellers,
      });
    } catch (error) {
      console.log("Russia submit error:", error);
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
        placeholderTextColor="#000000"
      />

      <TextInput
        placeholder="Email ID"
        style={styles.input}
        value={traveller.form.email}
        onChangeText={(v) => onChange("email", v)}
        placeholderTextColor="#000000"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Hotel Details"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.hotelDetails}
        onChangeText={(v) => onChange("hotelDetails", v)}
        placeholderTextColor="#000000"
      />

      <Text style={styles.sectionTitle}>Education Details</Text>
      <TextInput
        placeholder="Education Details"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.educationDetails}
        onChangeText={(v) => onChange("educationDetails", v)}
        placeholderTextColor="#000000"
      />

      <Text style={styles.sectionTitle}>Occupational Details</Text>
      <TextInput
        placeholder="Company Name"
        style={styles.input}
        value={traveller.form.companyName}
        onChangeText={(v) => onChange("companyName", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Company Address"
        style={[styles.input, styles.textArea]}
        multiline
        value={traveller.form.companyAddress}
        onChangeText={(v) => onChange("companyAddress", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Company Contact Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.companyContactNumber}
        onChangeText={(v) => onChange("companyContactNumber", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Company Email ID"
        style={styles.input}
        value={traveller.form.companyEmail}
        onChangeText={(v) => onChange("companyEmail", v)}
        placeholderTextColor="#000000"
        autoCapitalize="none"
      />

      <Text style={styles.sectionTitle}>Family Details</Text>

      <TextInput
        placeholder="Spouse Name"
        style={styles.input}
        value={traveller.form.spouseName}
        onChangeText={(v) => onChange("spouseName", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Spouse Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.spousePhone}
        onChangeText={(v) => onChange("spousePhone", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Mother Name"
        style={styles.input}
        value={traveller.form.motherName}
        onChangeText={(v) => onChange("motherName", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Mother Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.motherPhone}
        onChangeText={(v) => onChange("motherPhone", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Father Name"
        style={styles.input}
        value={traveller.form.fatherName}
        onChangeText={(v) => onChange("fatherName", v)}
        placeholderTextColor="#000000"
      />
      <TextInput
        placeholder="Father Number"
        style={styles.input}
        keyboardType="phone-pad"
        value={traveller.form.fatherPhone}
        onChangeText={(v) => onChange("fatherPhone", v)}
        placeholderTextColor="#000000"
      />


      <Text style={styles.sectionTitle}>Last 3 Years Travel History</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setCountrySearch("");
          setShowCountryPickerFor(target);
        }}
      >
        <Text
          style={
            traveller.form.travelHistoryCountries.length
              ? styles.inputText
              : styles.inputPlaceholder
          }
        >
          {traveller.form.travelHistoryCountries.length
            ? `${traveller.form.travelHistoryCountries.length} countries selected`
            : "Select Countries (Multiple)"}
        </Text>
      </TouchableOpacity>

      {!!traveller.form.travelHistoryCountries.length && (
        <View style={styles.tagsWrap}>
          {traveller.form.travelHistoryCountries.map((country) => (
            <View key={country} style={styles.tagChip}>
              <Text style={styles.tagText}>{country}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Social Profile Links</Text>
      <TextInput
        placeholder="Facebook Profile Link"
        style={styles.input}
        value={traveller.form.facebook}
        onChangeText={(v) => onChange("facebook", v)}
        placeholderTextColor="#000000"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Instagram Profile Link"
        style={styles.input}
        value={traveller.form.instagram}
        onChangeText={(v) => onChange("instagram", v)}
        placeholderTextColor="#000000"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Twitter Profile Link"
        style={styles.input}
        value={traveller.form.twitter}
        onChangeText={(v) => onChange("twitter", v)}
        placeholderTextColor="#000000"
        autoCapitalize="none"
      />

      {[
        { key: "passportFront", label: "Upload Passport Front Page" },
        { key: "passportBack", label: "Upload Passport Back Page" },
        { key: "photo", label: "Upload Passport Size Photo" },
      ].map(({ key, label }) => (
        <View key={key} style={styles.docCard}>
          <Text style={styles.docLabel}>{label} *</Text>
          {!traveller.documents[key] ? (
            <View style={styles.sampleWrapper}>
              <Image source={getSample(key)} style={styles.sampleImage} resizeMode="contain" />
            </View>
          ) : (
            <Image source={{ uri: traveller.documents[key].uri }} style={styles.previewImage} />
          )}
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
        <ApplyCountryHeader navigation={navigation} countryName="Russia" />

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

      <Modal visible={!!showCountryPickerFor} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.countryModalBox}>
            <View style={styles.countryModalHeader}>
              <Text style={styles.countryModalTitle}>Select Travel History Countries</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowCountryPickerFor(null);
                  setCountrySearch("");
                }}
              >
                <Ionicons name="close" size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Search country"
              style={styles.input}
              value={countrySearch}
              onChangeText={setCountrySearch}
              placeholderTextColor="#000000"
            />

            <ScrollView style={styles.countryList} showsVerticalScrollIndicator={false}>
              {filteredCountryOptions.map((country) => {
                const selected =
                  showCountryPickerFor === "main"
                    ? travellers[0].form.travelHistoryCountries.includes(country)
                    : tempTraveller.form.travelHistoryCountries.includes(country);

                return (
                  <TouchableOpacity
                    key={country}
                    style={[styles.countryRow, selected && styles.countryRowSelected]}
                    onPress={() => toggleTravelCountry(showCountryPickerFor, country)}
                  >
                    <Text style={[styles.countryText, selected && styles.countryTextSelected]}>
                      {country}
                    </Text>
                    {selected ? (
                      <Ionicons name="checkmark-circle" size={20} color={ORANGE} />
                    ) : (
                      <Ionicons name="ellipse-outline" size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                setShowCountryPickerFor(null);
                setCountrySearch("");
              }}
            >
              <Text style={styles.submitText}>Done</Text>
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
  inputPlaceholder: { color: "#000000" },
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
  coTravellerCount: { textAlign: "center", color: "#6B7280", marginBottom: 12 },
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
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: "#FFF2E8",
    borderWidth: 1,
    borderColor: "#FFD9BF",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tagText: {
    color: "#7C2D12",
    fontSize: 12,
    fontWeight: "600",
  },
  countryModalBox: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 14,
    maxHeight: "80%",
  },
  countryModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  countryModalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  countryList: {
    marginTop: 4,
    marginBottom: 8,
  },
  countryRow: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countryRowSelected: {
    borderColor: "#FF5C00",
    backgroundColor: "#FFF7ED",
  },
  countryText: {
    color: "#111827",
    fontSize: 14,
  },
  countryTextSelected: {
    color: "#C2410C",
    fontWeight: "700",
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

