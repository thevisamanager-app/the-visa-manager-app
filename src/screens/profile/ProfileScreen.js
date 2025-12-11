// import React, { useEffect ,useState} from 'react';
// import { View, Text, Button,TouchableOpacity } from 'react-native';
// // import auth from '@react-native-firebase/auth';
// // import { getPassportData } from '../api/user/passportService';
// // import { useDispatch } from 'react-redux';
// // import { logoutUser } from '../Redux/authSlice';
// import { logout } from "../../services/auth/logoutService";
// // import { log } from 'console';

// export default function HomeScreen({ navigation,route }) {
//    const visaPreferences = route?.params?.answerPayload || null;
//   // const logout = async () => {
//   //   await auth().signOut();
//   //   navigation.replace("Login");
//   // };
// //   const [data, setData] = useState(null);
// // const dispatch = useDispatch();
// //   useEffect(() => {
// //   getPassportData().then(setData);
// // }, []);


//   // const handleLogout = async () => {
//   //   await dispatch(logoutUser());
//   // };
//   return (
//     // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     //   <Text style={{ fontSize: 20 }}>Welcome to Home!</Text>

//     //   <Button title="Logout" onPress={logout} />
//     // </View>
//     <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
//       <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome to TheVisaManager</Text>

//       {/* <Button
//         title="Scan Passport"
//         onPress={() => navigation.navigate('PassportUploadScreen',{ visaPreferences })}
//       /> */}

//       <View style={{ height: 12 }} />

//       {/* <Button
//         title="Answer Visa Questions"
//         onPress={() => navigation.navigate('QuestionScreen')}
//       /> */}
//             <TouchableOpacity
//         onPress={logout}
//         style={{
//           backgroundColor: "red",
//           paddingVertical: 12,
//           paddingHorizontal: 25,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
//       </TouchableOpacity>
//     </View>

//   );
// }


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Switch,
//   Image,
//   ScrollView,
// } from "react-native";
// import { logout } from "../../services/auth/logoutService";

// const COLORS = {
//   primary: "#FF7A00",
//   black: "#000",
//   white: "#FFF",
//   gray: "#777",
//   lightGray: "#F5F5F5",
// };

// export default function ProfileScreen({ navigation }) {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <Text style={styles.header}>My Profile</Text>

//       {/* Profile Section */}
//       <TouchableOpacity
//         style={styles.profileBox}
//         onPress={() => navigation.navigate("EditProfieScreen")}
//       >
//         <Image
//           source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
//           style={styles.avatar}
//         />
//         <View>
//           <Text style={styles.name}>Darlene Robertson</Text>
//           <Text style={styles.email}>nathan.roberts@example.com</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Menu Section */}
//       <View style={styles.section}>
//         <MenuItem title="Payments & Appointments" />
//       </View>

//       {/* Settings Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Settings & Preferences</Text>

//         <MenuItem title="Notifications" />
//         <MenuItem title="Language" />
//         <MenuItem title="Security" />
//         <DarkModeToggle />
//       </View>

//       {/* Support Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Support</Text>
//         <MenuItem title="Help Center" />
//         <MenuItem title="About" />
//       </View>

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Text style={styles.logoutText}>Log out</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function MenuItem({ title }) {
//   return (
//     <TouchableOpacity style={styles.menuItem}>
//       <Text style={styles.menuText}>{title}</Text>
//       <Text style={{ fontSize: 20 }}>›</Text>
//     </TouchableOpacity>
//   );
// }

// function DarkModeToggle() {
//   const [enabled, setEnabled] = React.useState(false);
//   return (
//     <View style={styles.menuItem}>
//       <Text style={styles.menuText}>Dark Mode</Text>

//       <Switch
//         value={enabled}
//         onValueChange={() => setEnabled(!enabled)}
//         thumbColor={enabled ? COLORS.primary : COLORS.gray}
//         trackColor={{ true: "#FFC999", false: "#DDD" }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { backgroundColor: COLORS.white, padding: 20 },
//   header: {
//     fontSize: 22,
//     fontWeight: "700",
//     alignSelf: "center",
//     marginVertical: 20,
//   },

//   profileBox: {
//     backgroundColor: COLORS.white,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 12,
//     elevation: 2,
//     marginBottom: 20,
//   },
//   avatar: { width: 55, height: 55, borderRadius: 30, marginRight: 12 },
//   name: { fontSize: 18, fontWeight: "600" },
//   email: { color: COLORS.gray, fontSize: 14 },

//   section: { marginVertical: 12 },
//   sectionTitle: { fontSize: 14, color: COLORS.gray, marginBottom: 8 },

//   menuItem: {
//     padding: 15,
//     backgroundColor: COLORS.white,
//     borderRadius: 12,
//     elevation: 1,
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   menuText: { fontSize: 16 },

//   logoutBtn: {
//     padding: 15,
//     borderRadius: 12,
//     borderWidth: 1.5,
//     borderColor: COLORS.primary,
//     marginTop: 20,
//     alignItems: "center",
//     backgroundColor: COLORS.primary
//   },
//   logoutText: { color: COLORS.lightGray, fontWeight: "bold", fontSize: 16, },
// });


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
} from "react-native";
import { logout } from "../../services/auth/logoutService";
import { wp, hp, scale, verticalScale, RFValue, moderateScale } from "../../utils/metrics";

const COLORS = {
  primary: "#FF7A00",
  black: "#000",
  white: "#FFF",
  gray: "#777",
  lightGray: "#F5F5F5",
};

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView 
  style={styles.container}
  contentContainerStyle={{ paddingBottom: hp("5%") }} 
>

      {/* Header */}
      <Text style={styles.header}>My Profile</Text>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileBox}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Darlene Robertson</Text>
          <Text style={styles.email}>nathan.roberts@example.com</Text>
        </View>
      </TouchableOpacity>

      {/* Menu Section */}
      <View style={styles.section}>
        <MenuItem title="Payments & Appointments" />
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings & Preferences</Text>

        <MenuItem title="Notifications" />
        <MenuItem title="Language" />
        <MenuItem title="Security" />
        <DarkModeToggle />
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <MenuItem title="Help Center" />
        <MenuItem title="About" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function MenuItem({ title }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>{title}</Text>
      <Text style={{ fontSize: RFValue(20) }}>›</Text>
    </TouchableOpacity>
  );
}

function DarkModeToggle() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuText}>Dark Mode</Text>

      <Switch
        value={enabled}
        onValueChange={() => setEnabled(!enabled)}
        thumbColor={enabled ? COLORS.primary : COLORS.gray}
        trackColor={{ true: "#FFC999", false: "#DDD" }}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { backgroundColor: COLORS.white, padding: wp("5%") },

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

//   name: { fontSize: RFValue(18), fontWeight: "700", color: COLORS.black },
//   email: { color: COLORS.gray, fontSize: RFValue(14), marginTop: 2 },

//   section: { marginVertical: verticalScale(12) },
//   sectionTitle: { fontSize: RFValue(14), color: COLORS.gray, marginBottom: 8 },

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

//   menuText: { fontSize: RFValue(16), fontWeight: "500", color: COLORS.black },

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


const styles = StyleSheet.create({
  container: { 
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
    paddingBottom: wp("5%"),   // keep bottom padding if needed
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  avatar: {
    width: wp("16%"),
    height: wp("16%"),
    borderRadius: 100,
    marginRight: wp("4%"),
  },

  name: { fontSize: RFValue(18), fontWeight: "700", color: COLORS.black },
  email: { color: COLORS.gray, fontSize: RFValue(14), marginTop: 2 },

  section: { marginVertical: verticalScale(12) },
  sectionTitle: { fontSize: RFValue(14), color: COLORS.gray, marginBottom: 8 },

  menuItem: {
    padding: moderateScale(15),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    elevation: 2,
    marginBottom: verticalScale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuText: { fontSize: RFValue(16), fontWeight: "500", color: COLORS.black },

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
