import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import { getCountryImage } from "../utils/countryImages";
import { getFlagEmoji } from "../utils/countryIsoMap";

export default function CountryCards({ item, countrName, onPress }) {
  const imageSource = getCountryImage(countrName);
  const visaType = String(item?.countryType || "Visa").toUpperCase();
  const liveVisitors = Number(item?.liveCount || 1);
  const flagEmoji = getFlagEmoji(countrName);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.94}>
      <View style={styles.imageWrap}>
        {imageSource ? (
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.noImageFallback} />
        )}
        <View style={styles.imageShade} />

        <View style={styles.typePill}>
          <Text style={styles.typeText}>{visaType}</Text>
        </View>

        <View style={styles.flagPill}>
          <Text style={styles.flagText}>{flagEmoji}</Text>
        </View>

        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE visitors {liveVisitors}</Text>
        </View>

        <View style={styles.heroTextWrap}>
          <Text numberOfLines={1} style={styles.countryTypeTitle}>
            {visaType}
          </Text>
          <Text numberOfLines={1} style={styles.countryName}>
            {countrName?.toUpperCase() === "USA" ? "USA" : countrName}
          </Text>
        </View>

        <TouchableOpacity style={styles.ctaBtn} onPress={onPress} activeOpacity={0.9}>
          <Text style={styles.ctaText}>START APPLICATION</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp("92%"),
    alignSelf: "center",
    borderRadius: moderateScale(22),
    overflow: "hidden",
    marginVertical: verticalScale(10),
    backgroundColor: "#0B1220",
    elevation: 8,
  },
  imageWrap: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: verticalScale(255),
  },
  noImageFallback: {
    width: "100%",
    height: verticalScale(255),
    backgroundColor: "#CBD5E1",
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.34)",
  },
  typePill: {
    position: "absolute",
    top: moderateScale(12),
    left: moderateScale(68),
    backgroundColor: "rgba(11, 25, 60, 0.92)",
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  typeText: {
    color: "#FFFFFF",
    fontSize: RFValue(10.8),
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  flagPill: {
    position: "absolute",
    top: moderateScale(12),
    left: moderateScale(12),
    width: moderateScale(46),
    height: moderateScale(32),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: moderateScale(8),
  },
  flagText: {
    fontSize: RFValue(18),
  },
  livePill: {
    position: "absolute",
    top: moderateScale(12),
    right: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.7)",
    borderColor: "rgba(255,255,255,0.45)",
    borderWidth: 1,
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(11),
    paddingVertical: verticalScale(5),
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
    marginRight: 6,
  },
  liveText: {
    color: "#FFFFFF",
    fontSize: RFValue(10.4),
    fontWeight: "800",
  },
  heroTextWrap: {
    position: "absolute",
    left: moderateScale(12),
    right: moderateScale(12),
    bottom: moderateScale(58),
    alignItems: "center",
  },
  countryTypeTitle: {
    color: "#F8FAFC",
    fontSize: RFValue(14),
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  countryName: {
    color: "#FFFFFF",
    fontSize: RFValue(31),
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  ctaBtn: {
    position: "absolute",
    left: moderateScale(40),
    right: moderateScale(40),
    bottom: moderateScale(14),
    backgroundColor: "rgba(13, 20, 9, 0.82)",
    borderColor: "rgba(212, 255, 138, 0.45)",
    borderWidth: 1,
    minHeight: verticalScale(38),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(14),
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: RFValue(12.4),
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
