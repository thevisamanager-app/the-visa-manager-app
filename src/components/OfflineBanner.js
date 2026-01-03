import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OfflineBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>⚠️ You are offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#FF5C00",
    paddingVertical: 8,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
