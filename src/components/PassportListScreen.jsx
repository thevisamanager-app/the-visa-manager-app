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

//     try {
//       const userDoc = await firestore().collection("users").doc(uid).get();

//       if (!userDoc.exists()) {
//         console.log("❌ No user doc found → not admin");
//         return false;
//       }

//       const data = userDoc.data() || {};
//       console.log("ADMIN CHECK DATA:", data);

//       if (data.isAdmin === true) {
//         console.log("✅ Admin verified!");
//         return true;
//       }

//       console.log("❌ User is NOT admin");
//       return false;

//     } catch (err) {
//       console.log("Admin check error:", err);
//       return false;
//     }
//   };

//   // --------------------------------------------------
//   // 🔥 LOAD DATA FOR ADMIN ONLY
//   // --------------------------------------------------
//   // const loadData = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const isAdmin = await checkAdmin();
//   //     if (!isAdmin) {
//   //       Alert.alert("Access Denied", "You are not an admin!");
//   //       setPassports([]);
//   //       return;
//   //     }

//   //     const passportDocs = await getAllPassportDataAdmin();
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

//       const isAdmin = await checkAdmin();
//       if (!isAdmin) {
//         Alert.alert("Access Denied", "You are not an admin!");
//         setPassports([]);
//         return;
//       }

//       const passportDocs = await getAllPassportDataAdmin();

//       // 🔥 REMOVE DUPLICATES by userId
//       const unique = [
//         ...new Map(passportDocs.map(item => [item.userId, item])).values()
//       ];

//       setPassports(unique);

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
//   // 🔥 Append NEW status step (history kept)
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
//   // 🔥 Update gradient
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

//             {/* STATUS UPDATE */}
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

//             {/* GRADIENT */}
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

// export default function PassportListScreen() {
//   const [passports, setPassports] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [statusText, setStatusText] = useState("");
//   const [startColor, setStartColor] = useState("");
//   const [endColor, setEndColor] = useState("");

//   // ---------------------------------------
//   // CHECK IF USER IS ADMIN
//   // ---------------------------------------
//   const checkAdmin = async () => {
//     const uid = auth().currentUser?.uid;
//     if (!uid) return false;

//     try {
//       const userDoc = await firestore().collection("users").doc(uid).get();

//       if (!userDoc.exists()) return false;

//       const data = userDoc.data() || {};
//       return data.isAdmin === true;
//     } catch (err) {
//       return false;
//     }
//   };

//   // ---------------------------------------
//   // LOAD DATA WITH DEDUPLICATION
//   // ---------------------------------------
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

//       // 🔥 Remove duplicates by userId
//       const unique = [
//         ...new Map(passportDocs.map((item) => [item.userId, item])).values(),
//       ];

//       setPassports(unique);
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
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   // ---------------------------------------
//   // DOWNLOAD DOCUMENTS
//   // ---------------------------------------
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

//   // ---------------------------------------
//   // UPDATE VISA STATUS
//   // ---------------------------------------
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

//   // ---------------------------------------
//   // UPDATE BANNER GRADIENT
//   // ---------------------------------------
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

//   // ---------------------------------------
//   // RENDER PASSPORT ITEM CARD
//   // ---------------------------------------
//   const renderItem = ({ item }) => {
//     const isExpanded = expandedId === item.id;

//     return (
//       <View style={styles.card}>
//         {/* Title Row */}
//         <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.rowBetween}>
//           <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
//           <Text style={styles.expandText}>{isExpanded ? "▲" : "▼"}</Text>
//         </TouchableOpacity>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <View style={styles.detailsBox}>
//             <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
//             <Text style={styles.label}>DOB: {item.birthDate}</Text>
//             <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

//             <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownloadDocuments(item)}>
//               <Text style={styles.downloadText}>Download ZIP</Text>
//             </TouchableOpacity>

//             {/* STATUS */}
//             <Text style={[styles.sectionTitle]}>Update Visa Status</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter new status"
//               value={statusText}
//               onChangeText={setStatusText}
//             />

//             <TouchableOpacity style={styles.actionBtn} onPress={() => updateVisaStatus(item.userId)}>
//               <Text style={styles.actionText}>Update Status</Text>
//             </TouchableOpacity>

//             {/* GRADIENT */}
//             <Text style={[styles.sectionTitle]}>Update Banner Gradient</Text>
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

//   // ---------------------------------------
//   // RENDER MAIN
//   // ---------------------------------------
//   if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <FlatList
//         contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
//         data={passports}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     marginHorizontal: 16,
//     marginTop: 50,
//     padding: 16,
//     backgroundColor: "#222831",
//     borderRadius: 14,
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
//     fontSize: 20,
//     fontWeight: "700",
//   },

//   expandText: {
//     fontSize: 18,
//     color: "#ccc",
//   },

//   detailsBox: {
//     backgroundColor: "#eeeeee",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 14,
//   },

//   label: {
//     marginVertical: 4,
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#333",
//   },

//   sectionTitle: {
//     marginTop: 16,
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111",
//   },

//   downloadBtn: {
//     backgroundColor: "#2563eb",
//     padding: 10,
//     borderRadius: 8,
//     marginVertical: 12,
//   },

//   downloadText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   input: {
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#bbb",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 8,
//   },

//   actionBtn: {
//     backgroundColor: "#FF5C00",
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 12,
//   },

//   actionText: {
//     color: "white",
//     fontWeight: "700",
//     textAlign: "center",
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

import { getAllPassportDataAdmin } from "../api/user/passportService";
import { downloadAndZipImages } from "../utils/zipUtils";
import { requestAllFilesPermission } from "../utils/permissions";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import {
  moderateScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

// =====================================================
// GET STATUS COLOR
// =====================================================
const getStatusColor = (status = "") => {
  const s = status.toLowerCase();

  if (s.includes("submitted")) return "#2563EB"; // blue
  if (s.includes("processing")) return "#FB923C"; // orange
  if (s.includes("approved")) return "#16A34A"; // green
  if (s.includes("rejected")) return "#DC2626"; // red

  return "#6B7280"; // gray (default)
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
  // CHECK ADMIN
  // =====================================================
  const checkAdmin = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return false;

    try {
      const userDoc = await firestore().collection("users").doc(uid).get();
      if (!userDoc.exists) return false;

      const data = userDoc.data() || {};
      return data.isAdmin === true;
    } catch (err) {
      console.log("Admin error:", err);
      return false;
    }
  };

  // =====================================================
  // LOAD DATA + REMOVE DUPLICATES + SORT LATEST FIRST
  // =====================================================
  const loadData = async () => {
    try {
      setLoading(true);

      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        Alert.alert("Access Denied", "You are not an admin!");
        setPassports([]);
        return;
      }

      let passportDocs = await getAllPassportDataAdmin();

      // Remove duplicate users by userId
      passportDocs = [
        ...new Map(passportDocs.map((item) => [item.userId, item])).values(),
      ];

      // Sort (latest first)
      passportDocs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setPassports(passportDocs);
      setFilteredList(passportDocs);
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH FILTER
  // =====================================================
  const handleSearch = (text) => {
    setSearchText(text);

    if (!text.trim()) {
      setFilteredList(passports);
      return;
    }

    const search = text.toLowerCase();

    const filtered = passports.filter((item) =>
      (item.firstName + " " + item.lastName).toLowerCase().includes(search) ||
      item.passportNumber?.toLowerCase().includes(search)
    );

    setFilteredList(filtered);
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
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // =============================
  // DOWNLOAD ZIP
  // =============================
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

  // =============================
  // UPDATE VISA STATUS
  // =============================
  const updateVisaStatus = async (userId) => {
    if (!statusText.trim())
      return Alert.alert("Error", "Enter a status");

    const newStep = {
      text: statusText,
      time: new Date().toLocaleString(),
    };

    try {
      await firestore().collection("visaStatus").doc(userId).set(
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

  // =============================
  // UPDATE GRADIENT
  // =============================
  const updateGradient = async (userId) => {
    try {
      await firestore().collection("visaStatus").doc(userId).set(
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

  // =====================================================
  // RENDER ITEM CARD
  // =====================================================
  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    console.log("ITEM===>", item)
    const statusColor = getStatusColor(item.currentStatus);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.rowBetween}
        >
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>

          {/* STATUS BADGE */}
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {item.currentStatus || "N/A"}
            </Text>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.detailsBox}>
            <Text style={styles.label}>Passport Number: {item.passportNumber}</Text>
            <Text style={styles.label}>DOB: {item.birthDate}</Text>
            <Text style={styles.label}>Expiry: {item.expiryDate}</Text>

            {/* DOWNLOAD */}
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => handleDownloadDocuments(item)}
            >
              <Text style={styles.downloadText}>Download ZIP</Text>
            </TouchableOpacity>

            {/* STATUS UPDATE */}
            <Text style={styles.sectionTitle}>Update Visa Status</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new status"
              value={statusText}
              onChangeText={setStatusText}
            />

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => updateVisaStatus(item.userId)}
            >
              <Text style={styles.actionText}>Update Status</Text>
            </TouchableOpacity>

            {/* GRADIENT */}
            <Text style={styles.sectionTitle}>Update Banner Gradient</Text>
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

  // =====================================================
  // MAIN RETURN
  // =====================================================
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {/* SEARCH BAR */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or passport number..."
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================
const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#fff",
    marginHorizontal: scale(16),
    marginTop: verticalScale(50),
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: scale(14),
  },

  card: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(16),
    padding: moderateScale(16),
    backgroundColor: "#222831",
    borderRadius: moderateScale(14),
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
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
    marginTop: verticalScale(14),
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
  },

  label: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#333",
    marginVertical: verticalScale(4),
  },

  sectionTitle: {
    marginTop: verticalScale(12),
    fontSize: scale(16),
    fontWeight: "700",
    color: "#111",
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(8),
    fontSize: scale(14),
  },

  downloadBtn: {
    backgroundColor: "#2563EB",
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
  },

  downloadText: {
    color: "white",
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
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: scale(14),
  },
});
