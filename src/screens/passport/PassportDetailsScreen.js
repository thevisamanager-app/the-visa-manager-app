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


// const handleEditPhoto = () => {
//   navigation.navigate("PhotoUploadScreen", {
//     editMode: true,
//     returnTo: "PassportDetailsScreen",
//     travelDate: travel,
//     passport,
//     photoUrl
//   });
// };

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

// {/* PROGRESS BAR */}
// <View style={styles.progressContainer}>
//   {/* Dates */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Dates</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Photo */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Photo</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Passport */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Passport</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Detail (current) */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Checkout */}
//   <View style={styles.stepItem}>
//     <Icon name="radio-button-unchecked" size={22} color="#777" />
//     <Text style={styles.stepLabel}>Checkout</Text>
//   </View>
// </View>

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






// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Alert,
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportDetailsScreen({ navigation, route }) {
//   // ===== Helper to format MRZ date (YYMMDD -> DD MMM YYYY) =====
//   function formatMRZDate(mrz) {
//     if (!mrz || mrz.length !== 6) return mrz;

//     const year = parseInt(mrz.slice(0, 2), 10);
//     const month = mrz.slice(2, 4);
//     const day = mrz.slice(4, 6);

//     const fullYear = year >= 40 ? `19${mrz.slice(0, 2)}` : `20${mrz.slice(0, 2)}`;

//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     return `${day} ${months[parseInt(month, 10) - 1]} ${fullYear}`;
//   }

//   // ===== Route params =====
//   const passport = route?.params?.passport || route?.params?.updatedPassport || {};
//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.updatedPhotoUrl || passport?.photoUrl || null;

//   console.log("UPDATE PASSPORT=>", route?.params?.passport.firstName)
//   // ===== State values =====
//   const [firstName, setFirstName] = useState(passport?.firstName || "");
//   const [lastName, setLastName] = useState(passport?.lastName || "");
//   const [passportNumber, setPassportNumber] = useState(passport?.passportNumber || "");
//   const [nationality, setNationality] = useState(passport?.nationality || "");
//   const [birthDate, setBirthDate] = useState(formatMRZDate(passport?.birthDate));
//   const [expiryDate, setExpiryDate] = useState(formatMRZDate(passport?.expiryDate));
//   const [coTravellers, setCoTravellers] = useState(route?.params?.coTravellers || []);


//   console.log("UPDATE PASSPORT=>", birthDate)
//   // ===== Confirm & Continue =====
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

//     await savePassportData(payload);

//     navigation.navigate("CheckoutScreen", {
//       passport: payload,
//       travel,
//       photoUrl,
//     });
//   };

//   // ===== Image edit actions =====
//   const handleEditPhoto = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport,
//       photoUrl,
//     });
//   };

// const handleEditPassport = () => {
//   navigation.navigate("PassportUploadScreen", {
//     editMode: true,
//     returnTo: "PassportDetailsScreen",
//     travelDate: travel,
//     passport,
//     photoUrl,
//   });
// };

//   const handleAddCoTraveller = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       addMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       coTravellers,
//       onSaveTraveller: (newTraveller) => {
//         setCoTravellers(prev => [...prev, newTraveller]);
//       }
//     });
//   };

//   const fromDate = travel?.departureDate || "";
//   const toDate = travel?.returnDate || "";

//   return (
//     <View style={styles.container}>

//       {/* TOP NAV BAR */}
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

//       {/* PROGRESS INDICATOR */}
//       <View style={styles.progressContainer}>
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Dates</Text>
//         </View>
//         <View style={styles.line} />

//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Photo</Text>
//         </View>
//         <View style={styles.line} />

//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={styles.stepLabel}>Passport</Text>
//         </View>
//         <View style={styles.line} />

//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
//         </View>
//         <View style={styles.line} />

//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Checkout</Text>
//         </View>
//       </View>

//       {/* MAIN CONTENT */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>Review your information</Text>

//         {/* VISA VALIDITY */}
//         <View style={styles.sectionCard}>
//           {/* <View style={styles.sectionHeader}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="event" size={18} color={ORANGE} />
//               <Text style={styles.sectionTitle}> Visa Validity</Text>
//             </View>
//           </View> */}

//           <TouchableOpacity onPress={handleAddCoTraveller}>
//             <Text style={{ color: ORANGE, fontWeight: "bold" }}>+ Add Co-Passenger</Text>
//           </TouchableOpacity>

//           {/* <View style={styles.validityRow}>
//             <View>
//               <Text style={styles.smallLabel}>From</Text>
//               <Text style={styles.dateText}>{fromDate}</Text>
//             </View>

//             <Icon name="arrow-forward" size={20} color="#555" />

//             <View>
//               <Text style={styles.smallLabel}>Until</Text>
//               <Text style={styles.dateText}>{toDate}</Text>
//             </View>
//           </View> */}
//         </View>

//         {/* DOCUMENTS */}
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
//               {photoUrl ? (
//                 <Image source={{ uri: photoUrl }} style={styles.docImage} resizeMode="cover" />
//               ) : (
//                 <Text style={styles.docPlaceholder}>No Photo</Text>
//               )}
//             </View>
//           </View>

//           {/* Passport Front */}
//   <View style={styles.docRow}>
//     <View style={styles.docHeader}>
//       <View style={styles.docHeaderLeft}>
//         <Icon name="check-circle" size={18} color="#09B66E" />
//         <Text style={styles.docLabel}>Passport Front</Text>
//       </View>
//       <TouchableOpacity onPress={handleEditPassport}>
//         <Icon name="edit" size={18} color={ORANGE} />
//       </TouchableOpacity>
//     </View>

//     <View style={styles.thumbBox}>
//       {passport?.frontImageURL ? (
//         <Image source={{ uri: passport.frontImageURL }} style={styles.docImage} resizeMode="cover" />
//       ) : (
//         <Text style={styles.docPlaceholder}>No Image</Text>
//       )}
//     </View>
//   </View>

//   {/* Passport Back */}
//   <View style={styles.docRow}>
//     <View style={styles.docHeader}>
//       <View style={styles.docHeaderLeft}>
//         <Icon name="check-circle" size={18} color="#09B66E" />
//         <Text style={styles.docLabel}>Passport Back</Text>
//       </View>
//       <TouchableOpacity onPress={handleEditPassport}>
//         <Icon name="edit" size={18} color={ORANGE} />
//       </TouchableOpacity>
//     </View>

//     <View style={styles.thumbBox}>
//       {passport?.backImageURL ? (
//         <Image source={{ uri: passport.backImageURL }} style={styles.docImage} resizeMode="cover" />
//       ) : (
//         <Text style={styles.docPlaceholder}>No Image</Text>
//       )}
//     </View>
//   </View>
// </View>

//         {/* PERSONAL INFO */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Icon name="person-outline" size={18} color={ORANGE} />
//               <Text style={styles.sectionTitle}> Personal Information</Text>
//             </View>
//           </View>

//           <Text style={styles.inputLabel}>First Name</Text>
//           <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

//           <Text style={styles.inputLabel}>Last Name</Text>
//           <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

//           <Text style={styles.inputLabel}>Passport Number</Text>
//           <TextInput style={styles.input} value={passportNumber} onChangeText={setPassportNumber} />

//           <Text style={styles.inputLabel}>Nationality</Text>
//           <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />

//           <Text style={styles.inputLabel}>Birth Date</Text>
//           <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />

//           <Text style={styles.inputLabel}>Passport Expiry</Text>
//           <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} />
//         </View>

//         <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//           <Text style={styles.confirmText}>Confirm</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// // ===== STYLES =====
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: { fontSize: 20, fontWeight: "700", marginTop: 24, marginBottom: 10, textAlign: "center" },
//   sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16, marginTop: 8 },
//   sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   sectionTitle: { fontSize: 16, fontWeight: "700" },
//   validityRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 16 },
//   smallLabel: { fontSize: 12, color: "#777" },
//   dateText: { fontSize: 16, fontWeight: "600", marginTop: 4 },
//   docRow: { marginTop: 12 },
//   docHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
//   docHeaderLeft: { flexDirection: "row", alignItems: "center" },
//   docLabel: { marginLeft: 6, fontSize: 13, fontWeight: "600" },
//   thumbBox: {
//     width: 90,
//     height: 90,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#E9E9EF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   docImage: { width: "100%", height: "100%" },
//   docPlaceholder: { fontSize: 12, color: "#999" },
//   inputLabel: { fontSize: 13, fontWeight: "600", marginTop: 12, marginBottom: 4 },
//   input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#fff" },
//   confirmButton: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 12, marginVertical: 24 },
//   confirmText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "700" },
// });




// import React, { useState, useEffect } from "react";
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

//   useEffect(() => {
//     setCoTravellers(toArray(route?.params?.coTravellers));
//   }, [route?.params?.coTravellers]);

//   // === Format MRZ to DD MMM YYYY ===
//   function formatMRZDate(mrz) {
//     if (!mrz || mrz.length !== 6) return mrz;

//     const year = parseInt(mrz.slice(0, 2), 10);
//     const month = mrz.slice(2, 4);
//     const day = mrz.slice(4, 6);

//     const fullYear = year >= 40 ? `19${mrz.slice(0, 2)}` : `20${mrz.slice(0, 2)}`;

//     const months = [
//       "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//     ];

//     return `${day} ${months[parseInt(month, 10) - 1]} ${fullYear}`;
//   }

//   // === PARAMS ===
//   const passport = route?.params?.passport || {};

//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.photoUrl || passport?.photoUrl;

//   // === State ===
//   // Helper to always return an array
//   const toArray = (value) => {
//     if (!value) return [];
//     return Array.isArray(value) ? value : [value];
//   };



//   const coTravellersFromRoute = toArray(route?.params?.coTravellers);
//   const [coTravellers, setCoTravellers] = useState(coTravellersFromRoute);

//   const [photoUrlState, setPhotoUrlState] = useState(photoUrl);

//   const [firstName, setFirstName] = useState(passport?.firstName || "");
//   const [lastName, setLastName] = useState(passport?.lastName || "");
//   const [passportNumber, setPassportNumber] = useState(passport?.passportNumber || "");
//   const [nationality, setNationality] = useState(passport?.nationality || "");
//   const [birthDate, setBirthDate] = useState(formatMRZDate(passport?.birthDate));
//   const [expiryDate, setExpiryDate] = useState(formatMRZDate(passport?.expiryDate));
//   const [passportState, setPassportState] = useState(passport);
//   const fromDate = travel?.departureDate || "";
//   const toDate = travel?.returnDate || "";

//   useEffect(() => {
//     if (route?.params?.updatedPhotoUrl) setPhotoUrlState(route?.params?.updatedPhotoUrl);
//   }, [route?.params?.updatedPhotoUrl]);

//   useEffect(() => {
//     if (route?.params?.updatedPassport) setPassportState(route?.params?.updatedPassport);
//   }, [route?.params?.updatedPassport]);


//   useEffect(() => {
//     if (passportState) {
//       setFirstName(passportState.firstName || "");
//       setLastName(passportState.lastName || "");
//       setPassportNumber(passportState.passportNumber || "");
//       setNationality(passportState.nationality || "");
//       setBirthDate(formatMRZDate(passportState.birthDate));
//       setExpiryDate(formatMRZDate(passportState.expiryDate));
//     }
//   }, [passportState]);


//   // === Add Co Traveller Flow ===
//   const handleAddCoTraveller = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       addMode: true,
//       travelDate: travel,
//       passportState,
//       coTravellers,
//     });
//   };

//   const handleEditPassport = () => {
//     navigation.navigate("PassportUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport: passportState,     // FIX - send updated version
//       photoUrl: photoUrlState      // FIX - consistent naming
//     });
//   };


//   const handleEditPhoto = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport: passportState,
//       photoUrl: photoUrlState,
//     });
//   };

//   // === Remove ===
//   const removeCoTraveller = (index) => {
//     const updated = [...coTravellers];
//     updated.splice(index, 1);
//     setCoTravellers(updated);
//   };

//   // === Confirm ===
//   const onConfirm = async () => {
//     const payload = {
//       ...passportState,
//       firstName,
//       lastName,
//       passportNumber,
//       nationality,
//       birthDate,
//       expiryDate,
//       coTravellers,
//     };

//     await savePassportData(payload);

//     navigation.navigate("CheckoutScreen", {
//       passport: payload,
//       travel,
//       photoUrlState,
//       coTravellers,
//     });
//   };

//   return (
//     <View style={styles.container}>

//       {/* NAV */}
//       <View style={styles.topNav}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <View style={styles.stepBadge}>
//           <Icon name="check-circle" size={16} color="#fff" />
//           <Text style={styles.stepBadgeText}>Review Visa</Text>
//         </View>

//         <Icon name="home" size={26} color={ORANGE} />
//       </View>

//       {/* Progress */}
//       {/* <View style={styles.progressContainer}>
//         <Icon name="check-circle" size={22} color={ORANGE} />
//         <View style={styles.line} />
//         <Icon name="check-circle" size={22} color={ORANGE} />
//         <View style={styles.line} />
//         <Icon name="check-circle" size={22} color={ORANGE} />
//         <View style={styles.line} />
//         <Icon name="check-circle" size={22} color={ORANGE} />
//         <View style={styles.line} />
//         <Icon name="radio-button-unchecked" size={22} color="#777" />
//       </View> */}
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

//         {/* VISA VALIDITY */}
//         {/* <View style={styles.sectionCard}>
//           <Text style={styles.sectionTitle}>Visa Validity</Text>

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
//         </View> */}

//         {/* Document display */}
//         {/* DOCUMENTS SECTION */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>

//           <Text style={styles.sectionTitle}>Documents Submitted</Text>

//           {/* Main passport front */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Front (You)</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.thumbBox}>
//               {passportState?.frontImageURL ? (
//                 <Image source={{ uri: passportState.frontImageURL }} style={styles.docImage} />
//               ) : <Text style={styles.docPlaceholder}>No Image</Text>}
//             </View>
//           </View>

//           {/* Main passport back */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Back (You)</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.thumbBox}>
//               {passportState?.backImageURL ? (
//                 <Image source={{ uri: passportState.backImageURL }} style={styles.docImage} />
//               ) : <Text style={styles.docPlaceholder}>No Image</Text>}
//             </View>
//           </View>

//           {/* Co-Travellers Documents */}
//           {coTravellers.map((p, index) => (
//             <View key={index} style={{ marginTop: 14 }}>
//               <View style={styles.docHeader}>
//                 <View style={styles.docHeaderLeft}>
//                   <Icon name="check-circle" size={18} color="#09B66E" />
//                   <Text style={styles.docLabel}>{p.firstName} {p.lastName}</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => removeCoTraveller(index)}>
//                   <Icon name="delete" size={22} color="red" />
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.thumbBox}>
//                 {p.frontImageURL ? (
//                   <Image source={{ uri: p.frontImageURL }} style={styles.docImage} />
//                 ) : <Text style={styles.docPlaceholder}>No Front</Text>}
//               </View>

//               <View style={[styles.thumbBox, { marginTop: 8 }]}>
//                 {p.backImageURL ? (
//                   <Image source={{ uri: p.backImageURL }} style={styles.docImage} />
//                 ) : <Text style={styles.docPlaceholder}>No Back</Text>}
//               </View>
//             </View>
//           ))}
//         </View>



//         {/* TRAVELLERS LIST */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Travellers</Text>

//             <TouchableOpacity onPress={handleAddCoTraveller}>
//               <Text style={styles.addBtn}>+ Add Co-Passenger</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Main Traveller */}
//           <View style={styles.travellerRow}>
//             <Icon name="person" size={24} color={ORANGE} />
//             <Text style={styles.travellerName}>
//               {firstName} {lastName} (You)
//             </Text>
//           </View>

//           {/* Co Travellers */}
//           {coTravellers.map((p, i) => (
//             <View key={i} style={styles.travellerRow}>
//               <Icon name="person" size={24} color="#555" />
//               <Text style={styles.travellerName}>{p.firstName} {p.lastName}</Text>

//               <TouchableOpacity onPress={() => removeCoTraveller(i)}>
//                 <Icon name="delete" size={22} color="red" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

//         {/* PERSONAL INFO */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <Text style={styles.inputLabel}>First Name</Text>
//           <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

//           <Text style={styles.inputLabel}>Last Name</Text>
//           <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

//           <Text style={styles.inputLabel}>Passport Number</Text>
//           <TextInput style={styles.input} value={passportNumber} onChangeText={setPassportNumber} />

//           <Text style={styles.inputLabel}>Nationality</Text>
//           <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />

//           <Text style={styles.inputLabel}>Birth Date</Text>
//           <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />

//           <Text style={styles.inputLabel}>Passport Expiry</Text>
//           <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} />
//         </View>

//         {/* Confirm */}
//         <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//           <Text style={styles.confirmText}>Continue</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// // === Styles ===
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   stepBadge: { backgroundColor: ORANGE, borderRadius: 18, paddingHorizontal: 10, paddingVertical: 4, flexDirection: "row", alignItems: "center" },
//   stepBadgeText: { color: "#fff", marginLeft: 6 },
//   progressContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "center" },
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: { fontSize: 20, fontWeight: "700", marginVertical: 15, textAlign: "center" },
//   sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16 },
//   sectionTitle: { fontWeight: "700", fontSize: 16 },
//   travellerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   travellerName: { marginLeft: 10, fontSize: 15, fontWeight: "600", flex: 1 },
//   addBtn: { color: ORANGE, fontWeight: "600" },
//   inputLabel: { marginTop: 10, fontWeight: "600" },
//   input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginTop: 4, borderRadius: 8, backgroundColor: "#fff" },
//   docRow: { marginTop: 10 },
//   docHeader: { flexDirection: "row", justifyContent: "space-between" },
//   docHeaderLeft: { flexDirection: "row", alignItems: "center" },
//   thumbBox: { backgroundColor: "#eee", width: 80, height: 80, marginTop: 8, borderRadius: 10, overflow: "hidden" },
//   docImage: { width: "100%", height: "100%" },
//   travellerIcon: { marginRight: 8 },
//   confirmButton: { backgroundColor: ORANGE, padding: 14, marginTop: 24, borderRadius: 12 },
//   confirmText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "700" },
// });


// import React, { useState, useEffect } from "react";
// import {
//   View, Text, StyleSheet, TextInput, TouchableOpacity,
//   Image, ScrollView
// } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import { savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportDetailsScreen({ navigation, route }) {

//   const passport = route?.params?.passport || {};
//   const travel = route?.params?.travelDate || null;

//   const initialCoTravellers = Array.isArray(route?.params?.coTravellers)
//     ? route?.params?.coTravellers
//     : [];

//   const [coTravellers, setCoTravellers] = useState(initialCoTravellers);
//   const [photoUrlState, setPhotoUrlState] = useState(route?.params?.photoUrl);

//   const [firstName, setFirstName] = useState(passport?.firstName || "");
//   const [lastName, setLastName] = useState(passport?.lastName || "");
//   const [passportNumber, setPassportNumber] = useState(passport?.passportNumber || "");
//   const [nationality, setNationality] = useState(passport?.nationality || "");
//   const [birthDate, setBirthDate] = useState(passport?.birthDate || "");
//   const [expiryDate, setExpiryDate] = useState(passport?.expiryDate || "");


//   useEffect(() => {
//   if (route?.params?.editedDocument) {
//     setPassportState(prev => ({
//       ...prev,
//       ...route.params.editedDocument, // merge only updated fields
//     }));
//   }

//   if (route?.params?.coTravellers) {
//     setCoTravellers(route.params.coTravellers); // keep list intact
//   }
// }, [route?.params?.editedDocument, route?.params?.coTravellers]);

//   const removeCoTraveller = (i) => {
//     const updated = [...coTravellers];
//     updated.splice(i, 1);
//     setCoTravellers(updated);
//   };

//   const handleAddCoTraveller = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       addMode: true,
//       travelDate: travel,
//       passport,
//       coTravellers,
//     });
//   };

//   const handleEditPassport = () => {
//     navigation.navigate("PassportUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport,
//       photoUrl: photoUrlState,
//     });
//   };

//   const handleEditPhoto = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport,
//       photoUrl: photoUrlState,
//     });
//   };

//   const onConfirm = async () => {
//     const payload = {
//       ...passport,
//       firstName,
//       lastName,
//       passportNumber,
//       nationality,
//       birthDate,
//       expiryDate,
//       coTravellers,
//       photoUrlState,
//     };

//     await savePassportData(payload);

//     navigation.navigate("CheckoutScreen", {
//       passport: payload,
//       travel,
//       photoUrlState,
//       coTravellers,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* NAV */}
//       <View style={styles.topNav}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <View style={styles.stepBadge}>
//           <Icon name="check-circle" size={16} color="#fff" />
//           <Text style={styles.stepBadgeText}>Review Visa</Text>
//         </View>

//         <Icon name="home" size={26} color={ORANGE} />
//       </View>

//       {/* PROGRESS */}
//       <View style={styles.progressContainer}>
//         <View style={styles.stepItem}><Icon name="check-circle" size={22} color={ORANGE} /><Text style={styles.stepLabel}>Dates</Text></View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}><Icon name="check-circle" size={22} color={ORANGE} /><Text style={styles.stepLabel}>Photo</Text></View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}><Icon name="check-circle" size={22} color={ORANGE} /><Text style={styles.stepLabel}>Passport</Text></View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}><Icon name="check-circle" size={22} color={ORANGE} /><Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text></View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}><Icon name="radio-button-unchecked" size={22} color="#777" /><Text style={styles.stepLabel}>Checkout</Text></View>
//       </View>

//       <ScrollView>
//         <Text style={styles.title}>Review your information</Text>

//         {/* DOCUMENTS SECTION */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Documents Submitted</Text>

//           {/* MAIN TRAVELLER PHOTO */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Photo (You)</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPhoto}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbLarge}>
//               {photoUrlState ? (
//                 <Image source={{ uri: photoUrlState }} style={{ width: "100%", height: "100%" }} />
//               ) : (
//                 <Text>No Photo</Text>
//               )}
//             </View>
//           </View>

//           {/* MAIN PASSPORT IMAGES */}
//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Front (You)</Text>
//               </View>
//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbBox}>
//               {passport?.frontImageURL ? (
//                 <Image source={{ uri: passport.frontImageURL }} style={styles.docImage} />
//               ) : <Text>No Image</Text>}
//             </View>
//           </View>

//           <View style={styles.docRow}>
//             <View style={styles.docHeader}>
//               <View style={styles.docHeaderLeft}>
//                 <Icon name="check-circle" size={18} color="#09B66E" />
//                 <Text style={styles.docLabel}>Passport Back (You)</Text>
//               </View>

//               <TouchableOpacity onPress={handleEditPassport}>
//                 <Icon name="edit" size={18} color={ORANGE} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.thumbBox}>
//               {passport?.backImageURL ? (
//                 <Image source={{ uri: passport.backImageURL }} style={styles.docImage} />
//               ) : <Text>No Image</Text>}
//             </View>
//           </View>

//           {/* CO TRAVELLERS DOCUMENTS */}
//           {coTravellers.map((p, i) => (
//             <View key={i} style={{ marginTop: 14 }}>
//               <View style={styles.docHeader}>
//                 <View style={styles.docHeaderLeft}>
//                   <Icon name="check-circle" size={18} color="#09B66E" />
//                   <Text style={styles.docLabel}>{p.firstName} {p.lastName}</Text>
//                 </View>

//                 <TouchableOpacity onPress={() => removeCoTraveller(i)}>
//                   <Icon name="delete" size={22} color="red" />
//                 </TouchableOpacity>
//               </View>

//               {/* CO Traveller Photo */}
//               <View style={styles.thumbLarge}>
//                 {p.photoUrl ? (
//                   <Image source={{ uri: p.photoUrl }} style={{ width: "100%", height: "100%" }} />
//                 ) : (<Text>No Photo</Text>)}
//               </View>

//               {/* CO Traveller Passport */}
//               <View style={styles.thumbBox}>
//                 {p.frontImageURL ? (
//                   <Image source={{ uri: p.frontImageURL }} style={styles.docImage} />
//                 ) : (<Text>No Front</Text>)}
//               </View>

//               <View style={[styles.thumbBox, { marginTop: 8 }]}>
//                 {p.backImageURL ? (
//                   <Image source={{ uri: p.backImageURL }} style={styles.docImage} />
//                 ) : (<Text>No Back</Text>)}
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* TRAVELLERS */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Travellers</Text>

//             <TouchableOpacity onPress={handleAddCoTraveller}>
//               <Text style={styles.addBtn}>+ Add Co-Passenger</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.travellerRow}>
//             <Icon name="person" size={24} color={ORANGE} />
//             <Text style={styles.travellerName}>{firstName} {lastName} (You)</Text>
//           </View>

//           {coTravellers.map((p, i) => (
//             <View key={i} style={styles.travellerRow}>
//               <Icon name="person" size={24} color="#555" />
//               <Text style={styles.travellerName}>{p.firstName} {p.lastName}</Text>

//               <TouchableOpacity onPress={() => removeCoTraveller(i)}>
//                 <Icon name="delete" size={22} color="red" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

//         {/* PERSONAL INFO */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <Text style={styles.inputLabel}>First Name</Text>
//           <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
//           <Text style={styles.inputLabel}>Last Name</Text>
//           <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
//           <Text style={styles.inputLabel}>Passport Number</Text>
//           <TextInput style={styles.input} value={passportNumber} onChangeText={setPassportNumber} />
//           <Text style={styles.inputLabel}>Nationality</Text>
//           <TextInput style={styles.input} value={nationality} onChangeText={setNationality} />
//           <Text style={styles.inputLabel}>Birth Date</Text>
//           <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />
//           <Text style={styles.inputLabel}>Expiry Date</Text>
//           <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} />
//         </View>

//         <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//           <Text style={styles.confirmText}>Continue</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   stepBadge: { backgroundColor: ORANGE, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 18, flexDirection: "row", alignItems: "center" },
//   stepBadgeText: { color: "#fff", marginLeft: 6 },
//   progressContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "center" },
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   title: { fontSize: 20, fontWeight: "700", textAlign: "center", marginVertical: 15 },
//   sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16 },
//   sectionTitle: { fontWeight: "700", fontSize: 16 },
//   docRow: { marginTop: 10 },
//   docHeader: { flexDirection: "row", justifyContent: "space-between" },
//   docHeaderLeft: { flexDirection: "row", alignItems: "center" },
//   docLabel: { marginLeft: 6, fontWeight: "600" },
//   thumbBox: { backgroundColor: "#eee", width: 80, height: 80, marginTop: 8, borderRadius: 10, overflow: "hidden" },
//   thumbLarge: { backgroundColor: "#eee", width: "100%", height: 150, marginTop: 8, borderRadius: 10, overflow: "hidden" },
//   docImage: { width: "100%", height: "100%" },
//   travellerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   travellerName: { marginLeft: 10, fontSize: 15, fontWeight: "600", flex: 1 },
//   addBtn: { color: ORANGE, fontWeight: "600" },
//   confirmButton: { backgroundColor: ORANGE, padding: 14, marginTop: 24, borderRadius: 12 },
//   confirmText: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
//   inputLabel: { marginTop: 10, fontWeight: "600" },
//   input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginTop: 4, borderRadius: 8, backgroundColor: "#fff" },
// });




// import React, { useState, useEffect } from "react";
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
//   // === Helpers ===
//   const toArray = (value) => {
//     if (!value) return [];
//     return Array.isArray(value) ? value : [value];
//   };

//   function formatMRZDate(mrz) {
//     if (!mrz || mrz.length !== 6) return mrz;

//     const year = parseInt(mrz.slice(0, 2), 10);
//     const month = mrz.slice(2, 4);
//     const day = mrz.slice(4, 6);

//     const fullYear = year >= 40 ? `19${mrz.slice(0, 2)}` : `20${mrz.slice(0, 2)}`;

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     return `${day} ${months[parseInt(month, 10) - 1]} ${fullYear}`;
//   }

//   // === PARAMS & INITIAL DATA ===
//   const passportParam = route?.params?.passport || {};
//   const travel = route?.params?.travelDate || null;

//   // main photo from passport, fall back to explicit param
//   const initialPhotoUrl =
//     passportParam?.photoUrl || route?.params?.photoUrl || null;

//   const initialCoTravellers = toArray(route?.params?.coTravellers);

//   const [passportState, setPassportState] = useState(passportParam);
//   const [photoUrlState, setPhotoUrlState] = useState(initialPhotoUrl);
//   const [coTravellers, setCoTravellers] = useState(initialCoTravellers);

//   const [firstName, setFirstName] = useState(passportParam?.firstName || "");
//   const [lastName, setLastName] = useState(passportParam?.lastName || "");
//   const [passportNumber, setPassportNumber] = useState(
//     passportParam?.passportNumber || ""
//   );
//   const [nationality, setNationality] = useState(
//     passportParam?.nationality || ""
//   );
//   const [birthDate, setBirthDate] = useState(
//     formatMRZDate(passportParam?.birthDate)
//   );
//   const [expiryDate, setExpiryDate] = useState(
//     formatMRZDate(passportParam?.expiryDate)
//   );

//   const fromDate = travel?.departureDate || "";
//   const toDate = travel?.returnDate || "";

//   // === EFFECT: coTravellers & edits from other screens ===

//   // When coming back with new co-travellers (e.g. after addMode),
//   // ONLY update if coTravellers param is provided
//   useEffect(() => {
//     if (route?.params && "coTravellers" in route.params) {
//       setCoTravellers(toArray(route.params.coTravellers));
//     }
//   }, [route?.params?.coTravellers]);

//   // Updated main photo after editing
//   useEffect(() => {
//     if (route?.params?.updatedPhotoUrl) {
//       setPhotoUrlState(route.params.updatedPhotoUrl);
//       setPassportState((prev) => ({
//         ...prev,
//         photoUrl: route.params.updatedPhotoUrl,
//       }));
//     }
//   }, [route?.params?.updatedPhotoUrl]);

//   // Updated main passport after editing
//   useEffect(() => {
//     if (route?.params?.updatedPassport) {
//       setPassportState((prev) => ({
//         ...prev,
//         ...route.params.updatedPassport,
//       }));
//     }
//   }, [route?.params?.updatedPassport]);

//   // Sync form fields when passportState changes
//   useEffect(() => {
//     if (passportState) {
//       setFirstName(passportState.firstName || "");
//       setLastName(passportState.lastName || "");
//       setPassportNumber(passportState.passportNumber || "");
//       setNationality(passportState.nationality || "");
//       setBirthDate(formatMRZDate(passportState.birthDate));
//       setExpiryDate(formatMRZDate(passportState.expiryDate));
//     }
//   }, [passportState]);

//   // === Navigation handlers ===

//   const handleAddCoTraveller = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       addMode: true,
//       travelDate: travel,
//       passportState, // main traveller full data (includes photoUrl)
//       photoUrl: photoUrlState,
//       coTravellers, // keep them so far
//     });
//   };

//   const handleEditPassport = () => {
//     navigation.navigate("PassportUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport: passportState,
//       photoUrl: photoUrlState,
//       coTravellers, // preserve list when returning
//     });
//   };

//   const handleEditPhoto = () => {
//     navigation.navigate("PhotoUploadScreen", {
//       editMode: true,
//       returnTo: "PassportDetailsScreen",
//       travelDate: travel,
//       passport: passportState,
//       photoUrl: photoUrlState,
//       coTravellers, // preserve list when returning
//     });
//   };

//   // Remove co-traveller locally (does not delete Firestore doc here)
//   const removeCoTraveller = (index) => {
//     const updated = [...coTravellers];
//     updated.splice(index, 1);
//     setCoTravellers(updated);
//   };

//   const onConfirm = async () => {
//     const payload = {
//       ...passportState,
//       firstName,
//       lastName,
//       passportNumber,
//       nationality,
//       birthDate,
//       expiryDate,
//       coTravellers,
//     };

//     await savePassportData(payload);

//     navigation.navigate("CheckoutScreen", {
//       passport: payload,
//       travel,
//       photoUrl: photoUrlState,
//       coTravellers,
//     });
//   };

//   const mainPhotoToShow = photoUrlState || passportState?.photoUrl || null;

//   return (
//     <View style={styles.container}>
//       {/* NAV */}
//       <View style={styles.topNav}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <View style={styles.stepBadge}>
//           <Icon name="check-circle" size={16} color="#fff" />
//           <Text style={styles.stepBadgeText}>Review Visa</Text>
//         </View>

//         <Icon name="home" size={26} color={ORANGE} />
//       </View>

// {/* PROGRESS BAR */}
// <View style={styles.progressContainer}>
//   {/* Dates */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Dates</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Photo */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Photo</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Passport */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={styles.stepLabel}>Passport</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Detail (current) */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={[styles.stepLabel, { color: ORANGE }]}>Detail</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Checkout */}
//   <View style={styles.stepItem}>
//     <Icon name="radio-button-unchecked" size={22} color="#777" />
//     <Text style={styles.stepLabel}>Checkout</Text>
//   </View>
// </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>Review your information</Text>

//         {/* DOCUMENTS SECTION */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Documents Submitted</Text>

//           {/* MAIN TRAVELLER DOCS */}
//           <View style={{ marginTop: 12 }}>
//             <Text style={styles.travellerTitle}>Main Traveller</Text>

//             {/* Photo */}
//             <View style={styles.docRow}>
//               <View style={styles.docHeader}>
//                 <View style={styles.docHeaderLeft}>
//                   <Icon name="check-circle" size={18} color="#09B66E" />
//                   <Text style={styles.docLabel}>Photo</Text>
//                 </View>
//                 <TouchableOpacity onPress={handleEditPhoto}>
//                   <Icon name="edit" size={18} color={ORANGE} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.thumbBox}>
//                 {mainPhotoToShow ? (
//                   <Image
//                     source={{ uri: mainPhotoToShow }}
//                     style={styles.docImage}
//                   />
//                 ) : (
//                   <Text style={styles.docPlaceholder}>No Photo</Text>
//                 )}
//               </View>
//             </View>

//             {/* Passport Front */}
//             <View style={styles.docRow}>
//               <View style={styles.docHeader}>
//                 <View style={styles.docHeaderLeft}>
//                   <Icon name="check-circle" size={18} color="#09B66E" />
//                   <Text style={styles.docLabel}>Passport Front</Text>
//                 </View>
//                 <TouchableOpacity onPress={handleEditPassport}>
//                   <Icon name="edit" size={18} color={ORANGE} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.thumbBox}>
//                 {passportState?.frontImageURL ? (
//                   <Image
//                     source={{ uri: passportState.frontImageURL }}
//                     style={styles.docImage}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Text style={styles.docPlaceholder}>No Image</Text>
//                 )}
//               </View>
//             </View>

//             {/* Passport Back */}
//             <View style={styles.docRow}>
//               <View style={styles.docHeader}>
//                 <View style={styles.docHeaderLeft}>
//                   <Icon name="check-circle" size={18} color="#09B66E" />
//                   <Text style={styles.docLabel}>Passport Back</Text>
//                 </View>
//                 <TouchableOpacity onPress={handleEditPassport}>
//                   <Icon name="edit" size={18} color={ORANGE} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.thumbBox}>
//                 {passportState?.backImageURL ? (
//                   <Image
//                     source={{ uri: passportState.backImageURL }}
//                     style={styles.docImage}
//                     resizeMode="cover"
//                   />
//                 ) : (
//                   <Text style={styles.docPlaceholder}>No Image</Text>
//                 )}
//               </View>
//             </View>
//           </View>

//           {/* CO-TRAVELLER DOCS */}
//           {coTravellers.map((ct, index) => (
//             <View key={index} style={{ marginTop: 20 }}>
//               <Text style={styles.travellerTitle}>
//                 {ct.firstName} {ct.lastName || ""} (Co-traveller)
//               </Text>

//               {/* Photo */}
//               <View style={styles.docRow}>
//                 <View style={styles.docHeader}>
//                   <View style={styles.docHeaderLeft}>
//                     <Icon name="check-circle" size={18} color="#09B66E" />
//                     <Text style={styles.docLabel}>Photo</Text>
//                   </View>
//                   {/* if you later want edit per co-traveller photo, add button here */}
//                 </View>
//                 <View style={styles.thumbBox}>
//                   {ct.photoUrl ? (
//                     <Image
//                       source={{ uri: ct.photoUrl }}
//                       style={styles.docImage}
//                     />
//                   ) : (
//                     <Text style={styles.docPlaceholder}>No Photo</Text>
//                   )}
//                 </View>
//               </View>

//               {/* Passport Front */}
//               <View style={styles.docRow}>
//                 <View style={styles.docHeader}>
//                   <View style={styles.docHeaderLeft}>
//                     <Icon name="check-circle" size={18} color="#09B66E" />
//                     <Text style={styles.docLabel}>Passport Front</Text>
//                   </View>
//                 </View>
//                 <View style={styles.thumbBox}>
//                   {ct.frontImageURL ? (
//                     <Image
//                       source={{ uri: ct.frontImageURL }}
//                       style={styles.docImage}
//                     />
//                   ) : (
//                     <Text style={styles.docPlaceholder}>No Image</Text>
//                   )}
//                 </View>
//               </View>

//               {/* Passport Back */}
//               <View style={styles.docRow}>
//                 <View style={styles.docHeader}>
//                   <View style={styles.docHeaderLeft}>
//                     <Icon name="check-circle" size={18} color="#09B66E" />
//                     <Text style={styles.docLabel}>Passport Back</Text>
//                   </View>
//                 </View>
//                 <View style={styles.thumbBox}>
//                   {ct.backImageURL ? (
//                     <Image
//                       source={{ uri: ct.backImageURL }}
//                       style={styles.docImage}
//                     />
//                   ) : (
//                     <Text style={styles.docPlaceholder}>No Image</Text>
//                   )}
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* TRAVELLERS LIST */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Travellers</Text>

//             <TouchableOpacity onPress={handleAddCoTraveller}>
//               <Text style={styles.addBtn}>+ Add Co-Passenger</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Main Traveller */}
//           <View style={styles.travellerRow}>
//             <Icon name="person" size={24} color={ORANGE} />
//             <Text style={styles.travellerName}>
//               {firstName} {lastName} (You)
//             </Text>
//           </View>

//           {/* Co Travellers */}
//           {coTravellers.map((p, i) => (
//             <View key={i} style={styles.travellerRow}>
//               <Icon name="person" size={24} color="#555" />
//               <Text style={styles.travellerName}>
//                 {p.firstName} {p.lastName}
//               </Text>

//               <TouchableOpacity onPress={() => removeCoTraveller(i)}>
//                 <Icon name="delete" size={22} color="red" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </View>

//         {/* PERSONAL INFO */}
//         <View style={[styles.sectionCard, { marginTop: 16 }]}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

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

//         {/* Confirm */}
//         <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//           <Text style={styles.confirmText}>Continue</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// // === Styles ===
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
//   sectionCard: {
//     backgroundColor: "#F6F6F8",
//     borderRadius: 16,
//     padding: 16,
//   },
//   sectionTitle: { fontWeight: "700", fontSize: 16 },
//   travellerTitle: {
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 4,
//     marginTop: 4,
//   },
//   travellerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
//   travellerName: { marginLeft: 10, fontSize: 15, fontWeight: "600", flex: 1 },
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

//   // docs
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
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   docImage: { width: "100%", height: "100%" },
//   docPlaceholder: {
//     fontSize: 11,
//     color: "#777",
//     textAlign: "center",
//     paddingHorizontal: 4,
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

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


// *** REPLACE your entire file with this ***
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
import { savePassportData } from "../../api/user/passportService";

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
    };

    await savePassportData(payload);

    navigation.navigate("CheckoutScreen", {
      passport: payload,
      travel,
      photoUrlState,
      coTravellers,
    });
  };

  return (
    <View style={styles.container}>
      {/* NAV */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="black" />
        </TouchableOpacity>

        <View style={styles.stepBadge}>
          <Icon name="check-circle" size={16} color="#fff" />
          <Text style={styles.stepBadgeText}>Review Visa</Text>
        </View>

        <Icon name="home" size={26} color={ORANGE} />
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
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepBadge: {
    backgroundColor: ORANGE,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  stepBadgeText: { color: "#fff", marginLeft: 6 },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  stepItem: { alignItems: "center" },
  stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
  line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 15,
    textAlign: "center",
  },
  sectionCard: { backgroundColor: "#F6F6F8", borderRadius: 16, padding: 16 },
  sectionTitle: { fontWeight: "700", fontSize: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  travellerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  travellerName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  addBtn: { color: ORANGE, fontWeight: "600" },
  inputLabel: { marginTop: 10, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  docRow: { marginTop: 10 },
  docHeader: { flexDirection: "row", justifyContent: "space-between" },
  docHeaderLeft: { flexDirection: "row", alignItems: "center" },
  docLabel: { marginLeft: 6, fontWeight: "600" },
  thumbBox: {
    backgroundColor: "#eee",
    width: 80,
    height: 80,
    marginTop: 8,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  docImage: { width: "100%", height: "100%" },
  docPlaceholder: { fontSize: 12, color: "#555", textAlign: "center" },
  confirmButton: {
    backgroundColor: ORANGE,
    padding: 14,
    marginTop: 24,
    borderRadius: 12,
  },
  confirmText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});

