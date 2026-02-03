import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";

export default function PartnerLoginScreen() {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>

                {/* HEADER */}
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.headerBtn}
                    >
                        <Icon name="arrow-back-outline" size={22} color="#FF5C00" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Tabs", { screen: "Home" })
                        }
                        style={styles.headerBtn}
                    >
                        <Icon name="home-outline" size={22} color="#FF5C00" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.badge}>PARTNER LOGIN</Text>
                <Text style={styles.title}>Partner Login – The Visa Manager</Text>

                <Text style={styles.subtitle}>
                    Sign in to access your partner dashboard or submit your agency for
                    verification. Our team will guide you through every step.
                </Text>

                {/* BENEFITS */}
                <View style={styles.benefitCard}>
                    <Benefit text="Dedicated partner success manager" />
                    <Benefit text="Priority visa processing workflow" />
                    <Benefit text="Secure document handling & audit trail" />
                </View>

                {/* RATING */}
                <View style={styles.ratingCard}>
                    <Text style={styles.stars}>★★★★★</Text>
                    <Text style={styles.ratingText}>
                        4.9 / 5 partner rating
                    </Text>
                </View>

                {/* FORM */}
                <Text style={styles.formTitle}>Agent onboarding form</Text>

                {/* BASIC DETAILS */}
                <FormCard title="Basic Details" icon="person-outline">
                    <Input label="Full Name *" placeholder="Enter full name" />
                    <Input label="Phone Number *" placeholder="+91 98765 43210" />
                    <Input label="Email Address *" placeholder="agent@agency.com" />
                </FormCard>

                {/* AGENCY DETAILS */}
                <FormCard title="Agency Details" icon="business-outline">
                    <Input label="Travel Agency Name" placeholder="Agency Pvt. Ltd." />
                    <Input label="Website" placeholder="www.agency.com" />
                    <Input label="Company Size" placeholder="Select company size" />
                </FormCard>

                {/* LEGAL DETAILS */}
                <FormCard title="Legal Details" icon="document-text-outline">
                    <Text style={styles.helper}>
                        GST is optional and can be added later.
                    </Text>
                    <Input label="PAN Card Number" placeholder="ABCDE1234F" />
                    <Input label="GST Number (optional)" placeholder="22ABCDE1234F1Z5" />
                </FormCard>

                {/* ADDRESS */}
                <FormCard title="Address" icon="location-outline">
                    <Input
                        label="Agency Address"
                        placeholder="Street, building, landmark"
                        multiline
                    />
                    <Input label="City" placeholder="Mumbai" />
                    <Input label="State" placeholder="Maharashtra" />
                    <Input label="PIN Code" placeholder="400001" />
                </FormCard>

                {/* TERMS */}
                <View style={styles.termsBox}>
                    <Text style={styles.termsText}>
                        By continuing, you agree to the Terms of Service and acknowledge the
                        Privacy Policy.
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity style={styles.ctaBtn}>
                    <Text style={styles.ctaText}>Continue / Login</Text>
                </TouchableOpacity>

                {/* FAQ */}
                <Text style={styles.faqTitle}>FAQs for Travel Agents</Text>

                <FaqItem text="How do I become a partner agent?" />
                <FaqItem text="Do you charge onboarding fees?" />
                <FaqItem text="How fast can visas be processed?" />
                <FaqItem text="Do agents get dedicated support?" />
                <FaqItem text="What compliance documents are required?" />

            </ScrollView>
        </ScreenWrapper>
    );
}

/* ---------- COMPONENTS ---------- */

function Benefit({ text }) {
    return (
        <View style={styles.benefitRow}>
            <Icon name="checkmark-circle" size={18} color="#FF5C00" />
            <Text style={styles.benefitText}>{text}</Text>
        </View>
    );
}

function FormCard({ title, icon, children }) {
    return (
        <View style={styles.formCard}>
            <View style={styles.formHeader}>
                <Icon name={icon} size={18} color="#FF5C00" />
                <Text style={styles.formHeaderText}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

function Input({ label, placeholder, multiline }) {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                multiline={multiline}
                style={[
                    styles.input,
                    multiline && { height: 80, textAlignVertical: "top" },
                ]}
            />
        </View>
    );
}

function FaqItem({ text }) {
    return (
        <View style={styles.faqItem}>
            <Text style={styles.faqText}>{text}</Text>
            <Icon name="chevron-down" size={18} color="#9CA3AF" />
        </View>
    );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 40,
        
    },

    badge: {
        alignSelf: "center",
        borderWidth: 1,
        borderColor: "#FFD6B8",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        color: "#FF5C00",
        fontWeight: "700",
        fontSize: 12,
        marginBottom: 12,

    },

    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 8,
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        color: "#4B5563",
        lineHeight: 20,
        marginBottom: 20,
        textAlign: "center",
    },

    benefitCard: {
        backgroundColor: "#FFF7ED",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignSelf: "center",
        width: "100%",
        maxWidth: 420,
    },

    benefitRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 8,
    },

    benefitText: {
        fontSize: 13,
        color: "#374151",
        flex: 1,
        lineHeight: 18,
    },

    ratingCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        alignItems: "center",
        elevation: 2,
        alignSelf: "center",
        width: "100%",
        maxWidth: 320,
    },

    stars: {
        fontSize: 18,
        color: "#FF5C00",
        marginBottom: 4,
    },

    ratingText: {
        fontSize: 13,
        color: "#6B7280",
    },

    formTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 16,
        textAlign: "center",
    },

    formCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignSelf: "center",
        width: "100%",
        maxWidth: 420,
    },

    formHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },

    formHeaderText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
    },

    inputLabel: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 4,
        textAlign: "left",
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        fontSize: 14,
        color: "#111827",
    },

    helper: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 8,
    },

    termsBox: {
        backgroundColor: "#FFF7ED",
        borderRadius: 14,
        padding: 14,
        marginTop: 8,
        alignSelf: "center",
    },

    termsText: {
        fontSize: 12,
        color: "#6B7280",
        textAlign: "center",
        alignSelf: "center",
    },

    ctaBtn: {
        backgroundColor: "#FF5C00",
        borderRadius: 999,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 24,
        alignSelf: "center",
        width: "100%",
        maxWidth: 420,
    },

    ctaText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15,
    },

    faqTitle: {
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 16,
        color: "#111827",
        textAlign: "center",
    },

    faqItem: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#FFE5D0",
        alignSelf: "center",
        width: "100%",
        maxWidth: 420,
    },

    faqText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
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
