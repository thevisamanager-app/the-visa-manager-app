import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const WhyChooseTVM = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Icon name="flash-outline" size={18} color="#00C853" />
                <Text style={styles.text}>15k+ TDA processed</Text>
            </View>

            <View style={styles.item}>
                <Icon name="shield-checkmark-outline" size={18} color="#00C853" />
                <Text style={styles.text}>Reliable & Secure</Text>
            </View>

            <View style={styles.item}>
                <Icon name="headset-outline" size={18} color="#00C853" />
                <Text style={styles.text}>Real Human Support & Solution</Text>
            </View>
        </View>
    );
};

export default WhyChooseTVM;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",   // center rows
    marginTop: 12,
    rowGap: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",               // NOT 50%
    justifyContent: "center",   // center item content
    gap: 6,
  },

  text: {
    fontSize: 11,
    color: "#2E2E2E",
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },
});
