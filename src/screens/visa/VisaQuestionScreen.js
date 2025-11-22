import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { saveAnswers } from "../../api/user/answerService";

export default function VisaQuestionScreen({ route, navigation }) {
    const country = route.params?.country || "Selected Country";

    const [visaType, setVisaType] = useState("");
    const [entryType, setEntryType] = useState("");
    const [loading, setLoading] = useState(false);

    const QUESTIONS = [
        {
            key: "visaType",
            label: "Choose your Visa Type",
            options: ["E Visa", "Tourist"],
        },
        {
            key: "entryType",
            label: "Choose Entry Type",
            options: ["Single-entry", "Multiple-entry"],
        }
    ];

    const handleSubmit = async () => {
        if (!visaType) {
            Alert.alert("Missing Info", "Please select visa type.");
            return;
        } if (!entryType) {
            Alert.alert("Missing Info", "Please select entry type.");
            return;
        }

        const answerPayload = {
            visaType,
            entryType
        };

        try {
            setLoading(true);
            await saveAnswers(answerPayload);
            setLoading(false);

            Alert.alert("Success", "Your visa preferences have been saved.");
            navigation.navigate("HomeScreen");
        } catch (e) {
            console.log("SAVE ERROR:", e);
            Alert.alert("Error", "Failed to save your answers.");
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Visa Preferences</Text>

            <Text style={styles.label}>
                Country: <Text style={{ fontWeight: "700" }}>{country}</Text>
            </Text>

            {/* Dropdown for Visa Type */}
            <Text style={styles.label}>{QUESTIONS[0].label}</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={visaType}
                    onValueChange={(itemValue) => setVisaType(itemValue)}
                    style={{ color: "black" }}
                >
                    <Picker.Item label="Select Visa Type" value="" />
                    <Picker.Item label="E Visa" value="E Visa" />
                    <Picker.Item label="Tourist" value="Tourist" />
                </Picker>
            </View>

            <Text style={styles.label}>{QUESTIONS[1].label}</Text>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={entryType}
                    onValueChange={(itemValue) => setEntryType(itemValue)}
                    style={{ color: "black" }}
                >
                    <Picker.Item label="Select Entry Type" value="" />
                    <Picker.Item label="Single-entry" value="single-entry" />
                    <Picker.Item label="Multiple-entry" value="multiple-entry" />
                </Picker>
            </View>


            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {loading ? "Saving..." : "Save"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 5,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        marginTop: 40,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
});
