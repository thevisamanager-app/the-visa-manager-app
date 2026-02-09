// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import ScreenWrapper from "../../components/ScreenWrapper";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const ORANGE = "#FF5C00";
// const SCREEN_WIDTH = Dimensions.get("window").width;

// /* -------------------- SMALL COMPONENTS -------------------- */

// const StatBox = ({ value, label, center }) => (
//   <View style={[styles.statBox, center && styles.centerStat]}>
//     <Text style={styles.statValue}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const HighlightCard = ({ tag, icon, title, points }) => (
//   <View style={styles.infoCard}>
//     <Text style={styles.tag}>{tag}</Text>

//     <Ionicons
//       name={icon}
//       size={26}
//       color={ORANGE}
//       style={{ marginBottom: 6 }}
//     />

//     <Text style={styles.cardTitle}>{title}</Text>

//     {points.map((p, i) => (
//       <View key={i} style={styles.pointRow}>
//         <Text style={styles.bullet}>•</Text>
//         <Text style={styles.pointText}>{p}</Text>
//       </View>
//     ))}
//   </View>
// );

// const AdvantageCard = ({ title, points }) => (
//   <View style={styles.infoCard}>
//     <Text style={styles.cardTitle}>{title}</Text>

//     {points.map((p, i) => (
//       <Text key={i} style={styles.centerPointText}>
//         • {p}
//       </Text>
//     ))}
//   </View>
// );

// const ReviewCard = ({ name, text }) => (
//   <View style={styles.reviewCard}>
//     <Text style={styles.reviewText}>"{text}"</Text>
//     <Text style={styles.reviewName}>— {name}</Text>
//   </View>
// );

// const FaqItem = ({ question, answer }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <View style={styles.faqItem}>
//       <TouchableOpacity
//         style={styles.faqHeader}
//         onPress={() => setOpen(!open)}
//       >
//         <Text style={styles.faqText}>{question}</Text>
//         <Ionicons
//           name={open ? "chevron-up" : "chevron-down"}
//           size={18}
//           color="#9CA3AF"
//         />
//       </TouchableOpacity>

//       {open && <Text style={styles.faqAnswer}>{answer}</Text>}
//     </View>
//   );
// };

// /* -------------------- MAIN SCREEN -------------------- */

// export default function JoinAsTravelAgentScreen({ navigation }) {
//   const scrollRef = useRef(null);
//   const indexRef = useRef(0);

//   const reviews = [
//     { name: "Rohit Travels", text: "Fast processing and excellent support." },
//     { name: "Skyline Tours", text: "Great margins and smooth workflow." },
//     { name: "Global Holidays", text: "Very reliable visa partner." },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       indexRef.current =
//         (indexRef.current + 1) % reviews.length;

//       scrollRef.current?.scrollTo({
//         x: indexRef.current * (SCREEN_WIDTH * 0.8),
//         animated: true,
//       });
//     }, 2500);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <ScreenWrapper>
//       <ScrollView contentContainerStyle={styles.container}>

//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={26} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
//             <Ionicons name="home" size={24} color={ORANGE} />
//           </TouchableOpacity>
//         </View>

//         {/* HERO */}
//         <View style={styles.heroCard}>
//           <Text style={styles.heroTitle}>
//             Get Visa Processing at Agent Rates. Increase Your Revenue.
//           </Text>
//           <Text style={styles.heroSubtitle}>
//             Join India’s fastest-growing visa processing network with priority
//             handling and better margins.
//           </Text>

//           <TouchableOpacity
//             style={styles.primaryBtn}
//             onPress={() => navigation.navigate("PartnerLoginScreen")}
//           >
//             <Text style={styles.primaryBtnText}>Become a Partner Agent</Text>
//           </TouchableOpacity>
//         </View>

//         {/* STATS */}
//         <View style={styles.statsRow}>
//           <StatBox value="5L+" label="Visas Processed" />
//           <StatBox value="99%" label="Success Rate" />
//           <StatBox value="500+" label="Agent Partners" />
//           <StatBox value="50+" label="Countries" />
//         </View>

//         {/* EXTRA CENTER STAT */}
//         <StatBox value="Fast" label="Processing" center />

//         {/* HIGHLIGHTS */}
//         <Text style={styles.sectionTitle}>Highlights for Travel Agents</Text>

//         <HighlightCard
//           tag="EARN MORE"
//           icon="trending-up"
//           title="Revenue Enhancement"
//           points={[
//             "Competitive agent commissions",
//             "Additional revenue streams",
//             "Upsell opportunities",
//           ]}
//         />

//         <HighlightCard
//           tag="SAVE TIME"
//           icon="time-outline"
//           title="Time & Resource Savings"
//           points={[
//             "No visa specialists required",
//             "End-to-end processing",
//             "Real-time tracking dashboard",
//           ]}
//         />

//         <HighlightCard
//           tag="REDUCE RISK"
//           icon="shield-checkmark-outline"
//           title="Higher Success Rate"
//           points={[
//             "Professional document checks",
//             "Pre-submission verification",
//             "Lower rejection probability",
//           ]}
//         />

//         <HighlightCard
//           tag="DELIGHT CLIENTS"
//           icon="happy-outline"
//           title="Client Satisfaction"
//           points={[
//             "Faster turnaround",
//             "Urgent-case handling",
//             "White-label options",
//           ]}
//         />

//         {/* ADVANTAGES */}
//         <Text style={styles.sectionTitle}>
//           Competitive Advantage with The Visa Manager
//         </Text>

//         <AdvantageCard
//           title="Zero Upfront Cost"
//           points={[
//             "No onboarding fees",
//             "Pay only when processed",
//             "Risk-free partnership",
//           ]}
//         />

//         <AdvantageCard
//           title="Transparent Pricing"
//           points={[
//             "Clear agent rates",
//             "No hidden charges",
//             "Full margin visibility",
//           ]}
//         />

//         <AdvantageCard
//           title="Quick Turnaround Time"
//           points={[
//             "Visa-type timelines",
//             "Priority handling for urgent cases",
//             "Faster approvals",
//           ]}
//         />

//          <AdvantageCard
//           title="Embassy Liaison Services"
//           points={[
//             "Direct communication with embassies",
//             "Accurate documentation handling",
//             "Reduced external dependencies",
//           ]}
//         />

//          <AdvantageCard
//           title="Rejection Protection"
//           points={[
//             "Pre-submission verification",
//             "Expert document review",
//             "Money-back protection where applicable",
//           ]}
//         />

//         <AdvantageCard
//           title="Dedicated Account Manager"
//           points={[
//             "Personal relationship manager for all queries",
//             "Priority support for urgent needs",
//           ]}
//         />

//         {/* REVIEWS */}
//         <Text style={styles.sectionTitle}>What Our Partners Say</Text>

//         <ScrollView
//           ref={scrollRef}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={SCREEN_WIDTH * 0.8}
//         >
//           {reviews.map((r, i) => (
//             <ReviewCard key={i} {...r} />
//           ))}
//         </ScrollView>

//         {/* FAQ */}
//         <Text style={styles.sectionTitle}>FAQs for Travel Agents</Text>

//         <FaqItem
//           question="How do I become a partner agent?"
//           answer="Register with us and our team will onboard you."
//         />

//         <FaqItem
//           question="Do you charge onboarding fees?"
//           answer="No, there are zero upfront or onboarding charges."
//         />

//         <FaqItem
//           question="How fast can visas be processed?"
//           answer="Most visas are processed faster than industry standards."
//         />

//         <FaqItem
//           question="Do agents get dedicated support?"
//           answer="Yes, each partner gets priority support."
//         />

//         <FaqItem
//           question="What compliance documents are required?"
//           answer="Basic business and identity documents are required."
//         />

//       </ScrollView>
//     </ScreenWrapper>
//   );
// }

// /* -------------------- STYLES -------------------- */

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingBottom: 40,
//   },

//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   heroCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 22,
//     padding: 22,
//     marginBottom: 24,
//   },

//   heroTitle: {
//     fontSize: 21,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 8,
//   },

//   heroSubtitle: {
//     fontSize: 14,
//     color: "#4B5563",
//     marginBottom: 16,
//     lineHeight: 20,
//   },

//   primaryBtn: {
//     backgroundColor: ORANGE,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   primaryBtnText: {
//     color: "#FFF",
//     fontSize: 15,
//     fontWeight: "700",
//   },

//   statsRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   statBox: {
//     width: "48%",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     paddingVertical: 22,
//     marginBottom: 12,
//     alignItems: "center",
//     elevation: 2,
//   },

//   centerStat: {
//     width: "100%",
//     alignSelf: "center",
//   },

//   statValue: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#111827",
//   },

//   statLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 6,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#111827",
//     marginVertical: 22,
//     textAlign: "center",
//   },

//   infoCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 18,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//     alignItems: "center",
//   },

//   tag: {
//     borderWidth: 1,
//     borderColor: "#FFD6B8",
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 14,
//     fontSize: 11,
//     color: ORANGE,
//     marginBottom: 6,
//     fontWeight: "700",
//   },

//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//     textAlign: "center",
//     marginBottom: 8,
//   },

//   pointRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginBottom: 6,
//   },

//   bullet: {
//     fontSize: 16,
//     marginRight: 6,
//     color: ORANGE,
//   },

//   pointText: {
//     fontSize: 13,
//     color: "#eca81f",
//     lineHeight: 20,
//   },

//   centerPointText: {
//     fontSize: 13,
//     color: "#eca81f", 
//     textAlign: "center",
//     marginBottom: 6,
//      fontWeight: "500",
//   },

//   reviewCard: {
//     width: SCREEN_WIDTH * 0.8,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 18,
//     marginRight: 12,
//   },

//   reviewText: {
//     fontSize: 14,
//     color: "#374151",
//     marginBottom: 8,
//   },

//   reviewName: {
//     fontSize: 12,
//     fontWeight: "700",
//     color: ORANGE,
//   },

//   faqItem: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: "#FFE5D0",
//   },

//   faqHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   faqText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111827",
//     flex: 1,
//   },

//   faqAnswer: {
//     fontSize: 13,
//     color: "#4B5563",
//     marginTop: 10,
//     lineHeight: 18,
//   },
// });


import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Ionicons from "react-native-vector-icons/Ionicons";

const ORANGE = "#FF5C00";
const SCREEN_WIDTH = Dimensions.get("window").width;

/* -------------------- SMALL COMPONENTS -------------------- */

const StatBox = ({ value, label, center }) => (
    <View style={[styles.statBox, center && styles.centerStat]}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const HighlightCard = ({ tag, icon, title, points }) => (
    <View style={styles.infoCard}>
        <Text style={styles.tag}>{tag}</Text>

        <Ionicons name={icon} size={26} color={ORANGE} style={{ marginBottom: 6 }} />

        <Text style={styles.cardTitle}>{title}</Text>

        {points.map((p, i) => (
            <View key={i} style={styles.pointRow}>
                <Text style={styles.orangeBullet}>•</Text>
                <Text style={styles.pointText}>{p}</Text>
            </View>
        ))}
    </View>
);

const AdvantageCard = ({ title, points }) => (
    <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>{title}</Text>

        {points.map((p, i) => (
            <View key={i} style={styles.centerPointRow}>
                <Text style={styles.orangeBullet}>•</Text>
                <Text style={styles.centerPointText}>{p}</Text>
            </View>
        ))}
    </View>
);

const ReviewCard = ({ name, text }) => (
    <View style={styles.reviewCard}>
        <Text style={styles.reviewText}>"{text}"</Text>
        <Text style={styles.reviewName}>— {name}</Text>
    </View>
);

const FaqItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.faqItem}>
            <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => setOpen(!open)}
            >
                <Text style={styles.faqText}>{question}</Text>
                <Ionicons
                    name={open ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                />
            </TouchableOpacity>

            {open && <Text style={styles.faqAnswer}>{answer}</Text>}
        </View>
    );
};

/* -------------------- MAIN SCREEN -------------------- */

export default function JoinAsTravelAgentScreen({ navigation }) {
    const scrollRef = useRef(null);
    const indexRef = useRef(0);

    const reviews = [
        { name: "Rohit Travels", text: "Fast processing and excellent support." },
        { name: "Skyline Tours", text: "Great margins and smooth workflow." },
        { name: "Global Holidays", text: "Very reliable visa partner." },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            indexRef.current = (indexRef.current + 1) % reviews.length;
            scrollRef.current?.scrollTo({
                x: indexRef.current * (SCREEN_WIDTH * 0.8),
                animated: true,
            });
        }, 2500);

        return () => clearInterval(timer);
    }, []);

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>

                {/* HEADER */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
                        <Ionicons name="home" size={24} color={ORANGE} />
                    </TouchableOpacity>
                </View>

                {/* HERO */}
                <View style={styles.heroCard}>
                    <Text style={styles.heroTitle}>
                        Get Visa Processing at Agent Rates. Increase Your Revenue.
                    </Text>
                    <Text style={styles.heroSubtitle}>
                        Join India’s fastest-growing visa processing network with priority
                        handling and better margins.
                    </Text>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => navigation.navigate("PartnerLoginScreen")}
                    >
                        <Text style={styles.primaryBtnText}>Become a Partner Agent</Text>
                    </TouchableOpacity>
                </View>

                {/* STATS */}

                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <StatBox value="5L+" label="Visas Processed" />
                        <StatBox value="99%" label="Success Rate" />
                        <StatBox value="500+" label="Travel Agent Partners" />
                        <StatBox value="50+" label="Countries Covered" />
                    </View>

                    <StatBox value="Fast" label="Processing Time" center />
                </View>


                {/* HIGHLIGHTS */}
                <Text style={styles.sectionTitle}>Highlights for Travel Agents</Text>

                <HighlightCard
                    tag="EARN MORE"
                    icon="trending-up"
                    title="Revenue Enhancement"
                    points={[
                        "Competitive agent commissions",
                        "Additional revenue streams",
                        "Upsell opportunities",
                    ]}
                />

                <HighlightCard
                    tag="SAVE TIME"
                    icon="time-outline"
                    title="Time & Resource Savings"
                    points={[
                        "No visa specialists required",
                        "End-to-end processing",
                        "Real-time tracking dashboard",
                    ]}
                />

                <HighlightCard
                    tag="REDUCE RISK"
                    icon="shield-checkmark-outline"
                    title="Higher Success Rate"
                    points={[
                        "Professional document checks",
                        "Pre-submission verification",
                        "Lower rejection probability",
                    ]}
                />

                <HighlightCard
                    tag="DELIGHT CLIENTS"
                    icon="happy-outline"
                    title="Client Satisfaction"
                    points={[
                        "Faster turnaround",
                        "Urgent-case handling",
                        "White-label options",
                    ]}
                />

                {/* ADVANTAGES */}
                <Text style={styles.sectionTitle}>
                    Competitive Advantage with The Visa Manager
                </Text>

                <AdvantageCard
                    title="Zero Upfront Cost"
                    points={[
                        "No onboarding fees",
                        "Pay only when processed",
                        "Risk-free partnership",
                    ]}
                />

                <AdvantageCard
                    title="Transparent Pricing"
                    points={[
                        "Clear agent rates",
                        "No hidden charges",
                        "Full margin visibility",
                    ]}
                />

                <AdvantageCard
                    title="Quick Turnaround Time"
                    points={[
                        "Visa-type specific timelines",
                        "Priority handling for urgent cases",
                        "Faster approvals improve client trust",
                    ]}
                />

                <AdvantageCard
                    title="Embassy Liaison Services"
                    points={[
                        "Direct communication with embassies",
                        "Accurate documentation handling",
                        "Reduced external dependencies",
                    ]}
                />

                <AdvantageCard
                    title="Rejection Protection"
                    points={[
                        "Pre-submission verification",
                        "Expert document review",
                        "Money-back protection where applicable",
                    ]}
                />

                <AdvantageCard
                    title="Dedicated Account Manager"
                    points={[
                        "Personal relationship manager for all queries",
                        "Priority support for urgent needs",
                    ]}
                />

                {/* REVIEWS */}
                <Text style={styles.sectionTitle}>What Our Partners Say</Text>

                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={SCREEN_WIDTH * 0.8}
                >
                    {reviews.map((r, i) => (
                        <ReviewCard key={i} {...r} />
                    ))}
                </ScrollView>

                {/* FAQ */}
                <Text style={styles.sectionTitle}>FAQs for Travel Agents</Text>

                <FaqItem
                    question="How do I become a partner agent?"
                    answer="Register with us and our team will onboard you."
                />

                <FaqItem
                    question="Do you charge onboarding fees?"
                    answer="No, there are zero upfront or onboarding charges."
                />

                <FaqItem
                    question="How fast can visas be processed?"
                    answer="Most visas are processed faster than industry standards."
                />

                <FaqItem
                    question="Do agents get dedicated support?"
                    answer="Yes, each partner gets priority support."
                />

                <FaqItem
                    question="What compliance documents are required?"
                    answer="Basic business and identity documents are required."
                />

            </ScrollView>
        </ScreenWrapper>
    );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
    container: { padding: 16, paddingBottom: 40 },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    heroCard: {
        backgroundColor: "#FFF7ED",
        borderRadius: 22,
        padding: 22,
        marginBottom: 24,
    },

    heroTitle: { fontSize: 21, fontWeight: "800", marginBottom: 8 },
    heroSubtitle: { fontSize: 14, color: "#4B5563", marginBottom: 16 },

    primaryBtn: {
        backgroundColor: ORANGE,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },

    primaryBtnText: { color: "#FFF", fontWeight: "700" },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },

    statBox: {
        width: "48%",
        backgroundColor: "#F8FAFC",   // soft light background
        borderRadius: 18,
        paddingVertical: 18,
        paddingHorizontal: 10,
        alignItems: "center",
        marginBottom: 12,
    },

    centerStat: {
        width: "100%",
        marginTop: 6,
    },


    statValue: {
        fontSize: 20,
        fontWeight: "800",
        color:"#df7727",
        marginBottom: 6,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        textAlign: "center",
        marginVertical: 22,
    },

    infoCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        alignItems: "center",
    },

    cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },

    pointRow: { flexDirection: "row", marginBottom: 6 },

    orangeBullet: {
        color: ORANGE,
        fontSize: 16,
        marginRight: 6,
    },

    pointText: {
        fontSize: 13,
        color: "#374151",
        lineHeight: 20,
    },

    centerPointRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 6,
    },

    centerPointText: {
        fontSize: 13,
        color: "#374151",
        textAlign: "center",
        maxWidth: "90%",
    },

    reviewCard: {
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 18,
        marginRight: 12,
    },

    reviewText: { fontSize: 14, color: "#374151", marginBottom: 8 },
    reviewName: { fontSize: 12, fontWeight: "700", color: ORANGE },

    faqItem: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#FFE5D0",
    },

    faqHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    faqText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
        flex: 1,
    },

    faqAnswer: {
        fontSize: 13,
        color: "#4B5563",
        marginTop: 10,
        lineHeight: 18,
    },
    statsContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        elevation: 2,          // Android shadow
    },

    valueBox: {
        backgroundColor: "#FFF3E8",
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 14,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "#FFD6B8",
    },

    labelBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#F3F4F6",
    },

    statValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",            // dark value
        marginBottom: 6,
    },

    statLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#9CA3AF",            // light grey label
        textAlign: "center",
    },

});
