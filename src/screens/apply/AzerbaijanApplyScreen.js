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
import ScreenWrapper from "../../components/ScreenWrapper";
import { CountryApplyBanner, CoPassengerCard } from "../../components/ApplyFlowCards";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";

const ORANGE = "#FF5C00";

/* Traveller Factory */
const createTraveller = () => ({
  form: {
    travelDate: "",
    phone: "",
    email: "",
    hotelName: "",
  },
  documents: {
    passportFront: null,
    passportBack: null,
  },
});

export default function AzerbaijanApplyScreen({ navigation }) {

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

  const pickDocument = async (target, key) => {
    const res = await launchImageLibrary({ mediaType: "photo", quality: 0.9 });
    if (!res.assets?.[0]) return;

    if (target === "main") {
      const updated = [...travellers];
      updated[0].documents[key] = res.assets[0];
      setTravellers(updated);
    } else {
      setTempTraveller((p) => ({
        ...p,
        documents: { ...p.documents, [key]: res.assets[0] },
      }));
    }
  };

  const validateTraveller = (t) => {
    const { form, documents } = t;

    if (!form.travelDate || !form.phone || !form.email || !form.hotelName) {
      Alert.alert("Missing Info", "Please complete all fields.");
      return false;
    }

    for (const v of Object.values(documents)) {
      if (!v) {
        Alert.alert("Missing Document", "Upload all required documents.");
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

      const applicationId = `azerbaijan_${Date.now()}`;

      const formattedTravellers = travellers.map(t => ({
        isPrimary: t.isPrimary,
        travelDate: t.form.travelDate,
        phone: t.form.phone,
        email: t.form.email,
        hotelName: t.form.hotelName,
        documents: {
          passportFrontUrl: t.documents.passportFront?.uri || null,
          passportBackUrl: t.documents.passportBack?.uri || null,
        }
      }));

      await firestore()
        .collection("users")
        .doc(user.uid)
        .collection("passportData")
        .doc(applicationId)
        .set({
          userId: user.uid,
          country: "Azerbaijan",
          travellers: formattedTravellers,
          totalTravellers: formattedTravellers.length,
          status: "submitted",
          createdAt: serverTimestamp(),
        });

      navigation.navigate("CheckoutScreen", {
        country: "Azerbaijan",
        applicationId,
      });

    } catch (error) {
      console.log("Azerbaijan submit error:", error);
      Alert.alert("Error", "Something went wrong.");
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

      <TextInput
        placeholder="Hotel Name"
        style={styles.input}
        value={traveller.form.hotelName}
        onChangeText={(v) => onChange("hotelName", v)}
      />

      {["passportFront", "passportBack"].map((key) => (
        <View key={key} style={styles.docCard}>
          <Text style={styles.docLabel}>
            {key === "passportFront"
              ? "Upload Passport Front Page"
              : "Upload Passport Back Page"} *
          </Text>

          {!traveller.documents[key] ? (
            <Image
              source={key === "passportFront" ? PassportFrontSample : PassportBackSample}
              style={styles.sampleImage}
              resizeMode="contain"
            />
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
        <CountryApplyBanner countryName="Azerbaijan" />

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

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: { fontSize: 17, fontWeight: "700" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
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

  sampleImage: { height: 95, width: "100%" },

  previewImage: { height: 110, borderRadius: 10, marginBottom: 8 },

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
    marginVertical: 16,
  },

  addTravellerText: { color: ORANGE, fontWeight: "700" },

  submitBtn: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  submitText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
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

  calendarBox: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 12,
  },
});