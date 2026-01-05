import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import SchengenStepper from "../../components/SchengenStepper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { wp, hp, RFValue, moderateScale } from "../../utils/metrics";

const ORANGE = "#FF5C00";

export default function SchengenSponsorScreen({ navigation, route }) {
  // ✅ COUNTRY
  const destination = useSelector(
    (state) => state.destinations.selected
  );
  const countryName = destination?.countrName || "Schengen";

  // ✅ FULL NAME FROM PERSONAL DETAILS
  const fullNameFromPersonal =
    route?.params?.fullName || "";

  // 🔥 STATE
  const [selectedType, setSelectedType] = useState(null); // "self" | "other"
  const [otherName, setOtherName] = useState("");

  // ✅ FINAL SPONSOR NAME (OPTIONAL)
  const sponsorName =
    selectedType === "self"
      ? fullNameFromPersonal
      : otherName || "";

  const next = async () => {
    // ✅ SAVE EVEN IF EMPTY (OPTIONAL FIELD)
    await saveSchengenData(countryName, {
      sponsor: {
        type: selectedType || "not_specified",
        name: sponsorName,
      },
    });

    navigation.navigate("SchengenAddress", route.params);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <SchengenStepper step={1} />

      <Text style={styles.title}>
        Let us know who’s sponsoring{"\n"}this trip
      </Text>

      {/* SELF OPTION */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedType === "self" && styles.activeCard,
        ]}
        onPress={() => setSelectedType("self")}
      >
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.optionText}>
          {fullNameFromPersonal || "Self"}
        </Text>
      </TouchableOpacity>

      {/* <Text style={styles.orText}>— OR —</Text> */}

      {/* SOMEONE ELSE */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedType === "other" && styles.activeCard,
        ]}
        onPress={() => setSelectedType("other")}
      >
        <Text style={styles.plus}>＋</Text>
        <Text style={styles.optionText}>Someone else</Text>
      </TouchableOpacity>

      {/* OPTIONAL INPUT */}
      {selectedType === "other" && (
        <View style={styles.inputBox}>
          <TextInput
            value={otherName}
            onChangeText={(t) => setOtherName(t || "")}
            placeholder="Sponsor full name (optional)"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>
      )}

      <Text style={styles.note}>
        A sponsor is someone who will fund the majority of this trip.
        Their financial documents may be required.
      </Text>

      {/* ✅ NEXT ALWAYS ENABLED */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={next}
      >
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("6%"),
  },
  title: {
    marginTop: hp("5%"),
    fontSize: RFValue(26),
    lineHeight: RFValue(34),
    color: "#111",
  },
  optionCard: {
    marginTop: hp("4%"),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: ORANGE,
  },
  avatar: {
    fontSize: RFValue(22),
    marginRight: 12,
  },
  plus: {
    fontSize: RFValue(22),
    marginRight: 12,
  },
  optionText: {
    fontSize: RFValue(15),
    fontWeight: "600",
  },
  orText: {
    //marginVertical: hp("3%"),
    textAlign: "center",
    color: "#999",
  },
  inputBox: {
    marginTop: hp("1%"),
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: moderateScale(10),
    elevation: 2,
  },
  input: {
    fontSize: RFValue(14),
    color: "#111",
  },
  note: {
    marginTop: hp("1%"),
    fontSize: RFValue(12),
    color: "#666",
    lineHeight: RFValue(18),
  },
  nextButton: {
    marginTop: hp("2%"),
    alignSelf: "flex-end",
    backgroundColor: ORANGE,
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScale(10),
    borderRadius: 20,
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(14),
  },
});
