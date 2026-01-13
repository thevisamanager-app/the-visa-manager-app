import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ScreenWrapper from "../../components/ScreenWrapper";
import { RFValue } from "react-native-responsive-fontsize";
import { useSelector } from 'react-redux';

const COLORS = {
    primary: "#FF5C00",
    black: "#000",
    white: "#FFF",
    gray: "#777",
    light: "#F5F5F5",
};

export default function MyTripsScreen({ navigation }) {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth().currentUser;
    const selected = useSelector((state) => state.destinations.selected);

    const country = selected?.countrName || "Country";
    console.log("COUNTRY===>",country)
    useEffect(() => {
        if (!user) return;

        const unsubscribe = firestore()
            .collection("users")
            .doc(user.uid)
            .collection("passportData")
            .orderBy("createdAt", "desc")
            .onSnapshot((snap) => {
                const list = [];
                snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
                setTrips(list);
                setLoading(false);
            });

        return unsubscribe;
    }, []);

    if (loading) return <ActivityIndicator size="large" color={COLORS.primary} />;

    return (
        <ScreenWrapper>
            <Text style={styles.header}>My Trips</Text>

            {trips.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>No trips found</Text>
                </View>
            ) : (
                <FlatList
                    data={trips}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={({ item }) => (
                        <TripCard
                            item={item}
                            selected={selected}
                            onPress={() => navigation.navigate("VisaStatusScreen", { trip: item })}
                        />
                    )}
                />
            )}
        </ScreenWrapper>
    );
}

/* ------------------ Trip Card ------------------ */
function TripCard({ item, onPress ,selected}) {
    console.log("ITEMCARD==>", item)
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.country}>{item.country}</Text>
                <Text
                    style={[
                        styles.status,
                        {
                            color:
                                item.paymentStatus === "Paid" ? "green" : item.paymentStatus === "Pending" ? "orange" : "red",
                        },
                    ]}
                >
                    {item.paymentStatus}
                </Text>
            </View>

            <Text style={styles.name}>
                {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.date}>
                Passport Number:{item.passportNumber}
            </Text>
            <Text style={styles.date}>
                Travel Date:{item.travelDate}
            </Text>
            <Text style={styles.date}>
                Selected Country:{selected?.countrName}
            </Text>
            <Text style={styles.date}>
                Applied: {item.createdAt?.toDate().toDateString()}
            </Text>
        </TouchableOpacity>
    );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
    header: {
        fontSize: RFValue(22),
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 20,
        color: COLORS.black,
    },

    card: {
        backgroundColor: COLORS.white,
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 3,
    },

    country: {
        fontSize: RFValue(18),
        fontWeight: "700",
        color: COLORS.primary,
    },

    status: {
        fontSize: RFValue(15),
        fontWeight: "700",
    },

    name: {
        marginTop: 8,
        fontSize: RFValue(16),
        color: COLORS.black,
    },

    date: {
        marginTop: 4,
        color: COLORS.gray,
    },

    emptyBox: {
        alignItems: "center",
        marginTop: 40,
    },

    emptyText: {
        fontSize: RFValue(16),
        color: COLORS.gray,
    },
});
