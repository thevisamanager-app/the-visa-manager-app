import React from "react";
import { useSelector } from "react-redux";
import CountryFlag from "react-native-country-flag";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getCountryFaqs } from "../../utils/countryFaqs";
import { COUNTRY_ISO_MAP } from "../../utils/countryIsoMap";
import ScreenWrapper from "../../components/ScreenWrapper";
import CountryImageSlider from "../../components/CountryImageSlider";
import { COUNTRY_IMAGES } from "../../utils/countryImages";



export default function VisaDetailsScreen({ navigation }) {
  const selected = useSelector((state) => state.destinations.selected);

  const countryName = selected?.countrName || "Country";
  const isoCode = (COUNTRY_ISO_MAP[countryName] || "un").toLowerCase();
  const images = COUNTRY_IMAGES[countryName] || COUNTRY_IMAGES.default;

  const faqs = getCountryFaqs(countryName);

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>

        {/* COUNTRY VISA CARD */}
        <View style={styles.countryCard}>
          <View style={styles.countryHeader}>
            <CountryFlag isoCode={isoCode} size={48} />
            <Text style={styles.countryName}>{countryName}</Text>

            <Text style={styles.processingText}>
              Get your visa by <Text style={styles.bold}>10 Jan</Text>
            </Text>

            <Text style={styles.subText}>Quick & Easy Process</Text>
          </View>
        </View>

        {/* PLACES TO VISIT HEADING */}
        <Text style={styles.sectionTitle}>Places to Visit</Text>

        {/* COUNTRY IMAGE SLIDER */}
        <CountryImageSlider images={images} />

        {/* VISA INFO */}
        <Text style={styles.sectionTitle}>Visa Information</Text>
        <View style={styles.infoGrid}>
          <InfoItem label="Visa Type" value="Tourist / Business / Transit" index={0} />
          <InfoItem label="Validity Period" value="30 days" index={1} />
          <InfoItem label="Entry" value="Single / Multiple Entry" index={2} />
          <InfoItem label="Length of Stay" value="30 days" index={3} />
          <InfoItem label="Visa Accepted At" value="All Ports Of Entry" index={4} />

        </View>

        {/* DOCUMENTS */}
        <Text style={styles.sectionTitle}>Documents Required</Text>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Passport</Text>
          <Text style={styles.docDesc}>
            Auto-scanned. Auto-filled. No manual errors.
          </Text>
        </View>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Photo</Text>
          <Text style={styles.docDesc}>
            Auto-scanned. Auto-filled. No manual errors.
          </Text>
        </View>

        {/* FAQs */}
        <Text style={styles.sectionTitle}>FAQs</Text>
        <View style={styles.faqCard}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* ACTION BUTTON */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("TravelDateScreen")}
          >
            <Text style={styles.secondaryText}>
              Start New Application
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
}


/* =======================
   REUSABLE INFO ITEM
======================== */
function InfoItem({ label, value, index }) {
  return (
    <View
      style={[
        styles.infoItem,
        index % 2 === 1 && styles.rightColumn, // 👈 move right column
      ]}
    >

      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

/* =======================
   STYLES (UNCHANGED)
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

  countryCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FF5C00",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",

    shadowColor: "#FF5C00",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 20,
    shadowRadius: 20,
    elevation: 10,
  },

  countryHeader: {
    alignItems: "center",
  },

  centerFlag: {
    marginBottom: 8,
  },

  countryName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  processingText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  subText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  infoItem: {
    width: "48%",
    marginBottom: 14,
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

  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
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

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  faqAnswer: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },

  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#FF5C00',
    borderColor: "#dbd4d1ff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "600",
    color: "#fff",
  },

  primaryText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  rightColumn: {
  paddingLeft: 40,   // 👈 adjust (6–12 works best)
},


});
