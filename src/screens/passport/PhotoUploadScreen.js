// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     Alert,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { uploadUserPhoto } from "../../api/user/photoService"

// export default function PhotoUploadScreen({ navigation, route }) {
//     const travelDate = route?.params?.payload;

//     const [photo, setPhoto] = useState(null);

//     // const pickPhoto = async () => {
//     //     const result = await launchImageLibrary({
//     //         mediaType: "photo",
//     //         includeBase64: true,
//     //         quality: 0.8,
//     //     });

//     //     if (!result.assets) return;

//     //     const img = result.assets[0];
//     //     setPhoto(img);
//     //     await uploadUserPhoto({ uri: img.uri });
//     // };
//     // const pickPhoto = async () => {
//     //     const result = await launchImageLibrary({
//     //         mediaType: "photo",
//     //         includeBase64: true,
//     //         quality: 0.8,
//     //     });

//     //     if (!result.assets) return;

//     //     const img = result.assets[0];
//     //     setPhoto(img);

//     //     try {
//     //         await uploadUserPhoto({ uri: img.uri });
//     //     } catch (err) {
//     //         console.log("UPLOAD PHOTO ERROR:", err);
//     //         Alert.alert("Error", "Failed to upload photo.");
//     //     }
//     // };

//     const pickPhoto = async () => {
//         const result = await launchImageLibrary({
//             mediaType: "photo",
//             includeBase64: false,
//             quality: 0.8,
//         });

//         if (!result.assets) return;
//         const uploadedUrl = await uploadUserPhoto(result.assets[0]);
//         setPhoto(uploadedUrl); // store actual URL
//     };


//     // const confirmPhoto = async () => {
//     //     if (!photo) return Alert.alert("Upload Required", "Please upload a photo.");
//     //     navigation.navigate("PassportUploadScreen", {
//     //         travelDate,      // from TravelDateScreen
//     //         uploadedPhoto: photo,    // from photoService.uploadUserPhoto
//     //     });
//     // };

//     // const confirmPhoto = () => {
//     //     if (!photo) return Alert.alert("Upload Required", "Please upload a photo.");
//     //     navigation.navigate("PassportUploadScreen", { travelDate, photoUrl: photo });
//     // };

//     const confirmPhoto = () => {
//         if (!photo) return Alert.alert("Upload Required", "Please upload a photo.");

//         // If editing return to details screen
//         if (route?.params?.editMode) {
//             navigation.navigate(route.params.returnTo, {
//                 updatedPhotoUrl: photo,
//                 passport: route.params.passport,
//                 travelDate,
//             });
//             return;
//         }else{
//             navigation.navigate("PassportUploadScreen", { travelDate, photoUrl: photo })}

//         // Normal flow
//         navigation.navigate("PassportUploadScreen", { travelDate, photoUrl: photo });
//     };


//     return (
//         <View style={styles.container}>
//             {/* TOP NAVIGATION BAR */}
//             <View style={styles.topNav}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Icon name="arrow-back" size={26} color="black" />
//                 </TouchableOpacity>

//                 <View style={styles.stepBadge}>
//                     <Icon name="check-circle" size={18} color="white" />
//                     <Text style={styles.stepBadgeText}>Visa on 27 Nov</Text>
//                 </View>

//                 <Icon name="home" size={26} color="#FF5C00" />
//             </View>

// {/* PROGRESS BAR */}
// <View style={styles.progressContainer}>
//     {/* DATES */}
//     <View style={styles.stepItem}>
//         <Icon name="check-circle" size={22} color="#FF5C00" />
//         <Text style={styles.stepLabel}>Dates</Text>
//     </View>

//     <View style={styles.line} />

//     {/* PHOTO */}
//     <View style={styles.stepItem}>
//         <Icon name="check-circle" size={22} color="#FF5C00" />
//         <Text style={[styles.stepLabel, { color: "#FF5C00" }]}>Photo</Text>
//     </View>

//     <View style={styles.line} />

//     {/* PASSPORT */}
//     <View style={styles.stepItem}>
//         <Icon name="radio-button-unchecked" size={22} color="#777" />
//         <Text style={styles.stepLabel}>Passport</Text>
//     </View>

//     <View style={styles.line} />

//     {/* DETAILS */}
//     <View style={styles.stepItem}>
//         <Icon name="radio-button-unchecked" size={22} color="#777" />
//         <Text style={styles.stepLabel}>Detail</Text>
//     </View>

//     <View style={styles.line} />

//     {/* CHECKOUT */}
//     <View style={styles.stepItem}>
//         <Icon name="radio-button-unchecked" size={22} color="#777" />
//         <Text style={styles.stepLabel}>Checkout</Text>
//     </View>
// </View>

//             {/* TITLE */}
//             <Text style={styles.title}>Upload Your Photo</Text>

//             {/* PREVIEW BOX */}
//             <View style={styles.imageBox}>
//                 {photo ? (
//                     <Image
//                         source={{ uri: photo }}   // since photo is now a URL string
//                         style={{ width: "100%", height: "100%", borderRadius: 10 }}
//                     />
//                 ) : (
//                     <Text style={styles.placeholder}>No Image Selected</Text>
//                 )}

//             </View>

//             {/* BUTTONS */}
//             <TouchableOpacity style={styles.confirmButton} onPress={confirmPhoto}>
//                 <Text style={styles.confirmText}>Confirm Image</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.retakeButton} onPress={pickPhoto}>
//                 <Text style={styles.retakeText}>
//                     {photo ? "Reload Image" : "Upload Image"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#fff", padding: 20 },

//     topNav: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },

//     stepBadge: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#FF5C00",
//         paddingHorizontal: 14,
//         paddingVertical: 6,
//         borderRadius: 20,
//     },
//     stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },

//     progressContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 20,
//         justifyContent: "center",
//     },

//     stepItem: { alignItems: "center" },
//     stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },

//     line: {
//         width: 30,
//         height: 2,
//         backgroundColor: "#FF5C00",
//         marginHorizontal: 5,
//     },

//     title: {
//         fontSize: 22,
//         fontWeight: "700",
//         marginTop: 30,
//         marginBottom: 15,
//     },

//     imageBox: {
//         width: "100%",
//         height: 260,
//         backgroundColor: "#f4f4f4",
//         borderRadius: 12,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     placeholder: { color: "#999", fontSize: 14 },

//     confirmButton: {
//         backgroundColor: "#FF5C00",
//         padding: 16,
//         borderRadius: 10,
//         marginTop: 30,
//     },
//     confirmText: {
//         color: "white",
//         fontSize: 18,
//         textAlign: "center",
//         fontWeight: "700",
//     },

//     retakeButton: {
//         borderWidth: 2,
//         borderColor: "#FF5C00",
//         padding: 16,
//         borderRadius: 10,
//         marginTop: 12,
//     },
//     retakeText: {
//         color: "#FF5C00",
//         fontSize: 18,
//         textAlign: "center",
//         fontWeight: "700",
//     },
// });





import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { uploadUserPhoto } from "../../api/user/photoService";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

export default function PhotoUploadScreen({ navigation, route }) {
  const travelDate = route?.params?.travelDate || null;
  const [photo, setPhoto] = useState(null);

  const addMode = route?.params?.addMode || false;
  const editMode = route?.params?.editMode || false;

  const pickPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      quality: 0.8,
    });

    if (!result.assets) return;

    try {
      const uploadedUrl = await uploadUserPhoto(result.assets[0]);
      setPhoto(uploadedUrl);
    } catch (err) {
      console.log("UPLOAD PHOTO ERROR:", err);
      Alert.alert("Error", "Failed to upload photo.");
    }
  };

  const confirmPhoto = () => {
    if (!photo) {
      Alert.alert("Upload Required", "Please upload a photo.");
      return;
    }

    // ==================== EDIT MODE ====================
    // if (editMode) {
    //   navigation.navigate(route.params.returnTo, {
    //     updatedPhotoUrl: photo,
    //     passport: route.params.passport,
    //     travelDate,
    //   });
    //   return;
    // }

    if (editMode) {
      navigation.navigate(route.params.returnTo, {
        updatedPhotoUrl: photo,
        passport: route.params.passport,
         coTravellers: route?.params?.coTravellers || [],
        travelDate,
      });
      return;
    }
    // ==================== ADD CO-TRAVELLER MODE ====================
    if (addMode) {
      navigation.navigate("PassportUploadScreen", {
        addMode: true,
        travelDate,
        passport: route.params.passportState,
        coTravellers: route?.params?.coTravellers || [],
        photoUrl: photo,
        mainPhotoUrl: route.params.mainPhotoUrl,
      });
      return;
    }


    // ==================== NORMAL MAIN FLOW ====================
    navigation.navigate("PassportUploadScreen", {
      travelDate,
      photoUrl: photo,
    });
  };

  return (
    <View style={styles.container}>

      {/* TOP NAV */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={18} color="white" />
          <Text style={styles.stepBadgeText}>Visa on 27 Nov</Text>
        </View>

        <Icon name="home" size={26} color="#FF5C00" />
      </View>

      {/* PROGRESS BAR */}
      {/* <View style={styles.progressContainer}>
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color="#FF5C00" />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color="#FF5C00" />
          <Text style={[styles.stepLabel, { color: "#FF5C00" }]}>Photo</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Passport</Text>
        </View>
      </View> */}


      {/* PROGRESS BAR */}
      <View style={styles.progressContainer}>
        {/* DATES */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color="#FF5C00" />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>

        <View style={styles.line} />

        {/* PHOTO */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color="#FF5C00" />
          <Text style={[styles.stepLabel, { color: "#FF5C00" }]}>Photo</Text>
        </View>

        <View style={styles.line} />

        {/* PASSPORT */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Passport</Text>
        </View>

        <View style={styles.line} />

        {/* DETAILS */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Detail</Text>
        </View>

        <View style={styles.line} />

        {/* CHECKOUT */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>


      {/* PAGE TITLE */}
      <Text style={styles.title}>Upload Your Photo</Text>

      {/* DISPLAY AREA */}
      <View style={styles.imageBox}>
        {photo ? (
          <Image source={{ uri: photo }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
        ) : (
          <Text style={styles.placeholder}>No Image Selected</Text>
        )}
      </View>

      {/* ACTIONS */}
      <TouchableOpacity style={styles.confirmButton} onPress={confirmPhoto}>
        <Text style={styles.confirmText}>Confirm Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.retakeButton} onPress={pickPhoto}>
        <Text style={styles.retakeText}>{photo ? "Reload Image" : "Upload Image"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ===== STYLES =====
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   stepBadge: { backgroundColor: "#FF5C00", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, flexDirection: "row", alignItems: "center" },
//   stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },
//   progressContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "center" },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   line: { width: 30, height: 2, backgroundColor: "#FF5C00", marginHorizontal: 5 },
//   title: { fontSize: 22, fontWeight: "700", marginTop: 30, marginBottom: 15 },
//   imageBox: { width: "100%", height: 260, backgroundColor: "#f4f4f4", borderRadius: 12, justifyContent: "center", alignItems: "center" },
//   placeholder: { color: "#999", fontSize: 14 },
//   confirmButton: { backgroundColor: "#FF5C00", padding: 16, borderRadius: 10, marginTop: 30 },
//   confirmText: { color: "white", fontSize: 18, textAlign: "center", fontWeight: "700" },
//   retakeButton: { borderWidth: 2, borderColor: "#FF5C00", padding: 16, borderRadius: 10, marginTop: 12 },
//   retakeText: { color: "#FF5C00", fontSize: 18, textAlign: "center", fontWeight: "700" },
// });


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
});
