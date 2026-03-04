import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import auth from "@react-native-firebase/auth";
import firestore, { serverTimestamp } from "@react-native-firebase/firestore";

import {
  wp,
  hp,
  verticalScale,
  moderateScale,
  RFValue,
} from "../../utils/metrics";

import Icon from "react-native-vector-icons/MaterialIcons";

const COLORS = {
  primary: "#FF5C00",
  white: "#FFF",
};

export default function EditProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;

    setEmail(user.email || "");

    firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setFullName(data.fullName || "");
          setPhone(data.phone || "");
          setGender(data.gender || "");
        }
      });
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);

      const user = auth().currentUser;
      if (!user) throw new Error("User not logged in");

      await firestore()
        .collection("users")
        .doc(user.uid)
        .set(
          {
            fullName,
            phone,
            gender,
            email,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

      if (email && email !== user.email) {
        if (user.providerData[0]?.providerId === "password") {
          await user.verifyBeforeUpdateEmail(email);

          Alert.alert(
            "Verify Email",
            "Verification email sent. Please verify to complete email change."
          );
        } else {
          Alert.alert(
            "Email Change Restricted",
            "Email cannot be changed for this login method."
          );
        }
      }

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Update Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(hp("5%"), insets.bottom + 24) },
      ]}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios-new" size={18} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.header}>Edit Profile</Text>
          <Text style={styles.headerSub}>Keep your details up to date</Text>
        </View>
        <View style={styles.backBtnPlaceholder} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarBox}>
          <View style={styles.avatarIconWrap}>
            <Icon name="account-circle" size={64} color={COLORS.primary} />
          </View>
          <View style={styles.avatarTextWrap}>
            <Text style={styles.avatarTitle}>{fullName || "Your Profile"}</Text>
            <Text style={styles.avatarSub}>Update details for faster support</Text>
          </View>
        </View>

        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          iconName="person-outline"
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          iconName="call-outline"
        />

        <Input
          label="Gender"
          value={gender}
          onChangeText={setGender}
          iconName="wc"
        />

        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          iconName="mail-outline"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        <Icon name="check-circle" size={18} color="#FFFFFF" />
        <Text style={styles.saveText}>{loading ? "Saving..." : "Save Changes"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({
  label,
  value,
  onChangeText,
  secure,
  keyboardType,
  iconName,
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <Icon
          name={iconName || "edit-note"}
          size={18}
          color="#64748B"
          style={styles.inputIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          style={styles.input}
          placeholderTextColor="#94A3B8"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F7FC",
  },
  content: {
    paddingHorizontal: wp("5%"),
    paddingTop: verticalScale(10),
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(14),
  },
  backBtn: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: "#DCE6F3",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnPlaceholder: {
    width: moderateScale(38),
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    fontSize: RFValue(22),
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSub: {
    marginTop: 2,
    fontSize: RFValue(12),
    color: "#64748B",
    fontWeight: "600",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: moderateScale(14),
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  avatarBox: {
    alignItems: "center",
    marginBottom: verticalScale(12),
    flexDirection: "row",
  },
  avatarIconWrap: {
    width: moderateScale(74),
    height: moderateScale(74),
    borderRadius: moderateScale(37),
    backgroundColor: "#FFF4ED",
    borderWidth: 1,
    borderColor: "#FFDCC8",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTextWrap: {
    marginLeft: moderateScale(10),
    flex: 1,
  },
  avatarTitle: {
    fontSize: RFValue(18),
    color: "#0F172A",
    fontWeight: "800",
  },
  avatarSub: {
    marginTop: verticalScale(2),
    fontSize: RFValue(12),
    color: "#64748B",
  },
  inputGroup: {
    marginBottom: verticalScale(14),
  },
  inputLabel: {
    color: "#475569",
    marginBottom: verticalScale(6),
    fontSize: RFValue(13),
    fontWeight: "700",
  },
  inputWrap: {
    minHeight: moderateScale(50),
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    marginRight: moderateScale(8),
  },
  input: {
    flex: 1,
    fontSize: RFValue(15),
    color: "#0F172A",
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(999),
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  saveBtnDisabled: {
    opacity: 0.7,
  },
  saveText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "800",
  },
});
