import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import useNetworkStatus from "../hooks/useNetworkStatus";
import OfflineBanner from "../components/OfflineBanner";

export default function ScreenWrapper({ children, style }) {
  const insets = useSafeAreaInsets();
  const isOnline = useNetworkStatus();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Offline banner should NOT use extra padding */}
      {!isOnline && <OfflineBanner />}

      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
});
