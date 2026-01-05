import React, { useMemo, useState, useEffect} from "react";
import { View, Text, StyleSheet ,TouchableOpacity} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute  } from "@react-navigation/native";


const ORANGE = "#FF5C00";
const GREY = "#A0A0A0";

export default function SchengenStepper({
  step = 0,
  // 🔥 IMPORTANT: default to empty object/false so "hasValue" is NEVER undefined
  hasValue = false,
}) {
  // ✅ 6 Schengen steps
console.log("DATE==>",route?.params?.travelDate)
const route = useRoute();
const travelDate =
  route?.params?.travelDate
  const STEPS = useMemo(
    () => [
      { label: "Name", icon: "account-outline" },
      { label: "Sponsor", icon: "account-cash-outline" },
      { label: "Address", icon: "map-marker-outline" },
      { label: "Appointment", icon: "calendar-clock-outline" },
      { label: "Countries", icon: "earth" },
      { label: "Docs", icon: "file-document-outline" },
    ],
    []
  );
    const navigation = useNavigation();
   useEffect(() => {
        setDate(getDateAfterFiveDays());
      }, []);
     const [date, setDate] = useState("");
  
       const getDateAfterFiveDays = () => {
      const currentDate = new Date();
      const options = { day: "2-digit", month: "short", year: "numeric" };
      return currentDate.toLocaleDateString("en-GB", options);
    };
     
      // const travelDate = route?.params?.travelDate || route?.params?.travel || null;
  return (
    <View style={styles.container}>
          <View style={styles.topNav}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                          <Icon name="arrow-back" size={26} color="black" />
                        </TouchableOpacity>
                        <View style={styles.stepBadge}>
                          <Icon name="check-circle" size={18} color="white" />
                          <Text style={styles.stepBadgeText}>Visa on {travelDate}</Text>
                        </View>
                        
                          <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
                            screen: "Destination",
                          })
                          }>
                            <Icon name="home" size={moderateScale(24)} color={ORANGE} />
                          </TouchableOpacity>
                  
                        
                      </View>
      <View style={styles.row}>
        {STEPS.map((s, index) => {
          const isActive = index === step;
          const isDone = index < step;

          // ✅ Color logic
          const color = isActive || isDone ? ORANGE : GREY;

          return (
            <View key={`${s.label}-${index}`} style={styles.stepItem}>
              <MaterialCommunityIcons
                name={isDone ? "check-circle" : s.icon}
                size={moderateScale(22)}
                color={color}
              />
              <Text style={[styles.stepText, { color }]} numberOfLines={1}>
                {s.label}
              </Text>

              {isActive && <View style={styles.activeUnderline} />}

              {/* Connector line except last */}
              {index < STEPS.length - 1 && <View style={styles.connector} />}
            </View>
          );
        })}
      </View>

      {/* ✅ OPTIONAL helper text (won't crash even if not used) */}
      {!!hasValue && (
        <Text style={styles.helperText}>Saved</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp("2%"),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(8),
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  stepItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },

  stepText: {
    fontSize: RFValue(9),
    marginTop: verticalScale(4),
    fontWeight: "600",
  },

  activeUnderline: {
    marginTop: verticalScale(4),
    height: verticalScale(2),
    alignSelf: "stretch",
    backgroundColor: ORANGE,
    borderRadius: 99,
  },

  connector: {
    position: "absolute",
    right: -wp("2%"),
    top: verticalScale(10),
    width: wp("4%"),
    height: scale(1),
    backgroundColor: "#E0E0E0",
  },

  helperText: {
    marginTop: verticalScale(6),
    textAlign: "center",
    fontSize: RFValue(11),
    color: "#777",
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
