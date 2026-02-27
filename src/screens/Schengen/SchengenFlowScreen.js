import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenWrapper from "../../components/ScreenWrapper";

const ORANGE = "#FF5C00";
const BLUE = "#1E3A8A";
const WHATSAPP_NUMBER = "919999999999";

const WHY_ITEMS = [
  {
    icon: "folder-open",
    title: "Offline Application Process",
    text: "Biometrics and in-person submission through VFS/Embassy.",
  },
  {
    icon: "account-balance",
    title: "Embassy-Based Decisions",
    text: "Approval can vary by embassy, season, and your profile strength.",
  },
  {
    icon: "savings",
    title: "Financial Requirements",
    text: "Balance, income proof, and account consistency are reviewed.",
  },
  {
    icon: "history",
    title: "Travel History Matters",
    text: "Past visas and compliance can improve confidence.",
  },
  {
    icon: "fact-check",
    title: "Tailored Documentation",
    text: "Every profile needs a different document strategy.",
  },
];

const QUALIFY_ITEMS = [
  "Profile Analysis",
  "Documentation Strategy",
  "Appointment Booking",
  "File Preparation",
  "Submission Guidance",
];

const FLOW_AFTER_ELIGIBILITY = [
  {
    label: "STEP 1",
    title: "Eligibility Assessment",
    subtitle: "Short questions. Capture lead and qualify.",
    points: [
      "Which country are you planning to visit?",
      "Occupation and monthly income range",
      "Past visa rejections or travel issues",
      "Basic profile fit check before call booking",
    ],
    cta: "Next: Schedule Call",
  },
  {
    label: "STEP 2",
    title: "Booking Strategy Call",
    subtitle: "Your niche profile evaluation call is scheduled.",
    points: [
      "Confirmation and slot details shared",
      "Email + WhatsApp reminder support",
      "Pre-call checklist shared before meeting",
    ],
    cta: "Message Us on WhatsApp",
  },
  {
    label: "STEP 3",
    title: "Strategy Call Scheduled",
    subtitle: "Your Schengen visa file roadmap gets prepared.",
    points: [
      "Live guidance at submission stage",
      "Final documentation and sequencing",
      "Walk-through for strong submission quality",
    ],
    cta: "Message Us on WhatsApp",
  },
  {
    label: "STEP 4",
    title: "Final Approval Alert (Optional)",
    subtitle: "Receive instant notification from our team.",
    points: [
      "Real-time update support",
      "Quick action alerts and guidance",
    ],
  },
];

const FLOW_AFTER_CONFIRMATION = [
  {
    label: "STEP 1",
    title: "Strategy Call Evaluation",
    subtitle: "Expert call for action plan to start.",
    points: [
      "Visa approval plan based on profile",
      "Timeline and critical submission steps",
      "Best embassy and documentation route",
      "Fee analysis and filing approach",
    ],
    cta: "Get My Assessment",
  },
  {
    label: "STEP 2",
    title: "Client Enrollment / Payment",
    subtitle: "Ready to start your Schengen visa preparation?",
    points: [
      "Become a member for full case management",
      "Expert-guided profiling and planning",
      "Dedicated process owner and tracking",
    ],
    cta: "Secure Your Spot Now",
  },
  {
    label: "STEP 3",
    title: "Step-by-Step Guidance",
    subtitle: "Your Schengen visa file is ready for submission.",
    points: [
      "Live support during submission phase",
      "Final document review and improvements",
      "End-to-end handholding till filing",
    ],
    cta: "Message Us on WhatsApp",
  },
  {
    label: "STEP 4",
    title: "Final Approval Alert (Optional)",
    subtitle: "Receive instant notification from us.",
    points: [
      "Status alert support",
      "Post-submission guidance when needed",
    ],
  },
];

const openWhatsApp = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`;
  Linking.openURL(url).catch(() => {});
};

export default function SchengenFlowScreen({ navigation, route }) {
  const country = route?.params?.country || "Schengen";
  const renderFlowSection = (heading, steps) => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{heading}</Text>
      {steps.map((step, idx) => (
        <View key={`${step.title}-${idx}`} style={styles.flowCard}>
          <View style={styles.stepTag}>
            <Text style={styles.stepTagText}>{step.label}</Text>
          </View>

          <Text style={styles.flowTitle}>{step.title}</Text>
          <Text style={styles.flowSubtitle}>{step.subtitle}</Text>

          <View style={styles.flowPointsWrap}>
            {step.points.map((point) => (
              <View key={point} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle" size={16} color={ORANGE} />
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>

          {step.cta ? (
            <TouchableOpacity
              style={styles.inlineCta}
              onPress={step.cta.includes("WhatsApp") ? openWhatsApp : undefined}
            >
              <Text style={styles.inlineCtaText}>{step.cta}</Text>
            </TouchableOpacity>
          ) : null}

          {idx < steps.length - 1 ? (
            <View style={styles.flowArrowWrap}>
              <Ionicons name="arrow-down" size={18} color={BLUE} />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{country} Strategy Flow</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
          >
            <Ionicons name="home-outline" size={24} color={ORANGE} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              Schengen Visa is not just a form. It is a strategy.
            </Text>
            <Text style={styles.heroText}>
              27 countries. Embassy rules change. Approval depends on your profile.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={openWhatsApp}>
              <Text style={styles.primaryBtnText}>Check My Eligibility (Free)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Why Schengen Visa Is Different</Text>
            {WHY_ITEMS.map((item) => (
              <View key={item.title} style={styles.rowItem}>
                <View style={styles.iconWrap}>
                  <MaterialIcons name={item.icon} size={20} color={BLUE} />
                </View>
                <View style={styles.rowTextWrap}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Find Out If You Qualify For a Schengen Visa
            </Text>
            {QUALIFY_ITEMS.map((item, idx) => (
              <View key={item} style={styles.stepRow}>
                <Text style={styles.stepIndex}>{idx + 1}</Text>
                <Text style={styles.stepText}>{item}</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Our Proven 5-Step Process</Text>
            <View style={styles.bannerBox}>
              <Text style={styles.bannerTitle}>Download Your Free Schengen Approval Checklist</Text>
              <TouchableOpacity style={styles.downloadBtn}>
                <Text style={styles.downloadBtnText}>Download Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {renderFlowSection(
            "User Flow After Clicking Check My Eligibility",
            FLOW_AFTER_ELIGIBILITY
          )}

          {renderFlowSection(
            "Remaining User Flow After Confirming Strategy Call",
            FLOW_AFTER_CONFIRMATION
          )}

          <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
            <Ionicons name="logo-whatsapp" size={18} color="#fff" />
            <Text style={styles.whatsappText}>Message Us on WhatsApp</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  content: { padding: 16, paddingBottom: 32, gap: 12 },
  hero: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#1D4ED8",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  heroText: {
    marginTop: 10,
    color: "#DBEAFE",
    textAlign: "center",
    fontSize: 15,
  },
  primaryBtn: {
    marginTop: 14,
    backgroundColor: "#16A34A",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 12,
  },
  primaryBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  card: {
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowTextWrap: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "700", color: "#111827" },
  rowText: { fontSize: 13, color: "#4B5563", marginTop: 2 },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  stepIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: BLUE,
    color: "#fff",
    fontWeight: "700",
    marginRight: 10,
  },
  stepText: { flex: 1, fontSize: 14, color: "#111827", fontWeight: "600", marginRight: 8 },
  bannerBox: {
    borderRadius: 12,
    backgroundColor: BLUE,
    padding: 14,
    alignItems: "center",
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },
  downloadBtn: {
    backgroundColor: "#FBBF24",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  downloadBtnText: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "800",
  },
  flowCard: {
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#F8FAFC",
  },
  stepTag: {
    alignSelf: "flex-start",
    borderRadius: 8,
    backgroundColor: BLUE,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  stepTagText: { color: "#fff", fontWeight: "800", fontSize: 12 },
  flowTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 3,
  },
  flowSubtitle: {
    color: "#374151",
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "600",
  },
  flowPointsWrap: { marginBottom: 8 },
  bulletRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  bulletText: { marginLeft: 8, color: "#1F2937", fontSize: 14, flex: 1 },
  inlineCta: {
    backgroundColor: "#0F766E",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 4,
  },
  inlineCtaText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  flowArrowWrap: { alignItems: "center", marginTop: 10 },
  whatsappBtn: {
    marginTop: 4,
    backgroundColor: "#15803D",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  whatsappText: { color: "#fff", fontWeight: "800", marginLeft: 8, fontSize: 15 },
});
