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
  ScrollView
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import { downloadAndZipImages } from "../utils/zipUtils";
import { getAllPassportDataAdmin } from "../api/user/passportService";
import { requestAllFilesPermission } from "../utils/permissions";
import { logout } from "../services/auth/logoutService";
import Share from "react-native-share";
import { uploadZipAndGetLink } from "../utils/uploadZip";
import { downloadZipToDevice } from "../utils/downloadZipToDevice";
import { wp, hp, scale, verticalScale, RFValue, moderateScale } from "../utils/metrics";
const COLORS = {
  primary: "#FF5C00",
  black: "#000",
  white: "#FFF",
  gray: "#777",
  lightGray: "#F5F5F5",
};
const FILTERS = [
  { key: 'submitted', label: 'submitted' },
  { key: 'processing', label: 'processing' },
  { key: 'approved', label: 'approved' },
  { key: 'rejected', label: 'rejected' },
];
/* =====================================================
   STATUS COLOR HELPER
===================================================== */
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
  const [visaStatusMap, setVisaStatusMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [assignees, setAssignees] = useState({});
  const [statusText, setStatusText] = useState("");
  const [startColor, setStartColor] = useState("");
  const [endColor, setEndColor] = useState("");
  const [activeFilter, setActiveFilter] = useState('ALL');

  /* =====================================================
     ADMIN CHECK
  ===================================================== */
  const checkAdmin = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) return false;

    const snap = await firestore().collection("users").doc(uid).get();
    return snap.exists && snap.data()?.isAdmin === true;
  };

  /* =====================================================
     FETCH VISA STATUS
  ===================================================== */
  const getVisaStatus = async (userId) => {
    try {
      const snap = await firestore().collection("visaStatus").doc(userId).get();
      setVisaStatusMap((prev) => ({
        ...prev,
        [userId]: snap.exists ? snap.data() : null,
      }));
    } catch (e) {
      console.log("Visa status error:", e);
    }
  };

  /* =====================================================
     LOAD PASSPORT DATA (ADMIN)
  ===================================================== */
  const loadData = async () => {
    try {
      setLoading(true);

      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        Alert.alert("Access Denied", "Admin only");
        return;
      }

      let docs = await getAllPassportDataAdmin();

      docs = [...new Map(docs.map((i) => [i.userId, i])).values()];
      docs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      setPassports(docs);
      setFilteredList(docs);
      await loadAllVisaStatuses(docs);
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };


  const loadAllVisaStatuses = async (docs) => {
    try {
      const statusMap = {};

      await Promise.all(
        docs.map(async (item) => {
          const snap = await firestore()
            .collection("visaStatus")
            .doc(item.userId)
            .get();

          statusMap[item.userId] = snap.exists ? snap.data() : null;
        })
      );

      setVisaStatusMap(statusMap);
    } catch (e) {
      console.log("Load all visa statuses error:", e);
    }
  };

  useEffect(() => {
    loadData();
    requestAllFilesPermission();
    getVisaStatus();
  }, []);

  /* =====================================================
     SEARCH
  ===================================================== */
  const handleSearch = (text) => {
    setSearchText(text);
    if (!text.trim()) return setFilteredList(passports);

    const q = text.toLowerCase();
    setFilteredList(
      passports.filter(
        (i) =>
          `${i.firstName} ${i.lastName}`.toLowerCase().includes(q) ||
          i.passportNumber?.toLowerCase().includes(q)
      )
    );
  };

  /* =====================================================
     UPDATE VISA STATUS
  ===================================================== */
  const updateVisaStatus = async (userId) => {
    if (!statusText.trim())
      return Alert.alert("Error", "Enter status");

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
    getVisaStatus(userId);
    Alert.alert("Success", "Visa status updated");
  };

  /* =====================================================
     UPDATE GRADIENT
  ===================================================== */
  const updateGradient = async (userId) => {
    await firestore().collection("visaStatus").doc(userId).set(
      {
        bannerStart: startColor,
        bannerEnd: endColor,
      },
      { merge: true }
    );

    Alert.alert("Success", "Gradient updated");
  };

  /* ================= UPDATE ASSIGNEE (FIXED) ================= */
  const updateAssignee = async (userId, assigneeName) => {
    if (!assigneeName?.trim()) {
      Alert.alert("Enter assignee name");
      return;
    }

    await firestore()
      .collection("visaStatus")
      .doc(userId)
      .set(
        {
          assignee: assigneeName,
          assignedAt: Date.now(),
        },
        { merge: true }
      );

    await getVisaStatus(userId);

    setAssignees((prev) => ({ ...prev, [userId]: "" }));
    Alert.alert("Updated");
  };

  /* =====================================================
     ADMIN DOCUMENT UPLOAD (FIXED)
  ===================================================== */
  const uploadUserDocument = async (userId) => {
    try {
      const result = await launchImageLibrary({
        mediaType: "mixed",
        selectionLimit: 1,
      });

      if (result.didCancel) return;

      const file = result.assets?.[0];
      if (!file?.uri) throw new Error("No file selected");

      const fileName = file.fileName || `doc_${Date.now()}`;
      const storagePath = `userDocuments/${userId}/${Date.now()}_${fileName}`;

      const ref = storage().ref(storagePath);
      await ref.putFile(file.uri);

      const url = await ref.getDownloadURL();

      await firestore()
        .collection("users")
        .doc(userId)
        .collection("documents")
        .add({
          name: fileName,
          url,
          type: file.type || "unknown",
          uploadedBy: auth().currentUser.uid,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert("Success", "Document uploaded");
    } catch (e) {
      console.log("Upload error:", e);
      Alert.alert("Upload Failed", e.message);
    }
  };

  const handleDownloadDocuments = async (item) => {
    try {
      let allFiles = [];

      // =============================
      // MAIN APPLICANT FILES
      // =============================
      if (item.frontImageURL) {
        allFiles.push({
          url: item.frontImageURL,
          name: `main_passport_front.jpg`,
        });
      }

      if (item.backImageURL) {
        allFiles.push({
          url: item.backImageURL,
          name: `main_passport_back.jpg`,
        });
      }

      if (item.photoUrl) {
        allFiles.push({
          url: item.photoUrl,
          name: `main_photo.jpg`,
        });
      }

      // =============================
      // CO-TRAVELLER FILES (🔥 NEW)
      // =============================
      if (Array.isArray(item.coTravellers)) {
        item.coTravellers.forEach((traveller, index) => {
          const prefix = `co_traveller_${index + 1}`;

          if (traveller.frontImageURL) {
            allFiles.push({
              url: traveller.frontImageURL,
              name: `${prefix}_passport_front.jpg`,
            });
          }

          if (traveller.backImageURL) {
            allFiles.push({
              url: traveller.backImageURL,
              name: `${prefix}_passport_back.jpg`,
            });
          }

          if (traveller.photoUrl) {
            allFiles.push({
              url: traveller.photoUrl,
              name: `${prefix}_photo.jpg`,
            });
          }
        });
      }

      if (allFiles.length === 0) {
        Alert.alert("No documents found");
        return;
      }

      const zipName = `documents_${item.firstName}_${item.lastName}.zip`;

      // 1️⃣ Create ZIP locally (same util, no change)
      const zipPath = await downloadAndZipImages(allFiles, zipName);

      // 2️⃣ Upload ZIP & get URL (unchanged)
      const zipUrl = await uploadZipAndGetLink(zipPath, zipName);

      Alert.alert(
        "ZIP Ready",
        "Choose an action",
        [
          {
            text: "Download here",
            onPress: async () => {
              const savedPath = await downloadZipToDevice(zipUrl, zipName);
              Alert.alert("Downloaded", `Saved to:\n${savedPath}`);
            },
          },
          {
            text: "Share ZIP Link",
            onPress: async () => {
              await Share.open({
                message: `Download documents:\n${zipUrl}`,
                failOnCancel: false,
              });
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };


  /* =====================================================
     RENDER ITEM
  ===================================================== */
  const renderItem = ({ item }) => {
    const expanded = expandedId === item.id;
    const status = visaStatusMap[item.userId]?.currentStatus;
    const visa = visaStatusMap[item.userId];
    const statusColor = getStatusColor(status || "");
    const truncateText = (text, max = 10) => {
      console.log("TEXT==>", text)
      if (!text) return "N/A";
      return text.length > max ? `${text.slice(0, max)}...` : text;
    };
    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.rowBetween}
          onPress={() => {
            setExpandedId(expanded ? null : item.id);
            if (!expanded) getVisaStatus(item.userId);
          }}
        >
          <Text style={styles.name}>
            {item.firstName
              ? item.firstName.length > 10
                ? `${item.firstName.slice(0, 10)}...`
                : item.firstName
              : "N/A"}    {item.lastName
                ? item.lastName.length > 10
                  ? `${item.lastName.slice(0, 10)}...`
                  : item.lastNamee
                : "N/A"}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {status
                ? status.length > 10
                  ? `${status.slice(0, 10)}...`
                  : status
                : "N/A"}
            </Text>


          </View>
        </TouchableOpacity>

        {expanded && (
          <View style={styles.detailsBox}>
            <Text style={styles.label}>Passport: {item.passportNumber}</Text>
            <Text style={styles.label}>DOB: {item.birthDate}</Text>
            <Text style={styles.label}>Expiry: {item.expiryDate}</Text>
            <Text style={styles.lastStatus}>Created At: {item.createdAt}</Text>
            <Text style={styles.lastStatus}>
              Last Status: {status || "Not updated"}
            </Text>
            <Text style={styles.lastStatus}>Country Applied for: {item.country}</Text>
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

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#FF5C00" }]}
              onPress={() => uploadUserDocument(item.userId)}
            >
              <Text style={styles.actionText}>Upload Document</Text>
            </TouchableOpacity>
            {/* DOWNLOAD */}
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#FF5C00" }]}
              onPress={() => handleDownloadDocuments(item)}
            >
              <Text style={styles.actionText}>Download ZIP</Text>
            </TouchableOpacity>
            <Text style={styles.lastStatus}>
              Assigned To: {visa?.assignee || "Not Assigned"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter assignee"
              value={assignees[item.userId] || ""}
              onChangeText={(t) =>
                setAssignees((p) => ({ ...p, [item.userId]: t }))
              }
            />

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() =>
                updateAssignee(item.userId, assignees[item.userId])
              }
            >
              <Text style={styles.actionText}>Assign assignee</Text>
            </TouchableOpacity>
            {/* <TextInput
              style={styles.input}
              placeholder="Banner Start Color"
              value={startColor}
              onChangeText={setStartColor}
            />
            <TextInput
              style={styles.input}
              placeholder="Banner End Color"
              value={endColor}
              onChangeText={setEndColor}
            />

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => updateGradient(item.userId)}
            >
              <Text style={styles.actionText}>Update Gradient</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </View>
    );
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search name or passport"
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor={"#000"}
      />
      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const isActive =
            activeFilter.toLowerCase() === filter.key.toLowerCase();

          return (
            <ScrollView showsHorizontalScrollIndicator={true}>
              <TouchableOpacity
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                style={[
                  styles.filterBtn,
                  isActive && styles.activeFilterBtn,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.activeFilterText,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          );
        })}
      </View>
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadData} />
        }
        contentContainerStyle={{ paddingBottom: 60 }}
      />
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* =====================================================
   STYLES
===================================================== */
const styles = StyleSheet.create({
  searchInput: {
    margin: scale(16),
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: "#000",
    marginTop: verticalScale(50)
  },
  card: {
    marginHorizontal: scale(16),
    marginTop: verticalScale(10),
    padding: moderateScale(16),
    backgroundColor: "#222831",
    borderRadius: moderateScale(14),
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontWeight: "700",
  },
  detailsBox: {
    backgroundColor: "#f1f1f1",
    marginTop: verticalScale(10),
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
  },
  label: {
    fontWeight: "600",
  },
  lastStatus: {
    marginTop: verticalScale(6),
    fontWeight: "700",
    color: "#0F766E",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(8),
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
  logoutBtn: {
    padding: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginBottom: verticalScale(35),
    margin: moderateScale(10)
  },

  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: RFValue(16),
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: wp('4%'),
    marginBottom: verticalScale(10),
    alignSelf: "center"
  },

  filterBtn: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#DDD',
    marginRight: moderateScale(8),
    backgroundColor: COLORS.primary,
  },

  activeFilterBtn: {
    backgroundColor: '#FFE5D6',
    borderColor: '#FF5C00 ',
  },

  filterText: {
    fontSize: RFValue(13),
    color: '#555',
    fontWeight: '500',
    alignSelf: "center"
  },

  activeFilterText: {
    color: '#FF5C00',
    fontWeight: '700',
  },
});
