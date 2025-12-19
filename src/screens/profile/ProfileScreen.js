// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   ScrollView,
// } from "react-native";
// import { logout } from "../../services/auth/logoutService";
// import { wp, hp, scale, verticalScale, RFValue, moderateScale } from "../../utils/metrics";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import auth from "@react-native-firebase/auth";
// import { getPassportData } from "../../services/passport/passportService";

// const COLORS = {
//   primary: "#FF5C00",
//   black: "#000",
//   white: "#FFF",
//   gray: "#777",
//   lightGray: "#F5F5F5",
// };

// /* ---------------- MenuItem ---------------- */
// function MenuItem({ title }) {
//   return (
//     <TouchableOpacity style={styles.menuItem}>
//       <Text style={styles.menuText}>{title}</Text>
//       <Text style={{ fontSize: RFValue(20) }}>›</Text>
//     </TouchableOpacity>
//   );
// }

// /* ---------------- Dark Mode ---------------- */
// function DarkModeToggle() {
//   // const [enabled, setEnabled] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   return (
//     <View style={styles.menuItem}>
//       <Text style={[styles.menuText, isDark && { color: "#FFF" }]}>
//         Dark Mode
//       </Text>

//       <Switch
//         value={isDark}
//         onValueChange={setIsDark}
//         thumbColor={isDark ? COLORS.primary : COLORS.gray}
//         trackColor={{ true: "#555", false: "#DDD" }}
//       />
//     </View>
//   );
// }

// /* ---------------- Profile Screen ---------------- */
// export default function ProfileScreen({ navigation }) {
//   const user = auth().currentUser;
//   const [passport, setPassport] = useState(null);

//   useEffect(() => {
//     console.log("CURRENT USER ===>", user);

//     (async () => {
//       try {
//         const data = await getPassportData();
//         console.log("PASSPORT DATA ===>", data);
//         setPassport(data);
//       } catch (e) {
//         console.log("Passport Fetch Error:", e);
//       }
//     })();
//   }, []);

//   return (
//     <ScrollView
//       style={[
//         styles.container,
//         isDark && { backgroundColor: "#000" }
//       ]}
//       contentContainerStyle={{ paddingBottom: hp("5%") }}
//     >
//       {/* Header */}
//       <Text style={styles.header}>My Profile</Text>

//       {/* Profile Section */}
//       <TouchableOpacity
//         style={styles.profileBox}
//         onPress={() => navigation.navigate("EditProfileScreen")}
//       >
//         <Icon
//           name="account-circle"
//           size={58}
//           color={COLORS.primary}
//           style={styles.avatar}
//         />

//         <View>
//           {/* Passport name OR login name */}
//           <Text style={styles.name}>
//             {passport?.firstName
//               ? `${passport.firstName} ${passport.lastName || ""}`
//               : user?.displayName || "User"}
//           </Text>

//           {/* Phone OR email */}
//           <Text style={styles.email}>
//             {user?.phoneNumber || user?.email || "No phone/email"}
//           </Text>

//           {/* Passport number */}
//           {passport?.passportNumber && (
//             <Text style={styles.email}>
//               Passport: {passport.passportNumber}
//             </Text>
//           )}
//         </View>
//       </TouchableOpacity>

//       {/* Menu */}
//       <View style={styles.section}>
//         <MenuItem title="Payments & Appointments" />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Settings & Preferences</Text>
//         <DarkModeToggle />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Support</Text>
//         <MenuItem title="Help Center" />
//         <MenuItem title="About" />
//       </View>

//       {/* Logout */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Text style={styles.logoutText}>Log out</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// /* ---------------- Styles ---------------- */
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.white,
//     paddingHorizontal: wp("5%"),
//     paddingBottom: wp("5%"),
//   },

//   header: {
//     fontSize: RFValue(22),
//     fontWeight: "700",
//     alignSelf: "center",
//     marginVertical: verticalScale(20),
//     color: COLORS.black,
//   },

//   profileBox: {
//     backgroundColor: COLORS.white,
//     padding: moderateScale(15),
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: moderateScale(12),
//     elevation: 4,
//     marginBottom: verticalScale(20),
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 4,
//   },

//   avatar: {
//     width: wp("16%"),
//     height: wp("16%"),
//     borderRadius: 100,
//     marginRight: wp("4%"),
//   },

//   name: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: COLORS.black,
//   },

//   email: {
//     color: COLORS.gray,
//     fontSize: RFValue(14),
//     marginTop: 2,
//   },

//   section: {
//     marginVertical: verticalScale(12),
//   },

//   sectionTitle: {
//     fontSize: RFValue(14),
//     color: COLORS.gray,
//     marginBottom: 8,
//   },

//   menuItem: {
//     padding: moderateScale(15),
//     backgroundColor: COLORS.white,
//     borderRadius: moderateScale(12),
//     elevation: 2,
//     marginBottom: verticalScale(12),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   menuText: {
//     fontSize: RFValue(16),
//     fontWeight: "500",
//     color: COLORS.black,
//   },

//   logoutBtn: {
//     padding: verticalScale(14),
//     borderRadius: moderateScale(12),
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     marginTop: verticalScale(20),
//   },

//   logoutText: {
//     color: COLORS.white,
//     fontWeight: "700",
//     fontSize: RFValue(16),
//   },
// });



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { logout } from "../../services/auth/logoutService";
// import { wp, hp, verticalScale, RFValue, moderateScale } from "../../utils/metrics";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import { getPassportData } from "../../services/passport/passportService";
// import { Linking } from "react-native";

// const COLORS = {
//   primary: "#FF5C00",
//   black: "#000",
//   white: "#FFF",
//   gray: "#777",
//   lightGray: "#F5F5F5",
// };

// /* ---------------- MenuItem ---------------- */
// function MenuItem({ title, onPress, isDark }) {
//   return (
//     <TouchableOpacity
//       style={[
//         styles.menuItem,
//         isDark && { backgroundColor: "#1A1A1A" },
//       ]}
//       onPress={onPress}
//     >
//       <Text style={[styles.menuText, isDark && { color: "#FFF" }]}>
//         {title}
//       </Text>
//       <Text style={{ fontSize: RFValue(20), color: isDark ? "#FFF" : "#000" }}>
//         ›
//       </Text>
//     </TouchableOpacity>
//   );
// }

// /* ---------------- Dark Mode Toggle ---------------- */
// function DarkModeToggle({ isDark, setIsDark }) {
//   return (
//     <View
//       style={[
//         styles.menuItem,
//         isDark && { backgroundColor: "#1A1A1A" },
//       ]}
//     >
//       <Text style={[styles.menuText, isDark && { color: "#FFF" }]}>
//         Dark Mode
//       </Text>

//       <Switch
//         value={isDark}
//         onValueChange={setIsDark}
//         thumbColor={isDark ? COLORS.primary : COLORS.gray}
//         trackColor={{ true: "#555", false: "#DDD" }}
//       />
//     </View>
//   );
// }

// /* ---------------- Profile Screen ---------------- */
// export default function ProfileScreen({ navigation }) {
//   const user = auth().currentUser;

//   const [passport, setPassport] = useState(null);
//   const [profile, setProfile] = useState(null); // 🔥 NEW
//   const [isDark, setIsDark] = useState(false);

//   /* ---------------- Passport Data ---------------- */
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await getPassportData();
//         setPassport(data);
//       } catch (e) {
//         console.log("Passport Fetch Error:", e);
//       }
//     })();
//   }, []);

//   /* ---------------- User Profile (Realtime) ---------------- */
//   useEffect(() => {
//     if (!user) return;

//     const unsubscribe = firestore()
//       .collection("users")
//       .doc(user.uid)
//       .onSnapshot(
//         (doc) => {
//           if (doc.exists) {
//             setProfile(doc.data());
//           }
//         },
//         (error) => {
//           console.log("Profile listener error:", error);
//         }
//       );

//     return unsubscribe;
//   }, []);

//   const showAbout = () => {
//     Alert.alert(
//       "About",
//       "The Visa Manager is an entity of Ishwa Holidays Private Limited.\n\n" +
//       "We are dedicated to simplifying the complex world of international travel and immigration. " +
//       "Our mission is to provide individuals, families, and businesses with reliable, personalized visa services " +
//       "that remove the stress and confusion from the application process.\n\n" +
//       "Whether you’re traveling for leisure, we’re here to help you navigate every step of the journey."
//     );
//   };

//   const showHelp = () => {
//     Alert.alert(
//       "Help Center",
//       "Mr. Pankaj",
//       [
//         {
//           text: "📞 +91 9284967265",
//           onPress: () => Linking.openURL("tel:+919284967265"),
//         },
//         {
//           text: "✉️ visa@thevisamanager.com",
//           onPress: () =>
//             Linking.openURL("mailto:visa@thevisamanager.com"),
//         },
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
//     <ScrollView
//       style={[
//         styles.container,
//         isDark && { backgroundColor: "#000" },
//       ]}
//       contentContainerStyle={{ paddingBottom: hp("5%") }}
//     >
//       {/* Header */}
//       <Text style={[styles.header, isDark && { color: "#FFF" }]}>
//         My Profile
//       </Text>

//       {/* Profile Section */}
//       <TouchableOpacity
//         style={[
//           styles.profileBox,
//           isDark && { backgroundColor: "#1A1A1A" },
//         ]}
//         onPress={() => navigation.navigate("EditProfileScreen")}
//       >
//         <Icon name="account-circle" size={58} color={COLORS.primary} />

//         <View>
//           {/* ✅ NAME PRIORITY: Firestore → Passport → Auth */}
//           <Text style={[styles.name, isDark && { color: "#FFF" }]}>
//             {profile?.fullName ||
//               (passport?.firstName
//                 ? `${passport.firstName} ${passport.lastName || ""}`
//                 : user?.displayName || "User")}
//           </Text>

//           {/* ✅ EMAIL / PHONE FROM PROFILE */}
//           <Text style={[styles.email, isDark && { color: "#CCC" }]}>
//             {profile?.phone ||
//               profile?.email ||
//               user?.phoneNumber ||
//               user?.email ||
//               "No phone/email"}
//           </Text>

//           {passport?.passportNumber && (
//             <Text style={[styles.email, isDark && { color: "#CCC" }]}>
//               Passport: {passport.passportNumber}
//             </Text>
//           )}
//         </View>
//       </TouchableOpacity>

//       {/* Menu */}
//       <View style={styles.section}>
//         <MenuItem
//           title="Start New Application"
//           isDark={isDark}
//           onPress={() =>
//             navigation.navigate("Tabs", {
//               screen: "Home",
//               params: {
//                 screen: "DestinationScreen",
//               },
//             })

//           }
//         />
//       </View>

//       {/* <View style={styles.section}>
//         <Text style={[styles.sectionTitle, isDark && { color: "#AAA" }]}>
//           Settings & Preferences
//         </Text>
//       </View> */}

//       <View style={styles.section}>
//         {/* <Text style={[styles.sectionTitle, isDark && { color: "#AAA" }]}>
//           Support
//         </Text> */}
//         <MenuItem title="Help Center" onPress={showHelp} />
//         <MenuItem title="About" onPress={showAbout} />
//       </View>

//       {/* Logout */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Text style={styles.logoutText}>Log out</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// /* ---------------- Styles ---------------- */
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.white,
//     paddingHorizontal: wp("5%"),
//   },

//   header: {
//     fontSize: RFValue(22),
//     fontWeight: "700",
//     alignSelf: "center",
//     marginVertical: verticalScale(20),
//     color: COLORS.black,
//   },

//   profileBox: {
//     backgroundColor: COLORS.white,
//     padding: moderateScale(15),
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: moderateScale(12),
//     elevation: 4,
//     marginBottom: verticalScale(20),
//   },

//   name: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     color: COLORS.black,
//   },

//   email: {
//     color: COLORS.gray,
//     fontSize: RFValue(14),
//     marginTop: 0,
//   },

//   section: {
//     marginVertical: verticalScale(0), hadowColor: "#000",
//   },

//   sectionTitle: {
//     fontSize: RFValue(14),
//     color: COLORS.gray,
//     marginBottom: 8,
//   },

//   menuItem: {
//     padding: moderateScale(15),
//     backgroundColor: COLORS.white,
//     borderRadius: moderateScale(12),
//     marginBottom: verticalScale(12),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   menuText: {
//     fontSize: RFValue(16),
//     fontWeight: "500",
//     color: COLORS.black,
//   },

//   logoutBtn: {
//     padding: verticalScale(14),
//     borderRadius: moderateScale(12),
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     marginTop: verticalScale(20),
//   },

//   logoutText: {
//     color: COLORS.white,
//     fontWeight: "700",
//     fontSize: RFValue(16),
//   },
// });


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { logout } from "../../services/auth/logoutService";
import { wp, hp, verticalScale, RFValue, moderateScale } from "../../utils/metrics";
import Icon from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { getPassportData } from "../../services/passport/passportService";
import { Linking } from "react-native";

const COLORS = {
  primary: "#FF5C00",
  black: "#000",
  white: "#FFF",
  gray: "#777",
  lightGray: "#F5F5F5",
};

/* ---------------- MenuItem ---------------- */
function MenuItem({ title, onPress, isDark }) {
  return (
    <TouchableOpacity
      style={[
        styles.menuItem,
        isDark && { backgroundColor: "#1A1A1A" },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.menuText, isDark && { color: "#FFF" }]}>
        {title}
      </Text>
      <Text style={{ fontSize: RFValue(20), color: isDark ? "#FFF" : "#000" }}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

/* ---------------- Profile Screen ---------------- */
export default function ProfileScreen({ navigation }) {
  const user = auth().currentUser;

  const [passport, setPassport] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isDark, setIsDark] = useState(false);

  /* ---------------- Passport Data ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const data = await getPassportData();
        setPassport(data);
      } catch (e) {
        console.log("Passport Fetch Error:", e);
      }
    })();
  }, []);

  /* ---------------- User Profile (Realtime) ---------------- */
  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setProfile(doc.data());
        }
      });

    return unsubscribe;
  }, []);

  const showAbout = () => {
    Alert.alert(
      "About",
      "The Visa Manager is an entity of Ishwa Holidays Private Limited.\n\n" +
        "We are dedicated to simplifying international travel and visa services."
    );
  };

  const showHelp = () => {
    Alert.alert(
      "Help Center",
      "Mr. Pankaj",
      [
        {
          text: "📞 +91 9284967265",
          onPress: () => Linking.openURL("tel:+919284967265"),
        },
        {
          text: "✉️ visa@thevisamanager.com",
          onPress: () =>
            Linking.openURL("mailto:visa@thevisamanager.com"),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  /* ---------------- Privacy Policy ---------------- */
  const showPrivacyPolicy = () => {
    Alert.alert(
      "Privacy & Policy",
      "The Visa Manager Private Limited (“The Visa Manager”, “we”, “us” or “our”) respects your privacy.\n\n" +
        "This Privacy Policy explains how your personal data is collected, stored, and processed through our App or our offices.\n\n" +
        "By using our services, you agree to the processing of your personal data.\n\n" +
        "PURPOSE OF COLLECTING PERSONAL INFORMATION:\n\n" +
        "• Communicate with you regarding visa applications\n" +
        "• Send visa application confirmations\n" +
        "• Keep you updated on transaction status\n" +
        "• Send visa service-related updates\n" +
        "• Send verification or alert messages\n" +
        "• Notify you of changes in visa applications\n" +
        "• Resolve complaints and disputes\n" +
        "• Allow customer service contact\n" +
        "• Detect and prevent fraud or criminal activity\n" +
        "• Fulfil contractual obligations\n" +
        "• Ensure effective website content presentation"
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        isDark && { backgroundColor: "#000" },
      ]}
      contentContainerStyle={{ paddingBottom: hp("5%") }}
    >
      {/* Header */}
      <Text style={[styles.header, isDark && { color: "#FFF" }]}>
        My Profile
      </Text>

      {/* Profile Section */}
      <TouchableOpacity
        style={[
          styles.profileBox,
          isDark && { backgroundColor: "#1A1A1A" },
        ]}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Icon name="account-circle" size={58} color={COLORS.primary} />

        <View>
          <Text style={[styles.name, isDark && { color: "#FFF" }]}>
            {profile?.fullName ||
              (passport?.firstName
                ? `${passport.firstName} ${passport.lastName || ""}`
                : user?.displayName || "User")}
          </Text>

          <Text style={[styles.email, isDark && { color: "#CCC" }]}>
            {profile?.phone ||
              profile?.email ||
              user?.phoneNumber ||
              user?.email ||
              "No phone/email"}
          </Text>

          {passport?.passportNumber && (
            <Text style={[styles.email, isDark && { color: "#CCC" }]}>
              Passport: {passport.passportNumber}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Menu */}
      <View style={styles.section}>
        <MenuItem
          title="Start New Application"
          isDark={isDark}
          onPress={() =>
            navigation.navigate("Tabs", {
              screen: "Home",
              params: { screen: "DestinationScreen" },
            })
          }
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <MenuItem title="Help Center" onPress={showHelp} isDark={isDark} />
        <MenuItem title="About" onPress={showAbout} isDark={isDark} />
        ✅
        <MenuItem
          title="Privacy & Policy"
          onPress={showPrivacyPolicy}
          isDark={isDark}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
  },

  header: {
    fontSize: RFValue(22),
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: verticalScale(20),
    color: COLORS.black,
  },

  profileBox: {
    backgroundColor: COLORS.white,
    padding: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(12),
    elevation: 4,
    marginBottom: verticalScale(20),
  },

  name: {
    fontSize: RFValue(18),
    fontWeight: "700",
    color: COLORS.black,
  },

  email: {
    color: COLORS.gray,
    fontSize: RFValue(14),
  },

  section: {
    marginVertical: verticalScale(0),
  },

  menuItem: {
    padding: moderateScale(15),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuText: {
    fontSize: RFValue(16),
    fontWeight: "500",
    color: COLORS.black,
  },

  logoutBtn: {
    padding: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.primary,
    alignItems: "center",
    marginTop: verticalScale(20),
  },

  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: RFValue(16),
  },
});
