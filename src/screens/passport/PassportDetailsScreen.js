import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import { savePassportData } from "../../api/user/passportService";
import ScreenWrapper from "../../components/ScreenWrapper";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";
import { useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadUserDocument } from "../../utils/uploadUserDocument";





const ORANGE = "#FF5C00";
const ORANGE_LIGHT = "#FFE1CC";
const BLACK = "#000";
const GRAY = "#777";
const GOLD = "#D6B25E";
// const THAILAND_LOCATIONS = [
//   "Bangkok",
//   "Chiang Mai",
//   "Phuket",
//   "Pattaya",
//   "Krabi",
//   "Ayutthaya",
//   "Chiang Rai",
//   "Hua Hin",
//   "Kanchanaburi",
//   "Koh Samui",
//   "Koh Phi Phi",
//   "Surat Thani",
//   "Trang",
//   "Udon Thani",
//   "Ubon Ratchathani",
//   "Chai Nat",
// ];


const PURPOSE_OF_TRAVEL = [
  "Tourism",
  "Business",
  "Education",
  "Employment",
  "Transit",
  "Wedding",
  "Other"
];

const OCCUPATIONS = [
  "Employee",
  "Self-Employed",
  "Housewife",
  "Student"
];

const ACCOMMODATION = [
  "Hotels",
  "Friends / Relatives",
  "others"
];

const COUNTRY_FORM_RULES = {

  mauritius: {
    email: true,
    mobile: true,
    purpose: true,
    hotelDetailsText: true, // 👈 single textarea
    airTicket: true,
  },

  malaysia: {
    email: true,
    mobile: true,
    accommodation: true,
    airTicket: true,
  },

  "sri lanka": {
    email: true,
    mobile: true,
    purpose: true,
    airTicket: true,
  },

  maldives: {
    email: true,
    mobile: true,
    hotelDetailsText: true,   // 🔥 single text field
    purpose: true,
    airTicket: true,
    visitedLast6Days: true,
  },

  "hong kong": {
    email: true,
    mobile: true,
    airTicket: true,
  },

  thailand: {
    email: true,
    mobile: true,
    purpose: true,
    hotel: true,
    airTicket: true,
    visitedLast14Days: true, // yes/no + country list
  },
};



const MODE_OF_TRAVEL = ["Air", "Land", "Sea"];


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
  const travelDate = route?.params?.travelDate || route?.params?.travel || null;
  const visatype = route.params?.visaType;
  console.log("VISATYPE=>", visatype)
  // base main passport (initial from params)
  const basePassport = route?.params?.passport || {};


  // MAIN PASSPORT STATE
  const [passportState, setPassportState] = useState(basePassport);
  const [date, setDate] = useState("");
  const selected = useSelector((state) => state.destinations.selected);
  const countryName =
    selected?.countrName?.trim().toLowerCase() || "";
  const rules = COUNTRY_FORM_RULES[countryName] || {};
  // ✅ Country-specific rules (SAFE placement)

  const needsOccupation = !!rules.occupation;
  const needsHotelDetailsText = !!rules.hotelDetailsText;

  const needsEmail = !!rules.email;
  const needsMobile = !!rules.mobile;
  const needsPurpose = !!rules.purpose;
  const needsAccommodation = !!rules.accommodation;
  const needsAirTicket = !!rules.airTicket;

  const needsVisited6Days = !!rules.visitedLast6Days;
  const needsVisited14Days = !!rules.visitedLast14Days;

  const TRAVEL_DETAILS_COUNTRIES = [
    "malaysia",
    "sri lanka",
    "maldives",
    "mauritius",
    "hong kong",

  ];

  const showTravelDetails =
    TRAVEL_DETAILS_COUNTRIES.includes(countryName);

  const HIDE_PHOTO_COUNTRIES = [
    "thailand",
    "malaysia",
    "sri-lanka",
    "maldives",
    "mauritius",
    "hong kong",
  ];

  const HIDE_PHOTO_STEP_COUNTRIES = [
    "thailand",
    "malaysia",
    "sri-lanka",
    "maldives",
    "mauritius",
    "hong kong",
  ];
  const shouldShowPhotoStep =
    !HIDE_PHOTO_STEP_COUNTRIES.includes(countryName);

  const shouldShowPhotoSection =
    selected?.countryType !== "Schengen" &&
    !HIDE_PHOTO_COUNTRIES.includes(countryName);


  // 🇹🇭 Thailand extra fields
  const [purposeOfTravel, setPurposeOfTravel] = useState("");
  const [occupation, setOccupation] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [hotelDetails, setHotelDetails] = useState("");

  const [entryMode, setEntryMode] = useState("");
  const [visitedLast6Days, setVisitedLast6Days] = useState(null); // yes / no
  const [visitedLast14Days, setVisitedLast14Days] = useState(null);
  const [visitedCountriesText, setVisitedCountriesText] = useState("");





  // const [visitedCountries, setVisitedCountries] = useState("");

  const [email, setEmail] = useState("");




  // ✈️ Air ticket upload
  const [airTicketUrl, setAirTicketUrl] = useState("");
  const [airTicketUploading, setAirTicketUploading] = useState(false);



  // const [malaysiaTicketUrl, setMalaysiaTicketUrl] = useState("");
  // const [malaysiaTicketUploading, setMalaysiaTicketUploading] = useState(false);




  // useEffect(() => {
  //   if (route?.params?.updatedPassport) {
  //     setPassportState(route.params.updatedPassport);
  //   } else if (route?.params?.passport) {
  //     setPassportState(route.params.passport);
  //   }
  // }, [route?.params?.updatedPassport, route?.params?.passport]);
  // ===============================
  // 📞 INDIAN PHONE NUMBER VALIDATION
  // ===============================

  const handleUploadAirTicket = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "mixed",
        selectionLimit: 1,
      });

      if (res.didCancel) return;

      const asset = res.assets?.[0];
      if (!asset?.uri) {
        Alert.alert("Error", "Unable to read file");
        return;
      }

      setAirTicketUploading(true);

      const localPath = asset.uri.replace("file://", "");
      const fileName = asset.fileName || "air_ticket.pdf";

      const url = await uploadUserDocument(localPath, fileName);


      setAirTicketUrl(url);
      setAirTicketUploading(false);

      Alert.alert("Success", "Air ticket uploaded successfully");
    } catch (err) {
      setAirTicketUploading(false);
      Alert.alert("Upload Failed", err.message || "Something went wrong");
    }
  };

  const validateIndianPhoneNumber = (number) => {
    if (!number) {
      return { valid: false, message: "Phone number is required" };
    }

    // Remove spaces
    const cleaned = number.replace(/\s+/g, "");

    // Must be digits only
    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, message: "Phone number must contain only digits" };
    }

    // Must be exactly 10 digits
    if (cleaned.length !== 10) {
      return { valid: false, message: "Phone number must be 10 digits" };
    }

    // Must start with 6–9 (Indian mobile series)
    if (!/^[6-9]/.test(cleaned)) {
      return { valid: false, message: "Enter a valid Indian mobile number" };
    }

    // Block repeated digits (0000000000, 1111111111, etc.)
    if (/^(\d)\1{9}$/.test(cleaned)) {
      return { valid: false, message: "Invalid phone number pattern" };
    }


    // Block sequential numbers
    const sequentialPatterns = [
      "0123456789",
      "1234567890",
      "9876543210",
    ];
    if (sequentialPatterns.includes(cleaned)) {
      return { valid: false, message: "Invalid phone number pattern" };
    }

    return { valid: true };
  };

  const shouldUpdatePassport =
    route?.params?.updatedPassport && !route?.params?.addMode;
  useEffect(() => {
    if (shouldUpdatePassport) {
      setPassportState(route.params.updatedPassport);
    }
  }, [shouldUpdatePassport]);

  useEffect(() => {
    // ✅ Update MAIN traveller only when explicitly edited
    if (route?.params?.updatedPassport && !route?.params?.addMode) {
      setPassportState(route.params.updatedPassport);
    }
  }, [route?.params?.updatedPassport]);

  // CO-TRAVELLERS
  const initialCoTravellers = toArray(route?.params?.coTravellers);
  const [coTravellers, setCoTravellers] = useState(initialCoTravellers);
  console.log("COTRAVELLERS===>", basePassport)
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
    passportState?.phoneNumber || ""
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


  // === Add Co Traveller Flow ===
  const handleAddCoTraveller = () => {
    // navigation.navigate("PhotoUploadScreen", {
    //   addMode: true,
    //   travelDate: travel,
    //   // passportState,           // should not be called as cotraveller initially will be blank details for passport
    //   coTravellers,
    //   mainPhotoUrl: photoUrlState, // so main photo is preserved
    // });
    navigation.navigate("PhotoUploadScreen", {
      addMode: true,
      travelDate: travelDate,
      passport: passportState,        // ✅ PASS MAIN PASSPORT
      coTravellers,
      mainPhotoUrl: photoUrlState,
    });

  };

  // Edit MAIN passport (only main, not co-travellers)
  const handleEditPassport = () => {
    navigation.navigate("PassportUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travelDate,
      passport: passportState,
      photoUrl: photoUrlState,
      visatype: visatype,
      country: country,
      coTravellers, // keep co-travellers when we come back
    });
  };

  // Edit MAIN photo
  const handleEditPhoto = () => {
    navigation.navigate("PhotoUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travelDate,
      passport: passportState,
      photoUrl: photoUrlState,
      visatype: visatype,
      country: country,
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
    if (!firstName || !lastName || !passportNumber || !nationality) {
      Alert.alert("Missing Info", "Fill all required fields");
      return;
    }

    if (needsEmail && !email) {
      Alert.alert("Missing Info", "Please enter email ID");
      return;
    }
    if (entryMode === "Air" && !airTicketUrl) {
      Alert.alert("Missing Ticket", "Please upload air ticket");
      return;
    }
    if (needsAccommodation && !accommodation) {
      Alert.alert("Missing Info", "Please select accommodation type");
      return;
    }
    if (needsOccupation && !occupation) {
      Alert.alert("Missing Info", "Please select occupation");
      return;
    }
    if (countryName === "maldives") {
      if (!email || !phoneNumber || !hotelDetails || !purposeOfTravel) {
        Alert.alert(
          "Missing Information",
          "Please fill all required Maldives travel details"
        );
        return;
      }
    }


    const payload = {
      ...passportState,   // ✅ IMPORTANT
      firstName,
      lastName,
      passportNumber,
      nationality,
      birthDate,
      expiryDate,
      phoneNumber: `+91${phoneNumber}`,
      email: email || null,

      createdAt: new Date().toISOString(),

      // 🔥 THESE ARE THE MISSING PIECES
      photoUrl: photoUrlState || null,
      frontImageURL: passportState.frontImageURL || null,
      backImageURL: passportState.backImageURL || null,

      coTravellers,

      travelDate: {
        selectedDate: travelDate || null,
        country: selected.countrName,
        purposeOfTravel,
        hotelDetails,
        occupation,
        accommodation,
        entry: {
          mode: entryMode,
          airTicketUrl: airTicketUrl || null,
        },
        visitedLast6Days,
        visitedLast14Days,
        visitedCountriesText,
      },
    };

    // ✅ STORE WITH COUNTRY CODE


    await savePassportData(payload);

    navigation.navigate("CheckoutScreen", {
      passport: payload,
      travelDate,
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
    <ScreenWrapper style={styles.container}>

      {/* NAV */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={16} color="#fff" />
          <Text style={styles.stepBadgeText}>Review Visa {travelDate}</Text>
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
        {shouldShowPhotoStep && (
          <>
            <View style={styles.stepItem}>
              <Icon name="check-circle" size={22} color={ORANGE} />
              <Text style={styles.stepLabel}>Photo</Text>
            </View>
            <View style={styles.line} />
          </>
        )}

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
            {shouldShowPhotoSection && (
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
            )}

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
          <Text style={styles.sectionTMinoritle}>If Co-Passenger is minor please upload the minor Passport and Birth Certificate</Text>
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
        <View style={{ marginTop: 16 }}>
          <Text style={styles.travelDetailsTitle}>Travel Details</Text>
          {/* <Text style={styles.sectionTitle}>Personal Information</Text>

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
          /> */}
          <Text style={styles.inputLabel}>Phone Number</Text>

          <View style={styles.phoneRow}>
            <View style={styles.countryCodeBox}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>

            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={phoneNumber}
              onChangeText={(text) => {
                // Allow digits only & max 10
                const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
                setphoneNumber(cleaned);
              }}
              keyboardType="number-pad"
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
          </View>
          {needsHotelDetailsText && (
            <>
              <Label text="Hotel Details *" />
              <Input
                value={hotelDetails}
                onChangeText={setHotelDetails}
                placeholder="Hotel name and address"
                multiline
                style={[styles.input, { height: verticalScale(90) }]}
              />
            </>
          )}


          {/* THAILAND + MALAYSIA (SAME FIELDS) */}
          {showTravelDetails && (
            <View style={{ marginTop: 16 }}>
              {needsPurpose && (
                <>
                  <Label text="Purpose of Travel" />
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={purposeOfTravel}
                      onValueChange={setPurposeOfTravel}
                      mode="dropdown"                 // 🔥 mandatory
                      dropdownIconColor={BLACK}
                      style={styles.pickerAndroid}
                    >
                      <Picker.Item label="Select purpose" value="" color={GRAY} />
                      {PURPOSE_OF_TRAVEL.map(p => (
                        <Picker.Item key={p} label={p} value={p} />
                      ))}
                    </Picker>
                  </View>
                </>
              )}
              {needsOccupation && (
                <>
                  <Label text="Occupation" />
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={occupation}
                      onValueChange={setOccupation}
                      mode="dropdown"
                      dropdownIconColor={BLACK}
                      style={styles.pickerAndroid}
                    >
                      <Picker.Item label="Select occupation" value="" color={GRAY} />
                      {OCCUPATIONS.map(o => (
                        <Picker.Item key={o} label={o} value={o} />
                      ))}
                    </Picker>
                  </View>
                </>
              )}
              {needsAccommodation && (
                <>
                  <Label text="Accommodation" />

                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={accommodation}
                      onValueChange={(value) => setAccommodation(value)}
                      mode="dropdown"
                      dropdownIconColor={BLACK}
                      style={styles.pickerAndroid}
                    >
                      <Picker.Item
                        label="Select accommodation"
                        value=""
                        color="#999"   // lighter gray for placeholder
                      />


                      {ACCOMMODATION.map((item) => (
                        <Picker.Item
                          key={item}
                          label={item}
                          value={item}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              )}
              <Text style={styles.label}>Entry Mode of Travel</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={entryMode}
                  onValueChange={setEntryMode}
                  style={styles.pickerAndroid}
                >
                  <Picker.Item label="Select mode" value="" color={GRAY} />
                  {MODE_OF_TRAVEL.map(m => (
                    <Picker.Item key={m} label={m} value={m} />
                  ))}
                </Picker>
              </View>

              {["Air", "Land", "Sea"].includes(entryMode) && (


                <>
                  {needsAirTicket && (
                    <>
                      <Text style={styles.label}>Upload Travel Ticket / Proof</Text>
                      <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={handleUploadAirTicket}
                        disabled={airTicketUploading}
                      >
                        <Icon
                          name={airTicketUrl ? "check-circle" : "upload-file"}
                          size={20}
                          color={airTicketUrl ? "#0a0" : ORANGE}
                        />
                        <Text style={styles.uploadText}>
                          {airTicketUploading
                            ? "Uploading..."
                            : airTicketUrl
                              ? "Uploaded"
                              : "Upload Ticket"}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
              {needsEmail && (
                <>
                  <Label text="Email ID" />
                  <Input
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </>
              )}
              {needsVisited6Days && (
                <>
                  <Label text="Have you visited any country in last 6 days?" />
                  <View style={styles.radioRow}>
                    {["Yes", "No"].map(v => (
                      <TouchableOpacity
                        key={v}
                        style={styles.radioOption}
                        onPress={() => setVisitedLast6Days(v)}
                      >
                        <Icon
                          name={
                            visitedLast6Days === v
                              ? "radio-button-checked"
                              : "radio-button-unchecked"
                          }
                          size={20}
                          color={ORANGE}
                        />
                        <Text style={styles.radioText}>{v}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
              {needsVisited14Days && (
                <>
                  <Label text="Stayed in any country in last 14 days?" />
                  <View style={styles.radioRow}>
                    {["Yes", "No"].map(v => (
                      <TouchableOpacity
                        key={v}
                        style={styles.radioOption}
                        onPress={() => setVisitedLast14Days(v)}
                      >
                        <Icon
                          name={
                            visitedLast14Days === v
                              ? "radio-button-checked"
                              : "radio-button-unchecked"
                          }
                          size={20}
                          color={ORANGE}
                        />
                        <Text style={styles.radioText}>{v}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {visitedLast14Days === "Yes" && (
                    <>
                      <Label text="Countries visited" />
                      <Input
                        value={visitedCountriesText}
                        onChangeText={setVisitedCountriesText}
                        placeholder="Example: UAE, Singapore"
                      />
                    </>
                  )}
                </>
              )}

            </View>
          )}
          {/* : null */}

        </View>

        {/* Confirm */}
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper >
  );
}


const Label = ({ text }) => <Text style={styles.label}>{text}</Text>;

const Input = ({ value, ...props }) => (
  <TextInput
    {...props}
    value={value}
    style={styles.input}
    placeholderTextColor={GRAY}
  />
);
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
  sectionTMinoritle: {
    fontWeight: "700",
    fontSize: RFValue(15),
    color: "green",
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
  label: {
    marginTop: verticalScale(14),      // 🔥 same rhythm as old labels
    marginBottom: verticalScale(4),    // 🔥 clear gap before field
    fontWeight: "700",                 // 🔥 bold like premium fields
    fontSize: RFValue(13),
    color: "#111",
  },


  inputLabel: {
    marginTop: verticalScale(14),
    marginBottom: verticalScale(4),
    fontWeight: "700",      // 🔥 match Label
    fontSize: RFValue(13),
    color: "#111",
  },


  input: {
    borderWidth: scale(1),
    borderColor: "#ddd",
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(12),
    marginTop: 0,                    // 🔥 IMPORTANT
    borderRadius: moderateScale(10),
    backgroundColor: "#fff",
    fontSize: RFValue(14),
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
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: hp("70%"), // ✅ FIXED HEIGHT
  },


  modalTitle: {
    fontSize: RFValue(16),
    fontWeight: "700",
    marginBottom: 12,
  },

  modalItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  modalItemText: {
    fontSize: RFValue(14),
  },

  modalClose: {
    marginTop: 12,
    alignItems: "center",
  },

  modalCloseText: {
    color: ORANGE,
    fontWeight: "700",
    fontSize: RFValue(14),
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },

  countryCodeBox: {
    borderWidth: scale(1),
    borderColor: "#ddd",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    marginRight: scale(8),
  },

  countryCodeText: {
    fontSize: RFValue(13),
    fontWeight: "600",
    color: BLACK,
  },
  radioContainer: {
    borderWidth: scale(1),
    borderColor: "#ddd",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(12),
    marginTop: verticalScale(6),
    backgroundColor: "#fff",
  },

  radioRow: {
    flexDirection: "row",
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: scale(24),
  },

  radioText: {
    marginLeft: scale(6),
    fontSize: RFValue(14),
    fontWeight: "500",
    color: "#222",
  },

  picker: {
    color: BLACK,              // ✅ selected text color
    fontSize: RFValue(13),
  },

  pickerItem: {
    color: BLACK,              // ✅ iOS wheel items
    fontSize: RFValue(13),
  },
  pickerContainer: {
    borderWidth: scale(1),
    borderColor: "#ddd",
    borderRadius: moderateScale(10),
    backgroundColor: "#fff",
    paddingHorizontal: moderateScale(8),
    height: verticalScale(52),   // 🔑 MATCH picker height
    justifyContent: "center",    // 🔑 vertical centering
  },


  pickerAndroid: {
    height: verticalScale(52),   // 🔑 increase height
    color: BLACK,
    fontSize: RFValue(14),
    paddingVertical: 0,          // 🔑 reset Android default padding
  },


  travelDetailsTitle: {
    textAlign: "center",
    fontSize: RFValue(18),
    fontWeight: "800",
    marginBottom: verticalScale(12),
    color: "#111",
  },






});


