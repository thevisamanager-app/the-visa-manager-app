import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useNetworkStatus from "../hooks/useNetworkStatus";
import OfflineBanner from "../components/OfflineBanner";

export default function ScreenWrapper({ children, style }) {
  const isOnline = useNetworkStatus();

  return (
    <SafeAreaView style={styles.safe}>
      {/* ✅ FORCE STATUS BAR COLOR */}
      <StatusBar
        backgroundColor="#000"
        barStyle="light-content"
      />

      {!isOnline && <OfflineBanner />}

      <View
        style={[
          styles.container,
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000", // ✅ BLACK
  },
  container: {
    flex: 1,
    backgroundColor: "#fff", // 👈 OPTIONAL (content stays white)
  },
});
