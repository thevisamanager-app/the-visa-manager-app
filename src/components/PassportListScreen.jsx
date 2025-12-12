// import React, { useEffect, useState } from "react";
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
//   SafeAreaView,
// } from "react-native";

// import { getAllPassportDataAdmin } from "../api/user/passportService";
// import { downloadAndZipImages } from "../utils/zipUtils";
// import { requestAllFilesPermission } from "../utils/permissions";

// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";

// import {
//   moderateScale,
//   scale,
//   verticalScale,
// } from "react-native-size-matters";

// // =====================================================
// // GET STATUS COLOR
// // =====================================================
// const getStatusColor = (status = "") => {
//   const s = status.toLowerCase();

//   if (s.includes("submitted")) return "#2563EB"; // blue
//   if (s.includes("processing")) return "#FB923C"; // orange
//   if (s.includes("approved")) return "#16A34A"; // green
//   if (s.includes("rejected")) return "#DC2626"; // red

//   return "#6B7280"; // gray (default)
// };

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [filteredList, setFilteredList] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [searchText, setSearchText] = useState("");

//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");

//   // =====================================================
//   // CHECK ADMIN
//   // =====================================================
//   const checkAdmin = async () => {
//     const uid = auth().currentUser?.uid;
//     if (!uid) return false;

//     try {
//       const userDoc = await firestore().collection("users").doc(uid).get();
//       if (!userDoc.exists) return false;

//       const data = userDoc.data() || {};
//       return data.isAdmin === true;
//     } catch (err) {
//       console.log("Admin error:", err);
//       return false;
//     }
//   };

//   // =====================================================
//   // LOAD DATA + REMOVE DUPLICATES + SORT LATEST FIRST
//   // =====================================================
//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const isAdmin = await checkAdmin();
//       if (!isAdmin) {
//         Alert.alert("Access Denied", "You are not an admin!");
//         setPassports([]);
//         return;
//       }

//       let passportDocs = await getAllPassportDataAdmin();

//       // Remove duplicate users by userId
//       passportDocs = [
//         ...new Map(passportDocs.map((item) => [item.userId, item])).values(),
//       ];

//       // Sort (latest first)
//       passportDocs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

//       setPassports(passportDocs);
//       setFilteredList(passportDocs);
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =====================================================
//   // SEARCH FILTER
//   // =====================================================
//   const handleSearch = (text) => {
//     setSearchText(text);

//     if (!text.trim()) {
//       setFilteredList(passports);
//       return;
//     }

//     const search = text.toLowerCase();

//     const filtered = passports.filter((item) =>
//       (item.firstName + " " + item.lastName).toLowerCase().includes(search) ||
//       item.passportNumber?.toLowerCase().includes(search)
//     );

//     setFilteredList(filtered);
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
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   // =============================
//   // DOWNLOAD ZIP
//   // =============================
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

//   // =============================
//   // UPDATE VISA STATUS
//   // =============================
//   const updateVisaStatus = async (userId) => {
//     if (!statusText.trim())
//       return Alert.alert("Error", "Enter a status");

//     const newStep = {
//       text: statusText,
//       time: new Date().toLocaleString(),
//     };

//     try {
//       await firestore().collection("visaStatus").doc(userId).set(
//         {
//           currentStatus: statusText,
//           updatedAt: Date.now(),
//           steps: firestore.FieldValue.arrayUnion(newStep),
//         },
//         { merge: true }
//       );

//       Alert.alert("Success", "Visa Status Updated");
//       setStatusText("");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   // =============================
//   // UPDATE GRADIENT
//   // =============================
//   const updateGradient = async (userId) => {
//     try {
//       await firestore().collection("visaStatus").doc(userId).set(
//         {
//           bannerStart: startColor,
//           bannerEnd: endColor,
//         },
//         { merge: true }
//       );

//       Alert.alert("Success", "Gradient Updated");
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   // =====================================================
//   // RENDER ITEM CARD
//   // =====================================================
//   const renderItem = ({ item }) => {
//     console.log("PASSPORT==>", passports)
//     const isExpanded = expandedId === item.id;
//     console.log("ITEM===>", item)
//     const statusColor = getStatusColor(item.currentStatus);

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity
//           onPress={() => toggleExpand(item.id)}
//           style={styles.rowBetween}
//         >
//           <Text style={styles.name}>
//             {item.firstName} {item.lastName}
//           </Text>

//           {/* STATUS BADGE */}
//           <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
//             <Text style={styles.statusText}>
//               {item.currentStatus || "N/A"}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
//             <Text style={styles.label}>DOB: {item.birthDate}</Text>
//             <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

//             {/* DOWNLOAD */}
//             <TouchableOpacity
//               style={styles.downloadBtn}
//               onPress={() => handleDownloadDocuments(item)}
//             >
//               <Text style={styles.downloadText}>Download ZIP</Text>
//             </TouchableOpacity>

//             {/* STATUS UPDATE */}
//             <Text style={styles.sectionTitle}>Update Visa Status</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new status"
//               value={statusText}
//               onChangeText={setStatusText}
//             />

//             <TouchableOpacity
//               style={styles.actionBtn}
//               onPress={() => updateVisaStatus(item.userId)}
//             >
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* GRADIENT */}
//             <Text style={styles.sectionTitle}>Update Banner Gradient</Text>
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

//   // =====================================================
//   // MAIN RETURN
//   // =====================================================
//   if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>

//       {/* SEARCH BAR */}
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by name or passport number..."
//         value={searchText}
//         onChangeText={handleSearch}
//       />

//       <FlatList
//         data={filteredList}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 50 }}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       />
//     </SafeAreaView>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================
// const styles = StyleSheet.create({
//   searchInput: {
//     backgroundColor: "#fff",
//     marginHorizontal: scale(16),
//     marginTop: verticalScale(50),
//     padding: moderateScale(12),
//     borderRadius: moderateScale(10),
//     borderWidth: 1,
//     borderColor: "#ccc",
//     fontSize: scale(14),
//   },

//   card: {
//     marginHorizontal: scale(16),
//     marginTop: verticalScale(16),
//     padding: moderateScale(16),
//     backgroundColor: "#222831",
//     borderRadius: moderateScale(14),
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//     elevation: 5,
//   },

//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   name: {
//     color: "#fff",
//     fontSize: scale(18),
//     fontWeight: "700",
//   },

//   statusBadge: {
//     paddingVertical: verticalScale(4),
//     paddingHorizontal: scale(10),
//     borderRadius: moderateScale(12),
//   },

//   statusText: {
//     color: "#fff",
//     fontSize: scale(12),
//     fontWeight: "700",
//   },

//   detailsBox: {
//     backgroundColor: "#f1f1f1",
//     marginTop: verticalScale(14),
//     padding: moderateScale(14),
//     borderRadius: moderateScale(10),
//   },

//   label: {
//     fontSize: scale(14),
//     fontWeight: "600",
//     color: "#333",
//     marginVertical: verticalScale(4),
//   },

//   sectionTitle: {
//     marginTop: verticalScale(12),
//     fontSize: scale(16),
//     fontWeight: "700",
//     color: "#111",
//   },

//   input: {
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#bbb",
//     padding: moderateScale(10),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(8),
//     fontSize: scale(14),
//   },

//   downloadBtn: {
//     backgroundColor: "#2563EB",
//     padding: moderateScale(10),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(10),
//   },

//   downloadText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "700",
//   },

//   actionBtn: {
//     backgroundColor: "#FF5C00",
//     padding: moderateScale(12),
//     borderRadius: moderateScale(8),
//     marginTop: verticalScale(10),
//   },

//   actionText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "700",
//     fontSize: scale(14),
//   },
// });




import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import DocumentPicker from "react-native-document-picker";

import { getAllPassportDataAdmin } from "../api/user/passportService";
import { downloadAndZipImages } from "../utils/zipUtils";
import { requestAllFilesPermission } from "../utils/permissions";

import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

// =====================================================
// STATUS COLOR HELPER
// =====================================================
const getStatusColor = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("submitted")) return "#2563EB";
  if (s.includes("processing")) return "#FB923C";
  if (s.includes("approved")) return "#16A34A";
  if (s.includes("rejected")) return "#DC2626";
  return "#6B7280";
};

export default function PassportListScreen() {
  const [passports, setPassports] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [statusText, setStatusText] = useState("");
  const [startColor, setStartColor] = useState("");
  const [endColor, setEndColor] = useState("");

  // =====================================================
  // ADMIN CHECK
  // =====================================================
  const checkAdmin = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return false;

    const doc = await firestore().collection("users").doc(uid).get();
    return doc.exists && doc.data()?.isAdmin === true;
  };

  // =====================================================
  // LOAD DATA (ADMIN ONLY)
  // =====================================================
  const loadData = async () => {
    try {
      setLoading(true);

      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        Alert.alert("Access Denied", "Admin only");
        return;
      }

      let docs = await getAllPassportDataAdmin();

      // remove duplicates by userId
      docs = [...new Map(docs.map(i => [i.userId, i])).values()];

      // newest first
      docs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setPassports(docs);
      setFilteredList(docs);
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

  // =====================================================
  // SEARCH
  // =====================================================
  const handleSearch = (text) => {
    setSearchText(text);

    if (!text.trim()) {
      setFilteredList(passports);
      return;
    }

    const q = text.toLowerCase();
    setFilteredList(
      passports.filter(
        i =>
          `${i.firstName} ${i.lastName}`.toLowerCase().includes(q) ||
          i.passportNumber?.toLowerCase().includes(q)
      )
    );
  };

  // =====================================================
  // UPLOAD DOCUMENT (ADMIN → USER)
  // =====================================================
  const handleUploadDocument = async (userId) => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const fileName = `${Date.now()}_${res.name}`;
      const storagePath = `userDocuments/${userId}/${fileName}`;

      const ref = storage().ref(storagePath);
      await ref.putFile(res.uri);
      const url = await ref.getDownloadURL();

      await firestore()
        .collection("users")
        .doc(userId)
        .collection("documents")
        .add({
          name: res.name,
          url,
          uploadedAt: firestore.FieldValue.serverTimestamp(),
          uploadedBy: "admin",
        });

      Alert.alert("Success", "Document uploaded");
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert("Upload Failed", err.message);
      }
    }
  };

  // =====================================================
  // VISA STATUS UPDATE
  // =====================================================
  const updateVisaStatus = async (userId) => {
    if (!statusText.trim()) return Alert.alert("Enter status");

    await firestore().collection("visaStatus").doc(userId).set(
      {
        currentStatus: statusText,
        updatedAt: Date.now(),
        steps: firestore.FieldValue.arrayUnion({
          text: statusText,
          time: new Date().toLocaleString(),
        }),
      },
      { merge: true }
    );

    setStatusText("");
    Alert.alert("Updated");
  };

  // =====================================================
  // GRADIENT UPDATE
  // =====================================================
  const updateGradient = async (userId) => {
    await firestore().collection("visaStatus").doc(userId).set(
      {
        bannerStart: startColor,
        bannerEnd: endColor,
      },
      { merge: true }
    );

    Alert.alert("Gradient Updated");
  };

  // =====================================================
  // RENDER CARD
  // =====================================================
  const renderItem = ({ item }) => {
    const expanded = expandedId === item.id;
    const statusColor = getStatusColor(item.currentStatus);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.rowBetween}
          onPress={() => setExpandedId(expanded ? null : item.id)}
        >
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>

          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{item.currentStatus || "N/A"}</Text>
          </View>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.detailsBox}>
            <Text style={styles.label}>Passport: {item.passportNumber}</Text>
            <Text style={styles.label}>DOB: {item.birthDate}</Text>
            <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => handleUploadDocument(item.userId)}
            >
              <Text style={styles.downloadText}>Upload Document</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Update Visa Status</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter status"
              value={statusText}
              onChangeText={setStatusText}
            />
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => updateVisaStatus(item.userId)}
            >
              <Text style={styles.actionText}>Update Status</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Banner Gradient</Text>
            <TextInput
              style={styles.input}
              placeholder="Start Color"
              value={startColor}
              onChangeText={setStartColor}
            />
            <TextInput
              style={styles.input}
              placeholder="End Color"
              value={endColor}
              onChangeText={setEndColor}
            />
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => updateGradient(item.userId)}
            >
              <Text style={styles.actionText}>Update Gradient</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search name or passport"
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  searchInput: {
    margin: scale(16),
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: scale(14),
  },
  card: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(12),
    padding: moderateScale(16),
    backgroundColor: "#222831",
    borderRadius: moderateScale(14),
    elevation: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "700",
  },
  statusBadge: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(12),
  },
  statusText: {
    color: "#fff",
    fontSize: scale(12),
    fontWeight: "700",
  },
  detailsBox: {
    backgroundColor: "#f1f1f1",
    marginTop: verticalScale(12),
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
  },
  label: {
    fontSize: scale(14),
    fontWeight: "600",
    marginVertical: verticalScale(4),
  },
  sectionTitle: {
    marginTop: verticalScale(10),
    fontSize: scale(16),
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(8),
  },
  downloadBtn: {
    backgroundColor: "#0F766E",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  downloadText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  actionBtn: {
    backgroundColor: "#FF5C00",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },
  actionText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
