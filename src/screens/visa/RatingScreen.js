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
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";


const ORANGE = "#FF7A00";

export default function CongratsScreen({ navigation }) {
    const [ratingVisible, setRatingVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [date, setDate] = useState("");
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
    // Generate a date 5 days ahead
    const getDateAfterFiveDays = () => {
        const currentDate = new Date();
        // currentDate.setDate(currentDate.getDate() + 5);

        const options = { day: "2-digit", month: "short", year: "numeric" };
        return currentDate.toLocaleDateString("en-GB", options);
    };

    useEffect(() => {
        setDate(getDateAfterFiveDays());
    }, []);


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
                    <Text style={styles.dateText}>{date}</Text>
                </View>

                {/* Placeholder image (use your own asset) */}
                <View style={styles.circleImagePlaceholder}>
                    <Icon name="earth-outline" size={120} color={ORANGE} />
                </View>
                <TouchableOpacity style={styles.primaryButton} >
                    <Text style={styles.primaryButtonText}> Download Your Invoice </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("VisaStatusScreen")} >
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

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#FFFFFF" },

//     centerContent: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingHorizontal: 24,
//     },

//     title: {
//         fontSize: 42,
//         fontWeight: "900",
//         color: ORANGE,
//         marginBottom: 10,
//     },
//     subtitle: {
//         textAlign: "center",
//         fontSize: 16,
//         color: "#333",
//         marginBottom: 15,
//     },

//     datePill: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderColor: ORANGE,
//         borderWidth: 1.5,
//         paddingVertical: 6,
//         paddingHorizontal: 16,
//         borderRadius: 30,
//         marginTop: 8,
//     },
//     dateText: {
//         marginLeft: 6,
//         fontSize: 15,
//         fontWeight: "600",
//         color: "#000",
//     },

//     circleImagePlaceholder: {
//         marginTop: 25,
//         width: 220,
//         height: 220,
//         borderRadius: 120,
//         borderWidth: 6,
//         borderColor: ORANGE,
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     modalBackground: {
//         flex: 1,
//         justifyContent: "flex-end",
//         backgroundColor: "rgba(0,0,0,0.2)",
//     },
//     modalCard: {
//         backgroundColor: "#FFFFFF",
//         padding: 25,
//         borderTopLeftRadius: 22,
//         borderTopRightRadius: 22,
//         alignItems: "center",
//     },

//     modalTitle: {
//         fontSize: 20,
//         fontWeight: "700",
//         color: "#000",
//         textAlign: "center",
//     },
//     modalSubtitle: {
//         fontSize: 15,
//         fontWeight: "400",
//         color: "#444",
//         marginVertical: 10,
//         textAlign: "center",
//     },

//     starContainer: {
//         flexDirection: "row",
//         marginTop: 8,
//         paddingBottom: 12,
//     },
//       primaryButton: {
//     marginTop:30,
//     backgroundColor: ORANGE,
//     paddingVertical: 12,
//     padding: 22,
//     borderRadius: 10,
//   },
//   primaryButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("6%"),
    },

    title: {
        fontSize: RFValue(38),
        fontWeight: "900",
        color: ORANGE,
        marginBottom: verticalScale(10),
    },

    subtitle: {
        textAlign: "center",
        fontSize: RFValue(14),
        color: "#333",
        marginBottom: verticalScale(12),
    },

    datePill: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: ORANGE,
        borderWidth: scale(1.4),
        paddingVertical: verticalScale(6),
        paddingHorizontal: moderateScale(14),
        borderRadius: moderateScale(30),
        marginTop: verticalScale(6),
    },

    dateText: {
        marginLeft: scale(6),
        fontSize: RFValue(13),
        fontWeight: "600",
        color: "#000",
    },

    circleImagePlaceholder: {
        marginTop: verticalScale(22),
        width: wp("55%"),
        height: wp("55%"),
        borderRadius: wp("28%"),
        borderWidth: scale(5),
        borderColor: ORANGE,
        justifyContent: "center",
        alignItems: "center",
    },

    primaryButton: {
        marginTop: verticalScale(25),
        backgroundColor: ORANGE,
        paddingVertical: verticalScale(12),
        paddingHorizontal: moderateScale(22),
        borderRadius: moderateScale(10),
        width: wp("70%"),
    },

    primaryButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "600",
        fontSize: RFValue(15),
    },

    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    modalCard: {
        backgroundColor: "#FFFFFF",
        padding: moderateScale(22),
        borderTopLeftRadius: moderateScale(22),
        borderTopRightRadius: moderateScale(22),
        alignItems: "center",
    },

    modalTitle: {
        fontSize: RFValue(18),
        fontWeight: "700",
        color: "#000",
        textAlign: "center",
    },

    modalSubtitle: {
        fontSize: RFValue(13),
        fontWeight: "400",
        color: "#444",
        marginVertical: verticalScale(8),
        textAlign: "center",
    },

    starContainer: {
        flexDirection: "row",
        marginTop: verticalScale(6),
        paddingBottom: verticalScale(12),
    },
});

