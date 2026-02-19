import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  bannerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F2",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FFE5D0",
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  flagCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ORANGE,
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
    fontSize: 22,
    lineHeight: 28,
    color: "#111827",
    fontWeight: "700",
    textAlign: "center",
  },
  bannerSubtitle: {
    marginTop: 3,
    fontSize: 16,
    lineHeight: 22,
    color: "#374151",
    fontWeight: "500",
    textAlign: "center",
  },
  bannerSubtitleHighlight: {
    color: ORANGE,
    fontWeight: "700",
  },
  coCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#ECEFF3",
    elevation: 2,
    marginVertical: 12,
  },
  coHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coTitle: {
    fontSize: 17,
    color: "#111827",
    fontWeight: "700",
  },
  coAddText: {
    fontSize: 17,
    color: ORANGE,
    fontWeight: "700",
  },
  coBodyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
  },
});
