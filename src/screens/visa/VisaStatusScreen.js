import React, { useEffect, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ORANGE = "#FF5C00";
const BG = "#F3F6FB";
const CARD = "#FFFFFF";
const TEXT_DARK = "#0F172A";
const TEXT_MUTE = "#64748B";
const BORDER = "#E2E8F0";

const toMillis = (value) => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  if (typeof value?.toDate === "function") {
    return value.toDate().getTime();
  }
  if (typeof value?.seconds === "number") {
    return value.seconds * 1000;
  }
  return 0;
};

const formatTime = (value) => {
  const ms = toMillis(value);
  if (!ms) return "Recently updated";
  try {
    return new Date(ms).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Recently updated";
  }
};

const getStatusGradient = (statusText = "") => {
  const s = String(statusText || "").toLowerCase();
  if (s.includes("failed") || s.includes("rejected")) return ["#DC2626", "#EF4444"];
  if (s.includes("process")) return ["#0EA5E9", "#2563EB"];
  if (s.includes("appoint")) return ["#7C3AED", "#A855F7"];
  if (s.includes("submit")) return ["#F97316", "#FB923C"];
  if (s.includes("ready") || s.includes("approved")) return ["#059669", "#10B981"];
  return [ORANGE, "#FF7A2F"];
};

export default function VisaStatusScreen({ navigation }) {
  const userId = auth().currentUser?.uid;
  const insets = useSafeAreaInsets();

  const [manualBannerGradient, setManualBannerGradient] = useState([ORANGE, "#FF7A2F"]);
  const [manualTitleText, setManualTitleText] = useState("");
  const [manualSteps, setManualSteps] = useState([]);
  const [liveTitleText, setLiveTitleText] = useState("Loading status...");
  const [liveSteps, setLiveSteps] = useState([]);
  const [liveGradient, setLiveGradient] = useState([ORANGE, "#FF7A2F"]);
  const [latestDocument, setLatestDocument] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection("visaStatus")
      .doc(userId)
      .onSnapshot((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() || {};
          setManualTitleText(data.currentStatus || "");
          setManualBannerGradient([
            data.bannerStart || ORANGE,
            data.bannerEnd || "#FF7A2F",
          ]);
          setManualSteps(Array.isArray(data.steps) ? data.steps : []);
        } else {
          setManualTitleText("");
          setManualBannerGradient([ORANGE, "#FF7A2F"]);
          setManualSteps([]);
        }
      });

    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(userId)
      .collection("passportData")
      .onSnapshot((snap) => {
        if (snap.empty) {
          setLiveTitleText("No status available");
          setLiveSteps([]);
          setLiveGradient([ORANGE, "#FF7A2F"]);
          return;
        }

        const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
        const latest = docs
          .slice()
          .sort((a, b) => {
            const aMs = Math.max(
              toMillis(a.updatedAt),
              toMillis(a.submittedAt),
              toMillis(a.createdAt),
              toMillis(a.checkout?.updatedAt),
              toMillis(a.schengen?.submittedAt),
              toMillis(a.schengen?.appointment?.updatedAt)
            );
            const bMs = Math.max(
              toMillis(b.updatedAt),
              toMillis(b.submittedAt),
              toMillis(b.createdAt),
              toMillis(b.checkout?.updatedAt),
              toMillis(b.schengen?.submittedAt),
              toMillis(b.schengen?.appointment?.updatedAt)
            );
            return bMs - aMs;
          })[0];

        const countryLabel = latest?.country || latest?.id || "your application";
        const status = String(latest?.status || "").toLowerCase();
        let nextTitle = "Application started";
        if (status === "submitted") nextTitle = `Application submitted for ${countryLabel}`;
        else if (status === "processing") nextTitle = `Processing in progress for ${countryLabel}`;
        else if (status === "failed") nextTitle = `Action required for ${countryLabel}`;
        else if (latest?.checkout) nextTitle = `Checkout completed for ${countryLabel}`;
        else if (latest?.schengen?.appointment?.date) nextTitle = "Strategy call appointment booked";
        else if (latest?.schengen?.eligibilityForm) nextTitle = "Eligibility form submitted";

        const timeline = [];
        if (toMillis(latest?.createdAt)) {
          timeline.push({
            text: "Application created",
            at: toMillis(latest.createdAt),
          });
        }
        if (toMillis(latest?.schengen?.submittedAt)) {
          timeline.push({
            text: "Eligibility form submitted",
            at: toMillis(latest.schengen.submittedAt),
          });
        }
        if (toMillis(latest?.schengen?.appointment?.updatedAt)) {
          timeline.push({
            text: "Strategy call appointment booked",
            at: toMillis(latest.schengen.appointment.updatedAt),
          });
        }
        if (toMillis(latest?.checkout?.updatedAt)) {
          timeline.push({
            text: "Checkout details saved",
            at: toMillis(latest.checkout.updatedAt),
          });
        }
        if (toMillis(latest?.submittedAt)) {
          timeline.push({
            text: "Application submitted",
            at: toMillis(latest.submittedAt),
          });
        }
        if (toMillis(latest?.updatedAt)) {
          timeline.push({
            text: "Last update received",
            at: toMillis(latest.updatedAt),
          });
        }
        if (status === "processing") {
          timeline.push({
            text: "File is under processing",
            at: Math.max(toMillis(latest?.updatedAt), toMillis(latest?.submittedAt)),
          });
        }
        if (status === "failed") {
          timeline.push({
            text: "Application needs attention",
            at: Math.max(toMillis(latest?.updatedAt), toMillis(latest?.submittedAt)),
          });
        }

        const sortedTimeline = timeline
          .filter((item) => item?.at)
          .sort((a, b) => a.at - b.at)
          .map((item) => ({ text: item.text, time: formatTime(item.at) }));

        setLiveTitleText(nextTitle);
        setLiveSteps(sortedTimeline);
        setLiveGradient(getStatusGradient(nextTitle));
      });

    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(userId)
      .collection("documents")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((snap) => {
        if (!snap.empty) {
          const doc = snap.docs[0];
          setLatestDocument({ id: doc.id, ...doc.data() });
        } else {
          setLatestDocument(null);
        }
      });

    return unsubscribe;
  }, [userId]);

  const handleOpenDocument = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert("Error", "Cannot open this document");
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert("Error", err?.message || "Unable to open document");
    }
  };

  const displayTitle = manualTitleText || liveTitleText;
  const displaySteps = manualSteps.length > 0 ? manualSteps : liveSteps;
  const displayGradient = manualTitleText ? manualBannerGradient : liveGradient;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: Math.max(120, insets.bottom + 110) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <Icon name="chevron-back" size={20} color={TEXT_DARK} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Visa Status</Text>
            <Text style={styles.headerSub}>Live tracking</Text>
          </View>
          <View style={styles.livePill}>
            <Text style={styles.livePillText}>LIVE</Text>
          </View>
        </View>

        <LinearGradient colors={displayGradient} style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Icon name="shield-checkmark-outline" size={13} color="#FFFFFF" />
            <Text style={styles.heroBadgeText}>CURRENT STATUS</Text>
          </View>
          <Text style={styles.heroTitle}>{displayTitle}</Text>
          <Text style={styles.heroSub}>
            We update your progress at every milestone.
          </Text>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Timeline</Text>
        <View style={styles.timelineWrap}>
          {displaySteps.length === 0 ? (
            <View style={styles.emptyCard}>
              <Icon name="time-outline" size={18} color={TEXT_MUTE} />
              <Text style={styles.emptyText}>
                No timeline updates yet. You will see them here shortly.
              </Text>
            </View>
          ) : (
            displaySteps.map((step, idx) => (
              <View key={`${step?.text || "step"}-${idx}`} style={styles.timelineRow}>
                <View style={styles.railCol}>
                  <View style={styles.dot} />
                  {idx < displaySteps.length - 1 ? <View style={styles.rail} /> : null}
                </View>
                <View style={styles.stepCard}>
                  <Text style={styles.stepText}>
                    {step?.text || "Status updated"}
                  </Text>
                  <Text style={styles.stepTime}>
                    {step?.time || "Time unavailable"}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>

        <Text style={styles.sectionTitle}>Visa Document</Text>
        {latestDocument ? (
          <View style={styles.docCard}>
            <View style={styles.docLeft}>
              <View style={styles.docIconWrap}>
                <Icon name="document-text-outline" size={18} color={ORANGE} />
              </View>
              <View style={styles.docTextWrap}>
                <Text style={styles.docTitle}>Your visa is ready</Text>
                <Text style={styles.docSub}>Download your latest file</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={() => handleOpenDocument(latestDocument.url)}
            >
              <Icon name="download-outline" size={16} color="#FFFFFF" />
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyDocCard}>
            <Icon name="document-outline" size={18} color={TEXT_MUTE} />
            <Text style={styles.emptyText}>
              Your visa document will appear here once issued.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: TEXT_DARK,
    textAlign: "center",
  },
  headerSub: {
    fontSize: 12,
    color: TEXT_MUTE,
    textAlign: "center",
    marginTop: 1,
  },
  livePill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#EAFDF3",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  livePillText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#166534",
    letterSpacing: 0.5,
  },
  heroCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.38)",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  heroTitle: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
  },
  heroSub: {
    marginTop: 6,
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: "800",
  },
  timelineWrap: {
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  railCol: {
    width: 22,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: ORANGE,
  },
  rail: {
    width: 2,
    flex: 1,
    minHeight: 44,
    marginTop: 6,
    borderRadius: 1,
    backgroundColor: "#FED7AA",
  },
  stepCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  stepText: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT_DARK,
  },
  stepTime: {
    marginTop: 4,
    fontSize: 12,
    color: TEXT_MUTE,
  },
  docCard: {
    backgroundColor: CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  docIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1E8",
    borderWidth: 1,
    borderColor: "#FFD7BF",
  },
  docTextWrap: {
    marginLeft: 10,
    flex: 1,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: TEXT_DARK,
  },
  docSub: {
    marginTop: 2,
    fontSize: 12,
    color: TEXT_MUTE,
  },
  downloadBtn: {
    borderRadius: 999,
    backgroundColor: ORANGE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#F8FAFC",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emptyDocCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: CARD,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    flex: 1,
    color: TEXT_MUTE,
    fontSize: 13,
  },
});
