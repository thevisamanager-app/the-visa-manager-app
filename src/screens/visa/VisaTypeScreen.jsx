import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useSelector } from 'react-redux';

export default function VisaTypeScreen({ navigation }) {

    const selected = useSelector((state) => state.destinations.selected);
    const country = selected?.countrName || "Country";
    const handleSelect = (visaTypeSelected) => {
        navigation.navigate("EntryTypeScreen", {
            visaType: visaTypeSelected,
            country: country
        });
    };


    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* HEADER */}
                <Text style={styles.title}>Select Visa Type</Text>
                <Text style={styles.subtitle}>
                    Choose the purpose of your travel
                </Text>

                {/* TOURIST VISA */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => handleSelect("tourist")}
                >
                    <LottieView
                        source={require("../../assets/lottie/loading (1).json")}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <Text style={styles.cardTitle}>Tourist Visa</Text>
                    <Text style={styles.cardDesc}>
                        For holidays, sightseeing, leisure travel, and tourism purposes.
                    </Text>
                </TouchableOpacity>

                {/* BUSINESS VISA */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => handleSelect("business")}
                >
                    <LottieView
                        source={require("../../assets/lottie/Business Hand.json")}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <Text style={styles.cardTitle}>Business Visa</Text>
                    <Text style={styles.cardDesc}>
                        For meetings, conferences, exhibitions, and professional work.
                    </Text>
                </TouchableOpacity>

                {/* VISIT VISA */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => handleSelect("visit")}
                >
                    <LottieView
                        source={require("../../assets/lottie/friends.json")}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />
                    <Text style={styles.cardTitle}>Visit Visa</Text>
                    <Text style={styles.cardDesc}>
                        For visiting friends, relatives, and family members abroad.
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 30,
    },
    header: {
        alignItems: "center",
        marginBottom: 32, // 👈 space before first card
    },

    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        color: "rgba(255,255,255,0.85)",
        textAlign: "center",
        marginTop: 4,
    },


    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 14,
        marginBottom: 16,
        marginTop: 10,
        alignItems: "center",

        borderWidth: 1,
        borderColor: "#F3F4F6",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },

    lottie: {
        width: 120,
        height: 120,
        marginBottom: 8,
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
        textAlign: "center",
    },

    cardDesc: {
        fontSize: 13,
        color: "#6B7280",
        lineHeight: 18,
        textAlign: "center",
    },
    screen: {
        backgroundColor: "#000", // ✅ theme orange
    },

});
