// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
// } from "react-native";
// import { getAllPassportData } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);
  
// useEffect(() => {
//   requestAllFilesPermission();
// }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [passportDocs, userPhoto] = await Promise.all([
//         getAllPassportData(),
//         getUserPhoto(),
//       ]);
//       setPassports(passportDocs);
//       setPhotoUrl(userPhoto);
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", err.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       await loadData();
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [
//         item.passportFrontImage, // adjust field names as per your Firestore structure
//         item.passportBackImage,
//         photoUrl,
//       ];

//       const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
//         .trim()
//         .replace(/\s+/g, "_");
//       const zipName = `documents_${fullName || item.id}.zip`;
//       await requestAllFilesPermission();
//       const zipPath = await downloadAndZipImages(images, zipName);
//       Alert.alert("Download Complete", `ZIP saved at:\n${zipPath}`);
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Download Failed", err.message || "Could not download documents");
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View
//         style={{
//           marginHorizontal: 16,
//           marginVertical: 8,
//           borderRadius: 12,
//           backgroundColor: "#1f2933",
//           padding: 12,
//         }}
//       >
//         {/* Header row: First + Last Name */}
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text
//             style={{
//               color: "#fff",
//               fontSize: 18,
//               fontWeight: "bold",
//             }}
//           >
//             {item.firstName} {item.lastName}
//           </Text>
//           <Text style={{ color: "#cbd2d9", marginTop: 4, fontSize: 13 }}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {/* Accordion content */}
//         {isExpanded && (
//           <View
//             style={{
//               marginTop: 12,
//               padding: 12,
//               borderRadius: 10,
//               backgroundColor: "#e5e7eb",
//             }}
//           >
//             {/* Selected Country */}
//             <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
//               Selected Country:
//             </Text>
//             <Text style={{ marginBottom: 10 }}>{item.selectedCountry}</Text>

//             {/* Passport Details */}
//             <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
//               Passport Details:
//             </Text>
//             <Text>Passport Number: {item.passportNumber}</Text>
//             <Text>Date of Birth: {item.dob}</Text>
//             <Text>Expiry Date: {item.expiryDate}</Text>
//             <Text>Nationality: {item.nationality}</Text>

//             {/* Download Button */}
//             <TouchableOpacity
//               onPress={() => handleDownloadDocuments(item)}
//               style={{
//                 marginTop: 16,
//                 paddingVertical: 10,
//                 borderRadius: 8,
//                 backgroundColor: "#2563eb",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
//                 Download Documents (ZIP)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!passports.length) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text>No passport records found.</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={passports}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       contentContainerStyle={{ paddingVertical: 8 }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   StyleSheet,
// } from "react-native";
// import { getAllPassportData } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const LIGHT_BG = "#FFF5ED";
// const CARD_BG = "#161616";

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     requestAllFilesPermission();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [passportDocs, userPhoto] = await Promise.all([
//         getAllPassportData(),
//         getUserPhoto(),
//       ]);
//       setPassports(passportDocs);
//       setPhotoUrl(userPhoto);
//     } catch (err) {
//       Alert.alert("Error", err.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       await loadData();
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [item.passportFrontImage, item.passportBackImage, photoUrl];
//       const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
//         .trim()
//         .replace(/\s+/g, "_");
//       const zipName = `documents_${fullName || item.id}.zip`;

//       await requestAllFilesPermission();
//       const zipPath = await downloadAndZipImages(images, zipName);

//       Alert.alert("Download Complete", `ZIP saved at:\n${zipPath}`);
//     } catch (err) {
//       Alert.alert("Download Failed", err.message);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.cardTitle}>{item.firstName} {item.lastName}</Text>
//           <Text style={styles.subtitle}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.expandedBox}>
//             <Text style={styles.label}>Selected Country</Text>
//             <Text style={styles.value}>{item.selectedCountry}</Text>

//             <Text style={styles.label}>Passport Details</Text>
//             <Text style={styles.value}>Number: {item.passportNumber}</Text>
//             <Text style={styles.value}>DOB: {item.dob}</Text>
//             <Text style={styles.value}>Expiry: {item.expiryDate}</Text>
//             <Text style={styles.value}>Nationality: {item.nationality}</Text>

//             <TouchableOpacity
//               onPress={() => handleDownloadDocuments(item)}
//               style={styles.downloadBtn}
//             >
//               <Text style={styles.downloadBtnText}>Download Documents (ZIP)</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading)
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={ORANGE} />
//       </View>
//     );

//   if (!passports.length)
//     return (
//       <View style={styles.emptyBox}>
//         <Text style={styles.emptyText}>No passport records found.</Text>
//       </View>
//     );

//   return (
//     <FlatList
//       data={passports}
//       keyExtractor={(item) => item.id}
//       renderItem={renderItem}
//       contentContainerStyle={{ paddingVertical: verticalScale(10) }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: wp("4%"),
//     marginVertical: verticalScale(6),
//     borderRadius: moderateScale(14),
//     backgroundColor: CARD_BG,
//     padding: moderateScale(14),
//     shadowColor: "#000",
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 6,
//   },

//   cardTitle: {
//     color: "#fff",
//     fontSize: RFValue(18),
//     fontWeight: "800",
//   },
//   subtitle: {
//     color: "#cdcdcd",
//     fontSize: RFValue(13),
//     marginTop: verticalScale(4),
//     fontWeight: "500",
//   },

//   expandedBox: {
//     backgroundColor: LIGHT_BG,
//     marginTop: verticalScale(10),
//     padding: moderateScale(12),
//     borderRadius: moderateScale(12),
//   },

//   label: {
//     fontSize: RFValue(15),
//     fontWeight: "700",
//     color: BLACK,
//     marginTop: verticalScale(8),
//   },

//   value: {
//     fontSize: RFValue(13),
//     color: "#444",
//     marginTop: verticalScale(4),
//   },

//   downloadBtn: {
//     backgroundColor: ORANGE,
//     marginTop: verticalScale(16),
//     paddingVertical: verticalScale(12),
//     borderRadius: moderateScale(10),
//     alignItems: "center",
//   },
//   downloadBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: RFValue(15),
//   },

//   loader: { flex: 1, justifyContent: "center", alignItems: "center" },

//   emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
//   emptyText: { fontSize: RFValue(15), color: "#666", fontWeight: "600" },
// });


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   StyleSheet,
//   Platform,
// } from "react-native";
// import RNFS from "react-native-fs";
// import { zip } from "react-native-zip-archive";

// import { getAllPassportData } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { requestAllFilesPermission } from "../utils/permissions";

// import {
//   wp,
//   hp,
//   scale,
//   verticalScale,
//   moderateScale,
//   RFValue,
// } from "../utils/metrics";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const LIGHT_BG = "#FFF5ED";
// const CARD_BG = "#161616";

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     requestAllFilesPermission();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [passportDocs, userPhoto] = await Promise.all([
//         getAllPassportData(),
//         getUserPhoto(),
//       ]);
//       setPassports(passportDocs);
//       setPhotoUrl(userPhoto);
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Error", err.message || "Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = useCallback(async () => {
//     try {
//       setRefreshing(true);
//       await loadData();
//     } finally {
//       setRefreshing(false);
//     }
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   /**
//    * Download images -> save to temp folder -> zip -> move zip to Downloads (Android) / Documents (iOS)
//    */
//   const handleDownloadDocuments = async (item) => {
//     try {
//       // Ask storage permission on Android
//       if (Platform.OS === "android") {
//         await requestAllFilesPermission();
//       }

//       // Collect image URLs (filter out null/undefined)
//       const images = [
//         item.passportFrontImage,
//         item.passportBackImage,
//         photoUrl,
//       ].filter(Boolean);
//       console.log("IMAGES===>",item)
//       if (!images.length) {
//         Alert.alert("No Documents", "No images found to download.");
//         return;
//       }

//       // Create temp folder
//       const tempDir = `${RNFS.CachesDirectoryPath}/passport_tmp_${Date.now()}`;
//       await RNFS.mkdir(tempDir);

//       // Download all images to tempDir
//       const localFiles = [];
//       for (let i = 0; i < images.length; i++) {
//         const url = images[i];
//         const extension = url.includes(".") ? url.split(".").pop().split("?")[0] : "jpg";
//         const localPath = `${tempDir}/doc_${i}.${extension}`;

//         const result = await RNFS.downloadFile({
//           fromUrl: url,
//           toFile: localPath,
//         }).promise;

//         if (result.statusCode === 200) {
//           localFiles.push(localPath);
//         }
//       }

//       if (!localFiles.length) {
//         Alert.alert("Download Failed", "Could not download any document.");
//         return;
//       }

//       // Determine final ZIP path in a user-visible folder
//       const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
//         .trim()
//         .replace(/\s+/g, "_");
//       const zipName = `documents_${fullName || item.id}.zip`;

//       const destDir =
//         Platform.OS === "android"
//           ? RNFS.DownloadDirectoryPath
//           : RNFS.DocumentDirectoryPath; // iOS: in-app but user-visible via Files under app

//       const targetZipPath = `${destDir}/${zipName}`;

//       // Zip the entire temp folder
//       const zippedPath = await zip(tempDir, targetZipPath);

//       Alert.alert(
//         "Download Complete",
//         `ZIP saved at:\n${zippedPath}\n\n` +
//           (Platform.OS === "android"
//             ? "Open your Files app and check the Downloads folder."
//             : "Open the Files app and look under this app's documents.")
//       );
//     } catch (err) {
//       console.error(err);
//       Alert.alert(
//         "Download Failed",
//         err?.message || "Could not download documents"
//       );
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         {/* Header row: Name */}
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.cardTitle}>
//             {item.firstName} {item.lastName}
//           </Text>
//           <Text style={styles.subtitle}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {/* Accordion content */}
//         {isExpanded && (
//           <View style={styles.expandedBox}>
//             <Text style={styles.label}>Selected Country</Text>
//             <Text style={styles.value}>{item.selectedCountry}</Text>

//             <Text style={styles.label}>Passport Details</Text>
//             <Text style={styles.value}>Number: {item.passportNumber}</Text>
//             <Text style={styles.value}>DOB: {item.dob}</Text>
//             <Text style={styles.value}>Expiry: {item.expiryDate}</Text>
//             <Text style={styles.value}>Nationality: {item.nationality}</Text>

//             <TouchableOpacity
//               onPress={() => handleDownloadDocuments(item)}
//               style={styles.downloadBtn}
//             >
//               <Text style={styles.downloadBtnText}>
//                 Download Documents (ZIP)
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color={ORANGE} />
//       </View>
//     );
//   }

//   if (!passports.length) {
//     return (
//       <View style={styles.emptyBox}>
//         <Text style={styles.emptyText}>No passport records found.</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={passports}
//       keyExtractor={(item, index) =>
//         item.id ? item.id.toString() : index.toString()
//       }
//       renderItem={renderItem}
//       contentContainerStyle={{ paddingVertical: verticalScale(10) }}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: wp("4%"),
//     marginVertical: verticalScale(6),
//     borderRadius: moderateScale(14),
//     backgroundColor: CARD_BG,
//     padding: moderateScale(14),
//     shadowColor: "#000",
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     elevation: 6,
//   },

//   cardTitle: {
//     color: "#fff",
//     fontSize: RFValue(18),
//     fontWeight: "800",
//   },

//   subtitle: {
//     color: "#cdcdcd",
//     fontSize: RFValue(13),
//     marginTop: verticalScale(4),
//     fontWeight: "500",
//   },

//   expandedBox: {
//     backgroundColor: LIGHT_BG,
//     marginTop: verticalScale(10),
//     padding: moderateScale(12),
//     borderRadius: moderateScale(12),
//   },

//   label: {
//     fontSize: RFValue(15),
//     fontWeight: "700",
//     color: BLACK,
//     marginTop: verticalScale(8),
//   },

//   value: {
//     fontSize: RFValue(13),
//     color: "#444",
//     marginTop: verticalScale(4),
//   },

//   downloadBtn: {
//     backgroundColor: ORANGE,
//     marginTop: verticalScale(16),
//     paddingVertical: verticalScale(12),
//     borderRadius: moderateScale(10),
//     alignItems: "center",
//   },

//   downloadBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: RFValue(15),
//   },

//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyBox: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   emptyText: {
//     fontSize: RFValue(15),
//     color: "#666",
//     fontWeight: "600",
//   },
// });


import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  Platform,
} from "react-native";
import RNFS from "react-native-fs";
import { zip } from "react-native-zip-archive";

import { getAllPassportData } from "../api/user/passportService";
import { getUserPhoto } from "../api/user/photoService";
import { requestAllFilesPermission } from "../utils/permissions";

import {
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../utils/metrics";

const ORANGE = "#FF5C00";
const BLACK = "#000";
const LIGHT_BG = "#FFF5ED";
const CARD_BG = "#161616";

export default function PassportListScreen() {
  const [passports, setPassports] = useState([]);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    requestAllFilesPermission();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [passportDocs, userPhoto] = await Promise.all([
        getAllPassportData(),
        getUserPhoto(),
      ]);
      setPassports(passportDocs);
      setPhotoUrl(userPhoto);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadData();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDownloadDocuments = async (item) => {
    try {
      if (Platform.OS === "android") {
        await requestAllFilesPermission();
      }

      const images = [
        item.frontImageURL,
        item.backImageURL,
        item.photoUrl,
      ].filter(Boolean);

      if (!images.length) {
        Alert.alert("No Documents", "No images found to download.");
        return;
      }

      const tempDir = `${RNFS.CachesDirectoryPath}/passport_tmp_${Date.now()}`;
      await RNFS.mkdir(tempDir);

      for (let i = 0; i < images.length; i++) {
        const url = images[i];
        const extension = url.includes(".") ? url.split(".").pop().split("?")[0] : "jpg";
        const localPath = `${tempDir}/doc_${i}.${extension}`;

        const result = await RNFS.downloadFile({
          fromUrl: url,
          toFile: localPath,
        }).promise;

        if (result.statusCode !== 200) {
          console.log("Failed download", url);
        }
      }

      const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
        .trim()
        .replace(/\s+/g, "_");

      const zipName = `documents_${fullName || item.id}.zip`;

      const destDir =
        Platform.OS === "android"
          ? RNFS.DownloadDirectoryPath
          : RNFS.DocumentDirectoryPath;

      const targetZipPath = `${destDir}/${zipName}`;

      const zippedPath = await zip(tempDir, targetZipPath);

      Alert.alert(
        "Download Complete",
        `ZIP saved at:\n${zippedPath}\n\n${
          Platform.OS === "android"
            ? "📂 Check Downloads folder in File Manager"
            : "📂 Check Files → This app → Documents"
        }`
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Download Failed", err.message);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text style={styles.cardTitle}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.subtitle}>
            Tap to {isExpanded ? "hide" : "view"} details
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedBox}>
            <Text style={styles.label}>Passport Number</Text>
            <Text style={styles.value}>{item.passportNumber}</Text>

            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>{item.birthDate}</Text>

            <Text style={styles.label}>Expiry Date</Text>
            <Text style={styles.value}>{item.expiryDate}</Text>

            <Text style={styles.label}>Nationality</Text>
            <Text style={styles.value}>{item.nationality}</Text>

            <TouchableOpacity
              onPress={() => handleDownloadDocuments(item)}
              style={styles.downloadBtn}
            >
              <Text style={styles.downloadBtnText}>Download Documents (ZIP)</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={ORANGE} />
      </View>
    );
  }

  if (!passports.length) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>No passport records found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={passports}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingVertical: verticalScale(10) }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: wp("4%"),
    marginVertical: verticalScale(6),
    borderRadius: moderateScale(14),
    backgroundColor: CARD_BG,
    padding: moderateScale(14),
  },
  cardTitle: {
    color: "#FFF",
    fontSize: RFValue(18),
    fontWeight: "800",
  },
  subtitle: {
    color: "#cdcdcd",
    fontSize: RFValue(13),
    marginTop: verticalScale(4),
    fontWeight: "500",
  },
  expandedBox: {
    backgroundColor: LIGHT_BG,
    marginTop: verticalScale(10),
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
  },
  label: {
    fontSize: RFValue(15),
    fontWeight: "700",
    color: BLACK,
    marginTop: verticalScale(8),
  },
  value: {
    fontSize: RFValue(13),
    color: "#444",
    marginTop: verticalScale(4),
  },
  downloadBtn: {
    backgroundColor: ORANGE,
    marginTop: verticalScale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  downloadBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(15),
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: RFValue(15), color: "#666", fontWeight: "600" },
});
