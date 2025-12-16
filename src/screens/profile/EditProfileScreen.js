// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";

// const COLORS = {
//   primary: "#FF7A00",
//   black: "#000",
//   white: "#FFF",
//   gray: "#777",
//   lightGray: "#F7F7F7",
// };

// export default function EditProfieScreen({ navigation }) {
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.backArrow}>‹</Text>
//       </TouchableOpacity>

//       <Text style={styles.header}>Edit Profile</Text>

//       {/* Avatar */}
//       <View style={{ alignItems: "center", marginVertical: 20 }}>
//         <Image
//           source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
//           style={styles.avatar}
//         />
//       </View>

//       {/* Inputs */}
//       <Input label="Full Name" value="Darlene Robertson" />
//       <Input label="Phone Number" value="+1 212 555 444" />
//       <Input label="Gender" value="Male" />
//       <Input label="Email Address" value="darlenereb@gmail.com" />
//       <Input label="Password" value="" secure />

//       {/* Save button */}
//       <TouchableOpacity style={styles.saveBtn}>
//         <Text style={styles.saveText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Input({ label, value, secure }) {
//   return (
//     <View style={{ marginBottom: 18 }}>
//       <Text style={styles.inputLabel}>{label}</Text>
//       <TextInput
//         secureTextEntry={secure}
//         defaultValue={value}
//         style={styles.input}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: COLORS.white },

//   backArrow: { fontSize: 30, fontWeight: "300" },

//   header: {
//     fontSize: 22,
//     fontWeight: "700",
//     alignSelf: "center",
//     marginVertical: 10,
//   },

//   avatar: { width: 90, height: 90, borderRadius: 50 },

//   inputLabel: { color: COLORS.gray, marginBottom: 6, fontSize: 14 },
//   input: {
//     backgroundColor: COLORS.lightGray,
//     padding: 14,
//     borderRadius: 10,
//     fontSize: 15,
//   },

//   saveBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   saveText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";

// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
// import Icon from "react-native-vector-icons/MaterialIcons";
// const COLORS = {
//   primary: "#FF5C00",
//   black: "#000",
//   white: "#FFF",
//   gray: "#777",
//   lightGray: "#F7F7F7",
// };

// export default function EditProfileScreen({ navigation }) {
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: hp("5%") }}
//     >

//       {/* Back */}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.backArrow}>‹</Text>
//       </TouchableOpacity>

//       <Text style={styles.header}>Edit Profile</Text>

//       {/* Avatar */}
//       <View style={styles.avatarBox}>
//         <Icon name="edit-square" size={58} color={COLORS.primary} style={styles.avatar} />
//       </View>

//       {/* Inputs */}
//       <Input label="Full Name" value="Darlene Robertson" />
//       <Input label="Phone Number" value="+1 212 555 444" />
//       <Input label="Gender" value="Male" />
//       <Input label="Email Address" value="darlenereb@gmail.com" />
//       <Input label="Password" value="" secure />

//       {/* Save */}
//       <TouchableOpacity style={styles.saveBtn}>
//         <Text style={styles.saveText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Input({ label, value, secure }) {
//   return (
//     <View style={{ marginBottom: verticalScale(18) }}>
//       <Text style={styles.inputLabel}>{label}</Text>

//       <TextInput
//         secureTextEntry={secure}
//         defaultValue={value}
//         style={styles.input}
//       />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: COLORS.white,
//     paddingHorizontal: wp("5%"),  // left + right
//     paddingBottom: verticalScale(20), // optional bottom padding
//   },

//   backArrow: {
//     fontSize: RFValue(30),
//     fontWeight: "300",
//     marginTop: verticalScale(10),  // bring it down a bit since padding removed
//   },

//   header: {
//     fontSize: RFValue(22),
//     fontWeight: "700",
//     alignSelf: "center",
//     marginVertical: verticalScale(10),
//     color: COLORS.black,
//   },

//   avatar: {
//     width: wp("24%"),
//     height: wp("24%"),
//     borderRadius: 100,
//   },

//   inputLabel: {
//     color: COLORS.gray,
//     marginBottom: verticalScale(6),
//     fontSize: RFValue(14)
//   },

//   input: {
//     backgroundColor: COLORS.lightGray,
//     padding: moderateScale(14),
//     borderRadius: moderateScale(10),
//     fontSize: RFValue(15),
//   },

//   saveBtn: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: verticalScale(16),
//     borderRadius: moderateScale(12),
//     marginTop: verticalScale(15),
//   },

//   saveText: {
//     color: COLORS.white,
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "600",
//   },
// });


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

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import {
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
} from "../../utils/metrics";

import Icon from "react-native-vector-icons/MaterialIcons";

const COLORS = {
  primary: "#FF5C00",
  black: "#000",
  white: "#FFF",
  gray: "#777",
  lightGray: "#F7F7F7",
};

export default function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  /* =====================================================
     LOAD USER DATA
  ===================================================== */
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

  /* =====================================================
     SAVE PROFILE
  ===================================================== */
  const handleSave = async () => {
    try {
      setLoading(true);

      const user = auth().currentUser;
      if (!user) throw new Error("User not logged in");

      /* -------------------------
         UPDATE FIRESTORE PROFILE
      ------------------------- */
      await firestore()
        .collection("users")
        .doc(user.uid)
        .set(
          {
            fullName,
            phone,
            gender,
            email, // store editable email safely here
            updatedAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      /* -------------------------
         UPDATE AUTH EMAIL (SAFE)
      ------------------------- */
      if (email && email !== user.email) {
        if (user.providerData[0]?.providerId === "password") {
          // Send verification before changing email
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

      /* -------------------------
         UPDATE PASSWORD (OPTIONAL)
      ------------------------- */
      // if (password) {
      //   await user.updatePassword(password);
      // }

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Update Failed",
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: hp("5%") }}
    >
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>‹</Text>
      </TouchableOpacity>



      {/* Avatar */}
      <View style={styles.avatarBox}>

        <Icon
          name="edit-square"
          size={58}
          color={COLORS.primary}
        />
        <Text style={styles.header}>Edit Profile</Text>
      </View>

      {/* Inputs */}
      <Input
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Input
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Input
        label="Gender"
        value={gender}
        onChangeText={setGender}
      />

      <Input
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* <Input
        label="Password (leave blank to keep same)"
        value={password}
        onChangeText={setPassword}
        secure
      /> */}

      {/* Save */}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* =====================================================
   INPUT COMPONENT
===================================================== */
function Input({
  label,
  value,
  onChangeText,
  secure,
  keyboardType,
}) {
  return (
    <View style={{ marginBottom: verticalScale(18) }}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp("5%"),
  },

  backArrow: {
    fontSize: RFValue(30),
    fontWeight: "300",
    marginTop: verticalScale(10),
  },

  header: {
    fontSize: RFValue(22),
    fontWeight: "700",
    alignSelf: "center",
    marginVertical: verticalScale(10),
    marginHorizontal: verticalScale(10),
    color: COLORS.black,
  },

  avatarBox: {
    alignItems: "center",
    marginVertical: verticalScale(20),
    flexDirection: "row",
    //justifyContent: "ce"
  },

  inputLabel: {
    color: COLORS.gray,
    marginBottom: verticalScale(6),
    fontSize: RFValue(14),
  },

  input: {
    backgroundColor: COLORS.lightGray,
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    fontSize: RFValue(15),
  },

  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(15),
  },

  saveText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
});
