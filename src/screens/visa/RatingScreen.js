import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ORANGE = "#FF7A00";

export default function CongratsScreen({ navigation }) {
    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRatingVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleRating = async (value) => {
        setSelectedRating(value);
        await AsyncStorage.setItem("userRating", value.toString());
        setRatingVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* MAIN CONTENT */}
            <View style={styles.centerContent}>
                <Text style={styles.title}>Congrats!</Text>
                <Text style={styles.subtitle}>
                    The work on your visa has started,{"\n"}and should arrive on
                </Text>

                {/* ETA pill */}
                <View style={styles.datePill}>
                    <Icon name="time-outline" size={18} color={ORANGE} />
                    <Text style={styles.dateText}>03 Dec 2025, 5:03 AM</Text>
                </View>

                {/* Placeholder image (use your own asset) */}
                <View style={styles.circleImagePlaceholder}>
                    <Icon name="earth-outline" size={120} color={ORANGE} />
                </View>
                <TouchableOpacity style={styles.primaryButton} >
                    <Text style={styles.primaryButtonText}> Download Your Invoice </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton}  onPress={() => navigation.navigate("VisaStatusScreen")} >
                    <Text style={styles.primaryButtonText}> Unlock Your Visa </Text>
                </TouchableOpacity>
            </View>

            {/* RATING POPUP */}
            <Modal transparent visible={ratingVisible} animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>How was your checkout experience?</Text>
                        <Text style={styles.modalSubtitle}>We’d love your feedback!</Text>

                        {/* Stars */}
                        <View style={styles.starContainer}>
                            {[1, 2, 3, 4, 5].map((val) => (
                                <TouchableOpacity key={val} onPress={() => handleRating(val)}>
                                    <Icon
                                        name={val <= selectedRating ? "star" : "star-outline"}
                                        size={38}
                                        color={ORANGE}
                                        style={{ marginHorizontal: 5 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },

    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 42,
        fontWeight: "900",
        color: ORANGE,
        marginBottom: 10,
    },
    subtitle: {
        textAlign: "center",
        fontSize: 16,
        color: "#333",
        marginBottom: 15,
    },

    datePill: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: ORANGE,
        borderWidth: 1.5,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginTop: 8,
    },
    dateText: {
        marginLeft: 6,
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },

    circleImagePlaceholder: {
        marginTop: 25,
        width: 220,
        height: 220,
        borderRadius: 120,
        borderWidth: 6,
        borderColor: ORANGE,
        justifyContent: "center",
        alignItems: "center",
    },

    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        alignItems: "center",
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
        textAlign: "center",
    },
    modalSubtitle: {
        fontSize: 15,
        fontWeight: "400",
        color: "#444",
        marginVertical: 10,
        textAlign: "center",
    },

    starContainer: {
        flexDirection: "row",
        marginTop: 8,
        paddingBottom: 12,
    },
      primaryButton: {
    marginTop:30,
    backgroundColor: ORANGE,
    padding: 22,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});