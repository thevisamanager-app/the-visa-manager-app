// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { LinearGradient } from "react-native-linear-gradient";
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const GRAY = "#666";

// export default function VisaStatusScreen({ navigation }) {
//   const [expanded, setExpanded] = useState(null);

//   const steps = [
//     { id: 1, title: "Your Sri Lanka visa has arrived!", time: "29 Nov 05:34 pm" },
//     { id: 2, title: "We have received your payment 1.0 INR", time: "29 Nov 05:08 pm" },
//     { id: 3, title: "Your application is being internally processed by Visa Manager.", time: "29 Nov 05:12 pm" },
//     { id: 4, title: "Your application has been submitted to Ministry of Home Affairs E-Visa System for processing.", time: "29 Nov 05:12 pm" },
//     { id: 5, title: "Your Visa is being processed by Ministry of Home Affairs.", time: "29 Nov 05:34 pm" },
//     { id: 6, title: "Your Visa has arrived.", time: "29 Nov 05:35 pm" },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.helpButton}>
//           <Icon name="help-circle-outline" size={24} color={ORANGE} />
//           <Text style={styles.helpText}>Help</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* TOP CARD */}
//         <View style={styles.topSection}>
//           <View style={styles.dateCard}>
//             <Text style={styles.dateDay}>29</Text>
//             <Text style={styles.dateMonth}>Nov</Text>

//             <View style={styles.dateTimePill}>
//               <Text style={styles.dateTime}>05:34 PM</Text>
//             </View>
//           </View>

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>Yash Tupe</Text>
//             <Text style={styles.country}>Sri Lanka</Text>

//             <View style={styles.approvedTag}>
//               <Text style={styles.approvedText}>Approved • 3d 11h before time</Text>
//             </View>
//           </View>
//         </View>

//         {/* BANNER */}
//         <TouchableOpacity>
//           <LinearGradient colors={[ORANGE, ORANGE]} style={styles.bannerCard}>
//             <Text style={styles.bannerText}>Waive off your entire service fee!</Text>
//             <Icon name="chevron-forward" size={20} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         {/* TIMELINE */}
//         <View style={styles.timelineContainer}>
//           {steps.map((step, idx) => (
//             <View key={step.id}>
//               <View style={styles.row}>
//                 <View style={styles.columnLeft}>
//                   <View style={styles.dot} />
//                   {idx !== steps.length - 1 && <View style={styles.line} />}
//                 </View>

//                 <View style={styles.columnRight}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       setExpanded(expanded === step.id ? null : step.id)
//                     }
//                   >
//                     <Text style={styles.stepTitle}>{step.title}</Text>
//                     <Text style={styles.time}>{step.time}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* BOTTOM BUTTON */}
//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.viewButton}>
//           <Text style={styles.viewBtnText}>View Visa</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// // STYLES
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#FFFFFF" },

// //   headerRow: {
// //     padding: 18,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //   },
// //   helpButton: { flexDirection: "row", alignItems: "center" },
// //   helpText: { marginLeft: 4, color: ORANGE, fontWeight: "700" },

// //   topSection: { flexDirection: "row", paddingHorizontal: 16, marginTop: 6 },

// //   dateCard: {
// //     width: 82,
// //     height: 120,
// //     borderRadius: 16,
// //     borderWidth: 2,
// //     borderColor: ORANGE,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   dateDay: { fontSize: 34, fontWeight: "900", color: ORANGE },
// //   dateMonth: { fontSize: 18, fontWeight: "600", color: ORANGE },
// //   dateTimePill: {
// //     backgroundColor: ORANGE,
// //     paddingVertical: 4,
// //     paddingHorizontal: 10,
// //     borderRadius: 12,
// //     marginTop: 6,
// //   },
// //   dateTime: { fontSize: 12, fontWeight: "700", color: "#fff" },

// //   userInfo: { marginLeft: 14, justifyContent: "center" },
// //   userName: { fontSize: 22, fontWeight: "800", color: BLACK },
// //   country: { marginTop: 4, fontSize: 15, color: GRAY },

// //   approvedTag: {
// //     backgroundColor: "#FFD7C6",
// //     paddingVertical: 4,
// //     paddingHorizontal: 10,
// //     borderRadius: 10,
// //     marginTop: 8,
// //   },
// //   approvedText: { color: ORANGE, fontWeight: "700", fontSize: 13 },

// //   bannerCard: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     padding: 14,
// //     borderRadius: 12,
// //     marginHorizontal: 16,
// //     marginTop: 16,
// //   },
// //   bannerText: { color: "#FFF", fontWeight: "700", fontSize: 15 },

// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: "800",
// //     marginLeft: 16,
// //     marginTop: 20,
// //     marginBottom: 10,
// //     color: BLACK,
// //   },

// //   timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
// //   row: { flexDirection: "row" },
// //   columnLeft: { alignItems: "center", width: 30 },
// //   columnRight: { flex: 1, paddingBottom: 20 },
// //   dot: {
// //     width: 12,
// //     height: 12,
// //     backgroundColor: ORANGE,
// //     borderRadius: 6,
// //     marginTop: 4,
// //   },
// //   line: {
// //     width: 2,
// //     height: 40,
// //     backgroundColor: ORANGE,
// //     marginTop: 2,
// //   },

// //   stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
// //   time: { fontSize: 13, color: GRAY, marginTop: 2 },

// //   bottomBar: {
// //     position: "absolute",
// //     bottom: 0,
// //     width: "100%",
// //     padding: 14,
// //     backgroundColor: "#FFF",
// //   },

// //   viewButton: {
// //     backgroundColor: ORANGE,
// //     paddingVertical: 16,
// //     borderRadius: 12,
// //     alignItems: "center",
// //   },
// //   viewBtnText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
// // });

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },

//   headerRow: {
//     padding: moderateScale(18),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   helpButton: { flexDirection: "row", alignItems: "center" },
//   helpText: { marginLeft: scale(4), color: ORANGE, fontWeight: "700", fontSize: RFValue(13) },

//   topSection: {
//     flexDirection: "row",
//     paddingHorizontal: wp("4%"),
//     marginTop: verticalScale(6),
//   },

//   dateCard: {
//     width: wp("22%"),
//     height: hp("17%"),
//     borderRadius: moderateScale(16),
//     borderWidth: scale(2),
//     borderColor: ORANGE,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dateDay: { fontSize: RFValue(30), fontWeight: "900", color: ORANGE },
//   dateMonth: { fontSize: RFValue(16), fontWeight: "600", color: ORANGE },
//   dateTimePill: {
//     backgroundColor: ORANGE,
//     paddingVertical: verticalScale(4),
//     paddingHorizontal: moderateScale(10),
//     borderRadius: moderateScale(12),
//     marginTop: verticalScale(4),
//   },
//   dateTime: { fontSize: RFValue(11), fontWeight: "700", color: "#fff" },

//   userInfo: { marginLeft: wp("3%"), justifyContent: "center" },
//   userName: { fontSize: RFValue(20), fontWeight: "800", color: BLACK },
//   country: { marginTop: verticalScale(4), fontSize: RFValue(14), color: GRAY },

//   approvedTag: {
//     backgroundColor: "#FFD7C6",
//     paddingVertical: verticalScale(4),
//     paddingHorizontal: moderateScale(10),
//     borderRadius: moderateScale(10),
//     marginTop: verticalScale(6),
//   },
//   approvedText: { color: ORANGE, fontWeight: "700", fontSize: RFValue(12) },

//   bannerCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: moderateScale(14),
//     borderRadius: moderateScale(12),
//     marginHorizontal: wp("4%"),
//     marginTop: verticalScale(16),
//   },
//   bannerText: { color: "#FFF", fontWeight: "700", fontSize: RFValue(14) },

//   sectionTitle: {
//     fontSize: RFValue(18),
//     fontWeight: "800",
//     marginLeft: wp("4%"),
//     marginTop: verticalScale(18),
//     marginBottom: verticalScale(10),
//     color: BLACK,
//   },

//   timelineContainer: {
//     paddingHorizontal: wp("4%"),
//     paddingBottom: hp("16%"),
//   },
//   row: { flexDirection: "row" },
//   columnLeft: { alignItems: "center", width: wp("8%") },
//   columnRight: { flex: 1, paddingBottom: verticalScale(18) },

//   dot: {
//     width: scale(10),
//     height: scale(10),
//     backgroundColor: ORANGE,
//     borderRadius: scale(5),
//     marginTop: verticalScale(4),
//   },
//   line: {
//     width: scale(2),
//     height: verticalScale(38),
//     backgroundColor: ORANGE,
//     marginTop: verticalScale(2),
//   },

//   stepTitle: { fontSize: RFValue(14), fontWeight: "600", color: BLACK },
//   time: { fontSize: RFValue(12), color: GRAY, marginTop: verticalScale(2) },

//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: moderateScale(14),
//     backgroundColor: "#FFF",
//   },

//   viewButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: verticalScale(14),
//     borderRadius: moderateScale(12),
//     alignItems: "center",
//   },
//   viewBtnText: { color: "#FFF", fontSize: RFValue(16), fontWeight: "900" },
// });





// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   TextInput,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";
// import { doc, onSnapshot, updateDoc } from "firebase/firestore";
// import { firestore } from "../../config/firebase";

// const ORANGE = "#FF5C00";

// export default function VisaStatusScreen({ navigation }) {
//   const userDocId = "user_123"; // static for testing now

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [steps, setSteps] = useState([]);
//   const [currentStatus, setCurrentStatus] = useState("");
//   const [adminStatusInput, setAdminStatusInput] = useState("");
//   const [adminStartColor, setAdminStartColor] = useState("");
//   const [adminEndColor, setAdminEndColor] = useState("");

//   // 🔥 Real-time listener
//   useEffect(() => {
//     const ref = doc(firestore, "visaStatus", userDocId);

//     const unsubscribe = onSnapshot(ref, (snap) => {
//       if (snap.exists()) {
//         const data = snap.data();
//         setCurrentStatus(data.currentStatus || "");
//         setSteps(data.statusSteps || []);
//         setBannerGradient([data.bannerStart || ORANGE, data.bannerEnd || ORANGE]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);
//   useEffect(() => {
//     console.log("Firestore Connected:", firestore);
//   }, []);
//   // 🟣 Admin update functions
//   const handleStatusUpdate = async () => {
//     const ref = doc(firestore, "visaStatus", userDocId);
//     await updateDoc(ref, {
//       currentStatus: adminStatusInput,
//       statusSteps: [{ text: adminStatusInput, time: new Date().toLocaleString() }, ...steps],
//       updatedAt: new Date(),
//     });
//     setAdminStatusInput("");
//   };

//   const handleGradientUpdate = async () => {
//     const ref = doc(firestore, "visaStatus", userDocId);
//     await updateDoc(ref, {
//       bannerStart: adminStartColor,
//       bannerEnd: adminEndColor,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>

//         {/* LIVE BANNER */}
//         <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//           <Text style={styles.bannerText}>{currentStatus || "Waiting for update..."}</Text>
//         </LinearGradient>

//         <Text style={styles.sectionTitle}>Real-time Visa Status</Text>

//         {/* TIMELINE */}
//         <View style={styles.timelineContainer}>
//           {steps.map((step, index) => (
//             <View key={index} style={{ marginBottom: 14 }}>
//               <Text style={styles.stepTitle}>{step.text}</Text>
//               <Text style={styles.time}>{step.time}</Text>
//             </View>
//           ))}
//         </View>

//         {/* ADMIN PANEL (temporary) */}
//         <View style={styles.adminCard}>
//           <Text style={styles.adminTitle}>ADMIN CONTROL PANEL</Text>

//           <Text style={styles.label}>Update Status Text</Text>
//           <TextInput
//             value={adminStatusInput}
//             onChangeText={setAdminStatusInput}
//             placeholder="Enter Status"
//             style={styles.input}
//           />
//           <TouchableOpacity style={styles.adminBtn} onPress={handleStatusUpdate}>
//             <Text style={styles.btnText}>Update Status</Text>
//           </TouchableOpacity>

//           <Text style={styles.label}>Gradient Start Color (#hex)</Text>
//           <TextInput
//             value={adminStartColor}
//             onChangeText={setAdminStartColor}
//             placeholder="#FF5C00"
//             style={styles.input}
//           />

//           <Text style={styles.label}>Gradient End Color (#hex)</Text>
//           <TextInput
//             value={adminEndColor}
//             onChangeText={setAdminEndColor}
//             placeholder="#FFAB40"
//             style={styles.input}
//           />

//           <TouchableOpacity style={styles.adminBtn} onPress={handleGradientUpdate}>
//             <Text style={styles.btnText}>Update Gradient</Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // STYLES
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },

//   headerRow: { padding: 16, flexDirection: "row", alignItems: "center" },

//   bannerCard: {
//     padding: 18,
//     borderRadius: 14,
//     marginHorizontal: 16,
//     marginTop: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   bannerText: { color: "#fff", fontWeight: "800", fontSize: 16 },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     marginLeft: 16,
//     marginTop: 16,
//   },

//   timelineContainer: { padding: 16 },
//   stepTitle: { fontSize: 15, fontWeight: "600" },
//   time: { fontSize: 12, color: "#777", marginBottom: 8 },

//   adminCard: {
//     backgroundColor: "#EFEFEF",
//     padding: 18,
//     margin: 16,
//     borderRadius: 10,
//   },
//   adminTitle: { fontWeight: "900", fontSize: 18, marginBottom: 10 },
//   label: { marginTop: 10, fontWeight: "700" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#aaa",
//     padding: 8,
//     borderRadius: 8,
//     marginTop: 6,
//   },
//   adminBtn: {
//     backgroundColor: ORANGE,
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 12,
//     alignItems: "center",
//   },
//   btnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
// });


// import React, { useState, useEffect } from "react";
// import {
//   View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";
// import { doc, onSnapshot } from "firebase/firestore";
// import { firestore } from "../../config/firebase";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const GRAY = "#666";

// export default function VisaStatusScreen({ route, navigation }) {
//   const userId = "exampleUserId123"; // later replace with auth().currentUser.uid

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [titleText, setTitleText] = useState("Loading...");
//   const [steps, setSteps] = useState([]);

//   useEffect(() => {
//     const ref = doc(firestore, "visaStatus", userId);

//     const unsub = onSnapshot(ref, (snap) => {
//       if (snap.exists()) {
//         const data = snap.data();
//         setTitleText(data.currentStatus || "");
//         setBannerGradient([data.bannerStart || ORANGE, data.bannerEnd || ORANGE]);
//         setSteps(data.steps || []);
//       }
//     });

//     return () => unsub();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>

//         <TouchableOpacity>
//           <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//             <Text style={styles.bannerText}>{titleText}</Text>
//             <Icon name="chevron-forward" size={20} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         <View style={styles.timelineContainer}>
//           {steps?.map((step, idx) => (
//             <View key={idx} style={{ marginBottom: 12 }}>
//               <Text style={styles.stepTitle}>{step.text}</Text>
//               <Text style={styles.time}>{step.time}</Text>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },
//   headerRow: { padding: 18, flexDirection: "row", alignItems: "center" },
//   bannerCard: {
//     padding: 16, borderRadius: 12, margin: 16,
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center",
//   },
//   bannerText: { color: "#FFF", fontWeight: "700", fontSize: 18 },
//   sectionTitle: { fontSize: 20, fontWeight: "900", margin: 16 },
//   timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
//   stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
//   time: { fontSize: 13, color: GRAY }
// });


// import React, { useState, useEffect } from "react";
// import {
//   View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView
// } from "react-native";

// import auth from "@react-native-firebase/auth";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";
// import { doc, onSnapshot } from "firebase/firestore";
// import { firestore } from "../../config/firebase";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const GRAY = "#666";

// export default function VisaStatusScreen({ navigation }) {

//   // 🔥 USE REAL USER ID
//   const userId = auth().currentUser?.uid;

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [titleText, setTitleText] = useState("Loading...");
//   const [steps, setSteps] = useState([]);

//   useEffect(() => {
//     if (!userId) return;

//     const ref = doc(firestore, "visaStatus", userId);

//     const unsub = onSnapshot(ref, (snap) => {
//       if (snap.exists()) {
//         const data = snap.data();
//         setTitleText(data.currentStatus || "");
//         setBannerGradient([data.bannerStart || ORANGE, data.bannerEnd || ORANGE]);
//         setSteps(data.steps || []);
//       } else {
//         setTitleText("No Status Found");
//       }
//     });

//     return () => unsub();
//   }, [userId]);

//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>

//         <TouchableOpacity>
//           <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//             <Text style={styles.bannerText}>{titleText}</Text>
//             <Icon name="chevron-forward" size={20} color="#fff" />
//           </LinearGradient>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         <View style={styles.timelineContainer}>
//           {steps.map((step, idx) => (
//             <View key={idx} style={{ marginBottom: 12 }}>
//               <Text style={styles.stepTitle}>{step.text}</Text>
//               <Text style={styles.time}>{step.time}</Text>
//             </View>
//           ))}
//         </View>

//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },
//   headerRow: { padding: 18, flexDirection: "row", alignItems: "center" },
//   bannerCard: {
//     padding: 16, borderRadius: 12, margin: 16,
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center",
//   },
//   bannerText: { color: "#FFF", fontWeight: "700", fontSize: 18 },
//   sectionTitle: { fontSize: 20, fontWeight: "900", margin: 16 },
//   timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
//   stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
//   time: { fontSize: 13, color: GRAY }
// });



// import React, { useState, useEffect } from "react";
// import {
//   View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView
// } from "react-native";

// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const GRAY = "#666";

// export default function VisaStatusScreen({ navigation }) {

//   const userId = auth().currentUser?.uid;  // REAL UID

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [titleText, setTitleText] = useState("Loading...");
//   const [steps, setSteps] = useState([]);

//   useEffect(() => {
//     if (!userId) return;

//     const unsubscribe = firestore()
//       .collection("visaStatus")
//       .doc(userId)
//       .onSnapshot((docSnap) => {
//         if (docSnap.exists) {
//           const data = docSnap.data();

//           setTitleText(data.currentStatus || "No Status Found");
//           setBannerGradient([
//             data.bannerStart || ORANGE,
//             data.bannerEnd || ORANGE,
//           ]);
//           setSteps(data.steps || []);
//         } else {
//           setTitleText("No Status Found");
//           setSteps([]);
//         }
//       });

//     return unsubscribe;
//   }, [userId]);

//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>

//         <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//           <Text style={styles.bannerText}>{titleText}</Text>
//           <Icon name="chevron-forward" size={20} color="#fff" />
//         </LinearGradient>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         <View style={styles.timelineContainer}>
//           {steps.map((step, idx) => (
//             <View key={idx} style={{ marginBottom: 12 }}>
//               <Text style={styles.stepTitle}>{step.text}</Text>
//               <Text style={styles.time}>{step.time}</Text>
//             </View>
//           ))}
//         </View>

//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },
//   headerRow: { padding: 18, flexDirection: "row", alignItems: "center" },
//   bannerCard: {
//     padding: 16, borderRadius: 12, margin: 16,
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center",
//   },
//   bannerText: { color: "#FFF", fontWeight: "700", fontSize: 18 },
//   sectionTitle: { fontSize: 20, fontWeight: "900", margin: 16 },
//   timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
//   stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
//   time: { fontSize: 13, color: GRAY }
// });



// --- VisaStatusScreen.js ---

import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const ORANGE = "#FF5C00";
const BLACK = "#000";
const GRAY = "#666";

export default function VisaStatusScreen({ navigation }) {

  const userId = auth().currentUser?.uid;

  const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
  const [titleText, setTitleText] = useState("Loading...");
  const [steps, setSteps] = useState([]);

  // useEffect(() => {
  //   if (!userId) return;

  //   const unsubscribe = firestore()
  //     .collection("visaStatus")
  //     .doc(userId)
  //     .onSnapshot((docSnap) => {
  //       if (docSnap.exists) {
  //         const data = docSnap.data();
  //         setTitleText(data.currentStatus || "No Status Found");
  //         setBannerGradient([data.bannerStart || ORANGE, data.bannerEnd || ORANGE]);
  //         setSteps(data.steps || []);
  //       } else {
  //         setTitleText("No Status Found");
  //         setSteps([]);
  //       }
  //     });

  //   return unsubscribe;
  // }, [userId]);
useEffect(() => {
  if (!userId) return;

  const unsubscribe = firestore()
    .collection("visaStatus")
    .doc(userId)
    .onSnapshot((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() || {};

        setTitleText(data.currentStatus || "No Status Found");
        setBannerGradient([
          data.bannerStart || ORANGE,
          data.bannerEnd || ORANGE,
        ]);
        setSteps(data.steps || []);
      } else {
        setTitleText("No Status Found");
        setBannerGradient([ORANGE, ORANGE]);
        setSteps([]);
      }
    });

  return unsubscribe;
}, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={BLACK} />
        </TouchableOpacity>
      </View>

      <ScrollView>

        <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
          <Text style={styles.bannerText}>{titleText}</Text>
          {/* <Icon name="chevron-forward" size={20} color="#fff" /> */}
        </LinearGradient>

        <Text style={styles.sectionTitle}>Your Visa Status</Text>

        {/* 🔥 Beautiful timeline */}
        <View style={styles.timelineContainer}>
          {[...steps].map((step, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.dot} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.stepTitle}>{step.text}</Text>
                <Text style={styles.time}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  headerRow: { padding: 18, flexDirection: "row", alignItems: "center" },
  bannerCard: {
    padding: 16, margin: 16, borderRadius: 12,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  bannerText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
  sectionTitle: { marginLeft: 16, marginTop: 10, fontSize: 20, fontWeight: "900" },

  // Timeline
  timelineContainer: { marginTop: 20, paddingHorizontal: 16, paddingBottom: 140 },
  timelineItem: { flexDirection: "row", marginBottom: 24 },
  dot: { width: 10, height: 10, backgroundColor: "#4A90E2", borderRadius: 5, marginTop: 4 },
  stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
  time: { fontSize: 13, color: GRAY },
});
