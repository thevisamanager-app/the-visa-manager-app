import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function StartApplicationScreen({ route }) {
    const navigation = useNavigation();   // ✅ FIX
    // Data coming from previous screen
    const country = route?.params?.country || "Vietnam";
    const visaDate = route?.params?.visaDate || "27 Nov 2025 at 7:00 PM";

    // Rotation animation
    const rotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const handleStart = () => {
        navigation.navigate("TravelDateScreen"); // move to your next screen
    };

    return (
        <ImageBackground
            source={require("../../assets/images/vietnam.jpeg")} // <-- add your Vietnam image here
            style={styles.bg}
            imageStyle={{ opacity: 0.8 }}
        >
            {/* BACK BUTTON */}
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={34} color="#fff" />
            </TouchableOpacity>

            <View style={styles.centerArea}>
                <Text style={styles.title}>Your ticket to</Text>
                <Text style={styles.country}>{country}</Text>
                <Text style={styles.underline}>
                    Visa by {visaDate}
                </Text>

                {/* ROTATING BORDER CIRCLE */}
                <View style={styles.circle}>
                    <View style={styles.innerCircle}>
                        <TouchableOpacity onPress={handleStart}>
                            <Text style={styles.startText}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Bottom More Info */}
            {/* <TouchableOpacity style={styles.infoBtn}>
                <Text style={styles.infoText}>More Info</Text>
            </TouchableOpacity> */}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: "space-between",
        paddingVertical: 60,
    },

    backBtn: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 5,
    },

    centerArea: {
        alignItems: "center",
        marginTop: 100,
    },

    title: {
        color: "#fff",
        fontSize: 22,
        marginBottom: 5,
    },

    country: {
        fontSize: 36,
        fontWeight: "800",
        color: "#fff",
    },

    underline: {
        color: "#fff",
        fontSize: 16,
        marginTop: 10,
    },

    circle: {
        marginTop: 50,
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 4,
        borderColor: "#4da3ff",
        justifyContent: "center",
        alignItems: "center",
    },

    innerCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },

    startText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
    },

    infoBtn: {
        alignSelf: "center",
        marginBottom: 20,
    },

    infoText: {
        color: "#fff",
        textDecorationLine: "underline",
        fontSize: 18,
    },
});
