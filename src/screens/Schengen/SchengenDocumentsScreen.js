import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import SchengenStepper from "../../components/SchengenStepper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { wp, hp, RFValue } from "../../utils/metrics";

const BLACK = "#000";
const GRAY = "#777";
const GOLD = "#D6B25E";

export default function SchengenDocumentsScreen({ navigation, route }) {
  /* ===================== REDUX ===================== */
  const destination = useSelector((state) => state.destinations.selected);
  const countryName = destination?.countrName || "France";

  /* ===================== PARAMS ===================== */
  const fullName = route?.params?.fullName || "Applicant";

  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  /* ===================== STATE (ALL HOOKS AT TOP) ===================== */
  const [passportDone, setPassportDone] = useState(false);
  const [companyDone, setCompanyDone] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  const completedCount = [passportDone, companyDone].filter(Boolean).length;

  /* ===================== SAVE COMPANY ===================== */
  const saveCompanyDetails = async () => {
    await saveSchengenData(countryName, {
      companyDetails: {
        companyName,
        address,
        city,
        zip,
        phone,
      },
    });

    setCompanyDone(true);
    setShowCompanyForm(false);
  };

  return (
    <ScreenWrapper>
      <SchengenStepper step={5} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("6%") }}
      >
        {/* TITLE */}
        <Text style={styles.title}>Just need some essential documents</Text>
        <Text style={styles.counter}>{completedCount}/2</Text>

        {/* APPLICANT */}
        <View style={styles.applicantRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.applicantName}>{fullName}</Text>
        </View>

        {/* PASSPORT CARD */}
        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Passport Scan</Text>
            <Text style={styles.cardSub}>Scan · Upload</Text>
          </View>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => setPassportDone(true)}
          >
            <Text style={styles.outlineText}>
              {passportDone ? "UPLOADED" : "UPLOAD"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* COMPANY CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Company Details</Text>

          {!showCompanyForm && (
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.outlineBtn}
                onPress={() => setShowCompanyForm(true)}
              >
                <Text style={styles.outlineText}>ENTER MANUALLY</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.outlineBtn}>
                <Text style={styles.outlineText}>OPEN MAP</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* INLINE FORM */}
        {showCompanyForm && (
          <View style={styles.form}>
            <Label text="Company Name*" />
            <Input value={companyName} onChangeText={setCompanyName} />

            <Label text="Address*" />
            <Input value={address} onChangeText={setAddress} />

            <Label text="City*" />
            <Input value={city} onChangeText={setCity} />

            <Label text="Zip Code*" />
            <Input
              value={zip}
              onChangeText={setZip}
              keyboardType="number-pad"
            />

            <Label text="Company Phone Number*" />
            <Input
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveCompanyDetails}
            >
              <Text style={styles.saveText}>Save Details</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* PROCEED */}
        <TouchableOpacity
          disabled={completedCount !== 2}
          style={[
            styles.proceedBtn,
            completedCount !== 2 && { opacity: 0.4 },
          ]}
          onPress={() =>
            navigation.navigate("PhotoUploadScreen", route?.params)
          }
        >
          <Text style={styles.proceedText}>PROCEED</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ===================== SMALL COMPONENTS ===================== */
const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const Input = ({ value, ...props }) => (
  <TextInput
    {...props}
    value={value || ""}
    style={styles.input}
    placeholderTextColor={GRAY}
  />
);

/* ===================== STYLES ===================== */
const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(24),
    textAlign: "center",
    marginTop: hp("2%"),
  },
  counter: {
    textAlign: "center",
    color: GRAY,
    marginBottom: hp("2%"),
  },
  applicantRow: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F3F6F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  avatarText: {
    fontWeight: "700",
    color: "#2AA198",
  },
  applicantName: {
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: hp("2%"),
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: RFValue(15),
    marginBottom: 6,
  },
  cardSub: {
    color: GRAY,
    fontSize: RFValue(12),
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  outlineBtn: {
    borderWidth: 1,
    borderColor: BLACK,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
  },
  outlineText: {
    fontWeight: "600",
    fontSize: RFValue(12),
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: hp("3%"),
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
  },
  saveBtn: {
    backgroundColor: GOLD,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    fontWeight: "700",
  },
  proceedBtn: {
    backgroundColor: BLACK,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(15),
  },
});
