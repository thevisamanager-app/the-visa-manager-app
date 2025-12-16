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

//   const userId = auth().currentUser?.uid;

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [titleText, setTitleText] = useState("Loading...");
//   const [steps, setSteps] = useState([]);

//   // useEffect(() => {
//   //   if (!userId) return;

//   //   const unsubscribe = firestore()
//   //     .collection("visaStatus")
//   //     .doc(userId)
//   //     .onSnapshot((docSnap) => {
//   //       if (docSnap.exists) {
//   //         const data = docSnap.data();
//   //         setTitleText(data.currentStatus || "No Status Found");
//   //         setBannerGradient([data.bannerStart || ORANGE, data.bannerEnd || ORANGE]);
//   //         setSteps(data.steps || []);
//   //       } else {
//   //         setTitleText("No Status Found");
//   //         setSteps([]);
//   //       }
//   //     });

//   //   return unsubscribe;
//   // }, [userId]);
// useEffect(() => {
//   if (!userId) return;

//   const unsubscribe = firestore()
//     .collection("visaStatus")
//     .doc(userId)
//     .onSnapshot((docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data() || {};

//         setTitleText(data.currentStatus || "No Status Found");
//         setBannerGradient([
//           data.bannerStart || ORANGE,
//           data.bannerEnd || ORANGE,
//         ]);
//         setSteps(data.steps || []);
//       } else {
//         setTitleText("No Status Found");
//         setBannerGradient([ORANGE, ORANGE]);
//         setSteps([]);
//       }
//     });

//   return unsubscribe;
// }, [userId]);

//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView>

//         <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//           <Text style={styles.bannerText}>{titleText}</Text>
//           {/* <Icon name="chevron-forward" size={20} color="#fff" /> */}
//         </LinearGradient>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         {/* 🔥 Beautiful timeline */}
//         <View style={styles.timelineContainer}>
//           {[...steps].map((step, idx) => (
//             <View key={idx} style={styles.timelineItem}>
//               <View style={styles.dot} />
//               <View style={{ marginLeft: 12 }}>
//                 <Text style={styles.stepTitle}>{step.text}</Text>
//                 <Text style={styles.time}>{step.time}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//       </ScrollView>

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF" },
//   headerRow: { padding: 18, flexDirection: "row", alignItems: "center" },
//   bannerCard: {
//     padding: 16, margin: 16, borderRadius: 12,
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center",
//   },
//   bannerText: { color: "#FFF", fontSize: 18, fontWeight: "700" },
//   sectionTitle: { marginLeft: 16, marginTop: 10, fontSize: 20, fontWeight: "900" },

//   // Timeline
//   timelineContainer: { marginTop: 20, paddingHorizontal: 16, paddingBottom: 140 },
//   timelineItem: { flexDirection: "row", marginBottom: 24 },
//   dot: { width: 10, height: 10, backgroundColor: "#4A90E2", borderRadius: 5, marginTop: 4 },
//   stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
//   time: { fontSize: 13, color: GRAY },
// });



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   Linking,
//   Alert,
// } from "react-native";

// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";

// const ORANGE = "#FF5C00";
// const BLACK = "#000";
// const GRAY = "#666";

// export default function VisaStatusScreen({ navigation }) {
//   const userId = auth().currentUser?.uid;

//   const [bannerGradient, setBannerGradient] = useState([ORANGE, ORANGE]);
//   const [titleText, setTitleText] = useState("Loading...");
//   const [steps, setSteps] = useState([]);
//   const [documents, setDocuments] = useState([]);

//   // =============================
//   // LISTEN VISA STATUS
//   // =============================
//   useEffect(() => {
//     if (!userId) return;

//     const unsubscribe = firestore()
//       .collection("visaStatus")
//       .doc(userId)
//       .onSnapshot((docSnap) => {
//         if (docSnap.exists()) {
//           const data = docSnap.data() || {};
//           setTitleText(data.currentStatus || "No Status Found");
//           setBannerGradient([
//             data.bannerStart || ORANGE,
//             data.bannerEnd || ORANGE,
//           ]);
//           setSteps(data.steps || []);
//         } else {
//           setTitleText("No Status Found");
//           setBannerGradient([ORANGE, ORANGE]);
//           setSteps([]);
//         }
//       });

//     return unsubscribe;
//   }, [userId]);

//   // =============================
//   // LISTEN ADMIN-UPLOADED DOCUMENTS
//   // =============================
//   useEffect(() => {
//     if (!userId) return;

//     const unsubscribe = firestore()
//       .collection("users")
//       .doc(userId)
//       .collection("documents")
//       .orderBy("createdAt", "desc")
//       .onSnapshot((snap) => {
//         const docs = snap.docs.map((d) => ({
//           id: d.id,
//           ...d.data(),
//         }));
//         setDocuments(docs);
//       });

//     return unsubscribe;
//   }, [userId]);

//   // =============================
//   // DOWNLOAD / OPEN DOCUMENT
//   // =============================
//   const handleOpenDocument = async (url) => {
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (!supported) {
//         Alert.alert("Error", "Cannot open this document");
//         return;
//       }
//       await Linking.openURL(url);
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color={BLACK} />
//         </TouchableOpacity>
//       </View>

//       <ScrollView>
//         {/* STATUS BANNER */}
//         <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
//           <Text style={styles.bannerText}>{titleText}</Text>
//         </LinearGradient>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         {/* TIMELINE */}
//         <View style={styles.timelineContainer}>
//           {[...steps].map((step, idx) => (
//             <View key={idx} style={styles.timelineItem}>
//               <View style={styles.dot} />
//               <View style={{ marginLeft: 12 }}>
//                 <Text style={styles.stepTitle}>{step.text}</Text>
//                 <Text style={styles.time}>{step.time}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* =============================
//             ADMIN DOCUMENTS SECTION
//            ============================= */}
//         {documents.length > 0 && (
//           <>
//             <Text style={styles.sectionTitle}>Your Visa is ready!!</Text>

//             <View style={styles.docsContainer}>
//               {documents.map((doc) => (
//                 <TouchableOpacity
//                   key={doc.id}
//                   style={styles.docCard}
//                   onPress={() => handleOpenDocument(doc.url)}
//                 >
//                   <Icon name="document-text-outline" size={22} color="#fff" />
//                   <Text style={styles.docName} numberOfLines={1}>
//                     Your Visa
//                   </Text>
//                   <Icon name="download-outline" size={20} color="#fff" />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // =============================
// // STYLES
// // =============================
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF" },

//   headerRow: {
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   bannerCard: {
//     padding: 16,
//     margin: 16,
//     borderRadius: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   bannerText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "700",
//   },

//   sectionTitle: {
//     marginLeft: 16,
//     marginTop: 14,
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   // Timeline
//   timelineContainer: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//   },

//   timelineItem: {
//     flexDirection: "row",
//     marginBottom: 24,
//   },

//   dot: {
//     width: 10,
//     height: 10,
//     backgroundColor: "#4A90E2",
//     borderRadius: 5,
//     marginTop: 4,
//   },

//   stepTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: BLACK,
//   },

//   time: {
//     fontSize: 13,
//     color: GRAY,
//   },

//   // Documents
//   docsContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 120,
//   },

//   docCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FF5C00",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   docName: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 14,
//     fontWeight: "600",
//     color:"white"
//   },
// });



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
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
  const [latestDocument, setLatestDocument] = useState(null);

  // =============================
  // VISA STATUS LISTENER
  // =============================
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

  // =============================
  // 🔥 LATEST DOCUMENT ONLY
  // =============================
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(userId)
      .collection("documents")
      .orderBy("createdAt", "desc")
      .limit(1) // ✅ ONLY LATEST DOCUMENT
      .onSnapshot((snap) => {
        if (!snap.empty) {
          const doc = snap.docs[0];
          setLatestDocument({
            id: doc.id,
            ...doc.data(),
          });
        } else {
          setLatestDocument(null);
        }
      });

    return unsubscribe;
  }, [userId]);

  // =============================
  // OPEN DOCUMENT
  // =============================
  const handleOpenDocument = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Error", "Cannot open this document");
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={BLACK} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* STATUS BANNER */}
        <LinearGradient colors={bannerGradient} style={styles.bannerCard}>
          <Text style={styles.bannerText}>{titleText}</Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Your Visa Status</Text>

        {/* TIMELINE */}
        <View style={styles.timelineContainer}>
          {steps.map((step, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.dot} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.stepTitle}>{step.text}</Text>
                <Text style={styles.time}>{step.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* =============================
            ✅ LATEST VISA DOCUMENT
           ============================= */}
        {latestDocument && (
          <>
            <Text style={styles.sectionTitle}>Your Visa is Ready</Text>

            <View style={styles.docsContainer}>
              <TouchableOpacity
                style={styles.docCard}
                onPress={() => handleOpenDocument(latestDocument.url)}
              >
                <Icon name="document-text-outline" size={22} color="#fff" />
                <Text style={styles.docName} numberOfLines={1}>
                  Download Visa
                </Text>
                <Icon name="download-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// =============================
// STYLES
// =============================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },

  headerRow: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  bannerCard: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bannerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  sectionTitle: {
    marginLeft: 16,
    marginTop: 14,
    fontSize: 20,
    fontWeight: "900",
  },

  timelineContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  timelineItem: {
    flexDirection: "row",
    marginBottom: 24,
  },

  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#4A90E2",
    borderRadius: 5,
    marginTop: 4,
  },

  stepTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK,
  },

  time: {
    fontSize: 13,
    color: GRAY,
  },

  docsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5C00",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  docName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});
