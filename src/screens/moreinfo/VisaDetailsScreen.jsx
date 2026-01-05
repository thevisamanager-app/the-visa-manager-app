import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export default function VisaDetailsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* =======================
            COUNTRY VISA CARD
        ======================== */}
        <View style={styles.countryCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Image
                source={{ uri: "https://flagcdn.com/w80/ae.png" }}
                style={styles.flag}
              />
              <View>
                <Text style={styles.countryName}>United Arab Emirates</Text>
                <Text style={styles.processingText}>
                  Get your visa by <Text style={styles.bold}>10 Jan</Text>
                </Text>
              </View>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>E-VISA</Text>
            </View>
          </View>

          <Text style={styles.subText}>Quick & Easy Process</Text>
          <Text style={styles.subText}>100k+ Visas Processed</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹ 6,900</Text>
            <Text style={styles.priceSub}>per adult + ₹999 service fees</Text>
          </View>
        </View>

        {/* =======================
            VISA INFORMATION
        ======================== */}
        <Text style={styles.sectionTitle}>Visa Information</Text>

        <View style={styles.infoGrid}>
          <InfoItem label="Visa Type" value="Tourist" />
          <InfoItem label="Validity Period" value="30 days" />
          <InfoItem label="Entry" value="Single Entry" />
          <InfoItem label="Length of Stay" value="30 days" />
          <InfoItem label="Visa Accepted At" value="All Ports Of Entry" />
        </View>

        <View style={styles.protectCard}>
          <Text style={styles.protectTitle}>Visa Protection Included</Text>
          <Text style={styles.protectText}>• No fee if visa is delayed</Text>
          <Text style={styles.protectText}>• 100% refund if visa rejected</Text>
        </View>

        {/* =======================
            DOCUMENTS REQUIRED
        ======================== */}
        <Text style={styles.sectionTitle}>Documents Required</Text>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Passport</Text>
          <Text style={styles.docDesc}>
            Auto-scanned. Auto-filled. No manual errors.
          </Text>
        </View>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Visa Photo</Text>
          <Text style={styles.docDesc}>
            Auto-scanned. Auto-filled. No manual errors.
          </Text>
        </View>

        {/* =======================
            ACTION BUTTONS
        ======================== */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryText}>Start New Application</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryText}>Resume Application</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* =======================
   SMALL REUSABLE COMPONENT
======================== */
function InfoItem({ label, value }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/* =======================
   STYLES
======================== */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  /* Country Card */
  countryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  flag: {
    width: 36,
    height: 24,
    marginRight: 10,
    borderRadius: 4,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  processingText: {
    fontSize: 13,
    color: "#6B7280",
  },
  bold: {
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
  },
  subText: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280",
  },
  priceRow: {
    marginTop: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  priceSub: {
    fontSize: 12,
    color: "#6B7280",
  },

  /* Section Titles */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  /* Visa Info */
  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  protectCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  protectTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#065F46",
  },
  protectText: {
    fontSize: 13,
    color: "#065F46",
  },

  /* Documents */
  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  docTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  docDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  /* Buttons */
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },
  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryText: {
    fontWeight: "600",
    color: "#111827",
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: "#F59E0B",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
