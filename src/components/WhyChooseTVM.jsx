import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  COUNTRY_WHY_CHOOSE,
  DEFAULT_WHY_CHOOSE,
} from "../utils/countryWhyChoose";

/* --------------------------------
   NORMALIZE COUNTRY NAME
-------------------------------- */
const normalizeCountry = (name = "") => {
  return name
    .toString()
    .trim()
    .replace(/-/g, " ")      // Hong-Kong → Hong Kong
    .replace(/\s+/g, " ")   // extra spaces
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()); // title case
};

const WhyChooseTVM = ({ country }) => {
  const normalizedCountry = normalizeCountry(country);

  const items =
    COUNTRY_WHY_CHOOSE[normalizedCountry] || DEFAULT_WHY_CHOOSE;

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Icon name={item.icon} size={18} color="#00C853" />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default WhyChooseTVM;

/* --------------------------------
   STYLES
-------------------------------- */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    rowGap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    justifyContent: "center",
    gap: 6,
  },

  text: {
    fontSize: 11,
    color: "#2E2E2E",
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },
});
