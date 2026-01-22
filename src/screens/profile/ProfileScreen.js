// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   FlatList
// } from "react-native";
// import { logout } from "../../services/auth/logoutService";
// import { wp, hp, verticalScale, RFValue, moderateScale } from "../../utils/metrics";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
// import { getPassportData } from "../../services/passport/passportService";
// import { Linking } from "react-native";
// import ScreenWrapper from "../../components/ScreenWrapper";
//  import { fetchGoogleReviews } from "../../services/reviews/googleReviews";
// import { openGoogleReview } from "../../utils/openGoogleReview"



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

// /* ---------------- Profile Screen ---------------- */
// export default function ProfileScreen({ navigation }) {
//   const user = auth().currentUser;

//   const [passport, setPassport] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [isDark, setIsDark] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);


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

//   useEffect(() => {
//     fetchGoogleReviews()
//       .then(setReviews)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);
//   /* ---------------- User Profile (Realtime) ---------------- */
//   useEffect(() => {
//     if (!user) return;

//     const unsubscribe = firestore()
//       .collection("users")
//       .doc(user.uid)
//       .onSnapshot((doc) => {
//         if (doc.exists) {
//           setProfile(doc.data());
//         }
//       });

//     return unsubscribe;
//   }, []);

//   const showAbout = () => {
//     Linking.openURL('https://www.thevisamanager.com/about#page-top')
//   };
//   const showContactUs = () => {
//     Linking.openURL('https://www.thevisamanager.com/contact#page-top')
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
//         { text: "Cancel", style: "cancel" },
//       ],
//       { cancelable: true }
//     );
//   };

//   /* ---------------- Privacy Policy ---------------- */
//   const showPrivacyPolicy = () => {
//     Linking.openURL('https://www.thevisamanager.com/privacy-policy')
//   };

//   const deleteAccount = async () => {
//     try {
//       const user = auth().currentUser;
//       if (!user) return;

//       // Delete Firestore data
//       await firestore().collection("users").doc(user.uid).delete();

//       // Delete Auth account
//       await user.delete();

//       Alert.alert("Account Deleted", "Your account has been removed.");
//     } catch (error) {
//       if (error.code === "auth/requires-recent-login") {
//         Alert.alert(
//           "Re-login Required",
//           "Please log in again to delete your account.",
//           [{ text: "OK", onPress: logout }]
//         );
//       } else {
//         Alert.alert("Error", error.message);
//       }
//     }
//   };




//   const handleDeleteAccount = () => {
//     Alert.alert(
//       "Delete Account",
//       "This action is permanent. All your data will be deleted.",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: deleteAccount,
//         },
//       ]
//     );
//   };

// useEffect(() => {
//   const load = async () => {
//     try {
//       const res = await fetch(
//         "https://getgooglereviews-fdkefcllsq-uc.a.run.app"
//       );

//       console.log("STATUS:", res.status);

//       const text = await res.text();
//       console.log("RAW RESPONSE:", text);

//       const json = JSON.parse(text);
//       setReviews(json);
//     } catch (err) {
//       console.error("FETCH ERROR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   load();
// }, []);


//   if (loading) return <ActivityIndicator />;
//   return (
//     <ScreenWrapper style={styles.container}>
//       <ScrollView
//         style={[
//           styles.container,
//           isDark && { backgroundColor: "#000" },
//         ]}
//         contentContainerStyle={{ paddingBottom: hp("5%") }}
//       >
//         {/* Header */}
//         <Text style={[styles.header, isDark && { color: "#FFF" }]}>
//           My Profile
//         </Text>

//         {/* Profile Section */}
//         <TouchableOpacity
//           style={[
//             styles.profileBox,
//             isDark && { backgroundColor: "#1A1A1A" },
//           ]}
//           onPress={() => navigation.navigate("EditProfileScreen")}
//         >
//           <Icon name="account-circle" size={58} color={COLORS.primary} />

//           <View>
//             <Text style={[styles.name, isDark && { color: "#FFF" }]}>
//               {profile?.fullName ||
//                 (passport?.firstName
//                   ? `${passport.firstName} ${passport.lastName || ""}`
//                   : user?.displayName || "User")}
//             </Text>

//             <Text style={[styles.email, isDark && { color: "#CCC" }]}>
//               {profile?.phone ||
//                 profile?.email ||
//                 user?.phoneNumber ||
//                 user?.email ||
//                 "No phone/email"}
//             </Text>

//             {passport?.passportNumber && (
//               <Text style={[styles.email, isDark && { color: "#CCC" }]}>
//                 Passport: {passport.passportNumber}
//               </Text>
//             )}
//           </View>
//         </TouchableOpacity>



//         {/* Support */}
//         <View style={styles.section}>
//           <MenuItem
//             title="Start New Application"
//             isDark={isDark}
//             onPress={() =>
//               navigation.navigate("Tabs", {
//                 screen: "Home",
//                 params: { screen: "Destination" },
//               })
//             }
//           />
//           <MenuItem
//             title="My Trips"
//             isDark={isDark}
//             onPress={() =>
//               navigation.navigate("Tabs", {
//                 screen: "Home",
//                 params: { screen: "MyTripScreen" },
//               })
//             }
//           />
//           <MenuItem title="Contact Us" onPress={showContactUs} isDark={isDark} />
//           <MenuItem title="About" onPress={showAbout} isDark={isDark} />

//           <MenuItem
//             title="Privacy & Policy"
//             onPress={showPrivacyPolicy}
//             isDark={isDark}
//           />
//         </View>
//         <FlatList
//           data={reviews}
//           keyExtractor={(_, i) => i.toString()}
//           horizontal
//           renderItem={({ item }) => (
//             <View style={{ padding: 12, width: 280 }}>
//               <Text style={{ fontWeight: "bold" }}>{item.author_name}</Text>
//               <Text>⭐ {item.rating}</Text>
//               <Text numberOfLines={4}>{item.text}</Text>
//               <Text style={{ color: "#888", marginTop: 6 }}>
//                 {item.relative_time_description}
//               </Text>
//             </View>
//           )}
//         />

//         <TouchableOpacity style={styles.logoutBtn} onPress={openGoogleReview}>
//           <Text style={styles.logoutText}>Rate Us on Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutBtn} onPress={handleDeleteAccount}>
//           <Text style={styles.logoutText}>Delete My Account</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Text style={styles.logoutText}>Log out</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </ScreenWrapper>
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
//   },

//   section: {
//     marginVertical: verticalScale(0),
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
import ScreenWrapper from "../../components/ScreenWrapper";

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
    Linking.openURL("https://www.thevisamanager.com/about#page-top");
  };

  const showContactUs = () => {
    Linking.openURL("https://www.thevisamanager.com/contact#page-top");
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

  const showPrivacyPolicy = () => {
    Linking.openURL("https://www.thevisamanager.com/privacy-policy");
  };

  const deleteAccount = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      await firestore().collection("users").doc(user.uid).delete();
      await user.delete();

      Alert.alert("Account Deleted", "Your account has been removed.");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Re-login Required",
          "Please log in again to delete your account.",
          [{ text: "OK", onPress: logout }]
        );
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent. All your data will be deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteAccount,
        },
      ]
    );
  };

  return (
    <ScreenWrapper style={styles.container}>
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

        {/* Support */}
        <View style={styles.section}>
          <MenuItem
            title="Start New Application"
            isDark={isDark}
            onPress={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
                params: { screen: "Destination" },
              })
            }
          />
          <MenuItem
            title="My Trips"
            isDark={isDark}
            onPress={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
                params: { screen: "MyTripScreen" },
              })
            }
          />
          <MenuItem title="Contact Us" onPress={showContactUs} isDark={isDark} />
          <MenuItem title="About" onPress={showAbout} isDark={isDark} />
          <MenuItem
            title="Privacy & Policy"
            onPress={showPrivacyPolicy}
            isDark={isDark}
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleDeleteAccount}>
          <Text style={styles.logoutText}>Delete My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
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
