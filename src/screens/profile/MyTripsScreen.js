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
    const [fallbackPassportNumber, setFallbackPassportNumber] = useState("");
    const [profilePassportNumber, setProfilePassportNumber] = useState("");
    const userId = auth().currentUser?.uid;

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const unsubscribeTrips = firestore()
            .collection("users")
            .doc(userId)
            .collection("passportData")
            .orderBy("createdAt", "desc")
            .onSnapshot((snap) => {
                const list = [];
                snap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
                setTrips(list);

                // Keep one fallback passport number from any available document.
                const fallback =
                    list.find((d) => d?.passportNumber)?.passportNumber ||
                    list.find((d) => d?.passportNo)?.passportNo ||
                    list.find((d) => d?.frontPageData?.parsed?.passportNumber)?.frontPageData?.parsed?.passportNumber ||
                    list.find((d) => Array.isArray(d?.travellers) && d.travellers?.[0]?.passportNumber)?.travellers?.[0]?.passportNumber ||
                    list.find((d) => Array.isArray(d?.travellers) && d.travellers?.[0]?.frontPageData?.parsed?.passportNumber)?.travellers?.[0]?.frontPageData?.parsed?.passportNumber ||
                    "";
                setFallbackPassportNumber(fallback);

                setLoading(false);
            });

        const unsubscribeProfile = firestore()
            .collection("users")
            .doc(userId)
            .onSnapshot((docSnap) => {
                const data = docSnap?.data() || {};
                const passportFromProfile =
                    data?.passportNumber ||
                    data?.passportNo ||
                    data?.passport?.passportNumber ||
                    data?.profile?.passportNumber ||
                    "";
                setProfilePassportNumber(passportFromProfile);
            });

        return () => {
            unsubscribeTrips?.();
            unsubscribeProfile?.();
        };
    }, [userId]);

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
                            fallbackPassportNumber={fallbackPassportNumber || profilePassportNumber}
                            onPress={() => navigation.navigate("VisaStatusScreen", { trip: item })}
                        />
                    )}
                />
            )}
        </ScreenWrapper>
    );
}
//     function TripCard({ item, onPress, selected }) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         <Text style={styles.country}>
//           {typeof item.country === "string"
//             ? item.country
//             : item.country?.entry || "N/A"}
//         </Text>

//         <Text
//           style={[
//             styles.status,
//             {
//               color:
//                 item.paymentStatus === "Paid"
//                   ? "green"
//                   : item.paymentStatus === "Pending"
//                   ? "orange"
//                   : "red",
//             },
//           ]}
//         >
//           {item.paymentStatus || "Pending"}
//         </Text>
//       </View>

//       <Text style={styles.name}>
//         {item.firstName} {item.lastName}
//       </Text>

//       <Text style={styles.date}>
//         Passport Number: {item.passportNumber || "N/A"}
//       </Text>

//       <Text style={styles.date}>
//         Travel Date:{" "}
//         {typeof item.travelDate === "string"
//           ? item.travelDate
//           : item.travelDate?.toDate
//           ? item.travelDate.toDate().toDateString()
//           : "N/A"}
//       </Text>

//       <Text style={styles.date}>
//         Selected Country: {selected?.countrName || "N/A"}
//       </Text>

//       <Text style={styles.date}>
//         Applied:{" "}
//         {item.createdAt?.toDate
//           ? item.createdAt.toDate().toDateString()
//           : "N/A"}
//       </Text>
//     </TouchableOpacity>
//   );
// }

function formatDateValue(value) {
    if (!value) return "N/A";
    if (typeof value === "string") return value;
    if (value?.toDate) return value.toDate().toDateString();
    if (typeof value === "object" && value?.selectedDate) return String(value.selectedDate);
    return "N/A";
}

function getPrimaryTraveller(item) {
    if (!item) return null;
    if (Array.isArray(item.travellers)) return item.travellers[0] || null;
    if (item.travellers && typeof item.travellers === "object") {
        const values = Object.values(item.travellers);
        return values[0] || null;
    }
    return null;
}

function TripCard({ item, onPress, fallbackPassportNumber }) {
    const primaryTraveller = getPrimaryTraveller(item);

    const passportNumber =
        item?.passportNumber ||
        item?.passportNo ||
        item?.passport_number ||
        item?.form?.passportNumber ||
        item?.form?.passportNo ||
        item?.form?.passport_number ||
        item?.passport?.passportNumber ||
        primaryTraveller?.passportNumber ||
        primaryTraveller?.passportNo ||
        primaryTraveller?.passport_number ||
        primaryTraveller?.form?.passportNumber ||
        primaryTraveller?.form?.passportNo ||
        primaryTraveller?.form?.passport_number ||
        item?.frontPageData?.parsed?.passportNumber ||
        primaryTraveller?.frontPageData?.parsed?.passportNumber ||
        fallbackPassportNumber ||
        "N/A";

    const travelDate = formatDateValue(
        item?.travelDate ||
        item?.entryDate ||
        item?.travelDate?.selectedDate ||
        item?.form?.travelDate ||
        item?.form?.entryDate ||
        primaryTraveller?.travelDate ||
        primaryTraveller?.entryDate ||
        primaryTraveller?.form?.travelDate ||
        primaryTraveller?.form?.entryDate
    );

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Country + Payment */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.country}>
                    {item.country || "N/A"}
                </Text>

                <Text
                    style={[
                        styles.status,
                        {
                            color:
                                item.paymentStatus === "Paid"
                                    ? "green"
                                    : item.paymentStatus === "Pending"
                                        ? "orange"
                                        : "red",
                        },
                    ]}
                >
                    {item.paymentStatus || "Pending"}
                </Text>
            </View>

            {/* Name */}
            <Text style={styles.name}>
                {item.firstName || ""} {item.lastName || ""}
            </Text>

            {/* Passport */}
            <Text style={styles.date}>
                Passport Number: {passportNumber}
            </Text>

            {/* Travel Date */}
            <Text style={styles.date}>
                Travel Date: {travelDate}
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
