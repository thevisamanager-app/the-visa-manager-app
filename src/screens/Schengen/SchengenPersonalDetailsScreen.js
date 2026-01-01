import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import SchengenStepper from "../../components/SchengenStepper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
import Icon from "react-native-vector-icons/MaterialIcons";

const ORANGE = "#FF5C00";

export default function SchengenPersonalDetailsScreen({ navigation, route }) {
    const [fullName, setFullName] = useState("");

    // ✅ FIXED REDUX SELECTOR
    const destination = useSelector(
        (state) => state.destinations.selected
    );

    const countryName = destination?.countrName || "Schengen";
    const travelDate = route?.params?.travelDate;

    const isDisabled = fullName.trim().length === 0;
   const [date, setDate] = useState("");

     const getDateAfterFiveDays = () => {
    const currentDate = new Date();
   
useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };
    const next = async () => {
        if (isDisabled) return;

        await saveSchengenData(countryName, {
            personalDetails: { fullName },
        });

        navigation.navigate("SchengenSponsor", {
            travelDate: route.params?.travelDate,
            fullName, // ✅ PASS FULL NAME
        });

    };

    return (
        <ScreenWrapper style={styles.container}>
            {/* STEPPER */}
            {/* <View style={styles.topNav}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={26} color="black" />
                  </TouchableOpacity>
                  <View style={styles.stepBadge}>
                    <Icon name="check-circle" size={18} color="white" />
                    <Text style={styles.stepBadgeText}>Visa on {date}</Text>
                  </View>
                  
                    <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
                      screen: "Destination",
                    })
                    }>
                      <Icon name="home" size={moderateScale(24)} color={ORANGE} />
                    </TouchableOpacity>
            
                  
                </View> */}
            <SchengenStepper step={0} />

            {/* HEADER BADGE */}
            <View style={styles.headerBadge}>
                <Text style={styles.countryText}>{countryName}</Text>
                {/* <Text style={styles.entryText}>SINGLE ENTRY</Text> */}
            </View>

            {/* TITLE */}
            <Text style={styles.title}>
                Let's start with{"\n"}your full name
            </Text>

            {/* INPUT */}
            <View style={styles.inputWrapper}>
                <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter full name"
                    placeholderTextColor="#999"
                    style={styles.input}
                />
            </View>

            {/* ACTION BUTTON */}
            <TouchableOpacity
                style={[
                    styles.addButton,
                    isDisabled && { backgroundColor: "#E6E6E6" },
                ]}
                disabled={isDisabled}
                onPress={next}
            >
                <Text
                    style={[
                        styles.addText,
                        isDisabled && { color: "#AAA" },
                    ]}
                >
                    ADD
                </Text>
            </TouchableOpacity>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp("6%"),
        alignSelf:""
    },

    headerBadge: {
        marginTop: hp("2%"),
        alignSelf: "flex-start",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(6),
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
    },

    countryText: {
        fontSize: RFValue(14),
        fontWeight: "700",
        marginRight: 8,
    },

    entryText: {
        fontSize: RFValue(10),
        color: "#777",
        fontWeight: "600",
    },

    title: {
        marginTop: hp("8%"),
        fontSize: RFValue(28),
        fontWeight: "400",
        lineHeight: RFValue(36),
        color: "#111",
        alignSelf:"center"
    },

    inputWrapper: {
        marginTop: hp("6%"),
        borderBottomWidth: 1,
        borderColor: "#DDD",
    },

    input: {
        fontSize: RFValue(18),
        paddingVertical: hp("1%"),
        color: "#111",
        alignSelf:"center"
    },

    addButton: {
        marginTop: hp("5%"),
        alignSelf: "flex-end",
        backgroundColor: ORANGE,
        paddingHorizontal: moderateScale(22),
        paddingVertical: moderateScale(10),
        borderRadius: 20,
    },

    addText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: RFValue(14),
    },
     topNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: verticalScale(5),
      },
      stepBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: ORANGE,
        paddingHorizontal: moderateScale(12),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(20),
      },
      stepBadgeText: {
        color: "white",
        fontWeight: "600",
        marginLeft: scale(6),
        fontSize: RFValue(12),
      },
});

