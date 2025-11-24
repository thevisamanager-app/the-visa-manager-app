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


import React, { useState } from "react";
import {
  Alert,
  TextInput,
  Text,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { savePassportData } from "../../api/user/passportService";

// ---------------- FORMAT MRZ DATE → DD/MM/YYYY ----------------
function formatMRZDate(mrz) {
  if (!mrz || mrz.length !== 6) return mrz;

  const yy = mrz.substring(0, 2);
  const mm = mrz.substring(2, 4);
  const dd = mrz.substring(4, 6);

  const fullYear = parseInt(yy) > 25 ? `19${yy}` : `20${yy}`;

  return `${dd}/${mm}/${fullYear}`;
}

export default function PassportDetailsScreen({ route, navigation }) {
  const visaPreferences = route?.params?.visa || null;
  console.log("DETAILS=>",visaPreferences)
  const {
    frontData,
    backData,
    frontImageUri,
    backImageUri,
    frontBase64,
    backBase64,
    photoUri,
  } = route.params;

  // ---------- INITIAL FORM WITH FORMATTED DATES ----------
  const [form, setForm] = useState({
    ...frontData,
    ...backData,
    birthDate: frontData?.birthDate
      ? formatMRZDate(frontData.birthDate)
      : "",
    expiryDate: frontData?.expiryDate
      ? formatMRZDate(frontData.expiryDate)
      : "",
  });

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // ----------- VALIDATION ----------
  const validate = () => {
    if (!form.firstName || !form.lastName || !form.passportNumber) {
      Alert.alert("Missing Fields", "Fill first name, last name & passport number.");
      return false;
    }

    // Validate correct DD/MM/YYYY
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (form.birthDate && !dateRegex.test(form.birthDate)) {
      Alert.alert("Invalid Date", "Birth Date must be DD/MM/YYYY");
      return false;
    }

    if (form.expiryDate && !dateRegex.test(form.expiryDate)) {
      Alert.alert("Invalid Date", "Expiry Date must be DD/MM/YYYY");
      return false;
    }

    return true;
  };

  // ------------- SAVE DATA -------------
  // const save = async () => {
  //   if (!validate()) return;

  //   const formattedToSave = {
  //     ...form,
  //     birthDate: form.birthDate,
  //     expiryDate: form.expiryDate,
  //   };

  //   try {
  //     await savePassportData(formattedToSave, frontBase64, backBase64);

  //     Alert.alert("Success", "Passport saved successfully!");
  //     navigation.navigate("QuestionScreen");

  //   } catch (err) {
  //     console.log("SAVE ERROR:", err);
  //     Alert.alert("Error", "Could not save passport.");
  //   }
  // };

  const save = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
      birthDate: form.birthDate,
      expiryDate: form.expiryDate,
      frontBase64,
      backBase64,
      visa: visaPreferences
    };

    try {
      await savePassportData(payload);

      Alert.alert("Success", "Passport saved successfully!");
      navigation.navigate("QuestionScreen",{payload});

    } catch (err) {
      console.log("SAVE ERROR:", err);
      Alert.alert("Error", "Could not save passport.");
    }
  };


  return (
    <ScrollView style={{ padding: 20 }}>

      {/* SHOW PASSPORT IMAGES */}
      <ScrollView horizontal style={{ marginBottom: 20 }}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 200, height: 200, marginRight: 10 }}
          />
        )}
        {frontImageUri && (
          <Image
            source={{ uri: frontImageUri }}
            style={{ width: 200, height: 200, marginRight: 10 }}
          />
        )}
        {backImageUri && (
          <Image
            source={{ uri: backImageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </ScrollView>

      {/* FORM FIELDS */}
      <Text>First Name *</Text>
      <TextInput
        value={form.firstName}
        onChangeText={(v) => updateField("firstName", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Last Name *</Text>
      <TextInput
        value={form.lastName}
        onChangeText={(v) => updateField("lastName", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Passport Number *</Text>
      <TextInput
        value={form.passportNumber}
        onChangeText={(v) => updateField("passportNumber", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Date of Birth (DD/MM/YYYY)</Text>
      <TextInput
        value={form.birthDate}
        onChangeText={(v) => updateField("birthDate", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Expiry Date (DD/MM/YYYY)</Text>
      <TextInput
        value={form.expiryDate}
        onChangeText={(v) => updateField("expiryDate", v)}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Save Passport Data" onPress={save} />
    </ScrollView>
  );
}
