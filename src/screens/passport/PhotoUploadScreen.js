import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import FaceDetector from "@react-native-ml-kit/face-detection";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { uploadUserPhoto } from "../../api/user/photoService";
import {
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../../utils/metrics";
import ScreenWrapper from "../../components/ScreenWrapper";
import LottieView from "lottie-react-native";
import { useSelector } from 'react-redux';


export default function PhotoUploadScreen({ navigation, route }) {

  const travelDate = route?.params?.travelDate || null;
  const visatype = route?.params?.visatype || null;
  console.log("TRAVELDATE==", travelDate)
  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const selected = useSelector((state) => state.destinations.selected);
  const country = selected?.countrName || "Country";
  const SKIP_PHOTO_COUNTRIES = [
    "thailand",
    "malaysia",
    "sri-lanka",
    "maldives",
    "mauritius",
    "hong kong",
  ];

  const countryName =
    selected?.countrName?.trim().toLowerCase() || "";

  const shouldSkipPhoto =
    SKIP_PHOTO_COUNTRIES.includes(countryName);

  const addMode = route?.params?.addMode || false;
  const editMode = route?.params?.editMode || false;
  const ORANGE = "#FF7A00";
  console.log("ROUTEDATA===", route.params)
  const getMLKitUri = (uri) => {
    return uri.startsWith('file://') ? uri : `file://${uri}`;
  };

  const pickPhoto = async () => {
    if (detecting) return;
    setDetecting(true);

    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
    });

    if (!result.assets || !result.assets[0]) {
      setDetecting(false);
      return;
    }

    const image = result.assets[0];

    if (!image.uri) {
      Alert.alert("Invalid Image", "Could not read image file.");
      setDetecting(false);
      return;
    }

    try {
      const faces = await FaceDetector.detect(
        getMLKitUri(image.uri),
        {
          performanceMode: 'accurate',
          landmarkMode: 'none',
          contourMode: 'none',

        }
      );

      if (!faces || faces.length === 0) {
        Alert.alert(
          "Invalid Photo",
          "Please upload a clear photo showing a human face."
        );
        return;
      }

      if (faces.length > 1) {
        Alert.alert(
          "Multiple Faces Detected",
          "Please upload a photo with only one person."
        );
        return;
      }
      setIsUploading(true);
      const uploadedUrl = await uploadUserPhoto(image);
      setPhoto(uploadedUrl);

    } catch (error) {
      console.log("FACE DETECTION ERROR:", error);
      Alert.alert(
        "Face Detection Failed",
        "Please try another clear photo."
      );
    } finally {
      setIsUploading(false);
      setDetecting(false);
    }
  };




  const confirmPhoto = () => {
    if (!photo) {
      Alert.alert("Upload Required", "Please upload a photo.");
      return;
    }

    if (editMode) {
      navigation.navigate(route.params.returnTo, {
        updatedPhotoUrl: photo,
        passport: route.params.passport,
        coTravellers: route?.params?.coTravellers || [],
        travelDate,
        visatype,
        country: country
      });
      return;
    }

    if (addMode) {
      // navigation.navigate("PassportUploadScreen", {
      //   addMode: true,
      //   travelDate,
      //   passport: null, // 👈 co-traveller has NO base passport
      //   coTravellers: route?.params?.coTravellers || [],
      //   photoUrl: photo,
      //   mainPhotoUrl: route.params.mainPhotoUrl,
      // });
      navigation.navigate("PassportUploadScreen", {
        addMode: true,
        travelDate,
        passport: route.params.passport, // ✅ KEEP MAIN PASSPORT
        coTravellers: route?.params?.coTravellers || [],
        photoUrl: photo,
        mainPhotoUrl: route.params.mainPhotoUrl,
        visatype,
        country: country
      });

      return;
    }

    navigation.navigate("PassportUploadScreen", {
      travelDate,
      photoUrl: photo,
      country: country
    });
  };

  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);

  return (
    <ScreenWrapper style={styles.container}>
      {/* TOP NAV */}
      {/* 🔥 LOTTIE LOADER OVERLAY */}
      {isUploading && (
        <View style={styles.loaderOverlay}>
          <LottieView
            source={require("../../assets/lottie/Loading.json")}
            autoPlay
            loop
            style={styles.loader}
          />
          <Text style={styles.loadingText}>Uploading photo...</Text>
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

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Tabs", { screen: "Destination" })
          }
        >
          <Icon name="home" size={moderateScale(24)} color="#FF5C00" />
        </TouchableOpacity>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressContainer}>
        {/* Dates */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color="#FF5C00" />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>

        <View style={styles.line} />

        {/* Photo – ONLY if not skipped */}
        {!shouldSkipPhoto && (
          <>
            <View style={styles.stepItem}>
              <Icon name="check-circle" size={22} color="#FF5C00" />
              <Text style={styles.stepLabel}>Photo</Text>
            </View>
            <View style={styles.line} />
          </>
        )}

        {/* Passport */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Passport</Text>
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


      {/* PAGE TITLE */}
      <Text style={styles.title}>Upload Your Photo</Text>

      {/* IMAGE DISPLAY */}
      <View style={styles.imageBox}>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
          />
        ) : (
          <Text style={styles.placeholder}>No Image Selected</Text>
        )}
      </View>



      {/* UPLOAD */}
      <TouchableOpacity style={styles.retakeButton} onPress={pickPhoto}>
        <Text style={styles.retakeText}>
          {photo ? "Reload Image" : "Upload Image"}
        </Text>
      </TouchableOpacity>
      {/* CONFIRM */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmPhoto}>
        <Text style={styles.confirmText}>Confirm Image</Text>
      </TouchableOpacity>
      {addMode && (
        <Text style={styles.instructionText}>
          If co-passenger is a minor, please upload the birth certificate.
          Otherwise, upload a passport size photo.
        </Text>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp("4%"),
  },

  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loader: {
    width: 120,
    height: 120,
  },

  loadingText: {
    marginTop: verticalScale(10),
    fontSize: RFValue(14),
    color: "#555",
    fontWeight: "600",
  },
  stepBadge: {
    backgroundColor: "#FF5C00",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(20),
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#FF5C00",
    marginHorizontal: wp("1%"),
  },

  title: {
    fontSize: RFValue(20),
    fontWeight: "700",
    marginTop: verticalScale(24),
    marginBottom: verticalScale(12),
    textAlign: "center",
  },

  imageBox: {
    width: "100%",
    height: hp("30%"),
    backgroundColor: "#f4f4f4",
    borderRadius: moderateScale(12),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },

  placeholder: {
    color: "#999",
    fontSize: RFValue(14),
  },

  confirmButton: {
    backgroundColor: "#FF5C00",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(24),
  },

  confirmText: {
    color: "white",
    fontSize: RFValue(16),
    textAlign: "center",
    fontWeight: "700",
  },

  retakeButton: {
    borderWidth: scale(2),
    borderColor: "#FF5C00",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(10),
  },

  retakeText: {
    color: "#FF5C00",
    fontSize: RFValue(16),
    textAlign: "center",
    fontWeight: "700",
  },

  instructionText: {
    marginTop: verticalScale(15),
    textAlign: "center",
    fontSize: RFValue(10),
    color: "#666",
    lineHeight: RFValue(16),
  },
});
