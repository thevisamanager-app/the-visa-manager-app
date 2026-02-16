import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import { getFlagEmoji } from "../utils/countryIsoMap";
import { COUNTRY_IMAGES } from "../utils/countryImages";

/* -------- helpers -------- */

const getGovernmentFee = (fee) => {
  if (!fee) return 0;

  if (typeof fee === "number" || typeof fee === "string") {
    return fee;
  }

  if (typeof fee === "object") {
    const values = Object.values(fee)
      .map((v) => Number(String(v).replace(/,/g, "")))
      .filter((v) => !isNaN(v));

    return values.length ? Math.min(...values) : 0;
  }

  return 0;
};

const getServiceFee = (fee) => {
  if (!fee) return 0;
  if (typeof fee === "number" || typeof fee === "string") return fee;
  if (typeof fee === "object") return fee.Single || 0;
  return 0;
};

export default function CountryCards({ item, countrName, onPress }) {
  const visaType = item.countryType?.toUpperCase() || "VISA";
  const flag = getFlagEmoji(countrName);
  const imageSource = COUNTRY_IMAGES[countrName];

  const [liveCount, setLiveCount] = useState(item.liveCount ?? 5);

  const governmentFee = getGovernmentFee(item.GovernmentFee);
  const serviceFee = getServiceFee(item.AuthorityCharges);

  /* -------- AUTO LIVE COUNT -------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1,0,1
        const next = prev + change;
        return next < 1 ? 1 : next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      
      {/* -------- HEADER -------- */}
      <View style={styles.topRow}>
        <View style={styles.flagBox}>
          <Text style={styles.flag}>{flag}</Text>
        </View>

        <View style={styles.rightHeader}>
          <Text style={styles.visaType}>{visaType}</Text>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE visitors {liveCount}</Text>
          </View>
        </View>
      </View>

      {/* -------- COUNTRY NAME -------- */}
      <Text style={styles.title}>{countrName}</Text>

      {/* -------- IMAGE -------- */}
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      )}

      {/* -------- SUBTITLE -------- */}
      {item.subtitle && (
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      )}

      {/* -------- BULLETS -------- */}
      {Array.isArray(item.bullets) &&
        item.bullets.map((text, index) => (
          <View key={index} style={styles.bulletRow}>
            <View style={styles.dot} />
            <Text style={styles.bulletText}>{text}</Text>
          </View>
        ))}

      {/* -------- PRICE -------- */}
      <View style={styles.priceSection}>
        <Text style={styles.price}>
          ₹{governmentFee}
          <Text style={styles.perAdult}> per adult</Text>
        </Text>

        <Text style={styles.fee}>All inclusive</Text>
      </View>

      {/* -------- APPLY BUTTON -------- */}
      <TouchableOpacity style={styles.applyButton} onPress={onPress}>
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    width: wp("92%"),
    alignSelf: "center",
    backgroundColor: "#F8EFE6",
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    marginVertical: verticalScale(12),
    elevation: 5,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  flagBox: {
    backgroundColor: "#FFF",
    padding: 6,
    borderRadius: 8,
  },

  flag: {
    fontSize: RFValue(22),
  },

  rightHeader: {
    alignItems: "flex-end",
  },

  visaType: {
    fontSize: RFValue(12),
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 6,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF4D4F",
    marginRight: 6,
  },

  liveText: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#555",
  },

  title: {
    fontSize: RFValue(18),
    fontWeight: "800",
    marginTop: verticalScale(8),
    color: "#111",
  },

  image: {
    width: "100%",
    height: verticalScale(150),
    borderRadius: 14,
    marginTop: verticalScale(10),
  },

  subtitle: {
    marginTop: verticalScale(10),
    fontSize: RFValue(14),
    fontWeight: "700",
    color: "#E65100",
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6F00",
    marginRight: 8,
  },

  bulletText: {
    fontSize: RFValue(13),
    color: "#555",
  },

  priceSection: {
    marginTop: verticalScale(14),
  },

  price: {
    fontSize: RFValue(22),
    fontWeight: "800",
    color: "#111",
  },

  perAdult: {
    fontSize: RFValue(13),
    color: "#666",
  },

  fee: {
    fontSize: RFValue(12),
    color: "#888",
    marginTop: 2,
  },

  applyButton: {
    backgroundColor: "#F4511E",
    paddingVertical: verticalScale(12),
    borderRadius: 999,
    alignItems: "center",
    marginTop: verticalScale(14),
  },

  applyText: {
    color: "#FFF",
    fontSize: RFValue(15),
    fontWeight: "700",
  },
});