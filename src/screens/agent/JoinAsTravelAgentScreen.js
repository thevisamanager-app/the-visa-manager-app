import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import Icon from "react-native-vector-icons/Ionicons";
function StatBox({ value, label }) {
    return (
        <View style={styles.statBox}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

function HighlightCard({ tag, title, points }) {
    return (
        <View style={styles.card}>
            <Text style={styles.tag}>{tag}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
            {points.map((p, i) => (
                <View key={i} style={styles.pointRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.pointText}>{p}</Text>
                </View>
            ))}

        </View>
    );
}

function AdvantageCard({ title, points }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>
            {points.map((p, i) => (
                <View key={i} style={styles.pointRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.pointText}>{p}</Text>
                </View>
            ))}

        </View>
    );
}

function FaqItem({ question }) {
    return (
        <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqText}>{question}</Text>
            <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>
    );
}


export default function JoinAsTravelAgentScreen({ navigation }) {
    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>

                {/* HEADER ACTIONS */}
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.headerBtn}
                    >
                        <Icon name="arrow-back-outline" size={22} color="#FF5C00" />

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("DestinationScreen")}
                        style={styles.headerBtn}
                    >
                        <Icon name="home-outline" size={22} color="#FF5C00" />
                    </TouchableOpacity>
                </View>

                {/* HERO */}
                <View style={{ marginTop: 10 }}>
                </View>
                <View style={styles.heroCard}>
                    <Text style={styles.heroTitle}>
                        Get Visa Processing at Agent Rates. Increase Your Revenue.
                    </Text>

                    <Text style={styles.heroSubtitle}>
                        Join India's fastest-growing visa processing network with priority service and better margins.
                    </Text>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => navigation.navigate("PartnerLoginScreen")} // or PartnerForm later
                    >
                        <Text style={styles.primaryBtnText}>Become a Partner Agent</Text>
                    </TouchableOpacity>

                    <View style={styles.chipRow}>
                        <Text style={styles.chip}>5L+ Visas Processed</Text>
                        <Text style={styles.chip}>99% Success Rate</Text>
                        <Text style={styles.chip}>50+ Countries</Text>
                    </View>
                </View>

                {/* STATS */}
                <View style={{ marginTop: 10 }}>
                </View>
                <View style={styles.statsRow}>
                    <StatBox value="5L+" label="Visas Processed" />
                    <StatBox value="99%" label="Success Rate" />
                    <StatBox value="500+" label="Agent Partners" />
                    <StatBox value="50+" label="Countries Covered" />
                    <StatBox value="Fast" label="Processing Time" />
                </View>

                {/* HIGHLIGHTS */}
                <View style={{ marginTop: 10 }}>
                </View>
                <Text style={styles.sectionTitle}>Highlights for Travel Agents</Text>

                <HighlightCard
                    tag="EARN MORE"
                    title="Revenue Enhancement"
                    points={[
                        "Competitive agent commissions",
                        "Additional revenue stream",
                        "Upsell opportunities",
                    ]}
                />

                <HighlightCard
                    tag="SAVE TIME"
                    title="Time & Resource Savings"
                    points={[
                        "No visa specialists needed",
                        "End-to-end processing",
                        "Real-time tracking dashboard",
                    ]}
                />

                <HighlightCard
                    tag="REDUCE RISK"
                    title="Higher Success Rate"
                    points={[
                        "Professional document review",
                        "Pre-submission verification",
                        "Lower rejection risk",
                    ]}
                />

                <HighlightCard
                    tag="DELIGHT CLIENTS"
                    title="Client Satisfaction"
                    points={[
                        "Faster turnaround",
                        "Dedicated urgent-case support",
                        "White-label options",
                    ]}
                />

                {/* ADVANTAGES */}
                <View style={{ marginTop: 10 }}>
                </View>
                <Text style={styles.sectionTitle}>
                    Competitive Advantage with The Visa Manager
                </Text>

                <AdvantageCard
                    title="Zero Upfront Cost"
                    points={[
                        "No onboarding fees",
                        "Pay only when processed",
                        "Risk-free model",
                    ]}
                />

                <AdvantageCard
                    title="Transparent Pricing"
                    points={[
                        "Clear agent rates",
                        "No hidden charges",
                        "Margin clarity",
                    ]}
                />

                <AdvantageCard
                    title="Quick Turnaround Time"
                    points={[
                        "Visa-type timelines",
                        "Priority handling",
                        "Faster approvals",
                    ]}
                />

                {/* FAQs */}
                <View style={{ marginTop: 10 }}>
                </View>
                <Text style={styles.sectionTitle}>FAQs for Travel Agents</Text>

                <FaqItem question="How do I become a partner agent?" />
                <FaqItem question="Do you charge onboarding fees?" />
                <FaqItem question="How fast can visas be processed?" />
                <FaqItem question="Do agents get dedicated support?" />
                <FaqItem question="What compliance documents are required?" />

            </ScrollView>
        </ScreenWrapper>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
    },

    heroCard: {
        backgroundColor: "#FFF7ED",
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },

    heroTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 10,
    },

    heroSubtitle: {
        fontSize: 14,
        color: "#4B5563",
        marginBottom: 16,
    },

    primaryBtn: {
        backgroundColor: "#FF5C00",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 16,
    },

    primaryBtnText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 15,
    },

    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    chip: {
        borderWidth: 1,
        borderColor: "#FFD6B8",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        fontSize: 12,
        color: "#92400E",
    },

    statsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    statBox: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 22,        // 🔑 more breathing room
        paddingHorizontal: 16,
        marginBottom: 12,
        alignItems: "center",
        elevation: 3,
    },


    statValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
    },


    statLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 6,
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#111827",
        marginVertical: 22,
        textAlign: "center",        // 🔑
    },


    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        alignItems: "center",        // 🔑
    },


    tag: {
        alignSelf: "center",         // 🔑
        borderWidth: 1,
        borderColor: "#FFD6B8",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 14,
        fontSize: 11,
        color: "#FF5C00",
        marginBottom: 10,
        fontWeight: "700",
    },


    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
        color: "#111827",
        textAlign: "center",         // 🔑
    },


    point: {
        fontSize: 13,
        color: "#374151",
        marginBottom: 6,
        textAlign: "justify",        // 🔑
        width: "90%",                // 🔑 keeps justified text clean
        
    },


    faqItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFE5D0",
    },

    faqText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
        flex: 1,
        textAlign: "center",        // 🔑
    },

    chevron: {
        fontSize: 18,
        color: "#9CA3AF",
    },

    pointRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
    },

    bullet: {
        fontSize: 16,
        lineHeight: 20,
        marginRight: 8,
        color: "#FF5C00",   // brand accent
    },

    pointText: {
        flex: 1,
        fontSize: 13,
        color: "#374151",
        lineHeight: 20,
        textAlign: "left",  // bullets should NEVER be centered
        textAlign: "center",
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    headerBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#F9FAFB",
    },

    headerText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },

    iconBoxCentered: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },

});
