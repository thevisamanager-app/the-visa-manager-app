import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { savePassportData } from "../../api/user/passportService";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

const ORANGE = "#FF5C00";

export default function PassportDetailsScreen({ navigation, route }) {
  // === Helpers ===
  const toArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  };

  function formatMRZDate(mrz) {
    if (!mrz || mrz.length !== 6) return mrz;

    const year = parseInt(mrz.slice(0, 2), 10);
    const month = mrz.slice(2, 4);
    const day = mrz.slice(4, 6);
    const fullYear = year >= 40 ? `19${mrz.slice(0, 2)}` : `20${mrz.slice(0, 2)}`;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[parseInt(month, 10) - 1]} ${fullYear}`;
  }

  // === PARAMS ===
  const travel = route?.params?.travelDate || route?.params?.travel || null;

  // base main passport (initial from params)
  const basePassport =
    route?.params?.updatedPassport || route?.params?.passport || {};

  // MAIN PASSPORT STATE
  const [passportState, setPassportState] = useState(basePassport);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (route?.params?.updatedPassport) {
      setPassportState(route.params.updatedPassport);
    } else if (route?.params?.passport) {
      setPassportState(route.params.passport);
    }
  }, [route?.params?.updatedPassport, route?.params?.passport]);

  // CO-TRAVELLERS
  const initialCoTravellers = toArray(route?.params?.coTravellers);
  const [coTravellers, setCoTravellers] = useState(initialCoTravellers);
  console.log("COTRAVELLERS===>", route?.params?.coTravellers)
  useEffect(() => {
    if (route?.params?.coTravellers) {
      setCoTravellers(toArray(route.params.coTravellers));
    }
  }, [route?.params?.coTravellers]);

  // PHOTO (main traveller)
  const basePhotoUrl =
    route?.params?.updatedPhotoUrl ||
    route?.params?.photoUrl ||
    basePassport?.photoUrl ||
    null;

  const [photoUrlState, setPhotoUrlState] = useState(basePhotoUrl);

  useEffect(() => {
    if (route?.params?.updatedPhotoUrl) {
      setPhotoUrlState(route.params.updatedPhotoUrl);
    } else if (route?.params?.photoUrl) {
      setPhotoUrlState(route.params.photoUrl);
    } else if (passportState?.photoUrl && !photoUrlState) {
      setPhotoUrlState(passportState.photoUrl);
    }
  }, [route?.params?.updatedPhotoUrl, route?.params?.photoUrl, passportState]);

  // === Main traveller field states ===
  const [firstName, setFirstName] = useState(passportState?.firstName || "");
  const [lastName, setLastName] = useState(passportState?.lastName || "");
  const [passportNumber, setPassportNumber] = useState(
    passportState?.passportNumber || ""
  );
  const [nationality, setNationality] = useState(
    passportState?.nationality || ""
  );
  const [birthDate, setBirthDate] = useState(
    formatMRZDate(passportState?.birthDate)
  );
  const [expiryDate, setExpiryDate] = useState(
    formatMRZDate(passportState?.expiryDate)
  );
  const [phoneNumber, setphoneNumber] = useState(
    formatMRZDate(passportState?.phoneNumber)
  );


  // update fields when passportState changes
  useEffect(() => {
    if (passportState) {
      setFirstName(passportState.firstName || "");
      setLastName(passportState.lastName || "");
      setPassportNumber(passportState.passportNumber || "");
      setNationality(passportState.nationality || "");
      setBirthDate(formatMRZDate(passportState.birthDate));
      setExpiryDate(formatMRZDate(passportState.expiryDate));
    }
  }, [passportState]);

  const fromDate = travel?.departureDate || "";
  const toDate = travel?.returnDate || "";

  // === Add Co Traveller Flow ===
  const handleAddCoTraveller = () => {
    navigation.navigate("PhotoUploadScreen", {
      addMode: true,
      travelDate: travel,
      passportState,           // your existing prop name
      coTravellers,
      mainPhotoUrl: photoUrlState, // so main photo is preserved
    });
  };

  // Edit MAIN passport (only main, not co-travellers)
  const handleEditPassport = () => {
    navigation.navigate("PassportUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travel,
      passport: passportState,
      photoUrl: photoUrlState,
      coTravellers, // keep co-travellers when we come back
    });
  };

  // Edit MAIN photo
  const handleEditPhoto = () => {
    navigation.navigate("PhotoUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travel,
      passport: passportState,
      photoUrl: photoUrlState,
      coTravellers,
    });
  };

  // === Remove co-traveller (local only, before confirm) ===
  const removeCoTraveller = (index) => {
    const updated = [...coTravellers];
    updated.splice(index, 1);
    setCoTravellers(updated);
  };

  // === Confirm ===
  const onConfirm = async () => {
    const payload = {
      ...passportState,
      firstName,
      lastName,
      passportNumber,
      nationality,
      birthDate,
      expiryDate,
      photoUrl: photoUrlState,
      coTravellers,
      phoneNumber
    };

    await savePassportData(payload);

    navigation.navigate("CheckoutScreen", {
      passport: payload,
      travel,
      photoUrlState,
      coTravellers,
    });
  };
  // Generate a date 5 days ahead
  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    // currentDate.setDate(currentDate.getDate() + 5);

    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };

  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);

  return (
    <View style={styles.container}>
      {/* NAV */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={16} color="#fff" />
          <Text style={styles.stepBadgeText}>Review Visa {date}</Text>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("Destination")}>
          <Icon name="home" size={moderateScale(24)} color={ORANGE} />
        </TouchableOpacity> */
          <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
            screen: "Destination",
          })
          }>
            <Icon name="home" size={moderateScale(24)} color={ORANGE} />
          </TouchableOpacity>

        }
      </View>

      {/* PROGRESS BAR (KEEPING ORIGINAL UI) */}
      <View style={styles.progressContainer}>
        {/* Dates */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>
        <View style={styles.line} />

        {/* Photo */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Photo</Text>
        </View>
        <View style={styles.line} />

        {/* Passport */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Passport</Text>
        </View>
        <View style={styles.line} />

        {/* Detail (current) */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
        </View>
        <View style={styles.line} />

        {/* Checkout */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Review your information</Text>

        {/* DOCUMENTS SUBMITTED */}
        <View style={[styles.sectionCard, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Documents Submitted</Text>

          {/* MAIN TRAVELLER DOCUMENTS */}
          <View style={{ marginTop: 8 }}>
            {/* Photo */}
            <View style={styles.docRow}>
              <View style={styles.docHeader}>
                <View style={styles.docHeaderLeft}>
                  <Icon name="check-circle" size={18} color="#09B66E" />
                  <Text style={styles.docLabel}>Photo (You)</Text>
                </View>
                <TouchableOpacity onPress={handleEditPhoto}>
                  <Icon name="edit" size={18} color={ORANGE} />
                </TouchableOpacity>
              </View>
              <View style={styles.thumbBox}>
                {photoUrlState ? (
                  <Image
                    source={{ uri: photoUrlState }}
                    style={styles.docImage}
                  />
                ) : (
                  <Text style={styles.docPlaceholder}>No Photo</Text>
                )}
              </View>
            </View>

            {/* Passport Front (main) */}
            <View style={styles.docRow}>
              <View style={styles.docHeader}>
                <View style={styles.docHeaderLeft}>
                  <Icon name="check-circle" size={18} color="#09B66E" />
                  <Text style={styles.docLabel}>Passport Front (You)</Text>
                </View>
                <TouchableOpacity onPress={handleEditPassport}>
                  <Icon name="edit" size={18} color={ORANGE} />
                </TouchableOpacity>
              </View>
              <View style={styles.thumbBox}>
                {passportState?.frontImageURL ? (
                  <Image
                    source={{ uri: passportState.frontImageURL }}
                    style={styles.docImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.docPlaceholder}>No Image</Text>
                )}
              </View>
            </View>

            {/* Passport Back (main) */}
            <View style={styles.docRow}>
              <View style={styles.docHeader}>
                <View style={styles.docHeaderLeft}>
                  <Icon name="check-circle" size={18} color="#09B66E" />
                  <Text style={styles.docLabel}>Passport Back (You)</Text>
                </View>
                <TouchableOpacity onPress={handleEditPassport}>
                  <Icon name="edit" size={18} color={ORANGE} />
                </TouchableOpacity>
              </View>
              <View style={styles.thumbBox}>
                {passportState?.backImageURL ? (
                  <Image
                    source={{ uri: passportState.backImageURL }}
                    style={styles.docImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.docPlaceholder}>No Image</Text>
                )}
              </View>
            </View>
          </View>

          {/* CO-TRAVELLER DOCUMENTS */}
          {coTravellers.map((ct, index) => (
            <View key={ct.id || index} style={{ marginTop: 16 }}>
              <Text style={styles.sectionTitle}>
                Co-Passenger: {ct.firstName} {ct.lastName}
              </Text>

              {/* Co-traveller Photo */}
              <View style={styles.docRow}>
                <View style={styles.docHeader}>
                  <View style={styles.docHeaderLeft}>
                    <Icon name="check-circle" size={18} color="#09B66E" />
                    <Text style={styles.docLabel}>Photo</Text>
                  </View>
                  {/* No edit here to avoid overwriting main / confusion */}
                </View>
                <View style={styles.thumbBox}>
                  {ct.photoUrl ? (
                    <Image
                      source={{ uri: ct.photoUrl }}
                      style={styles.docImage}
                    />
                  ) : (
                    <Text style={styles.docPlaceholder}>No Photo</Text>
                  )}
                </View>
              </View>

              {/* Co-traveller Passport Front */}
              <View style={styles.docRow}>
                <View style={styles.docHeader}>
                  <View style={styles.docHeaderLeft}>
                    <Icon name="check-circle" size={18} color="#09B66E" />
                    <Text style={styles.docLabel}>Passport Front</Text>
                  </View>
                </View>
                <View style={styles.thumbBox}>
                  {ct.frontImageURL ? (
                    <Image
                      source={{ uri: ct.frontImageURL }}
                      style={styles.docImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.docPlaceholder}>No Image</Text>
                  )}
                </View>
              </View>

              {/* Co-traveller Passport Back */}
              <View style={styles.docRow}>
                <View style={styles.docHeader}>
                  <View style={styles.docHeaderLeft}>
                    <Icon name="check-circle" size={18} color="#09B66E" />
                    <Text style={styles.docLabel}>Passport Back</Text>
                  </View>
                </View>
                <View style={styles.thumbBox}>
                  {ct.backImageURL ? (
                    <Image
                      source={{ uri: ct.backImageURL }}
                      style={styles.docImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.docPlaceholder}>No Image</Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* TRAVELLERS LIST */}
        <View style={[styles.sectionCard, { marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travellers</Text>

            <TouchableOpacity onPress={handleAddCoTraveller}>
              <Text style={styles.addBtn}>+ Add Co-Passenger</Text>
            </TouchableOpacity>
          </View>

          {/* Main Traveller */}
          <View style={styles.travellerRow}>
            <Icon name="person" size={24} color={ORANGE} />
            <Text style={styles.travellerName}>
              {firstName} {lastName} (You)
            </Text>
          </View>

          {/* Co Travellers */}
          {coTravellers.map((p, i) => (
            <View key={i} style={styles.travellerRow}>
              <Icon name="person" size={24} color="#555" />
              <Text style={styles.travellerName}>
                {p.firstName} {p.lastName}
              </Text>

              <TouchableOpacity onPress={() => removeCoTraveller(i)}>
                <Icon name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* PERSONAL INFO */}
        <View style={[styles.sectionCard, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.inputLabel}>Passport Number</Text>
          <TextInput
            style={styles.input}
            value={passportNumber}
            onChangeText={setPassportNumber}
          />

          <Text style={styles.inputLabel}>Nationality</Text>
          <TextInput
            style={styles.input}
            value={nationality}
            onChangeText={setNationality}
          />

          <Text style={styles.inputLabel}>Birth Date</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
          />

          <Text style={styles.inputLabel}>Passport Expiry</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setphoneNumber}
          />
        </View>

        {/* Confirm */}
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// === Styles (UNCHANGED) ===
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   stepBadge: {
//     backgroundColor: ORANGE,
//     borderRadius: 18,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   stepBadgeText: { color: "#fff", marginLeft: 6 },
//   progressContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     justifyContent: "center",
//   },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginVertical: 15,
//     textAlign: "center",
//   },
//   sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16 },
//   sectionTitle: { fontWeight: "700", fontSize: 16 },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   travellerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   travellerName: {
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: "600",
//     flex: 1,
//   },
//   addBtn: { color: ORANGE, fontWeight: "600" },
//   inputLabel: { marginTop: 10, fontWeight: "600" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 8,
//     marginTop: 4,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   docRow: { marginTop: 10 },
//   docHeader: { flexDirection: "row", justifyContent: "space-between" },
//   docHeaderLeft: { flexDirection: "row", alignItems: "center" },
//   docLabel: { marginLeft: 6, fontWeight: "600" },
//   thumbBox: {
//     backgroundColor: "#eee",
//     width: 80,
//     height: 80,
//     marginTop: 8,
//     borderRadius: 10,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   docImage: { width: "100%", height: "100%" },
//   docPlaceholder: { fontSize: 12, color: "#555", textAlign: "center" },
//   confirmButton: {
//     backgroundColor: ORANGE,
//     padding: 14,
//     marginTop: 24,
//     borderRadius: 12,
//   },
//   confirmText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: wp("4%"),
  },

  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(5),
  },

  stepBadge: {
    backgroundColor: ORANGE,
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(4),
    flexDirection: "row",
    alignItems: "center",
  },

  stepBadgeText: {
    color: "#fff",
    marginLeft: scale(6),
    fontSize: RFValue(12),
    fontWeight: "600",
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(16),
    justifyContent: "center",
  },

  stepItem: {
    alignItems: "center",
  },

  stepLabel: {
    fontSize: RFValue(10),
    color: "#777",
    marginTop: verticalScale(4),
  },

  line: {
    width: wp("6%"),
    height: scale(2),
    backgroundColor: ORANGE,
    marginHorizontal: wp("1%"),
  },

  title: {
    fontSize: RFValue(18),
    fontWeight: "700",
    marginVertical: verticalScale(14),
    textAlign: "center",
  },

  sectionCard: {
    backgroundColor: "#F6F6F8",
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
  },

  sectionTitle: {
    fontWeight: "700",
    fontSize: RFValue(15),
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  travellerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(10),
  },

  travellerName: {
    marginLeft: scale(10),
    fontSize: RFValue(14),
    fontWeight: "600",
    flex: 1,
  },

  addBtn: {
    color: ORANGE,
    fontWeight: "600",
    fontSize: RFValue(13),
  },

  inputLabel: {
    marginTop: verticalScale(10),
    fontWeight: "600",
    fontSize: RFValue(13),
  },

  input: {
    borderWidth: scale(1),
    borderColor: "#ddd",
    padding: moderateScale(8),
    marginTop: verticalScale(4),
    borderRadius: moderateScale(8),
    backgroundColor: "#fff",
    fontSize: RFValue(13),
  },

  docRow: {
    marginTop: verticalScale(10),
  },

  docHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  docHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  docLabel: {
    marginLeft: scale(6),
    fontWeight: "600",
    fontSize: RFValue(13),
  },

  thumbBox: {
    backgroundColor: "#eee",
    width: wp("20%"),
    height: hp("10%"),
    marginTop: verticalScale(6),
    borderRadius: moderateScale(10),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  docImage: {
    width: "100%",
    height: "100%",
  },

  docPlaceholder: {
    fontSize: RFValue(11),
    color: "#555",
    textAlign: "center",
  },

  confirmButton: {
    backgroundColor: ORANGE,
    paddingVertical: verticalScale(14),
    marginTop: verticalScale(20),
    borderRadius: moderateScale(12),
  },

  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "700",
  },
});


