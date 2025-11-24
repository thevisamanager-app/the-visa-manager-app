// // src/screens/questions/QuestionScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, ScrollView } from 'react-native';
// import { saveAnswers } from '../../api/user/answerService';


// const QUESTIONS = [
//   'What is your travel purpose?',
//   'Which country are you visiting?',
//   'How long will you stay?',
//   'Do you have previous travel history?',
// ];

// export default function QuestionScreen({ navigation }) {
//   const [answers, setAnswers] = useState({});

//   const update = (q, v) => setAnswers(prev => ({ ...prev, [q]: v }));

//   const submit = async () => {
//     await saveAnswers(answers);
//     navigation.navigate('ReviewAnswersScreen', { answers });
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {QUESTIONS.map(q => (
//         <View key={q} style={{ marginBottom: 16 }}>
//           <Text style={{ fontWeight: '600', marginBottom: 4 ,color:"black"}}>{q}</Text>
//           <TextInput
//             style={{ borderWidth: 1, borderRadius: 8, padding: 8,color:"black" }}
//             multiline
//             onChangeText={v => update(q, v)}
//           />
//         </View>
//       ))}
//       <Button title="Submit Answers" onPress={submit} />
//     </ScrollView>
//   );
// }


// src/screens/questions/QuestionScreen.js
// src/screens/questions/QuestionScreen.js

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Linking,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// // import * as DocumentPicker from "expo-document-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

// import { saveAnswers } from "../../api/user/answerService";
// import { getPassportData } from "../../api/user/passportService";
// import { uploadTicketFile, savePreviewDetails } from "../../api/user/previewDetailsService";

// const QUESTIONS = [
//   "What is your travel purpose?",
//   "Which country are you visiting?",
//   "How long will you stay?",
//   "Do you have previous travel history?",
// ];

// // Format to DD/MM/YYYY
// const formatDate = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return `${String(d.getDate()).padStart(2, "0")}/${String(
//     d.getMonth() + 1
//   ).padStart(2, "0")}/${d.getFullYear()}`;
// };

// export default function QuestionScreen({ navigation }) {
//   const [answers, setAnswers] = useState({});

//   // Travel fields
//   const [countriesData, setCountriesData] = useState([]);
//   const [fromCountry, setFromCountry] = useState("");
//   const [fromCities, setFromCities] = useState([]);
//   const [fromCity, setFromCity] = useState("");

//   const [toCountry, setToCountry] = useState("");
//   const [toCities, setToCities] = useState([]);
//   const [toCity, setToCity] = useState("");

//   // Dates
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [returnDate, setReturnDate] = useState(new Date());
//   const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//   const [showReturnPicker, setShowReturnPicker] = useState(false);

//   // Hotel
//   const [hotelName, setHotelName] = useState("");
//   const [hotelAddress, setHotelAddress] = useState("");
//   const [hotelDetails, setHotelDetails] = useState("");

//   // Ticket
//   const [ticketName, setTicketName] = useState("");
//   const [ticketUrl, setTicketUrl] = useState(null);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("https://countriesnow.space/api/v0.1/countries");
//         const json = await res.json();
//         setCountriesData(json.data || []);
//       } catch (e) {
//         console.log("Countries API Error:", e);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Update cities on country change
//   const handleFromCountryChange = (value) => {
//     setFromCountry(value);
//     const c = countriesData.find((i) => i.name === value || i.country === value);
//     setFromCities(c?.cities || []);
//     setFromCity("");
//   };

//   const handleToCountryChange = (value) => {
//     setToCountry(value);
//     const c = countriesData.find((i) => i.name === value || i.country === value);
//     setToCities(c?.cities || []);
//     setToCity("");
//   };

//   // 📌 Replaced react-native-document-picker → expo-document-picker
//   const pickTicket = async () => {
//     try {
//     //   const result = await DocumentPicker.getDocumentAsync({
//     //     type: ["application/pdf", "image/*"],
//     //   });

//       if (result.canceled) return;

//       const file = result.assets[0];
//       setTicketName(file.name);

//       const uploadedUrl = await uploadTicketFile(file);
//       setTicketUrl(uploadedUrl);

//       Alert.alert("Success", "Ticket uploaded successfully!");
//     } catch (err) {
//       console.log("Ticket Upload Error:", err);
//       Alert.alert("Error", "Could not upload ticket.");
//     }
//   };

//   const updateAnswer = (q, v) => {
//     setAnswers((prev) => ({ ...prev, [q]: v }));
//   };

//   const validate = () => {
//     if (!fromCountry || !fromCity || !toCountry || !toCity) {
//       Alert.alert("Missing Travel Info", "Please fill travel from/to details.");
//       return false;
//     }
//     if (!hotelName || !hotelAddress) {
//       Alert.alert("Missing Hotel Info", "Please fill hotel name & address.");
//       return false;
//     }
//     return true;
//   };

//   const submit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);

//       await saveAnswers(answers);

//       const passport = await getPassportData();

//       const previewPayload = {
//         questions: answers,
//         travel: {
//           fromCountry,
//           fromCity,
//           toCountry,
//           toCity,
//           departureDate: formatDate(departureDate),
//           returnDate: formatDate(returnDate),
//         },
//         hotel: {
//           hotelName,
//           hotelAddress,
//           hotelDetails,
//         },
//         ticket: {
//           name: ticketName,
//           url: ticketUrl,
//         },
//         passport: passport || null,
//       };

//       await savePreviewDetails(previewPayload);

//       setLoading(false);

//       navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
//     } catch (e) {
//       console.log("Submit Error:", e);
//       Alert.alert("Error", "Could not submit details.");
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {/* ---------------- TRAVEL DETAILS SECTION ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
//         Travel Details
//       </Text>

//       {/* FROM Country */}
//       <Text style={{ fontWeight: "600" }}>Travelling FROM Country</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={fromCountry} onValueChange={handleFromCountryChange}>
//           <Picker.Item label="Select Country" value="" color="#000" />
//           {countriesData.map((c) => (
//             <Picker.Item key={c.name} label={c.name} value={c.name} />
//           ))}
//         </Picker>
//       </View>

//       {/* FROM City */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={fromCity}  onValueChange={setFromCity}>
//           <Picker.Item label="Select City" color="#000"  value="" />
//           {fromCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* TO Country */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Travelling TO Country</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={toCountry}   onValueChange={handleToCountryChange}>
//           <Picker.Item label="Select Country" color="#000" value="" />
//           {countriesData.map((c) => (
//             <Picker.Item key={c.name} label={c.name} value={c.name} />
//           ))}
//         </Picker>
//       </View>

//       {/* TO City */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={toCity} color="#000" onValueChange={setToCity}>
//           <Picker.Item label="Select City" value=""  color="#000"/>
//           {toCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* Departure Date */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Departure Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowDeparturePicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(departureDate)}</Text>
//       </TouchableOpacity>
//       {showDeparturePicker && (
//         <DateTimePicker
//           mode="date"
//           value={departureDate}
//           onChange={(e, d) => {
//             setShowDeparturePicker(false);
//             if (d) setDepartureDate(d);
//           }}
//         />
//       )}

//       {/* Return Date */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Return Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowReturnPicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(returnDate)}</Text>
//       </TouchableOpacity>
//       {showReturnPicker && (
//         <DateTimePicker
//           mode="date"
//           value={returnDate}
//           onChange={(e, d) => {
//             setShowReturnPicker(false);
//             if (d) setReturnDate(d);
//           }}
//         />
//       )}

//       {/* ---------------- HOTEL SECTION ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Hotel Voucher
//       </Text>

//       <Text style={{ fontWeight: "600" }}>Hotel Name</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelName}
//         onChangeText={setHotelName}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Address</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelAddress}
//         onChangeText={setHotelAddress}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Account Details</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         multiline
//         value={hotelDetails}
//         onChangeText={setHotelDetails}
//       />

//       {/* ---------------- TICKET UPLOAD ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Upload Ticket
//       </Text>

//       <TouchableOpacity
//         onPress={pickTicket}
//         style={{
//           marginTop: 10,
//           padding: 12,
//           backgroundColor: "#ff9800",
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
//           Choose Ticket (PDF / Image)
//         </Text>
//       </TouchableOpacity>

//       {ticketName ? (
//         <TouchableOpacity
//           onPress={() => ticketUrl && Linking.openURL(ticketUrl)}
//           style={{ marginTop: 10 }}
//         >
//           <Text style={{ color: "#007bff" }}>
//             Selected: {ticketName} {ticketUrl ? "(Open)" : "(Uploading...)"} 
//           </Text>
//         </TouchableOpacity>
//       ) : null}

//       {/* ---------------- EXTRA QUESTIONS ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Additional Questions
//       </Text>

//       {QUESTIONS.map((q) => (
//         <View key={q} style={{ marginTop: 12 }}>
//           <Text style={{ fontWeight: "600" }}>{q}</Text>
//           <TextInput
//             style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//             multiline
//             onChangeText={(v) => updateAnswer(q, v)}
//           />
//         </View>
//       ))}

//       {/* Submit */}
//       <View style={{ marginTop: 30, marginBottom: 40 }}>
//         <Button title={loading ? "Saving..." : "Submit All Details"} onPress={submit} />
//       </View>
//     </ScrollView>
//   );
// }



// src/screens/questions/QuestionScreen.js

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Linking,
// } from "react-native";

// import { Picker } from "@react-native-picker/picker";
// import * as DocumentPicker from "expo-document-picker";
// import DateTimePicker from "@react-native-community/datetimepicker";

// import { saveAnswers } from "../../api/user/answerService";
// import { getPassportData } from "../../api/user/passportService";
// import { uploadTicketFile, savePreviewDetails } from "../../api/user/previewDetailsService";

// const QUESTIONS = [
//   "What is your travel purpose?",
//   "Which country are you visiting?",
//   "How long will you stay?",
//   "Do you have previous travel history?",
// ];

// // Format to DD/MM/YYYY
// const formatDate = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return `${String(d.getDate()).padStart(2, "0")}/${String(
//     d.getMonth() + 1
//   ).padStart(2, "0")}/${d.getFullYear()}`;
// };

// export default function QuestionScreen({ navigation }) {
//   const [answers, setAnswers] = useState({});

//   // Travel fields
//   const [countriesData, setCountriesData] = useState([]);
//   const [fromCountry, setFromCountry] = useState("");
//   const [fromCities, setFromCities] = useState([]);
//   const [fromCity, setFromCity] = useState("");

//   const [toCountry, setToCountry] = useState("");
//   const [toCities, setToCities] = useState([]);
//   const [toCity, setToCity] = useState("");

//   // Dates
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [returnDate, setReturnDate] = useState(new Date());
//   const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//   const [showReturnPicker, setShowReturnPicker] = useState(false);

//   // Hotel
//   const [hotelName, setHotelName] = useState("");
//   const [hotelAddress, setHotelAddress] = useState("");
//   const [hotelDetails, setHotelDetails] = useState("");

//   // Ticket
//   const [ticketName, setTicketName] = useState("");
//   const [ticketUrl, setTicketUrl] = useState(null);

//   const [loading, setLoading] = useState(false);

//   // Fetch countries & cities
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("https://countriesnow.space/api/v0.1/countries");
//         const json = await res.json();
//         setCountriesData(json.data || []);
//       } catch (e) {
//         console.log("Countries API Error:", e);
//       }
//     };
//     fetchCountries();
//   }, []);

//   const handleFromCountryChange = (value) => {
//     setFromCountry(value);
//     const c = countriesData.find((i) => i.name === value || i.country === value);
//     setFromCities(c?.cities || []);
//     setFromCity("");
//   };

//   const handleToCountryChange = (value) => {
//     setToCountry(value);
//     const c = countriesData.find((i) => i.name === value || i.country === value);
//     setToCities(c?.cities || []);
//     setToCity("");
//   };

//   // 📌 TICKET PICKER — NOW USING expo-document-picker ONLY
//   const pickTicket = async () => {
//     try {
//       const result = await DocumentPicker.getDocumentAsync({
//         type: ["application/pdf", "image/*"],
//         copyToCacheDirectory: true,
//       });

//       if (result.canceled) return;

//       const file = result.assets[0];
//       setTicketName(file.name);

//       const url = await uploadTicketFile(file);
//       setTicketUrl(url);

//       Alert.alert("Success", "Ticket uploaded successfully!");
//     } catch (err) {
//       console.log("Ticket Upload Error:", err);
//       Alert.alert("Error", "Could not upload ticket.");
//     }
//   };

//   const updateAnswer = (q, v) => {
//     setAnswers((prev) => ({ ...prev, [q]: v }));
//   };

//   const validate = () => {
//     if (!fromCountry || !fromCity || !toCountry || !toCity) {
//       Alert.alert("Missing Travel Info", "Fill travel from/to details.");
//       return false;
//     }
//     if (!hotelName || !hotelAddress) {
//       Alert.alert("Missing Hotel Info", "Hotel name & address are required.");
//       return false;
//     }
//     return true;
//   };

//   const submit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);

//       await saveAnswers(answers);

//       const passport = await getPassportData();

//       const previewPayload = {
//         questions: answers,
//         travel: {
//           fromCountry,
//           fromCity,
//           toCountry,
//           toCity,
//           departureDate: formatDate(departureDate),
//           returnDate: formatDate(returnDate),
//         },
//         hotel: {
//           hotelName,
//           hotelAddress,
//           hotelDetails,
//         },
//         ticket: {
//           name: ticketName,
//           url: ticketUrl,
//         },
//         passport: passport || null,
//       };

//       await savePreviewDetails(previewPayload);

//       setLoading(false);
//       navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
//     } catch (e) {
//       console.log("Submit Error:", e);
//       Alert.alert("Error", "Could not submit details.");
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {/* ---------------- TRAVEL DETAILS ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
//         Travel Details
//       </Text>

//       {/* FROM COUNTRY */}
//       <Text style={{ fontWeight: "600" }}>Travelling FROM Country</Text>
//       <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "#ccc" }}>
//         <Picker selectedValue={fromCountry} onValueChange={handleFromCountryChange}>
//           <Picker.Item label="Select Country" value="" />
//           {countriesData.map((c) => (
//             <Picker.Item key={c.name} label={c.name} value={c.name} />
//           ))}
//         </Picker>
//       </View>

//       {/* FROM CITY */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "#ccc" }}>
//         <Picker selectedValue={fromCity} onValueChange={setFromCity}>
//           <Picker.Item label="Select City" value="" />
//           {fromCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* TO COUNTRY */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Travelling TO Country</Text>
//       <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "#ccc" }}>
//         <Picker selectedValue={toCountry} onValueChange={handleToCountryChange}>
//           <Picker.Item label="Select Country" value="" />
//           {countriesData.map((c) => (
//             <Picker.Item key={c.name} label={c.name} value={c.name} />
//           ))}
//         </Picker>
//       </View>

//       {/* TO CITY */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderRadius: 8, borderColor: "#ccc" }}>
//         <Picker selectedValue={toCity} onValueChange={setToCity}>
//           <Picker.Item label="Select City" value="" />
//           {toCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* DEPARTURE DATE */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Departure Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowDeparturePicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(departureDate)}</Text>
//       </TouchableOpacity>
//       {showDeparturePicker && (
//         <DateTimePicker
//           mode="date"
//           value={departureDate}
//           onChange={(e, d) => {
//             setShowDeparturePicker(false);
//             if (d) setDepartureDate(d);
//           }}
//         />
//       )}

//       {/* RETURN DATE */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Return Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowReturnPicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(returnDate)}</Text>
//       </TouchableOpacity>
//       {showReturnPicker && (
//         <DateTimePicker
//           mode="date"
//           value={returnDate}
//           onChange={(e, d) => {
//             setShowReturnPicker(false);
//             if (d) setReturnDate(d);
//           }}
//         />
//       )}

//       {/* ---------------- HOTEL ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Hotel Voucher
//       </Text>

//       <Text style={{ fontWeight: "600" }}>Hotel Name</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelName}
//         onChangeText={setHotelName}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Address</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelAddress}
//         onChangeText={setHotelAddress}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Details</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         multiline
//         value={hotelDetails}
//         onChangeText={setHotelDetails}
//       />

//       {/* ---------------- TICKET UPLOAD ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Upload Ticket
//       </Text>

//       <TouchableOpacity
//         onPress={pickTicket}
//         style={{
//           marginTop: 10,
//           padding: 12,
//           backgroundColor: "#ff9800",
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
//           Choose Ticket (PDF / Image)
//         </Text>
//       </TouchableOpacity>

//       {ticketName ? (
//         <TouchableOpacity
//           onPress={() => ticketUrl && Linking.openURL(ticketUrl)}
//           style={{ marginTop: 10 }}
//         >
//           <Text style={{ color: "#007bff" }}>
//             Selected: {ticketName} {ticketUrl ? "(Open)" : "(Uploading...)"}
//           </Text>
//         </TouchableOpacity>
//       ) : null}

//       {/* ---------------- QUESTIONS ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Additional Questions
//       </Text>

//       {QUESTIONS.map((q) => (
//         <View key={q} style={{ marginTop: 12 }}>
//           <Text style={{ fontWeight: "600" }}>{q}</Text>
//           <TextInput
//             style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//             multiline
//             onChangeText={(v) => updateAnswer(q, v)}
//           />
//         </View>
//       ))}

//       {/* SUBMIT */}
//       <View style={{ marginTop: 30, marginBottom: 40 }}>
//         <Button title={loading ? "Saving..." : "Submit All Details"} onPress={submit} />
//       </View>
//     </ScrollView>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Linking,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { launchImageLibrary } from "react-native-image-picker";

// import { saveAnswers } from "../../api/user/answerService";
// import { getPassportData } from "../../api/user/passportService";
// import { uploadTicketFile, savePreviewDetails } from "../../api/user/previewDetailsService";

// const QUESTIONS = [
//   "What is your travel purpose?",
//   "Which country are you visiting?",
//   "How long will you stay?",
//   "Do you have previous travel history?",
// ];

// // Format to DD/MM/YYYY
// const formatDate = (date) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return `${String(d.getDate()).padStart(2, "0")}/${String(
//     d.getMonth() + 1
//   ).padStart(2, "0")}/${d.getFullYear()}`;
// };

// export default function QuestionScreen({ navigation }) {
//   const [answers, setAnswers] = useState({});

//   // Travel fields
//   const [countriesData, setCountriesData] = useState([]);
//   const [fromCountry, setFromCountry] = useState("");
//   const [fromCities, setFromCities] = useState([]);
//   const [fromCity, setFromCity] = useState("");

//   const [toCountry, setToCountry] = useState("");
//   const [toCities, setToCities] = useState([]);
//   const [toCity, setToCity] = useState("");

//   // Dates
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [returnDate, setReturnDate] = useState(new Date());
//   const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//   const [showReturnPicker, setShowReturnPicker] = useState(false);

//   // Hotel
//   const [hotelName, setHotelName] = useState("");
//   const [hotelAddress, setHotelAddress] = useState("");
//   const [hotelDetails, setHotelDetails] = useState("");

//   // Ticket (Image)
//   const [ticketName, setTicketName] = useState("");
//   const [ticketUrl, setTicketUrl] = useState(null);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const res = await fetch("https://countriesnow.space/api/v0.1/countries");
//         const json = await res.json();
//         setCountriesData(json.data || []);
//       } catch (e) {
//         console.log("Countries API Error:", e);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Update FROM cities
//   const handleFromCountryChange = (value) => {
//     setFromCountry(value);
//     const c = countriesData.find(
//       (i) => i.name === value || i.country === value
//     );
//     setFromCities(c?.cities || []);
//     setFromCity("");
//   };

//   // Update TO cities
//   const handleToCountryChange = (value) => {
//     setToCountry(value);
//     const c = countriesData.find(
//       (i) => i.name === value || i.country === value
//     );
//     setToCities(c?.cities || []);
//     setToCity("");
//   };

//   // ✔ Image Picker (instead of document picker)
//   const pickTicket = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: "photo",
//         quality: 0.8,
//       });

//       if (result.didCancel) return;

//       const file = result.assets[0];

//       setTicketName(file.fileName || "ticket.jpg");

//       const uploadObj = {
//         uri: file.uri,
//         name: file.fileName || "ticket.jpg",
//         type: file.type || "image/jpeg",
//       };

//       const uploadedUrl = await uploadTicketFile(uploadObj);
//       setTicketUrl(uploadedUrl);

//       Alert.alert("Success", "Ticket image uploaded!");
//     } catch (err) {
//       console.log("Image Upload Error:", err);
//       Alert.alert("Error", "Unable to upload image.");
//     }
//   };

//   const updateAnswer = (q, v) => {
//     setAnswers((prev) => ({ ...prev, [q]: v }));
//   };

//   const validate = () => {
//     if (!fromCountry || !fromCity || !toCountry || !toCity) {
//       Alert.alert("Missing Travel Info", "Please fill travel from/to details.");
//       return false;
//     }
//     if (!hotelName || !hotelAddress) {
//       Alert.alert("Missing Hotel Info", "Please fill hotel name & address.");
//       return false;
//     }
//     return true;
//   };

//   const submit = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);
//       await saveAnswers(answers);

//       const passport = await getPassportData();

//       const previewPayload = {
//         questions: answers,
//         travel: {
//           fromCountry,
//           fromCity,
//           toCountry,
//           toCity,
//           departureDate: formatDate(departureDate),
//           returnDate: formatDate(returnDate),
//         },
//         hotel: {
//           hotelName,
//           hotelAddress,
//           hotelDetails,
//         },
//         ticket: {
//           name: ticketName,
//           url: ticketUrl,
//         },
//         passport: passport || null,
//       };

//       await savePreviewDetails(previewPayload);
//       setLoading(false);

//       navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
//     } catch (e) {
//       console.log("Submit Error:", e);
//       Alert.alert("Error", "Could not submit details.");
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {/* ---------------- TRAVEL DETAILS ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
//         Travel Details
//       </Text>

//       {/* FROM Country */}
//       <Text style={{ fontWeight: "600" }}>Travelling FROM Country</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={fromCountry} onValueChange={handleFromCountryChange}>
//           <Picker.Item label="Select Country" value="" color="#000" />
//           {countriesData.map((c) => {
//             const name = c.name || c.country;
//             return (
//               <Picker.Item key={name} label={name} value={name} />
//             );
//           })}
//         </Picker>
//       </View>

//       {/* FROM City */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={fromCity} onValueChange={setFromCity}>
//           <Picker.Item label="Select City" value="" color="#000" />
//           {fromCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* TO Country */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Travelling TO Country</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={toCountry} onValueChange={handleToCountryChange}>
//           <Picker.Item label="Select Country" value="" color="#000" />
//           {countriesData.map((c) => {
//             const name = c.name || c.country;
//             return (
//               <Picker.Item key={name} label={name} value={name} />
//             );
//           })}
//         </Picker>
//       </View>

//       {/* TO City */}
//       <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//       <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
//         <Picker selectedValue={toCity} onValueChange={setToCity}>
//           <Picker.Item label="Select City" value="" color="#000" />
//           {toCities.map((city) => (
//             <Picker.Item key={city} label={city} value={city} />
//           ))}
//         </Picker>
//       </View>

//       {/* Dates */}
//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Departure Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowDeparturePicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(departureDate)}</Text>
//       </TouchableOpacity>
//       {showDeparturePicker && (
//         <DateTimePicker
//           mode="date"
//           value={departureDate}
//           onChange={(e, d) => {
//             setShowDeparturePicker(false);
//             if (d) setDepartureDate(d);
//           }}
//         />
//       )}

//       <Text style={{ fontWeight: "600", marginTop: 20 }}>Return Date</Text>
//       <TouchableOpacity
//         onPress={() => setShowReturnPicker(true)}
//         style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//       >
//         <Text>{formatDate(returnDate)}</Text>
//       </TouchableOpacity>
//       {showReturnPicker && (
//         <DateTimePicker
//           mode="date"
//           value={returnDate}
//           onChange={(e, d) => {
//             setShowReturnPicker(false);
//             if (d) setReturnDate(d);
//           }}
//         />
//       )}

//       {/* ---------------- HOTEL ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Hotel Voucher
//       </Text>

//       <Text style={{ fontWeight: "600" }}>Hotel Name</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelName}
//         onChangeText={setHotelName}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Address</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         value={hotelAddress}
//         onChangeText={setHotelAddress}
//       />

//       <Text style={{ fontWeight: "600", marginTop: 10 }}>Account Details</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//         multiline
//         value={hotelDetails}
//         onChangeText={setHotelDetails}
//       />

//       {/* ---------------- TICKET UPLOAD ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Upload Ticket
//       </Text>

//       <TouchableOpacity
//         onPress={pickTicket}
//         style={{
//           marginTop: 10,
//           padding: 12,
//           backgroundColor: "#ff9800",
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
//           Choose Ticket Image
//         </Text>
//       </TouchableOpacity>

//       {ticketName ? (
//         <TouchableOpacity
//           onPress={() => ticketUrl && Linking.openURL(ticketUrl)}
//           style={{ marginTop: 10 }}
//         >
//           <Text style={{ color: "#007bff" }}>
//             Selected: {ticketName} {ticketUrl ? "(Open)" : "(Uploading...)"}
//           </Text>
//         </TouchableOpacity>
//       ) : null}

//       {/* ---------------- EXTRA QUESTIONS ---------------- */}
//       <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//         Additional Questions
//       </Text>

//       {QUESTIONS.map((q) => (
//         <View key={q} style={{ marginTop: 12 }}>
//           <Text style={{ fontWeight: "600" }}>{q}</Text>
//           <TextInput
//             style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//             multiline
//             onChangeText={(v) => updateAnswer(q, v)}
//           />
//         </View>
//       ))}

//       {/* Submit */}
//       <View style={{ marginTop: 30, marginBottom: 40 }}>
//         <Button title={loading ? "Saving..." : "Submit All Details"} onPress={submit} />
//       </View>
//     </ScrollView>
//   );
// }
// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     ScrollView,
//     TouchableOpacity,
//     Alert,
//     Linking,
//     StyleSheet,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { launchImageLibrary } from "react-native-image-picker";

// import { saveAnswers } from "../../api/user/answerService";
// import { getPassportData } from "../../api/user/passportService";
// import {
//     uploadTicketFile,
//     savePreviewDetails,
// } from "../../api/user/previewDetailsService";

// const QUESTIONS = [
//     "What is your travel purpose?",
//     "Which country are you visiting?",
//     "How long will you stay?",
//     "Do you have previous travel history?",
// ];

// const formatDate = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}/${String(
//         d.getMonth() + 1
//     ).padStart(2, "0")}/${d.getFullYear()}`;
// };

// export default function QuestionScreen({ navigation }) {

//     // TRAVEL STATE
//     const [answers, setAnswers] = useState({});
//     const [countriesData, setCountriesData] = useState([]);
//     const [fromCountry, setFromCountry] = useState("");
//     const [fromCities, setFromCities] = useState([]);
//     const [fromCity, setFromCity] = useState("");
//     const [toCountry, setToCountry] = useState("");
//     const [toCities, setToCities] = useState([]);
//     const [toCity, setToCity] = useState("");

//     // DATES
//     const [departureDate, setDepartureDate] = useState(new Date());
//     const [returnDate, setReturnDate] = useState(new Date());
//     const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//     const [showReturnPicker, setShowReturnPicker] = useState(false);

//     // HOTEL
//     const [hotelName, setHotelName] = useState("");
//     const [hotelAddress, setHotelAddress] = useState("");
//     const [hotelDetails, setHotelDetails] = useState("");

//     // TICKET
//     const [ticketName, setTicketName] = useState("");
//     const [ticketUrl, setTicketUrl] = useState(null);
//     const [ticketUploading, setTicketUploading] = useState(false);

//     const [loading, setLoading] = useState(false);

//     // Fetch countries
//     // useEffect(() => {
//     //     const fetchCountries = async () => {
//     //         try {
//     //             const res = await fetch("https://restcountries.com/v3.1/all");
//     //             const json = await res.json();
//     //             setCountriesData(json.data || []);
//     //         } catch (e) {
//     //             console.log("Countries API Error:", e);
//     //         }
//     //     };
//     //     fetchCountries();
//     // }, []);

//     // Fetch countries
//     useEffect(() => {
//         const loadCountries = async () => {
//             const res = await fetch(
//                 "https://countriesnow.space/api/v0.1/countries/positions"
//             );
//             const json = await res.json();
//             setCountriesData(json.data);
//         };

//         loadCountries();
//     }, []);

//     // Fetch cities for selected country (iso2)
//     const loadCities = async (countryName, setter) => {
//         const res = await fetch(
//             "https://countriesnow.space/api/v0.1/countries/cities",
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ country: countryName }),
//             }
//         );

//         const json = await res.json();
//         setter(json.data || []);
//     };

//     const handleFromCountryChange = async (value) => {
//         setFromCountry(value);
//         await loadCities(value, setFromCities);
//         setFromCity("");
//     };

//     const handleToCountryChange = async (value) => {
//         setToCountry(value);
//         await loadCities(value, setToCities);
//         setToCity("");
//     };





//     // Country selection functions
//     // const handleFromCountryChange = (value) => {
//     //     setFromCountry(value);
//     //     const c = countriesData.find((i) => i.name === value || i.country === value);
//     //     setFromCities(c?.cities || []);
//     //     setFromCity("");
//     // };

//     // const handleToCountryChange = (value) => {
//     //     setToCountry(value);
//     //     const c = countriesData.find((i) => i.name === value || i.country === value);
//     //     setToCities(c?.cities || []);
//     //     setToCity("");
//     // };

//     // Upload ticket image
//     const pickTicket = async () => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: "photo",
//                 quality: 0.8,
//             });

//             if (result.didCancel) return;

//             const file = result.assets[0];

//             setTicketName(file.fileName || "ticket.jpg");

//             const uploadObj = {
//                 uri: file.uri,
//                 name: file.fileName || "ticket.jpg",
//                 type: file.type || "image/jpeg",
//             };

//             setTicketUploading(true);
//             const uploadedUrl = await uploadTicketFile(uploadObj);
//             setTicketUrl(uploadedUrl);
//             setTicketUploading(false);

//             Alert.alert("Success", "Ticket image uploaded!");
//         } catch (err) {
//             console.log("Ticket Upload ERROR:", err);
//             Alert.alert("Error", "Unable to upload image.");
//             setTicketUploading(false);
//         }
//     };

//     const updateAnswer = (q, v) => {
//         setAnswers((prev) => ({ ...prev, [q]: v }));
//     };

//     // Validate form
//     const validate = () => {
//         if (!fromCountry || !fromCity || !toCountry || !toCity) {
//             Alert.alert("Missing Travel Info", "Please fill travel from/to details.");
//             return false;
//         }
//         if (!hotelName || !hotelAddress) {
//             Alert.alert("Missing Hotel Info", "Please fill hotel details.");
//             return false;
//         }
//         if (ticketUploading) {
//             Alert.alert("Wait", "Ticket is still uploading. Please wait.");
//             return false;
//         }
//         if (!ticketUrl) {
//             Alert.alert("Missing Ticket", "Please upload a ticket image.");
//             return false;
//         }
//         return true;
//     };

//     // Submit function
//     const submit = async () => {
//         if (!validate()) return;

//         try {
//             setLoading(true);

//             console.log("Saving answers...");
//             await saveAnswers(answers);  // ✔ correct Firestore path

//             const passport = await getPassportData();
//             console.log("Passport data fetched:", passport);

//             const previewPayload = {
//                 travel: {
//                     fromCountry,
//                     fromCity,
//                     toCountry,
//                     toCity,
//                     departureDate: formatDate(departureDate),
//                     returnDate: formatDate(returnDate),
//                 },
//                 hotel: {
//                     hotelName,
//                     hotelAddress,
//                     hotelDetails,
//                 },
//                 ticket: {
//                     name: ticketName,
//                     url: ticketUrl,
//                 },
//                 questions: answers,
//                 passport: passport || null,
//             };

//             console.log("Saving preview details...");
//             await savePreviewDetails(previewPayload);

//             setLoading(false);

//             navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
//             // } catch (err) {
//             //   console.log("Submit ERROR:", err);
//             //   Alert.alert("Error", "Could not submit details.");
//             //   setLoading(false);
//             // }
//         } catch (err) {
//             console.log("🔥 FIREBASE ERROR:", JSON.stringify(err, null, 2));
//             Alert.alert("Firebase Error", err.message || "Unknown Error");
//             setLoading(false);
//         }

//     };

//     return (
//         <ScrollView contentContainerStyle={{ padding: 20 }}>
//             <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
//                 Travel Details
//             </Text>

//             {/* FROM Country */}
//             <Text style={{ fontWeight: "600" }}>Travelling FROM Country</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker selectedValue={fromCountry} onValueChange={handleFromCountryChange} style={styles.input}>
//                     <Picker.Item label="Select Country" value="" />
//                     {countriesData.map((c) => {
//                         const name = c.name || c.country;
//                         return <Picker.Item key={name} label={name} value={name} />;
//                     })}
//                 </Picker>
//             </View>

//             {/* FROM City */}
//             <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker selectedValue={fromCity} onValueChange={setFromCity} style={styles.input}>
//                     <Picker.Item label="Select City" value="" />
//                     {fromCities.map((city) => (
//                         <Picker.Item key={city} label={city} value={city} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* TO Country */}
//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Travelling TO Country</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker selectedValue={toCountry} onValueChange={handleToCountryChange} style={styles.input}>
//                     <Picker.Item label="Select Country" value="" />
//                     {countriesData.map((c) => {
//                         const name = c.name || c.country;
//                         return <Picker.Item key={name} label={name} value={name} />;
//                     })}
//                 </Picker>
//             </View>

//             {/* TO City */}
//             <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker selectedValue={toCity} onValueChange={setToCity} style={styles.input}>
//                     <Picker.Item label="Select City" value="" />
//                     {toCities.map((city) => (
//                         <Picker.Item key={city} label={city} value={city} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* Dates */}
//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Departure Date</Text>
//             <TouchableOpacity
//                 onPress={() => setShowDeparturePicker(true)}
//                 style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//             >
//                 <Text>{formatDate(departureDate)}</Text>
//             </TouchableOpacity>
//             {showDeparturePicker && (
//                 <DateTimePicker
//                     mode="date"
//                     value={departureDate}
//                     onChange={(e, d) => {
//                         setShowDeparturePicker(false);
//                         if (d) setDepartureDate(d);
//                     }}
//                 />
//             )}

//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Return Date</Text>
//             <TouchableOpacity
//                 onPress={() => setShowReturnPicker(true)}
//                 style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//             >
//                 <Text>{formatDate(returnDate)}</Text>
//             </TouchableOpacity>
//             {showReturnPicker && (
//                 <DateTimePicker
//                     mode="date"
//                     value={returnDate}
//                     onChange={(e, d) => {
//                         setShowReturnPicker(false);
//                         if (d) setReturnDate(d);
//                     }}
//                 />
//             )}

//             {/* HOTEL */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Hotel Voucher
//             </Text>

//             <Text style={{ fontWeight: "600" }}>Hotel Name</Text>
//             <TextInput
//                 style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//                 value={hotelName}
//                 onChangeText={setHotelName}
//             />

//             <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Address</Text>
//             <TextInput
//                 style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//                 value={hotelAddress}
//                 onChangeText={setHotelAddress}
//             />

//             <Text style={{ fontWeight: "600", marginTop: 10 }}>Account Details</Text>
//             <TextInput
//                 style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}
//                 multiline
//                 value={hotelDetails}
//                 onChangeText={setHotelDetails}
//             />

//             {/* TICKET UPLOAD */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Upload Ticket
//             </Text>

//             <TouchableOpacity
//                 onPress={pickTicket}
//                 style={{
//                     marginTop: 10,
//                     padding: 12,
//                     backgroundColor: "#ff9800",
//                     borderRadius: 8,
//                 }}
//             >
//                 <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
//                     Choose Ticket Image
//                 </Text>
//             </TouchableOpacity>

//             {ticketName ? (
//                 <TouchableOpacity
//                     onPress={() => ticketUrl && Linking.openURL(ticketUrl)}
//                     style={{ marginTop: 10 }}
//                 >
//                     <Text style={{ color: "#007bff" }}>
//                         Selected: {ticketName} {ticketUrl ? "(Open)" : "(Uploading...)"}
//                     </Text>
//                 </TouchableOpacity>
//             ) : null}

//             {/* EXTRA QUESTIONS */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Additional Questions
//             </Text>

//             {QUESTIONS.map((q) => (
//                 <View key={q} style={{ marginTop: 12 }}>
//                     <Text style={{ fontWeight: "600" }}>{q}</Text>
//                     <TextInput
//                         style={{ borderWidth: 1, padding: 8, borderRadius: 8, color: '#000' }}
//                         multiline
//                         onChangeText={(v) => updateAnswer(q, v)}
//                     />
//                 </View>
//             ))}

//             {/* SUBMIT */}
//             <View style={{ marginTop: 30, marginBottom: 40 }}>
//                 <Button
//                     title={loading ? "Saving..." : "Submit All Details"}
//                     onPress={submit}
//                 />
//             </View>

//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     input: {
//         flex: 1,
//         color: '#445870'
//     },
// });

// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     ScrollView,
//     TouchableOpacity,
//     Alert,
//     Linking,
//     StyleSheet,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { launchImageLibrary } from "react-native-image-picker";

// import { saveAnswers } from "../../api/user/answerService";
// import { getPassportData } from "../../api/user/passportService";
// import {
//     uploadTicketFile,
//     savePreviewDetails,
// } from "../../api/user/previewDetailsService";
// import countriesList from "../../assets/data/countries.json";

// const QUESTIONS = [
//     "What is your travel purpose?",
//     "Which country are you visiting?",
//     "How long will you stay?",
//     "Do you have previous travel history?",
// ];

// const formatDate = (date) => {
//     if (!date) return "";
//     const d = new Date(date);
//     return `${String(d.getDate()).padStart(2, "0")}/${String(
//         d.getMonth() + 1
//     ).padStart(2, "0")}/${d.getFullYear()}`;
// };

// export default function QuestionScreen({ navigation }) {
//     // TRAVEL STATE
//     const [answers, setAnswers] = useState({});
//     const [countriesData, setCountriesData] = useState([]);
//     const [fromCountry, setFromCountry] = useState("");
//     const [fromCities, setFromCities] = useState([]);
//     const [fromCity, setFromCity] = useState("");
//     const [toCountry, setToCountry] = useState("");
//     const [toCities, setToCities] = useState([]);
//     const [toCity, setToCity] = useState("");

//     // DATES
//     const [departureDate, setDepartureDate] = useState(new Date());
//     const [returnDate, setReturnDate] = useState(new Date());
//     const [showDeparturePicker, setShowDeparturePicker] = useState(false);
//     const [showReturnPicker, setShowReturnPicker] = useState(false);

//     // HOTEL
//     const [hotelName, setHotelName] = useState("");
//     const [hotelAddress, setHotelAddress] = useState("");
//     const [hotelDetails, setHotelDetails] = useState("");

//     // TICKET
//     const [ticketName, setTicketName] = useState("");
//     const [ticketUrl, setTicketUrl] = useState(null);
//     const [ticketUploading, setTicketUploading] = useState(false);

//     const [loading, setLoading] = useState(false);

//     // -------------------------------------------------------------
//     // ✅ LOAD COUNTRIES (Very Stable GitHub JSON)
//     // -------------------------------------------------------------
//     //   useEffect(() => {
//     //     const fetchCountries = async () => {
//     //       try {
//     //         const res = await fetch(
//     //           "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json"
//     //         );

//     //         const text = await res.text();

//     //         if (!text.startsWith("{") && !text.startsWith("[")) {
//     //           console.log("❌ Invalid Country JSON:", text);
//     //           return;
//     //         }

//     //         const json = JSON.parse(text);
//     //         setCountriesData(json);
//     //       } catch (e) {
//     //         console.log("Countries API Error:", e);
//     //       }
//     //     };

//     //     fetchCountries();
//     //   }, []);


//     useEffect(() => {
//         setCountriesData(countriesList);
//     }, []);
//     // -------------------------------------------------------------
//     // ✅ LOAD CITIES BASED ON ISO2 CODE
//     // -------------------------------------------------------------
//     const loadCities = async (iso2, setter) => {
//         try {
//             const res = await fetch(
//                 "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json"
//             );

//             const text = await res.text();

//             if (!text.startsWith("{") && !text.startsWith("[")) {
//                 console.log("❌ Invalid Cities JSON:", text);
//                 return;
//             }

//             const allCities = JSON.parse(text);

//             const filtered = allCities
//                 .filter((c) => c.country_code === iso2)
//                 .map((c) => c.name);

//             setter(filtered);
//         } catch (e) {
//             console.log("Cities Error:", e);
//         }
//     };

//     // const handleFromCountryChange = async (val) => {
//     //     setFromCountry(val);

//     //     const country = countriesData.find((c) => c.name === val);
//     //     if (country) {
//     //         await loadCities(country.iso2, setFromCities);
//     //     }
//     //     setFromCity("");
//     // };
//     const handleFromCountryChange = (countryName) => {
//         setFromCountry(countryName);

//         const selected = countriesData.find(c => c === countryName);
//         console.log("Selected country:", selected);   // debug

//         setFromCities(selected ? selected.cities : []);
//         setFromCity("");
//     };


//     // const handleToCountryChange = async (val) => {
//     //     setToCountry(val);

//     //     const country = countriesData.find((c) => c.name === val);
//     //     if (country) {
//     //         await loadCities(country.iso2, setToCities);
//     //     }
//     //     setToCity("");
//     // };
//     const handleToCountryChange = (countryName) => {
//         setToCountry(countryName);

//         const selected = countriesData.find(c => c.country === countryName);
//         console.log("Selected country:", selected);   // debug

//         setToCities(selected ? selected.cities : []);
//         setToCity("");
//     };


//     // -------------------------------------------------------------
//     // Upload ticket image
//     // -------------------------------------------------------------
//     const pickTicket = async () => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: "photo",
//                 quality: 0.8,
//             });

//             if (result.didCancel) return;

//             const file = result.assets[0];

//             setTicketName(file.fileName || "ticket.jpg");

//             const uploadObj = {
//                 uri: file.uri,
//                 name: file.fileName || "ticket.jpg",
//                 type: file.type || "image/jpeg",
//             };

//             setTicketUploading(true);
//             const uploadedUrl = await uploadTicketFile(uploadObj);
//             setTicketUrl(uploadedUrl);
//             setTicketUploading(false);

//             Alert.alert("Success", "Ticket image uploaded!");
//         } catch (err) {
//             console.log("Ticket Upload ERROR:", err);
//             Alert.alert("Error", "Unable to upload image.");
//             setTicketUploading(false);
//         }
//     };

//     const updateAnswer = (q, v) => {
//         setAnswers((prev) => ({ ...prev, [q]: v }));
//     };

//     // -------------------------------------------------------------
//     // Validate form input
//     // -------------------------------------------------------------
//     const validate = () => {
//         if (!fromCountry || !fromCity || !toCountry || !toCity) {
//             Alert.alert("Missing Travel Info", "Please fill travel from/to details.");
//             return false;
//         }
//         if (!hotelName || !hotelAddress) {
//             Alert.alert("Missing Hotel Info", "Please fill hotel details.");
//             return false;
//         }
//         if (ticketUploading) {
//             Alert.alert("Wait", "Ticket is still uploading. Please wait.");
//             return false;
//         }
//         if (!ticketUrl) {
//             Alert.alert("Missing Ticket", "Please upload a ticket image.");
//             return false;
//         }
//         return true;
//     };

//     // -------------------------------------------------------------
//     // Submit Details
//     // -------------------------------------------------------------
//     const submit = async () => {
//         if (!validate()) return;

//         try {
//             setLoading(true);

//             await saveAnswers(answers);

//             const passport = await getPassportData();

//             const previewPayload = {
//                 travel: {
//                     fromCountry,
//                     fromCity,
//                     toCountry,
//                     toCity,
//                     departureDate: formatDate(departureDate),
//                     returnDate: formatDate(returnDate),
//                 },
//                 hotel: {
//                     hotelName,
//                     hotelAddress,
//                     hotelDetails,
//                 },
//                 ticket: {
//                     name: ticketName,
//                     url: ticketUrl,
//                 },
//                 questions: answers,
//                 passport: passport || null,
//             };

//             await savePreviewDetails(previewPayload);

//             setLoading(false);

//             navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
//         } catch (err) {
//             console.log("🔥 FIREBASE ERROR:", JSON.stringify(err, null, 2));
//             Alert.alert("Firebase Error", err.message || "Unknown Error");
//             setLoading(false);
//         }
//     };

//     // -------------------------------------------------------------
//     // Render UI
//     // -------------------------------------------------------------
//     console.log("CITIES==>", fromCities)
//     return (
//         <ScrollView contentContainerStyle={{ padding: 20 }}>
//             <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
//                 Travel Details
//             </Text>

//             {/* FROM Country */}
//             <Text style={{ fontWeight: "600" }}>Travelling FROM Country</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker
//                     selectedValue={fromCountry}
//                     onValueChange={handleFromCountryChange}
//                     style={styles.input}
//                 >
//                     <Picker.Item label="Select Country" value="" />
//                     {countriesData.map((c) => (
//                         <Picker.Item key={c.country} label={c.country} value={c.country} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* FROM City */}
//             <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker
//                     selectedValue={fromCity}
//                     onValueChange={setFromCity}
//                     style={styles.input}
//                 >
//                     <Picker.Item label="Select City" value="" />
//                     {fromCities.map((c) => (
//                        <Picker.Item key={c} label={c} value={c} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* TO Country */}
//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Travelling TO Country</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker
//                     selectedValue={toCountry}
//                     onValueChange={handleToCountryChange}
//                     style={styles.input}
//                 >
//                     <Picker.Item label="Select Country" value="" />
//                     {countriesData.map((c) => (
//                         <Picker.Item key={c.country} label={c.country} value={c.country} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* TO City */}
//             <Text style={{ fontWeight: "600", marginTop: 10 }}>City</Text>
//             <View style={{ borderWidth: 1, borderRadius: 8 }}>
//                 <Picker
//                     selectedValue={toCity}
//                     onValueChange={setToCity}
//                     style={styles.input}
//                 >
//                     <Picker.Item label="Select City" value="" />
//                     {toCities.map((c) => (
//                          <Picker.Item key={c} label={c} value={c} />
//                     ))}
//                 </Picker>
//             </View>

//             {/* DATES */}
//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Departure Date</Text>
//             <TouchableOpacity
//                 onPress={() => setShowDeparturePicker(true)}
//                 style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//             >
//                 <Text>{formatDate(departureDate)}</Text>
//             </TouchableOpacity>

//             {showDeparturePicker && (
//                 <DateTimePicker
//                     mode="date"
//                     value={departureDate}
//                     onChange={(e, d) => {
//                         setShowDeparturePicker(false);
//                         if (d) setDepartureDate(d);
//                     }}
//                 />
//             )}

//             <Text style={{ fontWeight: "600", marginTop: 20 }}>Return Date</Text>
//             <TouchableOpacity
//                 onPress={() => setShowReturnPicker(true)}
//                 style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
//             >
//                 <Text>{formatDate(returnDate)}</Text>
//             </TouchableOpacity>

//             {showReturnPicker && (
//                 <DateTimePicker
//                     mode="date"
//                     value={returnDate}
//                     onChange={(e, d) => {
//                         setShowReturnPicker(false);
//                         if (d) setReturnDate(d);
//                     }}
//                 />
//             )}

//             {/* HOTEL */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Hotel Voucher
//             </Text>

//             <Text style={{ fontWeight: "600" }}>Hotel Name</Text>
//             <TextInput
//                 style={styles.textBox}
//                 value={hotelName}
//                 onChangeText={setHotelName}
//             />

//             <Text style={{ fontWeight: "600", marginTop: 10 }}>Hotel Address</Text>
//             <TextInput
//                 style={styles.textBox}
//                 value={hotelAddress}
//                 onChangeText={setHotelAddress}
//             />

//             <Text style={{ fontWeight: "600", marginTop: 10 }}>Account Details</Text>
//             <TextInput
//                 style={styles.textBox}
//                 multiline
//                 value={hotelDetails}
//                 onChangeText={setHotelDetails}
//             />

//             {/* TICKET UPLOAD */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Upload Ticket
//             </Text>

//             <TouchableOpacity
//                 onPress={pickTicket}
//                 style={styles.uploadButton}
//             >
//                 <Text style={styles.uploadButtonText}>Choose Ticket Image</Text>
//             </TouchableOpacity>

//             {ticketName ? (
//                 <TouchableOpacity
//                     onPress={() => ticketUrl && Linking.openURL(ticketUrl)}
//                     style={{ marginTop: 10 }}
//                 >
//                     <Text style={{ color: "#007bff" }}>
//                         Selected: {ticketName} {ticketUrl ? "(Open)" : "(Uploading...)"}
//                     </Text>
//                 </TouchableOpacity>
//             ) : null}

//             {/* QUESTIONS */}
//             <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 30 }}>
//                 Additional Questions
//             </Text>

//             {QUESTIONS.map((q) => (
//                 <View key={q} style={{ marginTop: 12 }}>
//                     <Text style={{ fontWeight: "600" }}>{q}</Text>
//                     <TextInput
//                         style={styles.textBox}
//                         multiline
//                         onChangeText={(v) => updateAnswer(q, v)}
//                     />
//                 </View>
//             ))}

//             {/* SUBMIT BUTTON */}
//             <View style={{ marginTop: 30, marginBottom: 40 }}>
//                 <Button
//                     title={loading ? "Saving..." : "Submit All Details"}
//                     onPress={submit}
//                 />
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     input: {
//         flex: 1,
//         color: "#445870",
//     },
//     textBox: {
//         borderWidth: 1,
//         padding: 8,
//         borderRadius: 8,
//         color: "#000",
//     },
//     uploadButton: {
//         marginTop: 10,
//         padding: 12,
//         backgroundColor: "#ff9800",
//         borderRadius: 8,
//     },
//     uploadButtonText: {
//         color: "white",
//         textAlign: "center",
//         fontWeight: "600",
//     },
// });


import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    Alert,
    Linking,
    StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import { getAnswers } from "../../api/user/answerService";
import { saveAnswers } from "../../api/user/answerService";
import { getPassportData } from "../../api/user/passportService";
import { uploadTicketFile, savePreviewDetails } from "../../api/user/previewDetailsService";

import countriesList from "../../assets/data/countries.json";   // YOUR JSON

const QUESTIONS = [
    "What is your travel purpose?",
    "Which country are you visiting?",
    "How long will you stay?",
    "Do you have previous travel history?",
];

const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

export default function QuestionScreen({ navigation, route }) {

    const visaPreferences = route?.params?.payload?.visa || null;
    console.log("QUESTIONS==>",visaPreferences)
    // STATES
    const [answers, setAnswers] = useState({});
    const [countriesData, setCountriesData] = useState([]);
    const [fromCountry, setFromCountry] = useState("");
    const [fromCities, setFromCities] = useState([]);
    const [fromCity, setFromCity] = useState("");

    const [toCountry, setToCountry] = useState("");
    const [toCities, setToCities] = useState([]);
    const [toCity, setToCity] = useState("");

    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [showDeparturePicker, setShowDeparturePicker] = useState(false);
    const [showReturnPicker, setShowReturnPicker] = useState(false);

    const [hotelName, setHotelName] = useState("");
    const [hotelAddress, setHotelAddress] = useState("");
    const [hotelDetails, setHotelDetails] = useState("");

    const [ticketName, setTicketName] = useState("");
    const [ticketUrl, setTicketUrl] = useState(null);
    const [ticketUploading, setTicketUploading] = useState(false);

    const [loading, setLoading] = useState(false);

    // Load countries from JSON
    useEffect(() => {
        setCountriesData(countriesList);
    }, []);

    // Country → Cities
    const handleFromCountryChange = (country) => {
        setFromCountry(country);

        const found = countriesData.find((c) => c.country === country);
        setFromCities(found ? found.cities : []);

        setFromCity("");
    };

    const handleToCountryChange = (country) => {
        setToCountry(country);

        const found = countriesData.find((c) => c.country === country);
        setToCities(found ? found.cities : []);

        setToCity("");
    };

    // Upload ticket image
    const pickTicket = async () => {
        try {
            const result = await launchImageLibrary({ mediaType: "photo", quality: 0.8 });
            if (result.didCancel) return;

            const file = result.assets[0];

            setTicketName(file.fileName || "ticket.jpg");

            const uploadObj = {
                uri: file.uri,
                name: file.fileName || "ticket.jpg",
                type: file.type || "image/jpeg",
            };

            setTicketUploading(true);
            const uploadedUrl = await uploadTicketFile(uploadObj);
            setTicketUrl(uploadedUrl);
            setTicketUploading(false);
        } catch (err) {
            Alert.alert("Error", "Unable to upload image.");
            setTicketUploading(false);
        }
    };

    // Update answers
    const updateAnswer = (q, v) => {
        setAnswers((prev) => ({ ...prev, [q]: v }));
    };

    // Validate form
    const validate = () => {
        if (!fromCountry || !fromCity || !toCountry || !toCity) {
            Alert.alert("Missing Travel Info", "Please fill travel from/to details.");
            return false;
        }
        if (!hotelName || !hotelAddress) {
            Alert.alert("Missing Hotel Info", "Please fill hotel details.");
            return false;
        }
        if (ticketUploading) {
            Alert.alert("Uploading...", "Please wait for image upload.");
            return false;
        }
        if (!ticketUrl) {
            Alert.alert("Missing Ticket", "Please upload a ticket image.");
            return false;
        }
        return true;
    };

    // Submit
    const submit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            await saveAnswers(answers);
            const passport = await getPassportData();
            const type = await getAnswers();
            console.log("TYPE==>", type)
            const previewPayload = {
                travel: { fromCountry, fromCity, toCountry, toCity, departureDate: formatDate(departureDate), returnDate: formatDate(returnDate) },
                hotel: { hotelName, hotelAddress, hotelDetails },
                ticket: { name: ticketName, url: ticketUrl },
                questions: answers,
                passport: passport || null,
                visa: visaPreferences,
            };

            await savePreviewDetails(previewPayload);

            setLoading(false);
            navigation.navigate("ReviewAnswersScreen", { preview: previewPayload });
        } catch (err) {
            Alert.alert("Firebase Error", err.message || "Unknown Error");
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>

            {/* COUNTRIES */}
            <Text style={styles.label}>From Country</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={fromCountry} onValueChange={handleFromCountryChange}>
                    <Picker.Item label="Select Country" value="" />
                    {countriesData.map((c) => (
                        <Picker.Item key={c.country} label={c.country} value={c.country} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>From City</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={fromCity} onValueChange={setFromCity}>
                    <Picker.Item label="Select City" value="" />
                    {fromCities.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
            </View>

            {/* TO COUNTRY */}
            <Text style={styles.label}>To Country</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={toCountry} onValueChange={handleToCountryChange}>
                    <Picker.Item label="Select Country" value="" />
                    {countriesData.map((c) => (
                        <Picker.Item key={c.country} label={c.country} value={c.country} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>To City</Text>
            <View style={styles.pickerBox}>
                <Picker selectedValue={toCity} onValueChange={setToCity}>
                    <Picker.Item label="Select City" value="" />
                    {toCities.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
            </View>

            {/* HOTEL */}
            <Text style={styles.label}>Hotel Name</Text>
            <TextInput style={styles.input} value={hotelName} onChangeText={setHotelName} />

            <Text style={styles.label}>Hotel Address</Text>
            <TextInput style={styles.input} value={hotelAddress} onChangeText={setHotelAddress} />

            <Text style={styles.label}>Account Details</Text>
            <TextInput style={styles.input} multiline value={hotelDetails} onChangeText={setHotelDetails} />

            {/* TICKET */}
            <Text style={styles.title}>Upload Ticket</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickTicket}>
                <Text style={styles.uploadText}>Choose Ticket Image</Text>
            </TouchableOpacity>

            {ticketName ? <Text style={{ marginTop: 10 }}>Selected: {ticketName}</Text> : null}

            {/* QUESTIONS */}
            <Text style={styles.title}>Additional Questions</Text>
            {QUESTIONS.map((q) => (
                <View key={q} style={{ marginTop: 12 }}>
                    <Text style={styles.label}>{q}</Text>
                    <TextInput style={styles.input} multiline onChangeText={(v) => updateAnswer(q, v)} />
                </View>
            ))}

            {/* SUBMIT */}
            <View style={{ marginBottom: 90 }}>
                <Button title={loading ? "Saving..." : "Submit All Details"} onPress={submit} />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    label: { fontWeight: "600", marginTop: 10 },
    pickerBox: { borderWidth: 1, borderRadius: 8 },
    input: { borderWidth: 1, padding: 8, borderRadius: 8, marginTop: 5 },
    title: { fontSize: 20, fontWeight: "700", marginTop: 20 },
    uploadButton: { padding: 12, backgroundColor: "#ff9800", borderRadius: 8, marginTop: 10 },
    uploadText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
