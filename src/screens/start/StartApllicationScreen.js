// import React, { useEffect, useRef } from "react";
// import {
//     View,
//     Text,
//     ImageBackground,
//     TouchableOpacity,
//     Animated,
//     StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";

// export default function StartApplicationScreen({ route }) {
//     const navigation = useNavigation();   // ✅ FIX
//     // Data coming from previous screen
//     const country = route?.params?.country || "Vietnam";
//     const visaDate = route?.params?.visaDate || "27 Nov 2025 at 7:00 PM";

//     // Rotation animation
//     const rotation = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.loop(
//             Animated.timing(rotation, {
//                 toValue: 1,
//                 duration: 2000,
//                 useNativeDriver: true,
//             })
//         ).start();
//     }, []);

//     const spin = rotation.interpolate({
//         inputRange: [0, 1],
//         outputRange: ["0deg", "360deg"],
//     });

//     const handleStart = () => {
//         navigation.navigate("TravelDateScreen"); // move to your next screen
//     };

//     return (
//         <ImageBackground
//             source={require("../../assets/images/vietnam.jpeg")} // <-- add your Vietnam image here
//             style={styles.bg}
//             imageStyle={{ opacity: 0.8 }}
//         >
//             {/* BACK BUTTON */}
//             <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-back" size={34} color="#fff" />
//             </TouchableOpacity>

//             <View style={styles.centerArea}>
//                 <Text style={styles.title}>Your ticket to</Text>
//                 <Text style={styles.country}>{country}</Text>
//                 <Text style={styles.underline}>
//                     Visa by {visaDate}
//                 </Text>

//                 {/* ROTATING BORDER CIRCLE */}
//                 <View style={styles.circle}>
//                     <View style={styles.innerCircle}>
//                         <TouchableOpacity onPress={handleStart}>
//                             <Text style={styles.startText}>Start</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>

//             {/* Bottom More Info */}
//             {/* <TouchableOpacity style={styles.infoBtn}>
//                 <Text style={styles.infoText}>More Info</Text>
//             </TouchableOpacity> */}
//         </ImageBackground>
//     );
// }

// const styles = StyleSheet.create({
//     bg: {
//         flex: 1,
//         justifyContent: "space-between",
//         paddingVertical: 60,
//     },

//     backBtn: {
//         position: "absolute",
//         top: 40,
//         left: 20,
//         zIndex: 5,
//     },

//     centerArea: {
//         alignItems: "center",
//         marginTop: 100,
//     },

//     title: {
//         color: "#fff",
//         fontSize: 22,
//         marginBottom: 5,
//     },

//     country: {
//         fontSize: 36,
//         fontWeight: "800",
//         color: "#fff",
//     },

//     underline: {
//         color: "#fff",
//         fontSize: 16,
//         marginTop: 10,
//     },

//     circle: {
//         marginTop: 50,
//         width: 160,
//         height: 160,
//         borderRadius: 80,
//         borderWidth: 4,
//         borderColor: "#4da3ff",
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     innerCircle: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     startText: {
//         color: "#fff",
//         fontSize: 22,
//         fontWeight: "700",
//     },

//     infoBtn: {
//         alignSelf: "center",
//         marginBottom: 20,
//     },

//     infoText: {
//         color: "#fff",
//         textDecorationLine: "underline",
//         fontSize: 18,
//     },
// });


// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedDestination } from '../Redux/destinationsSlice';
// import {
//     View,
//     Text,
//     ImageBackground,
//     TouchableOpacity,
//     Animated,
//     StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import LottieView from "lottie-react-native";

// const ORANGE = "#FF5C00";

// export default function StartApplicationScreen({ route }) {
//     const navigation = useNavigation();
//     const destinations = useSelector((state) => state.destinations.list);
//     const dispatch = useDispatch();

//     // Data coming from previous screen
//     const country = destinations.countrName;
//     const visaDate = route?.params?.visaDate || "27 Nov 2025 at 7:00 PM";

//     // Rotation animation for the circular border
//     const rotation = useRef(new Animated.Value(0)).current;

//     // Ref for Lottie (optional, if you want to control play/stop)
//     const planeAnimRef = useRef(null);
//     const scale = useRef(new Animated.Value(1)).current;

//     useEffect(() => {
//         Animated.loop(
//             Animated.sequence([
//                 Animated.timing(scale, { toValue: 1.06, duration: 800, useNativeDriver: true }),
//                 Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true })
//             ])
//         ).start();
//     }, []);
//     useEffect(() => {
//         // Start rotating ring
//         Animated.loop(
//             Animated.timing(rotation, {
//                 toValue: 1,
//                 duration: 2000,
//                 useNativeDriver: true,
//             })
//         ).start();

//         // Optionally start Lottie (autoPlay already does this)
//         planeAnimRef.current?.play();
//     }, []);

//     const spin = rotation.interpolate({
//         inputRange: [0, 1],
//         outputRange: ["0deg", "360deg"],
//     });

//     const handleStart = () => {
//         navigation.navigate("TravelDateScreen");
//     };

//     return (
//         <View style={{
//             flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"
//         }}>
//             {/* BACK BUTTON */}
//             <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-back" size={34} color="#111" />
//             </TouchableOpacity>

//             <View style={styles.centerArea}>
//                 {/* LOTTIE PLANE ANIMATION */}
//                 <LottieView
//                     ref={planeAnimRef}
//                     source={require("../../assets/lottie/Airplane.json")} // 👈 put your JSON here
//                     autoPlay
//                     loop
//                     style={styles.lottie}
//                 />

//                 <Text style={styles.title}>Your ticket to</Text>
//                 <Text style={styles.country}>{country}</Text>
//                 <Text style={styles.underline}>Visa by {visaDate}</Text>

//                 {/* ROTATING BORDER CIRCLE WITH "START" */}

//                 {/* <View style={styles.innerCircle}>
//                     <TouchableOpacity onPress={handleStart}>
//                         <Text style={styles.startText}>Start</Text>
//                     </TouchableOpacity>
//                 </View> */}
//                 {/* <TouchableOpacity style={styles.startButton} onPress={handleStart}>
//                     <Text style={styles.startButtonText}>Start</Text>
//                 </TouchableOpacity> */}
//                 <Animated.View style={{ transform: [{ scale }] }}>
//                     <TouchableOpacity
//                         style={styles.startButton}
//                         activeOpacity={0.8}
//                         onPress={handleStart}
//                     >
//                         <Text style={styles.startButtonText}>Start</Text>
//                     </TouchableOpacity>
//                 </Animated.View>


//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     bg: {
//         flex: 1,
//         justifyContent: "space-between",
//         paddingVertical: 60,
//     },

//     backBtn: {
//         position: "absolute",
//         top: 40,
//         left: 20,
//         zIndex: 5,
//     },

//     centerArea: {
//         alignItems: "center",
//         marginTop: 80,
//     },

//     // Lottie plane
//     lottie: {
//         width: 400,
//         height: 400,
//         marginBottom: 10,
//     },

//     title: {
//         color: "#FF5C00",
//         fontSize: 22,
//         marginBottom: 5,
//     },

//     country: {
//         fontSize: 36,
//         fontWeight: "800",
//         color: "#FF5C00",
//     },

//     underline: {
//         color: "#FF5C00",
//         fontSize: 16,
//         marginTop: 10,
//     },

//     circle: {
//         marginTop: 40,
//         width: 160,
//         height: 160,
//         borderRadius: 80,
//         borderWidth: 4,
//         borderColor: "#111",
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     innerCircle: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         backgroundColor: "rgba(0,0,0,0.5)",
//         justifyContent: "center",
//         alignItems: "center",
//     },

//     startText: {
//         color: "#fff",
//         fontSize: 22,
//         fontWeight: "700",
//     },
//     googleButton: { backgroundColor: "#FF5C00", borderRadius: 8, padding: 10, alignItems: "space-around" },
//     googleText: { color: "#fff", textAlign: "center", fontSize: 16 },
//     startButton: {
//         marginTop: 10,
//         width: 100,
//         height: 100,
//         borderRadius: 80,
//         backgroundColor: "#111",
//         justifyContent: "center",
//         alignItems: "center",
//         shadowColor: "#111",
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.4,
//         shadowRadius: 20,
//         elevation: 12,  // Android shadow
//         borderWidth: 4,
//         borderColor: "#ffffff",
//     },

//     startButtonText: {
//         fontSize: 20,
//         fontWeight: "800",
//         color: "#fff",
//         textTransform: "uppercase",
//         letterSpacing: 2,
//     },

// });


// import React, { useEffect, useRef, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedDestination } from '../Redux/destinationsSlice';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Animated,
//     StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import LottieView from "lottie-react-native";

// const ORANGE = "#FF5C00";

// export default function StartApplicationScreen({ route }) {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();

//     // ⬇️ Get selected country from Redux (the one user clicked)
//     const selected = useSelector((state) => state.destinations.selected);

//     const country = selected?.countrName || "Country";
//     const visaDate = route?.params?.visaDate || "27 Nov 2025 at 7:00 PM";

//     const rotation = useRef(new Animated.Value(0)).current;
//     const planeAnimRef = useRef(null);
//     const scale = useRef(new Animated.Value(1)).current;
//     const [date, setDate] = useState('');
//     useEffect(() => {
//         Animated.loop(
//             Animated.sequence([
//                 Animated.timing(scale, { toValue: 1.06, duration: 800, useNativeDriver: true }),
//                 Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true })
//             ])
//         ).start();
//     }, []);

//     useEffect(() => {
//         Animated.loop(
//             Animated.timing(rotation, {
//                 toValue: 1,
//                 duration: 2000,
//                 useNativeDriver: true,
//             })
//         ).start();

//         planeAnimRef.current?.play();
//     }, []);

//     const spin = rotation.interpolate({
//         inputRange: [0, 1],
//         outputRange: ["0deg", "360deg"],
//     });

//     const handleStart = () => {
//         navigation.navigate("TravelDateScreen");
//     };
//     const getDateAfterFiveDays = () => {
//         const currentDate = new Date();
//         //currentDate.setDate(currentDate.getDate() + 5);

//         const options = { day: '2-digit', month: 'short', year: 'numeric' };
//         return currentDate.toLocaleDateString('en-GB', options);
//     };

//     // Call once when screen loads
//     useEffect(() => {
//         setDate(getDateAfterFiveDays());
//     }, []);
//     console.log("DATTE===>", date)
//     return (
//         <View style={{
//             flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"
//         }}>

//             <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-back" size={34} color="#111" />
//             </TouchableOpacity>

//             <View style={styles.centerArea}>
//                 <LottieView
//                     ref={planeAnimRef}
//                     source={require("../../assets/lottie/Airplane.json")}
//                     autoPlay
//                     loop
//                     style={styles.lottie}
//                 />

//                 <Text style={styles.title}>Your ticket to</Text>
//                 <Text style={styles.country}>{country}</Text>
//                 <Text style={styles.underline}>Visa by {date}</Text>

//                 <Animated.View style={{ transform: [{ scale }] }}>
//                     <TouchableOpacity
//                         style={styles.startButton}
//                         activeOpacity={0.8}
//                         onPress={handleStart}
//                     >
//                         <Text style={styles.startButtonText}>Start</Text>
//                     </TouchableOpacity>
//                 </Animated.View>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     backBtn: {
//         position: "absolute",
//         top: 40,
//         left: 20,
//         zIndex: 5,
//     },
//     centerArea: {
//         alignItems: "center",
//         marginTop: 80,
//     },
//     lottie: {
//         width: 400,
//         height: 400,
//         marginBottom: 10,
//     },
//     title: {
//         color: "#FF5C00",
//         fontSize: 22,
//         marginBottom: 5,
//     },
//     country: {
//         fontSize: 36,
//         fontWeight: "800",
//         color: "#FF5C00",
//     },
//     underline: {
//         color: "#FF5C00",
//         fontSize: 16,
//         marginTop: 10,
//     },
//     startButton: {
//         marginTop: 10,
//         width: 100,
//         height: 100,
//         borderRadius: 80,
//         backgroundColor: "#111",
//         justifyContent: "center",
//         alignItems: "center",
//         shadowColor: "#111",
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.4,
//         shadowRadius: 20,
//         elevation: 12,
//         borderWidth: 4,
//         borderColor: "#ffffff",
//     },
//     startButtonText: {
//         fontSize: 20,
//         fontWeight: "800",
//         color: "#fff",
//         textTransform: "uppercase",
//         letterSpacing: 2,
//     },
// });


import React, { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

const ORANGE = "#FF5C00";

export default function StartApplicationScreen({ navigation, route }) {
  const date = route.params?.date;
  const selected = useSelector((state) => state.destinations.selected);

  const country = selected?.countrName || "Country";

  const rotation = useRef(new Animated.Value(0)).current;
  const planeAnimRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // const [date, setDate] = useState("");

  // Animate button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.06, duration: 800, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  // Airplane rotation + auto play
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    planeAnimRef.current?.play();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleStart = () => {
    navigation.navigate("TravelDateScreen", {
      countryType: selected?.countryType,
      date:date,
      country:selected
    });
  };


  // Generate a date 5 days ahead
  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 5);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };

  // useEffect(() => {
  //   setDate(getDateAfterFiveDays());
  // }, []);
  console.log("DATE===>", date)
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={moderateScale(30)} color="#111" />
      </TouchableOpacity>

      <View style={styles.centerArea}>
        <LottieView
          ref={planeAnimRef}
          source={require("../../assets/lottie/Airplane.json")}
          autoPlay
          loop
          style={styles.lottie}
        />

        <Text style={styles.title}>Your ticket to</Text>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.underline}>Visa by {date}</Text>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.8}
            onPress={handleStart}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    top: hp("4%"),
    left: wp("4%"),
    zIndex: 5,
  },

  centerArea: {
    alignItems: "center",
    marginTop: verticalScale(60),
  },

  lottie: {
    width: wp("80%"),
    height: hp("40%"),
    marginBottom: verticalScale(10),
  },

  title: {
    color: ORANGE,
    fontSize: RFValue(18),
    marginBottom: verticalScale(5),
  },

  country: {
    fontSize: RFValue(32),
    fontWeight: "800",
    color: ORANGE,
  },

  underline: {
    color: ORANGE,
    fontSize: RFValue(15),
    marginTop: verticalScale(10),
  },

  startButton: {
    marginTop: verticalScale(12),
    width: wp("26%"),
    height: wp("26%"),
    borderRadius: wp("15%"),
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#111",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: scale(3),
    borderColor: "#ffffff",
  },

  startButtonText: {
    fontSize: RFValue(18),
    fontWeight: "800",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
