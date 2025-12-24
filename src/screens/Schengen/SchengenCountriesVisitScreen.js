import React, { useState } from "react";
import {
  View,
  Text,
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
const MAX_SELECTION = 6;

/* ---------------- DATA ---------------- */
const POPULAR_COUNTRIES = [
  "Greece",
  "Switzerland",
  "France",
  "Spain",
  "Italy",
  "Austria",
];

const OTHER_COUNTRIES = [
  "Germany",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Croatia",
  "Slovenia",
  "Slovakia",
];

/* ---------------- COMPONENT ---------------- */
export default function SchengenCountriesVisitScreen({ navigation, route }) {
  const destination = useSelector((state) => state.destinations.selected);
  const countryName = destination?.countrName || "Schengen";

  const [selectedCountries, setSelectedCountries] = useState([]);

  /* ---------------- TOGGLE ---------------- */
  const toggleCountry = (country) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country);
      }
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, country];
    });
  };

  /* ---------------- SAVE ---------------- */
  const next = async () => {
    if (selectedCountries.length === 0) return;

    await saveSchengenData(countryName, {
      visitingCountries: selectedCountries,
    });

    navigation.navigate("PassportUploadScreen", route?.params);
  };

  /* ---------------- RENDER PILL ---------------- */
  const renderPill = (country) => {
    const isSelected = selectedCountries.includes(country);
    return (
      <TouchableOpacity
        key={country}
        onPress={() => toggleCountry(country)}
        style={[
          styles.pill,
          isSelected && styles.pillActive,
        ]}
      >
        <Text
          style={[
            styles.pillText,
            isSelected && styles.pillTextActive,
          ]}
        >
          {country}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper style={styles.container}>
      <SchengenStepper step={4} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("8%") }}
      >
        {/* TITLE */}
        <Text style={styles.title}>
          Which countries do you plan to visit tentatively?
        </Text>
        <Text style={styles.subtitle}>
          Ideally don’t include more than 6. Can be updated later too.
        </Text>

        {/* POPULAR */}
        <Text style={styles.section}>POPULAR</Text>
        <View style={styles.pillWrap}>
          {POPULAR_COUNTRIES.map(renderPill)}
        </View>

        {/* OTHERS */}
        <Text style={styles.section}>OTHERS</Text>
        <View style={styles.pillWrap}>
          {OTHER_COUNTRIES.map(renderPill)}
        </View>

        {/* CONTINUE */}
        <TouchableOpacity
          style={[
            styles.continueBtn,
            selectedCountries.length === 0 && { opacity: 0.4 },
          ]}
          disabled={selectedCountries.length === 0}
          onPress={next}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: RFValue(24),
    marginTop: hp("2%"),
    textAlign: "center",
  },
  subtitle: {
    fontSize: RFValue(13),
    color: "#666",
    marginTop: 8,
    textAlign: "center",
    marginBottom: hp("3%"),
  },
  section: {
    fontSize: RFValue(11),
    color: "#999",
    letterSpacing: 1,
    marginBottom: 10,
  },
  pillWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: hp("3%"),
  },
  pill: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  pillActive: {
    backgroundColor: "#FFF1E6",
    borderColor: ORANGE,
  },
  pillText: {
    fontSize: RFValue(13),
    color: "#111",
  },
  pillTextActive: {
    color: ORANGE,
    fontWeight: "600",
  },
  continueBtn: {
    backgroundColor: BLACK,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: hp("2%"),
  },
  continueText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontWeight: "700",
  },
});
