// import React from "react";
// import { View, StyleSheet, Platform } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// export default function ScreenWrapper({ children, style }) {
//   const insets = useSafeAreaInsets();

//   return (
//     <SafeAreaView style={styles.safe} edges={["top"]}>
//       <View
//         style={[
//           styles.container,
//           {
//             paddingTop: insets.top,
//             paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
//           },
//           style,
//         ]}
//       >
//         {children}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#FFF",
//   },
//   container: {
//     flex: 1,
//   },
// });

// import React from "react";
// import { View, StyleSheet } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// export default function ScreenWrapper({ children, style }) {
//   const insets = useSafeAreaInsets();

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View
//         style={[
//           styles.container,
//           {
//             paddingTop: insets.top,
//             paddingBottom: insets.bottom,
//           },
//           style,
//         ]}
//       >
//         {children}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
// });


// import React from "react";
// import { View, StyleSheet, Platform } from "react-native";
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

// export default function ScreenWrapper({ children, style }) {
//   const insets = useSafeAreaInsets();

//   return (
//     <SafeAreaView style={styles.safe} edges={["top"]}>
//       <View
//         style={[
//           styles.container,
//           {
//             paddingTop: Platform.OS === "android" ? insets.top : 0,
//             paddingBottom: insets.bottom,
//           },
//           style,
//         ]}
//       >
//         {children}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//   },
// });

import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScreenWrapper({ children, style }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View
        style={[
          styles.container,
          {
            paddingTop: Platform.OS === "android" ? insets.top : 0,
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