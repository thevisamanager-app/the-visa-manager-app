// // import React, { useEffect, useState, useCallback } from "react";
// // import {
// //   View,
// //   Text,
// //   FlatList,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Alert,
// //   RefreshControl,
// // } from "react-native";
// // import { getAllPassportData } from "../api/user/passportService";
// // import { getUserPhoto } from "../api/user/photoService";
// // import { downloadAndZipImages } from "../utils/zipUtils";
// // import { requestAllFilesPermission } from "../utils/permissions";

// // export default function PassportListScreen() {
// //   const [passports, setPassports] = useState([]);
// //   const [photoUrl, setPhotoUrl] = useState(null);
// //   const [expandedId, setExpandedId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// // useEffect(() => {
// //   requestAllFilesPermission();
// // }, []);

// //   const loadData = async () => {
// //     try {
// //       setLoading(true);
// //       const [passportDocs, userPhoto] = await Promise.all([
// //         getAllPassportData(),
// //         getUserPhoto(),
// //       ]);
// //       setPassports(passportDocs);
// //       setPhotoUrl(userPhoto);
// //     } catch (err) {
// //       console.error(err);
// //       Alert.alert("Error", err.message || "Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onRefresh = useCallback(async () => {
// //     try {
// //       setRefreshing(true);
// //       await loadData();
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   }, []);

// //   const toggleExpand = (id) => {
// //     setExpandedId((prev) => (prev === id ? null : id));
// //   };

// //   const handleDownloadDocuments = async (item) => {
// //     try {
// //       const images = [
// //         item.passportFrontImage, // adjust field names as per your Firestore structure
// //         item.passportBackImage,
// //         photoUrl,
// //       ];

// //       const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
// //         .trim()
// //         .replace(/\s+/g, "_");
// //       const zipName = `documents_${fullName || item.id}.zip`;
// //       await requestAllFilesPermission();
// //       const zipPath = await downloadAndZipImages(images, zipName);
// //       Alert.alert("Download Complete", `ZIP saved at:\n${zipPath}`);
// //     } catch (err) {
// //       console.error(err);
// //       Alert.alert("Download Failed", err.message || "Could not download documents");
// //     }
// //   };

// //   const renderItem = ({ item }) => {
// //     const isExpanded = expandedId === item.id;

// //     return (
// //       <View
// //         style={{
// //           marginHorizontal: 16,
// //           marginVertical: 8,
// //           borderRadius: 12,
// //           backgroundColor: "#1f2933",
// //           padding: 12,
// //         }}
// //       >
// //         {/* Header row: First + Last Name */}
// //         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
// //           <Text
// //             style={{
// //               color: "#fff",
// //               fontSize: 18,
// //               fontWeight: "bold",
// //             }}
// //           >
// //             {item.firstName} {item.lastName}
// //           </Text>
// //           <Text style={{ color: "#cbd2d9", marginTop: 4, fontSize: 13 }}>
// //             Tap to {isExpanded ? "hide" : "view"} details
// //           </Text>
// //         </TouchableOpacity>

// //         {/* Accordion content */}
// //         {isExpanded && (
// //           <View
// //             style={{
// //               marginTop: 12,
// //               padding: 12,
// //               borderRadius: 10,
// //               backgroundColor: "#e5e7eb",
// //             }}
// //           >
// //             {/* Selected Country */}
// //             <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
// //               Selected Country:
// //             </Text>
// //             <Text style={{ marginBottom: 10 }}>{item.selectedCountry}</Text>

// //             {/* Passport Details */}
// //             <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
// //               Passport Details:
// //             </Text>
// //             <Text>Passport Number: {item.passportNumber}</Text>
// //             <Text>Date of Birth: {item.dob}</Text>
// //             <Text>Expiry Date: {item.expiryDate}</Text>
// //             <Text>Nationality: {item.nationality}</Text>

// //             {/* Download Button */}
// //             <TouchableOpacity
// //               onPress={() => handleDownloadDocuments(item)}
// //               style={{
// //                 marginTop: 16,
// //                 paddingVertical: 10,
// //                 borderRadius: 8,
// //                 backgroundColor: "#2563eb",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
// //                 Download Documents (ZIP)
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         )}
// //       </View>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <ActivityIndicator size="large" />
// //       </View>
// //     );
// //   }

// //   if (!passports.length) {
// //     return (
// //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// //         <Text>No passport records found.</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <FlatList
// //       data={passports}
// //       keyExtractor={(item) => item.id}
// //       renderItem={renderItem}
// //       contentContainerStyle={{ paddingVertical: 8 }}
// //       refreshControl={
// //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// //       }
// //     />
// //   );
// // }


// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
//   TextInput,
//   StyleSheet,
// } from "react-native";

// import { getAllPassportData } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";
// import auth from "@react-native-firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { firestore } from "../config/firebase";


// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Shared admin inputs
//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");
//   console.log("CURRENT USER UID:", auth().currentUser.uid);
//   console.log("ADMIN CLAIM CHECK:", auth().currentUser);
//   auth().currentUser.getIdTokenResult(true).then(res => {
//     console.log("CLAIMS:", res.claims);
//   });
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

//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [
//         item.passportFrontImage,
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
//       Alert.alert(
//         "Download Failed",
//         err.message || "Could not download documents"
//       );
//     }
//   };

//   // const updateVisaStatus = async (userId) => {
//   //   if (!statusText) {
//   //     Alert.alert("Error", "Please enter status text");
//   //     return;
//   //   }

//   //   try {
//   //     await updateDoc(doc(firestore, "visaStatus", userId), {
//   //       currentStatus: statusText,
//   //       steps: [{ text: statusText, time: new Date().toLocaleString() }],
//   //     });
//   //     Alert.alert("Success", "Status updated");
//   //     setStatusText("");
//   //   } catch (err) {
//   //     console.error(err);
//   //     Alert.alert("Update Failed", err.message || "Error updating status");
//   //   }
//   // };


//   const updateVisaStatus = async (userId) => {
//     console.log("ITEM:", item);
//     console.log("USER ID INSIDE ITEM:", item.userId);

//     console.log("WRITING TO PATH:", "visaStatus/" + userId);
//     if (!statusText.trim()) return;

//     try {
//       const ref = doc(firestore, "visaStatus", userId);

//       await setDoc(
//         ref,
//         {
//           currentStatus: statusText,
//           steps: [
//             { text: statusText, time: new Date().toLocaleString() }
//           ],
//           updatedAt: Date.now()
//         },
//         { merge: true }
//       );

//       Alert.alert("Success", "Status Updated");
//       setStatusText("");

//     } catch (err) {
//       console.log("STATUS UPDATE ERROR:", err);
//       Alert.alert("Error", err.message);
//     }
//   };

//   // const updateGradient = async (userId) => {
//   //   if (!startColor || !endColor) {
//   //     Alert.alert("Error", "Please enter both start and end colors");
//   //     return;
//   //   }

//   //   try {
//   //     await updateDoc(doc(firestore, "visaStatus", userId), {
//   //       bannerStart: startColor,
//   //       bannerEnd: endColor,
//   //     });
//   //     Alert.alert("Success", "Gradient updated");
//   //   } catch (err) {
//   //     console.error(err);
//   //     Alert.alert("Update Failed", err.message || "Error updating gradient");
//   //   }
//   // };

//   const updateGradient = async (userId) => {
//     try {
//       const ref = doc(firestore, "visaStatus", userId);

//       await setDoc(
//         ref,
//         {
//           bannerStart: startColor,
//           bannerEnd: endColor
//         },
//         { merge: true }
//       );

//       Alert.alert("Success", "Gradient Updated!");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const renderItem = ({ item }) => {
//     console.log("PASSPORT ITEM:", item);
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         {/* Header row: First + Last Name */}
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.name}>
//             {item.firstName} {item.lastName}
//           </Text>
//           <Text style={styles.tapHint}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {/* Accordion content */}
//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             {/* Selected Country */}
//             <Text style={styles.label}>Selected Country:</Text>
//             <Text style={{ marginBottom: 10 }}>{item.selectedCountry}</Text>

//             {/* Passport Details */}
//             <Text style={styles.label}>Passport Details:</Text>
//             <Text>Passport Number: {item.passportNumber}</Text>
//             <Text>Date of Birth: {item.dob}</Text>
//             <Text>Expiry Date: {item.expiryDate}</Text>
//             <Text>Nationality: {item.nationality}</Text>

//             {/* Download Button */}
//             <TouchableOpacity
//               onPress={() => handleDownloadDocuments(item)}
//               style={styles.downloadBtn}
//             >
//               <Text style={styles.downloadText}>Download Documents (ZIP)</Text>
//             </TouchableOpacity>

//             {/* Admin: Update Visa Status */}
//             <Text style={[styles.label, { marginTop: 16 }]}>
//               Update Visa Status:
//             </Text>
//             <TextInput
//               placeholder="Enter visa status"
//               style={styles.input}
//               value={statusText}
//               onChangeText={setStatusText}
//             />
//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => {
//                 if (!item.userId) {
//                   console.log("ERROR: Missing userId in item:", item);
//                   Alert.alert("Error", "This passport record has no userId.");
//                   return;
//                 }
//                 updateVisaStatus(item.userId, item.id)
//               }}
//             >
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* Admin: Update Gradient */}
//             <Text style={[styles.label, { marginTop: 16 }]}>
//               Update Banner Gradient:
//             </Text>
//             <TextInput
//               placeholder="Start Color (#hex)"
//               style={styles.input}
//               value={startColor}
//               onChangeText={setStartColor}
//             />
//             <TextInput
//               placeholder="End Color (#hex)"
//               style={styles.input}
//               value={endColor}
//               onChangeText={setEndColor}
//             />
//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => updateGradient(item.id)}
//             >
//               <Text style={styles.actionText}>Update Gradient</Text>
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

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     backgroundColor: "#1f2933",
//     padding: 12,
//   },
//   name: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   tapHint: { color: "#cbd2d9", marginTop: 4, fontSize: 13 },

//   detailsBox: {
//     marginTop: 12,
//     padding: 12,
//     borderRadius: 10,
//     backgroundColor: "#e5e7eb",
//   },
//   label: { fontSize: 15, fontWeight: "600", marginBottom: 4 },

//   downloadBtn: {
//     marginTop: 16,
//     paddingVertical: 10,
//     borderRadius: 8,
//     backgroundColor: "#2563eb",
//     alignItems: "center",
//   },
//   downloadText: { color: "#fff", fontSize: 15, fontWeight: "600" },

//   input: {
//     borderWidth: 1,
//     borderColor: "#aaa",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 6,
//     backgroundColor: "#fff",
//   },
//   actionBtn: {
//     marginTop: 12,
//     paddingVertical: 10,
//     borderRadius: 8,
//     backgroundColor: "#FF5C00",
//     alignItems: "center",
//   },
//   actionText: { color: "#fff", fontWeight: "700", fontSize: 15 },
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
//   TextInput,
//   StyleSheet,
// } from "react-native";

// import { getAllPassportData } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// import auth from "@react-native-firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import firestore from "@react-native-firebase/firestore";


// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [photoUrl, setPhotoUrl] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");

//   useEffect(() => {
//     loadData();
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

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const toggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [item.frontImageURL, item.backImageURL, item.photoUrl];
//       const zipName = `documents_${item.firstName}_${item.lastName}.zip`;

//       const zipPath = await downloadAndZipImages(images, zipName);
//       Alert.alert("Download Complete", `ZIP saved at:\n${zipPath}`);
//     } catch (err) {
//       Alert.alert("Download Failed", err.message);
//     }
//   };

//   // -----------------------------------------------------------
//   // ------------ FIXED ADMIN UPDATE VISA STATUS ---------------
//   // -----------------------------------------------------------
//   // const updateVisaStatus = async (userId) => {
//   //   if (!statusText.trim()) {
//   //     Alert.alert("Error", "Enter status text");
//   //     return;
//   //   }

//   //   console.log("UPDATING VISA STATUS FOR:", userId);

//   //   try {
//   //     await setDoc(
//   //       doc(firestore, "visaStatus", userId),
//   //       {
//   //         currentStatus: statusText,
//   //         steps: [{ text: statusText, time: new Date().toLocaleString() }],
//   //         updatedAt: Date.now(),
//   //       },
//   //       { merge: true }
//   //     );

//   //     Alert.alert("Success", "Visa Status Updated");
//   //     setStatusText("");
//   //   } catch (err) {
//   //     console.log("STATUS UPDATE ERROR:", err);
//   //     Alert.alert("Error", "Failed to update status");
//   //   }
//   // };
//   const updateVisaStatus = async (userId) => {
//     if (!statusText.trim()) return Alert.alert("Error", "Enter status");

//     console.log("UPDATING VISA STATUS FOR:", userId);

//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             currentStatus: statusText,
//             steps: [
//               { text: statusText, time: new Date().toLocaleString() }
//             ],
//             updatedAt: Date.now(),
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Visa Status Updated");
//       setStatusText("");
//     } catch (err) {
//       console.log("STATUS UPDATE ERROR:", err);
//       Alert.alert("Error", err.message);
//     }
//   };

//   // -----------------------------------------------------------
//   // -------------- FIX GRADIENT UPDATE -------------------------
//   // -----------------------------------------------------------
//   // const updateGradient = async (userId) => {
//   //   try {
//   //     await setDoc(
//   //       doc(firestore, "visaStatus", userId),
//   //       {
//   //         bannerStart: startColor,
//   //         bannerEnd: endColor,
//   //       },
//   //       { merge: true }
//   //     );

//   //     Alert.alert("Success", "Gradient updated");
//   //   } catch (err) {
//   //     Alert.alert("Error", "Failed to update gradient");
//   //   }
//   // };
//   const updateGradient = async (userId) => {
//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             bannerStart: startColor,
//             bannerEnd: endColor,
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Gradient Updated");
//     } catch (err) {
//       console.log("GRADIENT ERROR:", err);
//       Alert.alert("Error", err.message);
//     }
//   };

//   // -----------------------------------------------------------
//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.name}>
//             {item.firstName} {item.lastName}
//           </Text>
//           <Text style={styles.tapHint}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             <Text style={styles.label}>Passport Number:</Text>
//             <Text>{item.passportNumber}</Text>

//             <Text style={styles.label}>DOB:</Text>
//             <Text>{item.birthDate}</Text>

//             <Text style={styles.label}>Expiry:</Text>
//             <Text>{item.expiryDate}</Text>

//             <Text style={styles.label}>Nationality:</Text>
//             <Text>{item.nationality}</Text>

//             <TouchableOpacity
//               onPress={() => handleDownloadDocuments(item)}
//               style={styles.downloadBtn}
//             >
//               <Text style={styles.downloadText}>Download ZIP</Text>
//             </TouchableOpacity>

//             {/* ------------------ ADMIN STATUS UPDATE ----------------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>
//               Update Visa Status
//             </Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter Status"
//               value={statusText}
//               onChangeText={setStatusText}
//             />

//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => {
//                 if (!item.userId) {
//                   Alert.alert("Error", "Passport has no userId field");
//                   return;
//                 }
//                 updateVisaStatus(item.userId);
//               }}
//             >
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* ------------------ ADMIN GRADIENT UPDATE ----------------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>
//               Update Progress Bar Gradient
//             </Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Start Hex #FF0000"
//               value={startColor}
//               onChangeText={setStartColor}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder="End Hex #0000FF"
//               value={endColor}
//               onChangeText={setEndColor}
//             />

//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => updateGradient(item.userId)}
//             >
//               <Text style={styles.actionText}>Update Gradient</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading)
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );

//   if (!passports.length)
//     return (
//       <View style={styles.center}>
//         <Text>No passport entries found</Text>
//       </View>
//     );

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

// const styles = StyleSheet.create({
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   card: {
//     marginHorizontal: 16,
//     marginVertical: 8,
//     backgroundColor: "#1f2933",
//     borderRadius: 12,
//     padding: 12,
//   },
//   name: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   tapHint: { color: "#cbd2d9", fontSize: 13 },
//   detailsBox: {
//     backgroundColor: "#e5e7eb",
//     marginTop: 12,
//     padding: 10,
//     borderRadius: 10,
//   },
//   label: { fontWeight: "600", marginTop: 6 },
//   downloadBtn: {
//     marginTop: 16,
//     paddingVertical: 10,
//     backgroundColor: "#2563eb",
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   downloadText: { color: "#fff", fontWeight: "700" },
//   input: {
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#aaa",
//     padding: 8,
//     borderRadius: 8,
//     marginTop: 6,
//   },
//   actionBtn: {
//     backgroundColor: "#FF5C00",
//     marginTop: 10,
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   actionText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
// });



// --- PassportListScreen.js (Admin) ---

// import React, { useEffect, useState } from "react";
// import {
//   View, Text, FlatList, TouchableOpacity, ActivityIndicator,
//   Alert, RefreshControl, TextInput, StyleSheet
// } from "react-native";

// import { getAllPassportData } from "../api/user/passportService";
// import { getAllPassportDataAdmin } from "../api/user/passportService";
// import { getUserPhoto } from "../api/user/photoService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";


// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");

//   useEffect(() => {
//     loadData();
//     requestAllFilesPermission();
//   }, []);

//   // const loadData = async () => {
//   //   try {
//   //     setLoading(true);

//   //    // const passportDocs = await getAllPassportData();
//   //    const passportDocs = await getAllPassportDataAdmin();
//   //     setPassports(passportDocs);

//   //   } catch (err) {
//   //     Alert.alert("Error", err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const passportDocs = await getAllPassportDataAdmin();
//       setPassports(passportDocs);

//     } catch (err) {
//       Alert.alert("Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const toggleExpand = (id) => {
//     setExpandedId(prev => (prev === id ? null : id));
//   };

//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [item.frontImageURL, item.backImageURL, item.photoUrl];
//       const zipPath = await downloadAndZipImages(images, `documents_${item.firstName}_${item.lastName}.zip`);
//       Alert.alert("Download Complete", zipPath);
//     } catch (err) {
//       Alert.alert("Download Failed", err.message);
//     }
//   };

//   // -------------------------------
//   // 🔥 Append new STEP (history preserved)
//   // -------------------------------
//   const updateVisaStatus = async (userId) => {
//     if (!statusText.trim()) return Alert.alert("Error", "Enter a status");

//     const newStep = {
//       text: statusText,
//       time: new Date().toLocaleString(),
//     };

//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             currentStatus: statusText,
//             updatedAt: Date.now(),
//             steps: firestore.FieldValue.arrayUnion(newStep), // <-- append
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Visa Status Updated");
//       setStatusText("");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   // -------------------------------
//   // 🔥 Update Gradient (keeps existing data)
//   // -------------------------------
//   const updateGradient = async (userId) => {
//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             bannerStart: startColor,
//             bannerEnd: endColor,
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Gradient Updated");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
//           <Text style={styles.tapHint}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
//             <Text style={styles.label}>DOB: {item.birthDate}</Text>
//             <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

//             <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownloadDocuments(item)}>
//               <Text style={styles.downloadText}>Download ZIP</Text>
//             </TouchableOpacity>

//             {/* ------- UPDATE STATUS -------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>Update Visa Status</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new status"
//               value={statusText}
//               onChangeText={setStatusText}
//             />

//             <TouchableOpacity style={styles.actionBtn} onPress={() => updateVisaStatus(item.userId)}>
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* ------- UPDATE GRADIENT -------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>Update Banner Gradient</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Start Color (#FFC500)"
//               value={startColor}
//               onChangeText={setStartColor}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="End Color (#FFA770)"
//               value={endColor}
//               onChangeText={setEndColor}
//             />

//             <TouchableOpacity style={styles.actionBtn} onPress={() => updateGradient(item.userId)}>
//               <Text style={styles.actionText}>Update Gradient</Text>
//             </TouchableOpacity>

//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

//   return (
//     <FlatList
//       data={passports}
//       keyExtractor={item => item.id}
//       renderItem={renderItem}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: { margin: 12, padding: 12, backgroundColor: "#1f2933", borderRadius: 12 },
//   name: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   tapHint: { color: "#cbd2d9", marginTop: 4 },
//   detailsBox: { backgroundColor: "#e5e7eb", padding: 12, borderRadius: 10, marginTop: 12 },
//   label: { marginVertical: 4, fontWeight: "600" },
//   downloadBtn: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, marginTop: 10 },
//   downloadText: { color: "white", textAlign: "center" },
//   input: { backgroundColor: "white", borderWidth: 1, borderColor: "#aaa", padding: 10, borderRadius: 8, marginTop: 6 },
//   actionBtn: { backgroundColor: "#FF5C00", padding: 12, borderRadius: 8, marginTop: 10 },
//   actionText: { color: "white", fontWeight: "bold", textAlign: "center" },
// });



// import React, { useEffect, useState } from "react";
// import {
//   View, Text, FlatList, TouchableOpacity, ActivityIndicator,
//   Alert, RefreshControl, TextInput, StyleSheet
// } from "react-native";

// import { getAllPassportDataAdmin } from "../api/user/passportService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");

//   // --------------------------------------------------
//   // 🔥 CHECK IF USER IS ADMIN
//   // --------------------------------------------------
//   const checkAdmin = async () => {
//     const uid = auth().currentUser?.uid;
//     if (!uid) return false;

//     const userDoc = await firestore().collection("users").doc(uid).get();

//     if (!userDoc.exists()) return false;  // no doc → not admin

//     const data = userDoc.data() || {};
//     console.log("DATA_USER===>", data)
//     return data.isAdmin === true;       // safe check
//   };


//   // --------------------------------------------------
//   // 🔥 LOAD DATA FOR ADMIN ONLY
//   // --------------------------------------------------
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const isAdmin = await checkAdmin();
//       if (!isAdmin) {
//         Alert.alert("Access Denied", "You are not an admin!");
//         setPassports([]);
//         return;
//       }

//       const passportDocs = await getAllPassportDataAdmin();
//       setPassports(passportDocs);

//     } catch (err) {
//       Alert.alert("Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//     requestAllFilesPermission();
//   }, []);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const toggleExpand = (id) => {
//     setExpandedId(prev => (prev === id ? null : id));
//   };

//   // --------------------------------------------------
//   // 🔥 DOWNLOAD ZIP
//   // --------------------------------------------------
//   const handleDownloadDocuments = async (item) => {
//     try {
//       const images = [item.frontImageURL, item.backImageURL, item.photoUrl];
//       const zipPath = await downloadAndZipImages(
//         images,
//         `documents_${item.firstName}_${item.lastName}.zip`
//       );
//       Alert.alert("Download Complete", zipPath);
//     } catch (err) {
//       Alert.alert("Download Failed", err.message);
//     }
//   };

//   // --------------------------------------------------
//   // 🔥 Append NEW status step (keep history)
//   // --------------------------------------------------
//   const updateVisaStatus = async (userId) => {
//     if (!statusText.trim()) return Alert.alert("Error", "Enter a status");

//     const newStep = {
//       text: statusText,
//       time: new Date().toLocaleString(),
//     };

//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             currentStatus: statusText,
//             updatedAt: Date.now(),
//             steps: firestore.FieldValue.arrayUnion(newStep),
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Visa Status Updated");
//       setStatusText("");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   // --------------------------------------------------
//   // 🔥 Update user gradient settings
//   // --------------------------------------------------
//   const updateGradient = async (userId) => {
//     try {
//       await firestore()
//         .collection("visaStatus")
//         .doc(userId)
//         .set(
//           {
//             bannerStart: startColor,
//             bannerEnd: endColor,
//           },
//           { merge: true }
//         );

//       Alert.alert("Success", "Gradient Updated");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   // --------------------------------------------------
//   // 🔥 RENDER SINGLE USER BLOCK
//   // --------------------------------------------------
//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity onPress={() => toggleExpand(item.id)}>
//           <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
//           <Text style={styles.tapHint}>
//             Tap to {isExpanded ? "hide" : "view"} details
//           </Text>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
//             <Text style={styles.label}>DOB: {item.birthDate}</Text>
//             <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

//             <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownloadDocuments(item)}>
//               <Text style={styles.downloadText}>Download ZIP</Text>
//             </TouchableOpacity>

//             {/* ------- STATUS UPDATE -------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>Update Visa Status</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new status"
//               value={statusText}
//               onChangeText={setStatusText}
//             />
//             <TouchableOpacity style={styles.actionBtn} onPress={() => updateVisaStatus(item.userId)}>
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* ------- GRADIENT UPDATE -------- */}
//             <Text style={[styles.label, { marginTop: 12 }]}>Update Banner Gradient</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Start Color (#FFC500)"
//               value={startColor}
//               onChangeText={setStartColor}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="End Color (#FFA770)"
//               value={endColor}
//               onChangeText={setEndColor}
//             />

//             <TouchableOpacity style={styles.actionBtn} onPress={() => updateGradient(item.userId)}>
//               <Text style={styles.actionText}>Update Gradient</Text>
//             </TouchableOpacity>

//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

//   return (
//     <FlatList
//       data={passports}
//       keyExtractor={item => item.id}
//       renderItem={renderItem}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: { margin: 12, padding: 12, backgroundColor: "#1f2933", borderRadius: 12 },
//   name: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   tapHint: { color: "#cbd2d9", marginTop: 4 },
//   detailsBox: { backgroundColor: "#e5e7eb", padding: 12, borderRadius: 10, marginTop: 12 },
//   label: { marginVertical: 4, fontWeight: "600" },
//   downloadBtn: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, marginTop: 10 },
//   downloadText: { color: "white", textAlign: "center" },
//   input: { backgroundColor: "white", borderWidth: 1, borderColor: "#aaa", padding: 10, borderRadius: 8, marginTop: 6 },
//   actionBtn: { backgroundColor: "#FF5C00", padding: 12, borderRadius: 8, marginTop: 10 },
//   actionText: { color: "white", fontWeight: "bold", textAlign: "center" },
// });



import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, TouchableOpacity, ActivityIndicator,
  Alert, RefreshControl, TextInput, StyleSheet
} from "react-native";

import { getAllPassportDataAdmin } from "../api/user/passportService";
import { downloadAndZipImages } from "../utils/zipUtils";
import { requestAllFilesPermission } from "../utils/permissions";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default function PassportListScreen() {
  const [passports, setPassports] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [statusText, setStatusText] = useState("");
  const [startColor, setStartColor] = useState("");
  const [endColor, setEndColor] = useState("");

  // --------------------------------------------------
  // 🔥 CHECK IF USER IS ADMIN
  // --------------------------------------------------
  const checkAdmin = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return false;

    try {
      const userDoc = await firestore().collection("users").doc(uid).get();

      if (!userDoc.exists()) {
        console.log("❌ No user doc found → not admin");
        return false;
      }

      const data = userDoc.data() || {};
      console.log("ADMIN CHECK DATA:", data);

      if (data.isAdmin === true) {
        console.log("✅ Admin verified!");
        return true;
      }

      console.log("❌ User is NOT admin");
      return false;

    } catch (err) {
      console.log("Admin check error:", err);
      return false;
    }
  };

  // --------------------------------------------------
  // 🔥 LOAD DATA FOR ADMIN ONLY
  // --------------------------------------------------
  const loadData = async () => {
    try {
      setLoading(true);

      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        Alert.alert("Access Denied", "You are not an admin!");
        setPassports([]);
        return;
      }

      const passportDocs = await getAllPassportDataAdmin();
      setPassports(passportDocs);

    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    requestAllFilesPermission();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // --------------------------------------------------
  // 🔥 DOWNLOAD ZIP
  // --------------------------------------------------
  const handleDownloadDocuments = async (item) => {
    try {
      const images = [item.frontImageURL, item.backImageURL, item.photoUrl];
      const zipPath = await downloadAndZipImages(
        images,
        `documents_${item.firstName}_${item.lastName}.zip`
      );
      Alert.alert("Download Complete", zipPath);
    } catch (err) {
      Alert.alert("Download Failed", err.message);
    }
  };

  // --------------------------------------------------
  // 🔥 Append NEW status step (history kept)
  // --------------------------------------------------
  const updateVisaStatus = async (userId) => {
    if (!statusText.trim()) return Alert.alert("Error", "Enter a status");

    const newStep = {
      text: statusText,
      time: new Date().toLocaleString(),
    };

    try {
      await firestore()
        .collection("visaStatus")
        .doc(userId)
        .set(
          {
            currentStatus: statusText,
            updatedAt: Date.now(),
            steps: firestore.FieldValue.arrayUnion(newStep),
          },
          { merge: true }
        );

      Alert.alert("Success", "Visa Status Updated");
      setStatusText("");

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  // --------------------------------------------------
  // 🔥 Update gradient
  // --------------------------------------------------
  const updateGradient = async (userId) => {
    try {
      await firestore()
        .collection("visaStatus")
        .doc(userId)
        .set(
          {
            bannerStart: startColor,
            bannerEnd: endColor,
          },
          { merge: true }
        );

      Alert.alert("Success", "Gradient Updated");

    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <Text style={styles.tapHint}>
            Tap to {isExpanded ? "hide" : "view"} details
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.detailsBox}>
            <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
            <Text style={styles.label}>DOB: {item.birthDate}</Text>
            <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

            <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownloadDocuments(item)}>
              <Text style={styles.downloadText}>Download ZIP</Text>
            </TouchableOpacity>

            {/* STATUS UPDATE */}
            <Text style={[styles.label, { marginTop: 12 }]}>Update Visa Status</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new status"
              value={statusText}
              onChangeText={setStatusText}
            />
            <TouchableOpacity style={styles.actionBtn} onPress={() => updateVisaStatus(item.userId)}>
              <Text style={styles.actionText}>Update Status</Text>
            </TouchableOpacity>

            {/* GRADIENT */}
            <Text style={[styles.label, { marginTop: 12 }]}>Update Banner Gradient</Text>
            <TextInput
              style={styles.input}
              placeholder="Start Color (#FFC500)"
              value={startColor}
              onChangeText={setStartColor}
            />
            <TextInput
              style={styles.input}
              placeholder="End Color (#FFA770)"
              value={endColor}
              onChangeText={setEndColor}
            />
            <TouchableOpacity style={styles.actionBtn} onPress={() => updateGradient(item.userId)}>
              <Text style={styles.actionText}>Update Gradient</Text>
            </TouchableOpacity>

          </View>
        )}
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <FlatList
      data={passports}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}

const styles = StyleSheet.create({
  card: { margin: 12, padding: 12, backgroundColor: "#1f2933", borderRadius: 12 },
  name: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  tapHint: { color: "#cbd2d9", marginTop: 4 },
  detailsBox: { backgroundColor: "#e5e7eb", padding: 12, borderRadius: 10, marginTop: 12 },
  label: { marginVertical: 4, fontWeight: "600" },
  downloadBtn: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, marginTop: 10 },
  downloadText: { color: "white", textAlign: "center" },
  input: { backgroundColor: "white", borderWidth: 1, borderColor: "#aaa", padding: 10, borderRadius: 8, marginTop: 6 },
  actionBtn: { backgroundColor: "#FF5C00", padding: 12, borderRadius: 8, marginTop: 10 },
  actionText: { color: "white", fontWeight: "bold", textAlign: "center" },
});
