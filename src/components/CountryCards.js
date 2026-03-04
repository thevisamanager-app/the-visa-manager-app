import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import { getCountryImage } from "../utils/countryImages";

const ORANGE = "#FF5C00";
const NAVY = "#0F2A5F";

export default function CountryCards({ item, countrName, onPress }) {
  const imageSource = getCountryImage(countrName);
  const visaType = String(item?.countryType || "Visa");

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

        <View style={styles.verifiedPill}>
          <Ionicons name="shield-checkmark" size={12} color="#0F766E" />
          <Text style={styles.verifiedText}>Verified</Text>
        </View>

        <View style={styles.heroTextWrap}>
          <Text numberOfLines={1} style={styles.countryName}>
            {countrName}
          </Text>
          <Text style={styles.subText}>Trusted visa support, every step.</Text>
        </View>
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity style={styles.ctaBtn} onPress={onPress} activeOpacity={0.9}>
          <Text style={styles.ctaText}>Apply Now</Text>
          <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.metaRow}>
          <Ionicons name="star" size={13} color="#F59E0B" />
          <Text style={styles.metaText}>Top choice for first-time applicants</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp("92%"),
    alignSelf: "center",
    borderRadius: moderateScale(24),
    overflow: "hidden",
    marginVertical: verticalScale(10),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 7,
  },
  imageWrap: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: verticalScale(210),
  },
  noImageFallback: {
    width: "100%",
    height: verticalScale(210),
    backgroundColor: "#CBD5E1",
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 18, 40, 0.34)",
  },
  typePill: {
    position: "absolute",
    top: moderateScale(12),
    left: moderateScale(12),
    backgroundColor: "rgba(15,42,95,0.92)",
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(11),
    paddingVertical: verticalScale(5),
  },
  typeText: {
    color: "#FFFFFF",
    fontSize: RFValue(10.2),
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  verifiedPill: {
    position: "absolute",
    top: moderateScale(12),
    right: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(9),
    paddingVertical: verticalScale(4),
  },
  verifiedText: {
    color: "#0F766E",
    fontSize: RFValue(10.2),
    fontWeight: "800",
    marginLeft: 4,
  },
  heroTextWrap: {
    position: "absolute",
    left: moderateScale(12),
    right: moderateScale(12),
    bottom: moderateScale(18),
    backgroundColor: "rgba(2, 9, 23, 0.55)",
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(8),
  },
  countryName: {
    color: "#FFFFFF",
    fontSize: RFValue(19),
    fontWeight: "800",
    marginBottom: verticalScale(4),
  },
  subText: {
    color: "#E2E8F0",
    fontSize: RFValue(11.2),
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  bottomArea: {
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(12),
    paddingHorizontal: moderateScale(12),
  },
  ctaBtn: {
    backgroundColor: ORANGE,
    minHeight: verticalScale(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(14),
    marginTop: verticalScale(-34),
    elevation: 4,
    borderWidth: 1,
    borderColor: "#FF8C4A",
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: RFValue(14.5),
    fontWeight: "800",
    marginRight: 8,
  },
  metaRow: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: moderateScale(999),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(5),
  },
  metaText: {
    marginLeft: 5,
    color: NAVY,
    fontSize: RFValue(10.2),
    fontWeight: "700",
  },
});
