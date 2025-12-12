import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";
import {
  uploadPassportImage,
  savePassportData,
} from "../../api/user/passportService";
import auth from "@react-native-firebase/auth";


const ORANGE = "#FF5C00";
const ORANGE_LIGHT = "#FFE1CC";

export default function PassportUploadScreen({ navigation, route }) {
  const travel = route?.params?.travelDate || null;

  // current traveller photo (main or co-traveller)
  const currentPhotoUrl = route?.params?.photoUrl || null;

  // main traveller photo (for when we are adding co-traveller)
  const mainPhotoUrl =
    route?.params?.mainPhotoUrl ||
    route?.params?.passport?.photoUrl ||
    null;

  // flags
  const addMode = route?.params?.addMode || false; // adding co-traveller
  const editMode = route?.params?.editMode || false; // editing main passport

  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mrzData, setMrzData] = useState(null);
  const [date, setDate] = useState("");
  // PICK FRONT
  const pickFront = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      quality: 0.9,
    });

    if (!result.assets) return;
    const asset = result.assets[0];
    setFront(asset);

    try {
      if (!asset.base64) {
        Alert.alert("Error", "No image base64 found.");
        return;
      }
      const text = await extractTextFromImage(asset.base64);
      const parsed = parseMRZ(text);

      if (!parsed) {
        Alert.alert("OCR Failed", "Could not read passport MRZ. Try another photo.");
        return;
      }
      setMrzData(parsed);
    } catch (err) {
      console.log("OCR ERROR:", err);
      Alert.alert("Error", "Failed to scan passport front.");
    }
  };

  // PICK BACK
  const pickBack = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.9,
    });

    if (!result.assets) return;
    const asset = result.assets[0];
    setBack(asset);
  };

  // Continue upload SAVE
  const onContinue = async () => {
    if (!front || !back) {
      Alert.alert("Upload Required", "Please upload both front & back images.");
      return;
    }
    if (!mrzData) {
      Alert.alert("Scan Required", "Please ensure MRZ scan succeeded.");
      return;
    }

    try {
      setLoading(true);

      const frontUrl = await uploadPassportImage(front, "front");
      const backUrl = await uploadPassportImage(back, "back");

      const passportPayload = {
        ...mrzData,
        frontImageURL: frontUrl,
        backImageURL: backUrl,
        travel,
        photoUrl: currentPhotoUrl, // photo of the traveller going through this screen
        userId: auth().currentUser.uid,
      };
      console.log("PASSOPRTDOCREF==>", passportPayload)
      // ===================== ADD CO-TRAVELLER FLOW =====================
      if (addMode) {
        console.log("ADDING CO-TRAVELLER");

        const newTraveller = {
          id: Date.now().toString(),
          ...passportPayload,
        };

        const existingCoTravellers = route?.params?.coTravellers || [];
        const mainPassport = route?.params?.passport || {};

        navigation.navigate("PassportDetailsScreen", {
          // keep original main passenger as-is
          passport: mainPassport,
          travelDate: route?.params?.travelDate,
          // very important: keep main traveller photo, not co-traveller photo
          photoUrl: mainPhotoUrl || mainPassport.photoUrl || currentPhotoUrl,
          // append new co-traveller
          coTravellers: [...existingCoTravellers, newTraveller],
        });

        setLoading(false);
        return;
      }

      // ===================== EDIT (MAIN PASSPORT) FLOW =====================
      // ===================== EDIT MAIN PASSPORT FLOW =====================
      if (editMode) {
        console.log("EDIT MAIN PASSPORT");

        const existingPassport = route?.params?.passport || {};

        const updatedPassport = {
          ...existingPassport,
          // only update document-related fields
          frontImageURL: frontUrl,
          backImageURL: backUrl,
          birthDate: mrzData?.birthDate || existingPassport.birthDate,
          expiryDate: mrzData?.expiryDate || existingPassport.expiryDate,
          passportNumber: mrzData?.passportNumber || existingPassport.passportNumber,
        };

        navigation.navigate(route.params.returnTo, {
          updatedPassport,
          travelDate: route.params.travelDate,
          photoUrl: route.params.photoUrl,
          coTravellers: route.params.coTravellers,   // PRESERVE cotravellers
          // DO NOT update passport: this would remove coTravellers
        });

        setLoading(false);
        return;
      }

      // ===================== PRIMARY INITIAL FLOW (MAIN TRAVELLER) =====================
      console.log("SAVING PRIMARY PASSPORT");

      //const docRef = await savePassportData(passportPayload);
      navigation.navigate("PassportDetailsScreen", {
        passport: { ...passportPayload },
        travelDate: travel,
        photoUrl: currentPhotoUrl,
        coTravellers: [],
      });

      setLoading(false);
    } catch (err) {
      console.log("PASSPORT SAVE ERROR:", err);
      setLoading(false);
      Alert.alert("Error", "Failed to save passport.");
    }
  };
  // Generate a date 5 days ahead
  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 5);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={18} color="white" />
          <Text style={styles.stepBadgeText}>Visa on {date}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Destination")}>
          <Icon name="home" size={moderateScale(24)} color={ORANGE} />
        </TouchableOpacity> */
          <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
            screen: "Destination",
          })
          }>
            <Icon name="home" size={moderateScale(24)} color={ORANGE} />
          </TouchableOpacity>

        }
      </View>

      {/* PROGRESS BAR (KEEPING ORIGINAL UI) */}
      <View style={styles.progressContainer}>
        {/* Dates */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>
        <View style={styles.line} />

        {/* Photo */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Photo</Text>
        </View>
        <View style={styles.line} />

        {/* Passport (current) */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
        </View>
        <View style={styles.line} />

        {/* Detail */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Detail</Text>
        </View>
        <View style={styles.line} />

        {/* Checkout */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          The government requires the front & back pages of your passport
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upload from device</Text>

          {/* FRONT */}
          <View style={{ marginTop: 16 }}>
            <Text style={styles.label}>Front page</Text>
            {front && <Image source={{ uri: front.uri }} style={styles.preview} />}
            <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
              <Text style={styles.primaryButtonText}>
                {front ? "Change front image" : "Select passport front image"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* BACK */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>Back page</Text>
            {back && <Image source={{ uri: back.uri }} style={styles.preview} />}
            <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
              <Text style={styles.secondaryButtonText}>
                {back ? "Change back image" : "Select passport back image"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM CONTINUE BUTTON (UNCHANGED UI) */}
      <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
        <Text style={styles.bottomButtonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp("4%"),                          // responsive padding
  },

  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(5),
  },

  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ORANGE,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
  },

  stepBadgeText: {
    color: "white",
    fontWeight: "600",
    marginLeft: scale(6),
    fontSize: RFValue(12),
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(18),
    justifyContent: "center",
  },

  stepItem: {
    alignItems: "center",
  },

  stepLabel: {
    fontSize: RFValue(10),
    color: "#777",
    marginTop: verticalScale(4),
  },

  line: {
    width: wp("6%"),
    height: scale(2),
    backgroundColor: ORANGE,
    marginHorizontal: wp("1%"),
  },

  title: {
    fontSize: RFValue(17),
    fontWeight: "700",
    marginTop: verticalScale(22),
    marginBottom: verticalScale(12),
    textAlign: "center",
  },

  card: {
    marginTop: verticalScale(16),
    backgroundColor: "#F8F8F8",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
  },

  sectionTitle: {
    fontSize: RFValue(15),
    fontWeight: "700",
    alignSelf: "center"
  },

  label: {
    fontSize: RFValue(13),
    fontWeight: "600",
    marginBottom: verticalScale(4),
    alignSelf: "center"
  },

  preview: {
    width: "100%",
    height: hp("22%"),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    backgroundColor: "#eee",
  },

  primaryButton: {
    backgroundColor: ORANGE,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
  },

  primaryButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(14),
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: scale(1),
    borderColor: ORANGE,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
  },

  secondaryButtonText: {
    color: ORANGE,
    textAlign: "center",
    fontSize: RFValue(14),
    fontWeight: "600",
  },

  bottomButton: {
    backgroundColor: ORANGE,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(14),
  },

  bottomButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "700",
  },
});
