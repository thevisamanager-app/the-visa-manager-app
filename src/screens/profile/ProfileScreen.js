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
import Icon from "react-native-vector-icons/MaterialIcons";
const COLORS = {
  primary: "#FF5C00",
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
        {/* <Image
          source={{ uri: "" }}
          
        /> */}
              <Icon name="account-circle" size={58} color={COLORS.primary} style={styles.avatar}/>
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
