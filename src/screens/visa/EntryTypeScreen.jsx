import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function EntryTypeScreen({ navigation, route }) {
  const { visaType } = route.params;

  const handleSelect = (entryTypeSelected) => {
    navigation.navigate("TravelDateScreen", {
      visaType,
      entryType: entryTypeSelected,
    });
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Entry Type</Text>
          <Text style={styles.subtitle}>
            Choose how many times you plan to enter the country
          </Text>
        </View>

        {/* SINGLE ENTRY */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleSelect("single")}
        >
          <LottieView
            source={require("../../assets/lottie/plane destination.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.cardTitle}>Single Entry</Text>
          <Text style={styles.cardDesc}>
            Allows you to enter the country only once. Leaving the country ends the visa validity.
          </Text>
        </TouchableOpacity>

        {/* DOUBLE ENTRY */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleSelect("double")}
        >
          <LottieView
            source={require("../../assets/lottie/Plane Travel.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.cardTitle}>Double Entry</Text>
          <Text style={styles.cardDesc}>
            Allows you to enter the country twice within the visa validity period.
          </Text>
        </TouchableOpacity>

        {/* MULTIPLE ENTRY */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => handleSelect("multiple")}
        >
          <LottieView
            source={require("../../assets/lottie/Planes flying between two points.json")}
            autoPlay
            loop
            style={styles.lottie}
          />
          <Text style={styles.cardTitle}>Multiple Entry</Text>
          <Text style={styles.cardDesc}>
            Allows unlimited entries and exits during the visa validity period.
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#000",
  },

  container: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 16,
    marginTop: 10,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F3F4F6",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  lottie: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
  },

  cardDesc: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "center",
  },
});
