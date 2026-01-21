// src/screens/SplashScreen.js  (adjust path if needed)
// import React, { useEffect, useRef } from "react";
// import { View, Text, StyleSheet, StatusBar } from "react-native";
// import LottieView from "lottie-react-native";
// import {
//   wp,
//   hp,
//   verticalScale,
//   moderateScale,
//   RFValue,
// } from "../utils/metrics";

// const ORANGE = "#FF5C00";

// export default function SplashScreen({ navigation }) {
//   const animRef = useRef(null);

//   useEffect(() => {
//     animRef.current?.play();

//     const timer = setTimeout(() => {
//       // go to your first real screen
//       navigation.replace("Login");
//     }, 1000); // 3 seconds

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#fff" barStyle="light-content" />

//       {/* Globe + airplane Lottie */}
//       <LottieView
//         ref={animRef}
//         source={require("../assets/lottie/World Travel Loader.json")}
//         autoPlay
//         loop
//         style={styles.lottie}
//       />

//       {/* Branding */}
//       <Text style={styles.title}>The Visa Manager</Text>
//       <Text style={styles.tagline}>Fast • Simple • Reliable</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#efebebff",        // premium dark backdrop
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lottie: {
//     width: wp("70%"),
//     height: wp("70%"),
//   },
//   title: {
//     marginTop: verticalScale(20),
//     fontSize: RFValue(24),
//     fontWeight: "800",
//     color: ORANGE,
//   },
//   tagline: {
//     marginTop: verticalScale(6),
//     fontSize: RFValue(13),
//     color: "#0b0101ff",
//     letterSpacing: 0.7,
//   },
// });


import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import LottieView from "lottie-react-native";
import {
  wp,
  hp,
  verticalScale,
  moderateScale,
  RFValue,
} from "../utils/metrics";

const ORANGE = "#FF5C00";

export default function SplashScreen({ navigation }) {
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current?.play();

    const timer = setTimeout(() => {
      // navigation.replace("Auth", {
      //   screen: "Login",
      // });
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Animated Globe + Airplane */}
      <LottieView
        ref={animRef}
        source={require("../assets/lottie/World Travel Loader.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* Branding */}
      <Text style={styles.title}>The Visa Manager</Text>
      <Text style={styles.tagline}>Fast • Simple • Reliable</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECEC", // softer premium gray
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },

  lottie: {
    width: wp("100%"),
    height: wp("100%"),
    marginBottom: verticalScale(20), // space below animation
  },

  title: {
    fontSize: RFValue(26),
    fontWeight: "800",
    color: ORANGE,
    marginTop: verticalScale(10),
    letterSpacing: 0.5,
  },

  tagline: {
    marginTop: verticalScale(8),
    fontSize: RFValue(14),
    color: "#333",
    letterSpacing: 0.8,
    fontWeight: "500",
  },
});
