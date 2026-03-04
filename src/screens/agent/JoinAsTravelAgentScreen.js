import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ORANGE = "#FF5C00";
const SCREEN_WIDTH = Dimensions.get("window").width;

const StatBox = ({ value, label }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HighlightCard = ({ tag, icon, title, points }) => (
  <View style={styles.infoCard}>
    <View style={styles.tagRow}>
      <Text style={styles.tag}>{tag}</Text>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={16} color={ORANGE} />
      </View>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    {points.map((point, i) => (
      <View key={`${title}-${i}`} style={styles.pointRow}>
        <Ionicons name="checkmark-circle" size={14} color={ORANGE} />
        <Text style={styles.pointText}>{point}</Text>
      </View>
    ))}
  </View>
);

const AdvantageCard = ({ title, points }) => (
  <View style={styles.infoCard}>
    <Text style={styles.cardTitle}>{title}</Text>
    {points.map((point, i) => (
      <View key={`${title}-${i}`} style={styles.pointRow}>
        <Ionicons name="ellipse" size={7} color={ORANGE} />
        <Text style={styles.pointText}>{point}</Text>
      </View>
    ))}
  </View>
);

const ReviewCard = ({ name, text }) => (
  <View style={styles.reviewCard}>
    <View style={styles.reviewQuoteWrap}>
      <Ionicons name="chatbubble-ellipses-outline" size={16} color={ORANGE} />
      <Text style={styles.reviewText}>{text}</Text>
    </View>
    <Text style={styles.reviewName}>{name}</Text>
  </View>
);

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity style={styles.faqHeader} onPress={() => setOpen((prev) => !prev)}>
        <Text style={styles.faqText}>{question}</Text>
        <Ionicons name={open ? "remove-circle-outline" : "add-circle-outline"} size={18} color="#94A3B8" />
      </TouchableOpacity>
      {open ? <Text style={styles.faqAnswer}>{answer}</Text> : null}
    </View>
  );
};

export default function JoinAsTravelAgentScreen({ navigation }) {
  const scrollRef = useRef(null);
  const indexRef = useRef(0);
  const insets = useSafeAreaInsets();
  const [faqSearch, setFaqSearch] = useState("");

  const reviews = [
    { name: "Rohit Travels", text: "Fast processing and excellent support." },
    { name: "Skyline Tours", text: "Great margins and smooth workflow." },
    { name: "Global Holidays", text: "Very reliable visa partner." },
  ];

  const faqItems = [
    { question: "How do I become a partner agent?", answer: "Register with us and our team will onboard you." },
    { question: "Do you charge onboarding fees?", answer: "No, there are zero upfront or onboarding charges." },
    { question: "How fast can visas be processed?", answer: "Most visas are processed faster than industry standards." },
    { question: "Do agents get dedicated support?", answer: "Yes, each partner gets priority support." },
    { question: "What compliance documents are required?", answer: "Basic business and identity documents are required." },
  ];

  const filteredFaqItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % reviews.length;
      scrollRef.current?.scrollTo({
        x: indexRef.current * (SCREEN_WIDTH * 0.84),
        animated: true,
      });
    }, 2600);

    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: Math.max(36, insets.bottom + 128) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="home-outline" size={18} color={ORANGE} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroKicker}>B2B PARTNER PROGRAM</Text>
          <Text style={styles.heroTitle}>Become a Partner Agent</Text>
          <Text style={styles.heroSubtitle}>
            Join India's fastest-growing visa processing network with priority handling and better margins.
          </Text>

          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaChip}>
              <Ionicons name="shield-checkmark" size={13} color={ORANGE} />
              <Text style={styles.heroMetaText}>Trusted Operations</Text>
            </View>
            <View style={styles.heroMetaChip}>
              <Ionicons name="flash" size={13} color={ORANGE} />
              <Text style={styles.heroMetaText}>Faster Turnaround</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate("PartnerLoginScreen")}>
            <Text style={styles.primaryBtnText}>Become a Partner Agent</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.subSectionTitle}>Network Snapshot</Text>
          <View style={styles.statsGrid}>
            <StatBox value="5L+" label="Visas Processed" />
            <StatBox value="99%" label="Success Rate" />
            <StatBox value="500+" label="Agent Partners" />
            <StatBox value="50+" label="Countries" />
          </View>
          <View style={styles.bottomStatWrap}>
            <StatBox value="Fast" label="Processing Time" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Highlights for Travel Agents</Text>
        <HighlightCard
          tag="EARN MORE"
          icon="cash-outline"
          title="Revenue Enhancement"
          points={["Competitive agent commissions", "Additional revenue streams", "Upsell opportunities"]}
        />
        <HighlightCard
          tag="SAVE TIME"
          icon="flash-outline"
          title="Time & Resource Savings"
          points={["No visa specialists required", "End-to-end processing", "Real-time tracking dashboard"]}
        />
        <HighlightCard
          tag="REDUCE RISK"
          icon="shield-checkmark-outline"
          title="Higher Success Rate"
          points={["Professional document checks", "Pre-submission verification", "Lower rejection probability"]}
        />
        <HighlightCard
          tag="DELIGHT CLIENTS"
          icon="sparkles-outline"
          title="Client Satisfaction"
          points={["Faster turnaround", "Urgent-case handling", "White-label options"]}
        />

        <Text style={styles.sectionTitle}>Competitive Advantage</Text>
        <AdvantageCard title="Zero Upfront Cost" points={["No onboarding fees", "Pay only when processed", "Risk-free partnership"]} />
        <AdvantageCard title="Transparent Pricing" points={["Clear agent rates", "No hidden charges", "Full margin visibility"]} />
        <AdvantageCard
          title="Quick Turnaround Time"
          points={["Visa-type specific timelines", "Priority handling for urgent cases", "Faster approvals improve client trust"]}
        />
        <AdvantageCard
          title="Embassy Liaison Services"
          points={["Direct communication with embassies", "Accurate documentation handling", "Reduced external dependencies"]}
        />
        <AdvantageCard
          title="Rejection Protection"
          points={["Pre-submission verification", "Expert document review", "Money-back protection where applicable"]}
        />
        <AdvantageCard
          title="Dedicated Account Manager"
          points={["Personal relationship manager for all queries", "Priority support for urgent needs"]}
        />

        <Text style={styles.sectionTitle}>What Our Partners Say</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SCREEN_WIDTH * 0.84}
          decelerationRate="fast"
          contentContainerStyle={styles.reviewScrollContent}
        >
          {reviews.map((review, idx) => (
            <ReviewCard key={`${review.name}-${idx}`} {...review} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>FAQs for Travel Agents</Text>
        <View style={styles.faqSearchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            value={faqSearch}
            onChangeText={setFaqSearch}
            placeholder="Search for answers"
            placeholderTextColor="#9CA3AF"
            style={styles.faqSearchInput}
          />
        </View>

        {filteredFaqItems.length === 0 ? (
          <Text style={styles.noFaqText}>No matching FAQ found.</Text>
        ) : (
          filteredFaqItems.map((item, index) => <FaqItem key={index} question={item.question} answer={item.answer} />)
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 36,
    backgroundColor: "#F8FAFC",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E6ECF3",
    elevation: 2,
    shadowColor: "#1E293B",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  heroKicker: {
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "800",
    color: ORANGE,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 12,
  },
  heroMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  heroMetaChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F0",
    borderWidth: 1,
    borderColor: "#FFDCC6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  heroMetaText: {
    fontSize: 12,
    color: "#9A3412",
    fontWeight: "600",
    marginLeft: 6,
  },
  primaryBtn: {
    backgroundColor: ORANGE,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statBox: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  bottomStatWrap: {
    marginTop: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: ORANGE,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 8,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#FFD6B8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 10,
    color: ORANGE,
    fontWeight: "700",
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFF1E8",
    borderWidth: 1,
    borderColor: "#FFD7BF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  pointRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
    width: "100%",
  },
  pointText: {
    fontSize: 13,
    color: "#374151",
    lineHeight: 18,
    marginLeft: 6,
    flex: 1,
  },
  reviewScrollContent: {
    paddingRight: 4,
  },
  reviewCard: {
    width: SCREEN_WIDTH * 0.84,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  reviewQuoteWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: "#334155",
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
  reviewName: {
    fontSize: 12,
    fontWeight: "700",
    color: ORANGE,
  },
  faqSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D8E1ED",
  },
  faqSearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },
  noFaqText: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 14,
  },
  faqItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    paddingRight: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 8,
    lineHeight: 18,
  },
});
