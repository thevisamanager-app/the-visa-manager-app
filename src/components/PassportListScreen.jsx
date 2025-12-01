import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { getAllPassportData } from "../api/user/passportService";
import { getUserPhoto } from "../api/user/photoService";
import { downloadAndZipImages } from "../utils/zipUtils";
import { requestAllFilesPermission } from "../utils/permissions";

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
      const images = [
        item.passportFrontImage, // adjust field names as per your Firestore structure
        item.passportBackImage,
        photoUrl,
      ];

      const fullName = `${item.firstName || "user"}_${item.lastName || ""}`
        .trim()
        .replace(/\s+/g, "_");
      const zipName = `documents_${fullName || item.id}.zip`;
      await requestAllFilesPermission();
      const zipPath = await downloadAndZipImages(images, zipName);
      Alert.alert("Download Complete", `ZIP saved at:\n${zipPath}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Download Failed", err.message || "Could not download documents");
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;

    return (
      <View
        style={{
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 12,
          backgroundColor: "#1f2933",
          padding: 12,
        }}
      >
        {/* Header row: First + Last Name */}
        <TouchableOpacity onPress={() => toggleExpand(item.id)}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {item.firstName} {item.lastName}
          </Text>
          <Text style={{ color: "#cbd2d9", marginTop: 4, fontSize: 13 }}>
            Tap to {isExpanded ? "hide" : "view"} details
          </Text>
        </TouchableOpacity>

        {/* Accordion content */}
        {isExpanded && (
          <View
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 10,
              backgroundColor: "#e5e7eb",
            }}
          >
            {/* Selected Country */}
            <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
              Selected Country:
            </Text>
            <Text style={{ marginBottom: 10 }}>{item.selectedCountry}</Text>

            {/* Passport Details */}
            <Text style={{ fontSize: 15, fontWeight: "600", marginBottom: 4 }}>
              Passport Details:
            </Text>
            <Text>Passport Number: {item.passportNumber}</Text>
            <Text>Date of Birth: {item.dob}</Text>
            <Text>Expiry Date: {item.expiryDate}</Text>
            <Text>Nationality: {item.nationality}</Text>

            {/* Download Button */}
            <TouchableOpacity
              onPress={() => handleDownloadDocuments(item)}
              style={{
                marginTop: 16,
                paddingVertical: 10,
                borderRadius: 8,
                backgroundColor: "#2563eb",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
                Download Documents (ZIP)
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!passports.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No passport records found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={passports}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingVertical: 8 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
