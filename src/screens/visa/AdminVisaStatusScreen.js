import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";



const AdminVisaStatusScreen = () => {
    const userId = "exampleUserId123";

    const [statusText, setStatusText] = useState("");
    const [startColor, setStartColor] = useState("");
    const [endColor, setEndColor] = useState("");
    const updateStatus = async () => {
        await updateDoc(doc(firestore, "visaStatus", userId), {
            currentStatus: statusText,
            steps: [{ text: statusText, time: new Date().toLocaleString() }]
        });
        setStatusText("");
    };

    const updateGradient = async () => {
        await updateDoc(doc(firestore, "visaStatus", userId), {
            bannerStart: startColor,
            bannerEnd: endColor
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ADMIN PANEL</Text>

            <TextInput placeholder="New Status"
                value={statusText} onChangeText={setStatusText} style={styles.input} />
            <TouchableOpacity style={styles.button} onPress={updateStatus}>
                <Text style={styles.buttonText}>Update Status</Text>
            </TouchableOpacity>

            <TextInput placeholder="Start Color #hex"
                value={startColor} onChangeText={setStartColor} style={styles.input} />
            <TextInput placeholder="End Color #hex"
                value={endColor} onChangeText={setEndColor} style={styles.input} />

            <TouchableOpacity style={styles.button} onPress={updateGradient}>
                <Text style={styles.buttonText}>Update Gradient</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminVisaStatusScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 18 },
    title: { fontSize: 22, fontWeight: "900", marginBottom: 20 },
    input: {
        borderWidth: 1, borderColor: "#aaa", padding: 12,
        marginVertical: 8, borderRadius: 10
    },
    button: {
        backgroundColor: "#FF5C00", padding: 14,
        borderRadius: 10, alignItems: "center", marginVertical: 6
    },
    buttonText: { color: "#fff", fontWeight: "900" }
});
