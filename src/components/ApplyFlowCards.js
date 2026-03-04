import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFlagEmoji } from "../utils/countryIsoMap";
import { COUNTRY_VISA_CONFIG } from "../assets/data/countryVisaConfig";

const ORANGE = "#FF5C00";

const splitProcessingText = (value = "") => {
  const text = String(value || "").trim();
  if (!text) return { start: "", highlight: "" };

  const match = text.match(/(by\s+.+)$/i);
  if (!match) return { start: text, highlight: "" };

  const highlight = match[1];
  const start = text.slice(0, text.length - highlight.length).trimEnd();
  return { start, highlight };
};

export const CountryApplyBanner = ({ countryName, fallbackText }) => {
  const countryConfig = COUNTRY_VISA_CONFIG[countryName] || {};
  const title =
    countryConfig?.headerTitle?.replace(/\s+Visa Application$/i, "") ||
    countryName;
  const processingText = countryConfig?.processingText || fallbackText || "";
  const { start, highlight } = splitProcessingText(processingText);
  const flag = getFlagEmoji(countryName);

  return (
    <View style={styles.bannerCard}>
      <View style={styles.flagCircle}>
        <Text style={styles.flagText}>{flag}</Text>
      </View>

      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>{title}</Text>
        <Text style={styles.bannerSubtitle}>
          {start}
          {highlight ? (
            <Text style={styles.bannerSubtitleHighlight}>
              {start ? " " : ""}
              {highlight}
            </Text>
          ) : null}
        </Text>
      </View>
    </View>
  );
};

export const ApplyScreenHeader = ({ navigation, title }) => (
  <View style={styles.applyHeaderRow}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={26} color="#111827" />
    </TouchableOpacity>

    <View style={styles.applyHeaderCenterContainer}>
      <Text style={styles.applyHeaderCenterTitle} numberOfLines={1}>
        {title}
      </Text>
    </View>

    <TouchableOpacity
      onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
    >
      <Ionicons name="home-outline" size={24} color={ORANGE} />
    </TouchableOpacity>
  </View>
);

export const ApplyCountryHeader = ({ navigation, countryName, subtitle }) => {
  const countryConfig = COUNTRY_VISA_CONFIG[countryName] || {};
  const displayCountryName = countryName === "Sri-lanka" ? "Sri Lanka" : countryName;
  const finalSubtitle =
    subtitle || countryConfig?.processingText || `${displayCountryName} Visa Application`;
  const flag = getFlagEmoji(countryName);

  return (
    <View style={styles.applyCountryHeaderRow}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.applyCountryHeaderIconBtn}>
        <Ionicons name="chevron-back" size={26} color="#111827" />
      </TouchableOpacity>

      <View style={styles.applyCountryHeaderCenterCard}>
        <View style={styles.applyCountryHeaderFlagBubble}>
          <Text style={styles.applyCountryHeaderFlagText}>{flag}</Text>
        </View>
        <View style={styles.applyCountryHeaderTextWrap}>
          <Text style={styles.applyCountryHeaderCountryName}>{displayCountryName}</Text>
          <Text style={styles.applyCountryHeaderSubText}>{finalSubtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
        style={styles.applyCountryHeaderIconBtn}
      >
        <Ionicons name="home-outline" size={24} color={ORANGE} />
      </TouchableOpacity>
    </View>
  );
};

export const CoPassengerCard = ({
  coTravellerCount = 0,
  onAddPress,
  addLabel = "+ Add Co-Passenger",
}) => {
  const hasCoTravellers = coTravellerCount > 0;

  return (
    <View style={styles.coCard}>
      <View style={styles.coHeaderRow}>
        <Text style={styles.coTitle}>Co-Passengers</Text>
        <TouchableOpacity onPress={onAddPress} activeOpacity={0.8}>
          <Text style={styles.coAddText}>{addLabel}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.coBodyText}>
        {hasCoTravellers
          ? `${coTravellerCount} co-passenger${coTravellerCount > 1 ? "s" : ""} added.`
          : "No co-passengers added yet."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  applyHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  applyHeaderCenterContainer: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  applyHeaderCenterTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  applyCountryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  applyCountryHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  applyCountryHeaderCenterCard: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  applyCountryHeaderFlagBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF1E8",
    borderWidth: 1,
    borderColor: "#FFD7BF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  applyCountryHeaderFlagText: {
    fontSize: 18,
  },
  applyCountryHeaderTextWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  applyCountryHeaderCountryName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },
  applyCountryHeaderSubText: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textAlign: "center",
  },
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  flagCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1E8",
    borderWidth: 1,
    borderColor: "#FFD7BF",
    marginRight: 12,
  },
  flagText: {
    fontSize: 30,
  },
  bannerContent: {
    flex: 1,
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 20,
    lineHeight: 26,
    color: "#0F172A",
    fontWeight: "800",
    textAlign: "center",
  },
  bannerSubtitle: {
    marginTop: 3,
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
    fontWeight: "500",
    textAlign: "center",
  },
  bannerSubtitleHighlight: {
    color: ORANGE,
    fontWeight: "700",
  },
  coCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 12,
  },
  coHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coTitle: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "800",
  },
  coAddText: {
    fontSize: 15,
    color: ORANGE,
    fontWeight: "800",
  },
  coBodyText: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
  },
});
