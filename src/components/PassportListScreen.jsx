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

//import DocumentPicker from "react-native-document-picker";

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
