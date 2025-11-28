// import React, { useState } from 'react';
// import { View, TextInput, Text, Button } from 'react-native';
// import { savePassportData } from '../../api/user/passportService';

// export default function PassportDetailsScreen({ route, navigation }) {
//   const data = route.params.data;

//   const [form, setForm] = useState(data);

//   const updateField = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//   const save = async () => {
//     await savePassportData(form);
//     navigation.navigate("HomeScreen");
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text>First Name</Text>
//       <TextInput value={form.firstName} onChangeText={(v)=>updateField("firstName",v)} />

//       <Text>Last Name</Text>
//       <TextInput value={form.lastName} onChangeText={(v)=>updateField("lastName",v)} />

//       <Text>Passport Number</Text>
//       <TextInput value={form.passportNumber} onChangeText={(v)=>updateField("passportNumber",v)} />

//       <Text>Date of Birth</Text>
//       <TextInput value={form.birthDate} onChangeText={(v)=>updateField("birthDate",v)} />

//       <Text>Expiry Date</Text>
//       <TextInput value={form.expiryDate} onChangeText={(v)=>updateField("expiryDate",v)} />

//       <Button title="Save" onPress={save} />
//     </View>
//   );
// }


// import React, { useState } from "react";
// import { View, TextInput, Text, Button, Image, ScrollView, Alert } from "react-native";
// import { savePassportData } from "../../api/user/passportService";

// export default function PassportDetailsScreen({ route, navigation }) {
//   const { frontData, backData, frontImage, backImage } = route.params;

//   // Merge both sides into a single editable form object
//   const initialData = {
//     ...frontData,
//     ...backData,
//   };

//   const [form, setForm] = useState(initialData);

//   const updateField = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//   // Basic validators 
//   const validate = () => {
//     if (!form.firstName || !form.lastName || !form.passportNumber) {
//       Alert.alert("Missing Fields", "Please fill required fields.");
//       return false;
//     }

//     // Very simple date validation
//     const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
//     if (form.birthDate && !dateRegex.test(form.birthDate)) {
//       Alert.alert("Invalid Date", "Birth Date format must be DD/MM/YYYY");
//       return false;
//     }

//     if (form.expiryDate && !dateRegex.test(form.expiryDate)) {
//       Alert.alert("Invalid Date", "Expiry Date must be DD/MM/YYYY");
//       return false;
//     }

//     return true;
//   };

//   const save = async () => {
//     if (!validate()) return;

//     await savePassportData({
//       ...form,
//       frontImage,
//       backImage,
//     });

//     Alert.alert("Success", "Passport saved successfully");
//     navigation.navigate("HomeScreen");
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>

//       {/* FRONT IMAGE */}
//       {frontImage && (
//         <>
//           <Text style={{ fontWeight: "700", marginBottom: 10 }}>Front Side</Text>
//           <Image
//             source={{ uri: frontImage }}
//             style={{ width: "100%", height: 200, marginBottom: 20, borderRadius: 8 }}
//           />
//         </>
//       )}

//       {/* BACK IMAGE */}
//       {backImage && (
//         <>
//           <Text style={{ fontWeight: "700", marginBottom: 10 }}>Back Side</Text>
//           <Image
//             source={{ uri: backImage }}
//             style={{ width: "100%", height: 200, marginBottom: 20, borderRadius: 8 }}
//           />
//         </>
//       )}

//       {/* FORM FIELDS */}
//       <Text>First Name *</Text>
//       <TextInput
//         value={form.firstName}
//         onChangeText={(v) => updateField("firstName", v)}
//         style={styles.input}
//       />

//       <Text>Last Name *</Text>
//       <TextInput
//         value={form.lastName}
//         onChangeText={(v) => updateField("lastName", v)}
//         style={styles.input}
//       />

//       <Text>Passport Number *</Text>
//       <TextInput
//         value={form.passportNumber}
//         onChangeText={(v) => updateField("passportNumber", v)}
//         style={styles.input}
//       />

//       <Text>Date of Birth (DD/MM/YYYY)</Text>
//       <TextInput
//         value={form.birthDate}
//         onChangeText={(v) => updateField("birthDate", v)}
//         style={styles.input}
//       />

//       <Text>Expiry Date (DD/MM/YYYY)</Text>
//       <TextInput
//         value={form.expiryDate}
//         onChangeText={(v) => updateField("expiryDate", v)}
//         style={styles.input}
//       />

//       <Button title="Save Passport" onPress={save} />
//     </ScrollView>
//   );
// }

// const styles = {
//   input: {
//     borderWidth: 1,
//     borderColor: "#bbb",
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 8,
//   },
// };



// import React, { useState } from "react";
// import { Alert, TextInput, Text, Button, Image, ScrollView } from "react-native";
// import { savePassportData } from "../../api/user/passportService";

// export default function PassportDetailsScreen({ route, navigation }) {
//   const { frontData, backData, frontImageUri, backImageUri, frontBase64, backBase64 } =
//     route.params;

//   const [form, setForm] = useState({
//     ...frontData,
//     ...backData,
//   });

//   const updateField = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//     const validate = () => {
//     if (!form.firstName || !form.lastName || !form.passportNumber) {
//       Alert.alert("Missing Fields", "Please fill required fields.");
//       return false;
//     }

//     // Very simple date validation
//     const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
//     if (form.birthDate && !dateRegex.test(form.birthDate)) {
//       Alert.alert("Invalid Date", "Birth Date format must be DD/MM/YYYY");
//       return false;
//     }

//     if (form.expiryDate && !dateRegex.test(form.expiryDate)) {
//       Alert.alert("Invalid Date", "Expiry Date must be DD/MM/YYYY");
//       return false;
//     }

//     return true;
//   };
//   const save = async () => {
//        if (!validate()) return;
//       await savePassportData(...form, frontBase64, backBase64);
//       Alert.alert("Success", "Passport saved successfully");
//       navigation.navigate("HomeScreen");
//     };

//     return (
//       <ScrollView style={{ padding: 20 }}>
//         {/* Show both images */}
//         <ScrollView horizontal>
//           {frontImageUri && (
//             <Image
//               source={{ uri: frontImageUri }}
//               style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
//             />
//           )}
//           {backImageUri && (
//             <Image
//               source={{ uri: backImageUri }}
//               style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
//             />
//           )}
//         </ScrollView>

//         <Text>First Name</Text>
//         <TextInput
//           value={form.firstName}
//           onChangeText={(v) => updateField("firstName", v)}
//           style={{ borderWidth: 1, marginBottom: 10 }}
//         />

//         <Text>Last Name</Text>
//         <TextInput
//           value={form.lastName}
//           onChangeText={(v) => updateField("lastName", v)}
//           style={{ borderWidth: 1, marginBottom: 10 }}
//         />

//         <Text>Passport Number</Text>
//         <TextInput
//           value={form.passportNumber}
//           onChangeText={(v) => updateField("passportNumber", v)}
//           style={{ borderWidth: 1, marginBottom: 10 }}
//         />

//         <Text>Date of Birth</Text>
//         <TextInput
//           value={form.birthDate}
//           onChangeText={(v) => updateField("birthDate", v)}
//           style={{ borderWidth: 1, marginBottom: 10 }}
//         />

//         <Text>Expiry Date</Text>
//         <TextInput
//           value={form.expiryDate}
//           onChangeText={(v) => updateField("expiryDate", v)}
//           style={{ borderWidth: 1, marginBottom: 10 }}
//         />

//         <Button title="Save Passport Data" onPress={save} />
//       </ScrollView>
//     );
//   }


// import React, { useState } from "react";
// import {
//   Alert,
//   TextInput,
//   Text,
//   Button,
//   Image,
//   ScrollView,
// } from "react-native";
// import { savePassportData } from "../../api/user/passportService";

// export default function PassportDetailsScreen({ route, navigation }) {
//   const {
//     frontData,
//     backData,
//     frontImageUri,
//     backImageUri,
//     frontBase64,
//     backBase64,
//     photoUri,
//     photoBase64
//   } = route.params;

//   const [form, setForm] = useState({
//     ...frontData,
//     ...backData,
//   });

//   const updateField = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//   // ---------------- VALIDATION ----------------
//   const validate = () => {
//     if (!form.firstName || !form.lastName || !form.passportNumber) {
//       Alert.alert("Missing Fields", "Fill first name, last name & passport number.");
//       return false;
//     }
//     return true;
//   };

//   // ---------------- SAVE DATA ----------------
//   const save = async () => {
//     if (!validate()) return;

//     try {
//       await savePassportData({
//         ...form,
//         frontBase64,
//         backBase64,
//       });

//       Alert.alert("Success", "Passport saved successfully!");
//       navigation.navigate("QuestionScreen");

//     } catch (err) {
//       console.log("SAVE ERROR:", err);
//       Alert.alert("Error", "Could not save passport.");
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       {/* Preview both images */}
//       <ScrollView horizontal style={{ margin: 30 }}>
//         {frontImageUri && (
//           <Image
//             source={{ uri: frontImageUri }}
//             style={{ width: 200, height: 200, marginRight: 15, borderRadius: 2 }}
//           />
//         )}
//         {backImageUri && (
//           <Image
//             source={{ uri: backImageUri }}
//             style={{ width: 200, height: 200, marginRight: 15, borderRadius: 2 }}
//           />
//         )}
//         {photoUri && (
//           <Image
//             source={{ uri: photoUri }}
//             style={{ width: 200, height: 200, marginRight: 15, borderRadius: 2 }}
//           />
//         )}
//       </ScrollView>

//       <Text>First Name</Text>
//       <TextInput
//         value={form.firstName}
//         onChangeText={(v) => updateField("firstName", v)}
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Last Name</Text>
//       <TextInput
//         value={form.lastName}
//         onChangeText={(v) => updateField("lastName", v)}
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Passport Number</Text>
//       <TextInput
//         value={form.passportNumber}
//         onChangeText={(v) => updateField("passportNumber", v)}
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Date of Birth</Text>
//       <TextInput
//         value={form.birthDate}
//         onChangeText={(v) => updateField("birthDate", v)}
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />

//       <Text>Expiry Date</Text>
//       <TextInput
//         value={form.expiryDate}
//         onChangeText={(v) => updateField("expiryDate", v)}
//         style={{ borderWidth: 1, marginBottom: 10 }}
//       />

//       <Button title="Save Passport Data" onPress={save} />
//     </ScrollView>
//   );
// }


// import React, { useState } from "react";
// import {
//   Alert,
//   TextInput,
//   Text,
//   Button,
//   Image,
//   ScrollView,
// } from "react-native";
// import { savePassportData } from "../../api/user/passportService";

// // ---------------- FORMAT MRZ DATE → DD/MM/YYYY ----------------
// function formatMRZDate(mrz) {
//   if (!mrz || mrz.length !== 6) return mrz;

//   const yy = mrz.substring(0, 2);
//   const mm = mrz.substring(2, 4);
//   const dd = mrz.substring(4, 6);

//   const fullYear = parseInt(yy) > 25 ? `19${yy}` : `20${yy}`;

//   return `${dd}/${mm}/${fullYear}`;
// }

// export default function PassportDetailsScreen({ route, navigation }) {
//   const visaPreferences = route?.params?.visa || null;
//   console.log("DETAILS=>",visaPreferences)
//   const {
//     frontData,
//     backData,
//     frontImageUri,
//     backImageUri,
//     frontBase64,
//     backBase64,
//     photoUri,
//   } = route.params;

//   // ---------- INITIAL FORM WITH FORMATTED DATES ----------
//   const [form, setForm] = useState({
//     ...frontData,
//     ...backData,
//     birthDate: frontData?.birthDate
//       ? formatMRZDate(frontData.birthDate)
//       : "",
//     expiryDate: frontData?.expiryDate
//       ? formatMRZDate(frontData.expiryDate)
//       : "",
//   });

//   const updateField = (key, value) => {
//     setForm({ ...form, [key]: value });
//   };

//   // ----------- VALIDATION ----------
  // const validate = () => {
  //   if (!form.firstName || !form.lastName || !form.passportNumber) {
  //     Alert.alert("Missing Fields", "Fill first name, last name & passport number.");
  //     return false;
  //   }

  //   // Validate correct DD/MM/YYYY
  //   const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  //   if (form.birthDate && !dateRegex.test(form.birthDate)) {
  //     Alert.alert("Invalid Date", "Birth Date must be DD/MM/YYYY");
  //     return false;
  //   }

  //   if (form.expiryDate && !dateRegex.test(form.expiryDate)) {
  //     Alert.alert("Invalid Date", "Expiry Date must be DD/MM/YYYY");
  //     return false;
  //   }

  //   return true;
  // };

//   // ------------- SAVE DATA -------------
//   // const save = async () => {
//   //   if (!validate()) return;

//   //   const formattedToSave = {
//   //     ...form,
//   //     birthDate: form.birthDate,
//   //     expiryDate: form.expiryDate,
//   //   };

//   //   try {
//   //     await savePassportData(formattedToSave, frontBase64, backBase64);

//   //     Alert.alert("Success", "Passport saved successfully!");
//   //     navigation.navigate("QuestionScreen");

//   //   } catch (err) {
//   //     console.log("SAVE ERROR:", err);
//   //     Alert.alert("Error", "Could not save passport.");
//   //   }
//   // };

//   const save = async () => {
//     if (!validate()) return;

//     const payload = {
//       ...form,
//       birthDate: form.birthDate,
//       expiryDate: form.expiryDate,
//       frontBase64,
//       backBase64,
//       visa: visaPreferences
//     };

//     try {
//       await savePassportData(payload);

//       Alert.alert("Success", "Passport saved successfully!");
//       navigation.navigate("QuestionScreen",{payload});

//     } catch (err) {
//       console.log("SAVE ERROR:", err);
//       Alert.alert("Error", "Could not save passport.");
//     }
//   };


//   return (
//     <ScrollView style={{ padding: 20 }}>

//       {/* SHOW PASSPORT IMAGES */}
//       <ScrollView horizontal style={{ marginBottom: 20 }}>
//         {photoUri && (
//           <Image
//             source={{ uri: photoUri }}
//             style={{ width: 200, height: 200, marginRight: 10 }}
//           />
//         )}
//         {frontImageUri && (
//           <Image
//             source={{ uri: frontImageUri }}
//             style={{ width: 200, height: 200, marginRight: 10 }}
//           />
//         )}
//         {backImageUri && (
//           <Image
//             source={{ uri: backImageUri }}
//             style={{ width: 200, height: 200 }}
//           />
//         )}
//       </ScrollView>

//       {/* FORM FIELDS */}
//       <Text>First Name *</Text>
//       <TextInput
//         value={form.firstName}
//         onChangeText={(v) => updateField("firstName", v)}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />

//       <Text>Last Name *</Text>
//       <TextInput
//         value={form.lastName}
//         onChangeText={(v) => updateField("lastName", v)}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />

//       <Text>Passport Number *</Text>
//       <TextInput
//         value={form.passportNumber}
//         onChangeText={(v) => updateField("passportNumber", v)}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />

//       <Text>Date of Birth (DD/MM/YYYY)</Text>
//       <TextInput
//         value={form.birthDate}
//         onChangeText={(v) => updateField("birthDate", v)}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />

//       <Text>Expiry Date (DD/MM/YYYY)</Text>
//       <TextInput
//         value={form.expiryDate}
//         onChangeText={(v) => updateField("expiryDate", v)}
//         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
//       />

//       <Button title="Save Passport Data" onPress={save} />
//     </ScrollView>
//   );
// }


// src/screens/passport/PassportDetailScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportDetailsScreen({ navigation, route }) {

//   const updatedPhotoUrl = route?.params?.updatedPhotoUrl || photoUrl;
//   const passport = route?.params?.passport || route?.params?.updatedPassport || {};
//   console.log("DETAILsCRREEN=>", updatedPhotoUrl)
//   const travel = route?.params?.travelDate || null;
//   // const photoUrl = route?.params?.photo || null;
//   const photoUrl =
//     route?.params?.photoUrl ||
//     passport?.photoUrl ||
//     null;
//   console.log("DETAIL PHOTO URL:", photoUrl);

//   //const passport = route?.params?.passport || null;

//   // MRZ fields your parser usually returns; adjust names if needed
//   const [firstName, setFirstName] = useState(passport?.firstName || "");
//   const [lastName, setLastName] = useState(passport?.lastName || "");
//   const [passportNumber, setPassportNumber] = useState(passport?.passportNumber || "");
//   const [nationality, setNationality] = useState(passport?.nationality || "");
//   const [birthDate, setBirthDate] = useState(passport?.birthDate || "");
//   const [expiryDate, setExpiryDate] = useState(passport?.expiryDate || "");

//   const onConfirm = async () => {
//     const payload = {
//       ...passport,
//       firstName,
//       lastName,
//       passportNumber,
//       nationality,
//       birthDate,
//       expiryDate,
//     };

//     await savePassportData(payload); // just saves another “latest” snapshot

//     navigation.navigate("CheckoutScreen", {
//       passport: payload,
//       travel,
//       photoUrl,
//     });
//   };

//   const fromDate = travel?.departureDate || "";
//   const toDate = travel?.returnDate || "";


//   const handleEditPhoto = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport,
//       photoUrl
//     });
//   };

//   const handleEditPassport = () => {
//     navigation.navigate("PassportUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport,
//       photoUrl
//     });
//   };
//   return (
//     <View style={styles.container}>
//       {/* TOP BAR */}
//       <View style={styles.topNav}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <View style={styles.stepBadge}>
//           <Icon name="check-circle" size={18} color="white" />
//           <Text style={styles.stepBadgeText}>Visa on 27 Nov, 07:05 PM</Text>
//         </View>

//         <Icon name="home" size={26} color={ORANGE} />
//       </View>

//       {/* PROGRESS BAR */}
//       <View style={styles.progressContainer}>
//         {/* Dates */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Dates</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Photo */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Photo</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Passport */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Passport</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Detail (current) */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Checkout */}
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Checkout</Text>
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>Review your information</Text>

//         {/* Visa validity block */}
//         <View style={styles.sectionCard}>
//           <View style={styles.sectionHeader}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="event" size={18} color={ORANGE} />
//               <Text style={styles.sectionTitle}> Visa Validity</Text>
//             </View>
//           </View>

//           <View style={styles.validityRow}>
//             <View>
//               <Text style={styles.smallLabel}>From</Text>
//               <Text style={styles.dateText}>{fromDate}</Text>
//             </View>

//             <Icon name="arrow-forward" size={20} color="#555" />

//             <View>
//               <Text style={styles.smallLabel}>Until</Text>
//               <Text style={styles.dateText}>{toDate}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Uploaded images row */}
//         {/* <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Uploaded Documents</Text> */}
//         {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
//             {/* {photoUrl && (
//               <Image
//                 source={{ uri: photoUrl }}
//                 style={styles.thumb}
//                 resizeMode="cover"
//               />
//             )} */}
//         {/* {photoUrl ? (
//           <Image source={{ uri: photoUrl }} style={styles.thumb} resizeMode="cover" />
//         ) : (
//           <Text>No Photo</Text>
//         )} */}

//         {/* {passport?.frontImageURL && (
//           <Image
//             source={{ uri: passport.frontImageURL }}
//             style={styles.thumb}
//             resizeMode="cover"
//           />
//         )} */}
//         {/* {passport?.backImageURL && (
//           <Image
//             source={{ uri: passport.backImageURL }}
//             style={styles.thumb}
//             resizeMode="cover"
//           />
//         )} */}
//         {/* </View> */}
//         {/* </View> */}
//         {/* DOCUMENTS SUBMITTED */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="insert-drive-file" size={18} color={ORANGE} />
//               <Text style={styles.sectionTitle}> Documents Submitted</Text>
//             </View>
//           </View>

//           {/* Photo */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Photo</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPhoto}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbBox}>
//               {updatedPhotoUrl || photoUrl ? (
//                 <Image
//                   source={{ uri: updatedPhotoUrl || photoUrl }}
//                   style={styles.docImage}
//                   resizeMode="cover"
//                 />
//               ) : (
//                 <Text style={styles.docPlaceholder}>No Photo</Text>
//               )}
//             </View>

//           </View>

//           {/* Passport Front */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Front</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbBox}>
//               {passport?.frontImageURL ? (
//                 <Image source={{ uri: passport.frontImageURL }} style={styles.docImage} resizeMode="cover" />
//               ) : (
//                 <Text style={styles.docPlaceholder}>No Image</Text>
//               )}
//             </View>
//           </View>

//           {/* Passport Back */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Back</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbBox}>
//               {passport?.backImageURL ? (
//                 <Image source={{ uri: passport.backImageURL }} style={styles.docImage} resizeMode="cover" />
//               ) : (
//                 <Text style={styles.docPlaceholder}>No Image</Text>
//               )}
//             </View>
//           </View>
//         </View>


//         {/* Personal Info */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="person-outline" size={18} color={ORANGE} />
//               <Text style={styles.sectionTitle}> Personal Information</Text>
//             </View>
//           </View>

//           <Text style={styles.inputLabel}>First Name</Text>
//           <TextInput
//             style={styles.input}
//             value={firstName}
//             onChangeText={setFirstName}
//           />

//           <Text style={styles.inputLabel}>Last Name</Text>
//           <TextInput
//             style={styles.input}
//             value={lastName}
//             onChangeText={setLastName}
//           />

//           <Text style={styles.inputLabel}>Passport Number</Text>
//           <TextInput
//             style={styles.input}
//             value={passportNumber}
//             onChangeText={setPassportNumber}
//           />

//           <Text style={styles.inputLabel}>Nationality</Text>
//           <TextInput
//             style={styles.input}
//             value={nationality}
//             onChangeText={setNationality}
//           />

//           <Text style={styles.inputLabel}>Birth Date</Text>
//           <TextInput
//             style={styles.input}
//             value={birthDate}
//             onChangeText={setBirthDate}
//           />

//           <Text style={styles.inputLabel}>Passport Expiry</Text>
//           <TextInput
//             style={styles.input}
//             value={expiryDate}
//             onChangeText={setExpiryDate}
//           />
//         </View>

//         <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//           <Text style={styles.confirmText}>Confirm</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   stepBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: ORANGE,
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },
//   progressContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     justifyContent: "center",
//   },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   line: {
//     width: 30,
//     height: 2,
//     backgroundColor: ORANGE,
//     marginHorizontal: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: 24,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   sectionCard: {
//     backgroundColor: "#F6F6F8",
//     borderRadius: 16,
//     padding: 16,
//     marginTop: 8,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   validityRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 16,
//   },
//   smallLabel: {
//     fontSize: 12,
//     color: "#777",
//   },
//   dateText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 4,
//   },
//   thumb: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//     marginRight: 8,
//     backgroundColor: "#ddd",
//   },
//   inputLabel: {
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 12,
//     marginBottom: 4,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     backgroundColor: "#fff",
//   },
//   confirmButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginVertical: 24,
//   },
//   confirmText: {
//     textAlign: "center",
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   docRow: {
//     marginTop: 12,
//   },
//   docHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 6,
//   },
//   docHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   docLabel: {
//     marginLeft: 6,
//     fontSize: 13,
//     fontWeight: "600",
//   },
//   thumbBox: {
//     width: 90,
//     height: 90,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#E9E9EF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   docImage: {
//     width: "100%",
//     height: "100%",
//   },
//   docPlaceholder: {
//     fontSize: 12,
//     color: "#999",
//   },

// });






import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { savePassportData } from "../../api/user/passportService";

const ORANGE = "#FF5C00";

export default function PassportDetailsScreen({ navigation, route }) {
  // ===== Helper to format MRZ date (YYMMDD -> DD MMM YYYY) =====
  function formatMRZDate(mrz) {
    if (!mrz || mrz.length !== 6) return mrz;

    const year = parseInt(mrz.slice(0, 2), 10);
    const month = mrz.slice(2, 4);
    const day = mrz.slice(4, 6);

    const fullYear = year >= 40 ? `19${mrz.slice(0, 2)}` : `20${mrz.slice(0, 2)}`;

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return `${day} ${months[parseInt(month, 10) - 1]} ${fullYear}`;
  }

  // ===== Route params =====
  const passport = route?.params?.passport || route?.params?.updatedPassport || {};
  const travel = route?.params?.travelDate || null;
  const photoUrl = route?.params?.updatedPhotoUrl || passport?.photoUrl || null;

  console.log("UPDATE PASSPORT=>",route?.params?.passport.firstName)
  // ===== State values =====
  const [firstName, setFirstName] = useState(passport?.firstName ||"");
  const [lastName, setLastName] = useState(passport?.lastName || "");
  const [passportNumber, setPassportNumber] = useState(passport?.passportNumber || "");
  const [nationality, setNationality] = useState(passport?.nationality || "");
  const [birthDate, setBirthDate] = useState(formatMRZDate(passport?.birthDate));
  const [expiryDate, setExpiryDate] = useState(formatMRZDate(passport?.expiryDate));

  console.log("UPDATE PASSPORT=>",birthDate)
  // ===== Confirm & Continue =====
  const onConfirm = async () => {
    const payload = {
      ...passport,
      firstName,
      lastName,
      passportNumber,
      nationality,
      birthDate,
      expiryDate,
    };

    await savePassportData(payload);

    navigation.navigate("CheckoutScreen", {
      passport: payload,
      travel,
      photoUrl,
    });
  };

  // ===== Image edit actions =====
  const handleEditPhoto = () => {
    navigation.navigate("PhotoUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travel,
      passport,
      photoUrl,
    });
  };

  const handleEditPassport = () => {
    navigation.navigate("PassportUploadScreen", {
      editMode: true,
      returnTo: "PassportDetailsScreen",
      travelDate: travel,
      passport,
      photoUrl,
    });
  };

  const fromDate = travel?.departureDate || "";
  const toDate = travel?.returnDate || "";

  return (
    <View style={styles.container}>

      {/* TOP NAV BAR */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={18} color="white" />
          <Text style={styles.stepBadgeText}>Visa on 27 Nov, 07:05 PM</Text>
        </View>

        <Icon name="home" size={26} color={ORANGE} />
      </View>

      {/* PROGRESS INDICATOR */}
      <View style={styles.progressContainer}>
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Dates</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Photo</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={styles.stepLabel}>Passport</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>

      {/* MAIN CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Review your information</Text>

        {/* VISA VALIDITY */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="event" size={18} color={ORANGE} />
              <Text style={styles.sectionTitle}> Visa Validity</Text>
            </View>
          </View>

          <View style={styles.validityRow}>
            <View>
              <Text style={styles.smallLabel}>From</Text>
              <Text style={styles.dateText}>{fromDate}</Text>
            </View>

            <Icon name="arrow-forward" size={20} color="#555" />

            <View>
              <Text style={styles.smallLabel}>Until</Text>
              <Text style={styles.dateText}>{toDate}</Text>
            </View>
          </View>
        </View>

        {/* DOCUMENTS */}
        <View style={[styles.sectionCard, { marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="insert-drive-file" size={18} color={ORANGE} />
              <Text style={styles.sectionTitle}> Documents Submitted</Text>
            </View>
          </View>

          {/* Photo */}
          <View style={styles.docRow}>
            <View style={styles.docHeader}>
              <View style={styles.docHeaderLeft}>
                <Icon name="check-circle" size={18} color="#09B66E" />
                <Text style={styles.docLabel}>Photo</Text>
              </View>
              <TouchableOpacity onPress={handleEditPhoto}>
                <Icon name="edit" size={18} color={ORANGE} />
              </TouchableOpacity>
            </View>

            <View style={styles.thumbBox}>
              {photoUrl ? (
                <Image source={{ uri: photoUrl }} style={styles.docImage} resizeMode="cover" />
              ) : (
                <Text style={styles.docPlaceholder}>No Photo</Text>
              )}
            </View>
          </View>

          {/* Passport Front */}
          <View style={styles.docRow}>
            <View style={styles.docHeader}>
              <View style={styles.docHeaderLeft}>
                <Icon name="check-circle" size={18} color="#09B66E" />
                <Text style={styles.docLabel}>Passport Front</Text>
              </View>
              <TouchableOpacity onPress={handleEditPassport}>
                <Icon name="edit" size={18} color={ORANGE} />
              </TouchableOpacity>
            </View>

            <View style={styles.thumbBox}>
              {passport?.frontImageURL ? (
                <Image source={{ uri: passport.frontImageURL }} style={styles.docImage} resizeMode="cover" />
              ) : (
                <Text style={styles.docPlaceholder}>No Image</Text>
              )}
            </View>
          </View>

          {/* Passport Back */}
          <View style={styles.docRow}>
            <View style={styles.docHeader}>
              <View style={styles.docHeaderLeft}>
                <Icon name="check-circle" size={18} color="#09B66E" />
                <Text style={styles.docLabel}>Passport Back</Text>
              </View>
              <TouchableOpacity onPress={handleEditPassport}>
                <Icon name="edit" size={18} color={ORANGE} />
              </TouchableOpacity>
            </View>

            <View style={styles.thumbBox}>
              {passport?.backImageURL ? (
                <Image source={{ uri: passport.backImageURL }} style={styles.docImage} resizeMode="cover" />
              ) : (
                <Text style={styles.docPlaceholder}>No Image</Text>
              )}
            </View>
          </View>
        </View>

        {/* PERSONAL INFO */}
        <View style={[styles.sectionCard, { marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="person-outline" size={18} color={ORANGE} />
              <Text style={styles.sectionTitle}> Personal Information</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

          <Text style={styles.inputLabel}>Passport Number</Text>
          <TextInput style={styles.input} value={passportNumber} onChangeText={setPassportNumber} />

          <Text style={styles.inputLabel}>Nationality</Text>
          <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />

          <Text style={styles.inputLabel}>Birth Date</Text>
          <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />

          <Text style={styles.inputLabel}>Passport Expiry</Text>
          <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} />
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  stepBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ORANGE,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  stepItem: { alignItems: "center" },
  stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
  line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
  title: { fontSize: 20, fontWeight: "700", marginTop: 24, marginBottom: 10, textAlign: "center" },
  sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16, marginTop: 8 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  validityRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
  smallLabel: { fontSize: 12, color: "#777" },
  dateText: { fontSize: 16, fontWeight: "600", marginTop: 4 },
  docRow: { marginTop: 12 },
  docHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  docHeaderLeft: { flexDirection: "row", alignItems: "center" },
  docLabel: { marginLeft: 6, fontSize: 13, fontWeight: "600" },
  thumbBox: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E9E9EF",
    justifyContent: "center",
    alignItems: "center",
  },
  docImage: { width: "100%", height: "100%" },
  docPlaceholder: { fontSize: 12, color: "#999" },
  inputLabel: { fontSize: 13, fontWeight: "600", marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#fff" },
  confirmButton: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 12, marginVertical: 24 },
  confirmText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "700" },
});
