import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useSelector } from "react-redux";
import { uploadPassportImage } from "../../api/user/passportService";
import auth from "@react-native-firebase/auth";
import LottieView from "lottie-react-native";

const ORANGE = "#FF5C00";
const ORANGE_LIGHT = "#FFE1CC";
const BLACK = "#000";
const GRAY = "#777";
const GOLD = "#D6B25E";

export default function PassportUploadScreen({ navigation, route }) {
  const travelDate = route?.params?.travelDate || null;
  const selected = useSelector((state) => state.destinations.selected);
  const currentPhotoUrl = route?.params?.photoUrl || null;
  const isCoTraveller = route?.params?.addMode === true;
  const addMode = route?.params?.addMode || false;
  const editMode = route?.params?.editMode || false;

  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [mrzData, setMrzData] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ✅ COMPANY STATE */
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const getDateAfterFiveDays = () => {
    const currentDate = new Date();


    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };
  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);
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
      const text = await extractTextFromImage(asset.base64);
      const parsed = parseMRZ(text);

      if (!parsed) {
        Alert.alert("OCR Failed", "Could not read passport MRZ");
        return;
      }
      setMrzData(parsed);
    } catch {
      Alert.alert("Error", "Failed to scan passport");
    }
  };

  const pickBack = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", quality: 0.9 });
    if (result.assets) setBack(result.assets[0]);
  };

  /* ✅ VALIDATION */
  const validateCompanyDetails = () => {
    if (selected.countryType !== "Schengen") return true;

    if (!companyName || !address || !city || !zip || !phone) {
      Alert.alert("Missing Info", "Please fill all company details");
      return false;
    }
    return true;
  };

  useEffect(() => {
  console.log("LOADING STATE:", loading);
}, [loading]);
  /* ✅ MAIN SAVE */
  const onContinue = async () => {
    if (!front || !back || !mrzData) {
      Alert.alert("Error", "Please upload & scan passport properly");
      return;
    }

    if (!validateCompanyDetails()) return;

    try {
      setLoading(true);

      const frontUrl = await uploadPassportImage(front, "front");
      const backUrl = await uploadPassportImage(back, "back");

      /* ✅ COMPANY DETAILS ATTACHED */
      const passportPayload = {
        ...mrzData,
        frontImageURL: frontUrl,
        backImageURL: backUrl,
        travelDate,
        photoUrl: currentPhotoUrl,
        userId: auth().currentUser.uid,

        companyDetails:
          selected.countryType === "Schengen"
            ? {
              companyName,
              address,
              city,
              zip,
              phone,
            }
            : null,
      };

      // if (addMode) {
      //   navigation.navigate("PassportDetailsScreen", {
      //     passport: passportPayload,
      //     travelDate: travel,
      //     photoUrl: currentPhotoUrl,
      //     coTravellers: [
      //       ...(route?.params?.coTravellers || []),
      //       { id: Date.now().toString(), ...passportPayload },
      //     ],
      //   });
      //   return;
      if (addMode) {
        navigation.navigate("PassportDetailsScreen", {
          passport: route.params.passport, // 👈 KEEP MAIN
          travelDate: travelDate,
          photoUrl: route.params.mainPhotoUrl,
          coTravellers: [
            ...(route?.params?.coTravellers || []),
            {
              id: Date.now().toString(),
              ...passportPayload, // ✅ co-traveller stored ONLY here
            },
          ],
        });
        return;
      }
      // }

      if (editMode) {
        navigation.navigate(route.params.returnTo, {
          updatedPassport: passportPayload,
        });
        return;
      }

      navigation.navigate("PassportDetailsScreen", {
        passport: passportPayload,
        travelDate: travelDate,
        photoUrl: currentPhotoUrl,
        coTravellers: [],
      });
    } catch {
      Alert.alert("Error", "Failed to save passport");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
            {/* 🔥 FULL SCREEN LOADER */}
      {loading && (
        <View style={styles.loaderOverlay}>
          <LottieView
            source={require("../../assets/lottie/Loading.json")}
            autoPlay
            loop
            style={styles.loader}
          />
          <Text style={styles.loadingText}>Processing passport...</Text>
        </View>
      )}

      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={18} color="white" />
          <Text style={styles.stepBadgeText}>Visa on {travelDate}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
          screen: "Destination",
        })
        }>
          <Icon name="home" size={moderateScale(24)} color={ORANGE} />
        </TouchableOpacity>


      </View>


      {/* PROGRESS BAR */}
      {selected.countryType === "Schengen" ?
        <View style={styles.progressContainer}>
          <View style={styles.stepItem}>
            <Icon name="check-circle" size={22} color={ORANGE} />
            <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="radio-button-unchecked" size={22} color="#777" />
            <Text style={styles.stepLabel}>Detail</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="radio-button-unchecked" size={22} color="#777" />
            <Text style={styles.stepLabel}>Checkout</Text>
          </View>
        </View>
        :
        <View style={styles.progressContainer}>
          <View style={styles.stepItem}>
            <Icon name="check-circle" size={22} color={ORANGE} />
            <Text style={styles.stepLabel}>Dates</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="check-circle" size={22} color={ORANGE} />
            <Text style={styles.stepLabel}>Photo</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="check-circle" size={22} color={ORANGE} />
            <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="radio-button-unchecked" size={22} color="#777" />
            <Text style={styles.stepLabel}>Detail</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.stepItem}>
            <Icon name="radio-button-unchecked" size={22} color="#777" />
            <Text style={styles.stepLabel}>Checkout</Text>
          </View>
        </View>}


      <ScrollView>
        <Text style={styles.title}>
          The government requires the front & back pages of your passport
        </Text>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.label}>Front page</Text>
          {front && <Image source={{ uri: front.uri }} style={styles.preview} />}
          <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
            <Text style={styles.primaryButtonText}>
              {front ? "Change front image" : "Select passport front image"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>Back page</Text>
          {back && <Image source={{ uri: back.uri }} style={styles.preview} />}
          <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
            <Text style={styles.secondaryButtonText}>
              {back ? "Change back image" : "Select passport back image"}
            </Text>
          </TouchableOpacity>
        </View>

        {selected.countryType === "Schengen" && (
          <View style={styles.form}>
            <Label text="Company Name*" />
            <Input value={companyName} onChangeText={setCompanyName} />

            <Label text="Address*" />
            <Input value={address} onChangeText={setAddress} />

            <Label text="City*" />
            <Input value={city} onChangeText={setCity} />

            <Label text="Zip Code*" />
            <Input value={zip} onChangeText={setZip} keyboardType="number-pad" />

            <Label text="Phone*" />
            <Input value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.bottomButton} onPress={onContinue} disabled={loading}>
        <Text style={styles.bottomButtonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

/* ---------- REUSABLE ---------- */
const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const Input = ({ value, ...props }) => (
  <TextInput
    {...props}
    value={value}
    style={styles.input}
    placeholderTextColor={GRAY}
  />
);

/* ===================== STYLES (UNCHANGED) ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp("4%"),
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  loader: { width: 130, height: 130 },
  loadingText: {
    marginTop: 12,
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "#555",
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
  stepItem: { alignItems: "center" },
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
    alignSelf: "center",
  },
  label: {
    fontSize: RFValue(13),
    fontWeight: "600",
    marginBottom: verticalScale(4),
    alignSelf: "center",
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
