import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import ScreenWrapper from "../../components/ScreenWrapper";
import { logout } from "../../services/auth/logoutService";
import { getPassportData } from "../../services/passport/passportService";
import { wp, hp, verticalScale, RFValue, moderateScale } from "../../utils/metrics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const COLORS = {
  bg: "#F7FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#0F172A",
  subText: "#64748B",
  primary: "#FF5C00",
  primarySoft: "#FFF2E9",
  danger: "#DC2626",
  dangerSoft: "#FEE2E2",
};

function MenuItem({ icon, title, subtitle, onPress, tone = "default" }) {
  const isDanger = tone === "danger";

  return (
    <TouchableOpacity
      style={[styles.menuItem, isDanger && styles.menuItemDanger]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.menuIconWrap, isDanger && styles.menuIconWrapDanger]}>
        <Icon name={icon} size={18} color={isDanger ? COLORS.danger : COLORS.primary} />
      </View>

      <View style={styles.menuTextWrap}>
        <Text style={[styles.menuTitle, isDanger && styles.menuTitleDanger]}>{title}</Text>
        {subtitle ? <Text style={styles.menuSubtitle}>{subtitle}</Text> : null}
      </View>

      <Icon name="chevron-forward" size={18} color={isDanger ? COLORS.danger : "#94A3B8"} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const user = auth().currentUser;
  const [passport, setPassport] = useState(null);
  const [profile, setProfile] = useState(null);

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

  useEffect(() => {
    if (!user) return;
    const unsubscribe = firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot((docSnap) => {
        if (docSnap.exists) {
          setProfile(docSnap.data());
        }
      });

    return unsubscribe;
  }, [user]);

  const fullName = useMemo(() => {
    return (
      profile?.fullName ||
      (passport?.firstName
        ? `${passport.firstName} ${passport.lastName || ""}`.trim()
        : user?.displayName || "Traveller")
    );
  }, [profile, passport, user]);

  const contactText = useMemo(() => {
    return (
      profile?.phone ||
      profile?.email ||
      user?.phoneNumber ||
      user?.email ||
      "No phone/email"
    );
  }, [profile, user]);

  const showAbout = () => Linking.openURL("https://www.thevisamanager.com/about#page-top");
  const showContactUs = () => Linking.openURL("https://www.thevisamanager.com/contact#page-top");
  const showPrivacyPolicy = () => Linking.openURL("https://www.thevisamanager.com/privacy-policy");

  const showHelp = () => {
    Alert.alert(
      "Help Center",
      "Mr. Pankaj",
      [
        {
          text: "+91 9284967265",
          onPress: () => Linking.openURL("tel:+919284967265"),
        },
        {
          text: "visa@thevisamanager.com",
          onPress: () => Linking.openURL("mailto:visa@thevisamanager.com"),
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.container, { paddingBottom: Math.max(hp("10%"), insets.bottom + 96) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>My Profile</Text>

        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <View style={styles.avatarWrap}>
            <Icon name="person" size={28} color="#FFFFFF" />
          </View>

          <View style={styles.profileTextWrap}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.meta}>{contactText}</Text>
            {passport?.passportNumber ? (
              <Text style={styles.meta}>Passport: {passport.passportNumber}</Text>
            ) : null}
          </View>

          <View style={styles.editPill}>
            <Text style={styles.editPillText}>Edit</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.groupCard}>
          <Text style={styles.groupTitle}>Travel</Text>
          <MenuItem
            icon="airplane-outline"
            title="Start New Application"
            subtitle="Choose destination and begin"
            onPress={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
                params: { screen: "Destination" },
              })
            }
          />
          <MenuItem
            icon="briefcase-outline"
            title="My Trips"
            subtitle="Track your submitted applications"
            onPress={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
                params: { screen: "MyTripScreen" },
              })
            }
          />
        </View>

        <View style={styles.groupCard}>
          <Text style={styles.groupTitle}>Support</Text>
          <MenuItem icon="call-outline" title="Contact Us" onPress={showContactUs} />
          <MenuItem icon="help-circle-outline" title="Help Center" onPress={showHelp} />
          <MenuItem icon="information-circle-outline" title="About" onPress={showAbout} />
          <MenuItem icon="shield-checkmark-outline" title="Privacy & Policy" onPress={showPrivacyPolicy} />
          <MenuItem
            icon="people-outline"
            title="Join as Travel Agent"
            onPress={() => navigation.navigate("JoinAsTravelAgent")}
          />
        </View>

        <View style={styles.groupCard}>
          <Text style={styles.groupTitle}>Account</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.9}>
            <Icon name="log-out-outline" size={18} color="#FFFFFF" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    paddingHorizontal: wp("4%"),
    paddingTop: verticalScale(10),
    paddingBottom: hp("4%"),
  },
  header: {
    fontSize: RFValue(22),
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: verticalScale(12),
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(16),
    padding: moderateScale(14),
    marginBottom: verticalScale(14),
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  avatarWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  profileTextWrap: {
    flex: 1,
  },
  name: {
    fontSize: RFValue(17),
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 2,
  },
  meta: {
    fontSize: RFValue(12),
    color: COLORS.subText,
    lineHeight: 18,
  },
  editPill: {
    backgroundColor: COLORS.primarySoft,
    borderWidth: 1,
    borderColor: "#FFD7BF",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  editPillText: {
    fontSize: RFValue(11),
    color: COLORS.primary,
    fontWeight: "700",
  },
  groupCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    marginBottom: verticalScale(12),
  },
  groupTitle: {
    fontSize: RFValue(12),
    color: "#475569",
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFCFF",
    borderWidth: 1,
    borderColor: "#E8EEF7",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 8,
  },
  menuItemDanger: {
    backgroundColor: "#FFF6F6",
    borderColor: "#FECACA",
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1E8",
    marginRight: 10,
  },
  menuIconWrapDanger: {
    backgroundColor: COLORS.dangerSoft,
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: RFValue(14),
    fontWeight: "700",
    color: COLORS.text,
  },
  menuTitleDanger: {
    color: COLORS.danger,
  },
  menuSubtitle: {
    fontSize: RFValue(11),
    color: COLORS.subText,
    marginTop: 2,
  },
  logoutBtn: {
    height: 46,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 2,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: RFValue(14),
    marginLeft: 7,
  },
});
