import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import SchengenStepper from "../../components/SchengenStepper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { wp, hp, RFValue } from "../../utils/metrics";

const ORANGE = "#FF5C00";
const BLACK = "#000";
const GREY = "#EEE";

export default function SchengenAddressScreen({ navigation, route }) {
  /* ================= HOOKS ================= */
  const destination = useSelector((state) => state.destinations.selected);
  const countryName = destination?.countrName || "Schengen";

  const [maritalStatus, setMaritalStatus] = useState("Single");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [employmentDetail, setEmploymentDetail] = useState("");

  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const isComplete = address && zip && city && state;

  /* ================= SAVE ================= */
  const next = async () => {
    await saveSchengenData(countryName, {
      profile: {
        maritalStatus,
        employmentStatus,
        employmentDetail,
      },
      address: {
        address,
        zip,
        city,
        state,
      },
    });

    navigation.navigate("SchengenAppointment", route?.params);
  };

  /* ================= UI HELPERS ================= */
  const Option = ({ label, selected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.option, selected && styles.optionActive]}
    >
      <Text style={[styles.optionText, selected && styles.optionTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper style={styles.container}>
      <SchengenStepper step={2} />

      {/* 🔥 SCROLL FIX */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("5%") }}
      >
        <Text style={styles.title}>Enter a few basic details</Text>
        <Text style={styles.subtitle}>
          This helps us understand which documents you need
        </Text>

        <View style={styles.card}>
          {/* MARITAL STATUS */}
          <Text style={styles.section}>What is your marital status?</Text>
          <View style={styles.row}>
            {["Single", "Married", "Divorced", "Widowed"].map((item) => (
              <Option
                key={item}
                label={item}
                selected={maritalStatus === item}
                onPress={() => setMaritalStatus(item)}
              />
            ))}
          </View>

          {/* EMPLOYMENT STATUS */}
          <Text style={styles.section}>What is your employment status?</Text>
          <View style={styles.row}>
            {["Employed", "Self Employed", "Unemployed", "Retired"].map(
              (item) => (
                <Option
                  key={item}
                  label={item}
                  selected={employmentStatus === item}
                  onPress={() => {
                    setEmploymentStatus(item);
                    setEmploymentDetail("");
                  }}
                />
              )
            )}
          </View>

          {/* TELL US MORE */}
          {employmentStatus === "Self Employed" && (
            <>
              <Text style={styles.section}>Tell us more</Text>
              <View style={styles.row}>
                {[
                  "Run a Business",
                  "Freelancer",
                  "Stock Trader",
                  "Self Employed",
                ].map((item) => (
                  <Option
                    key={item}
                    label={item}
                    selected={employmentDetail === item}
                    onPress={() => setEmploymentDetail(item)}
                  />
                ))}
              </View>
            </>
          )}

          {/* ADDRESS */}
          <Text style={styles.section}>What's your current address?</Text>

          <TextInput
            placeholder="Address*"
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#999"
          />

          <View style={styles.split}>
            <TextInput
              placeholder="Zip Code*"
              style={[styles.input, styles.half]}
              value={zip}
              onChangeText={setZip}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="City*"
              style={[styles.input, styles.half]}
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#999"
            />
          </View>

          <TextInput
            placeholder="State*"
            style={styles.input}
            value={state}
            onChangeText={setState}
            placeholderTextColor="#999"
          />

          {/* BUTTONS */}
          <View style={styles.buttons}>
            {/* <TouchableOpacity style={styles.mapBtn}>
              <Text style={{ color: "#fff" }}>Open map</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.doneBtn, !isComplete && { opacity: 0.5 }]}
              disabled={!isComplete}
              onPress={next}
            >
              <Text style={{ color: "#fff", fontWeight: "700", justifyContent: "center" }}>
                Complete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: RFValue(26),
    marginTop: hp("2%"),
  },
  subtitle: {
    color: "#777",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    elevation: 4,
  },
  section: {
    fontSize: RFValue(14),
    marginVertical: 10,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  option: {
    width: "48%",
    paddingVertical: 12,
    backgroundColor: GREY,
    borderRadius: 22,
    alignItems: "center",
    marginBottom: 10,
  },
  optionActive: {
    backgroundColor: BLACK,
  },
  optionText: {
    color: "#333",
  },
  optionTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  split: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  half: {
    width: "48%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignSelf: "center"
  },
  mapBtn: {
    backgroundColor: BLACK,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  doneBtn: {
    backgroundColor: ORANGE,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 20,
    justifyContent: "center"
  },
});
