// // src/screens/TravelDateScreen.js
// import React, { useMemo, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     SafeAreaView,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import { saveTravelDates } from "../../api/user/travelDateService";

// const ORANGE = "#FF5C00";

// function addDays(date, n) {
//     const d = new Date(date);
//     d.setDate(d.getDate() + n);
//     return d;
// }

// function addMonths(date, n) {
//     const d = new Date(date);
//     d.setMonth(d.getMonth() + n);
//     return d;
// }

// function toYMD(date) {
//     return date.toISOString().split("T")[0]; // YYYY-MM-DD
// }

// function formatDisplayDate(dateString) {
//     // from "YYYY-MM-DD" => "DD/MM/YYYY"
//     const [y, m, d] = dateString.split("-");
//     return `${d}/${m}/${y}`;
// }

// export default function TravelDateScreen({ navigation }) {
//     const today = useMemo(() => new Date(), []);
//     const minDate = useMemo(() => toYMD(addDays(today, 3)), [today]);
//     const maxDate = useMemo(() => toYMD(addMonths(today, 3)), [today]);

//     const [selectedDate, setSelectedDate] = useState(null); // "YYYY-MM-DD"
//     const [mode, setMode] = useState("fixed"); // 'fixed' | 'flexible'
//     const [saving, setSaving] = useState(false);

//     const onDayPress = (day) => {
//         // day.dateString is "YYYY-MM-DD"
//         setSelectedDate(day.dateString);
//     };

//     const markedDates = useMemo(() => {
//         if (!selectedDate) return {};
//         return {
//             [selectedDate]: {
//                 selected: true,
//                 selectedColor: ORANGE,
//                 selectedTextColor: "#ffffff",
//             },
//         };
//     }, [selectedDate]);

//     const disabledContinue = !selectedDate || saving;

//     const handleContinue = async () => {
//         if (!selectedDate) return;

//         try {
//             setSaving(true);

//             const payload = {
//                 departureDate: selectedDate,
//                 displayDate: formatDisplayDate(selectedDate),
//                 mode, // "fixed" or "flexible"
//             };

//             await saveTravelDates(payload);

//             // ✅ go to your NEXT step screen
//             navigation.navigate("PhotoUploadScreen",{traveldate:payload}); // change if needed
//         } catch (err) {
//             console.log("SAVE TRAVEL DATE ERROR:", err);
//             alert("Could not save date. Please try again.");
//         } finally {
//             setSaving(false);
//         }
//     };

//     const convertLocalTimeToUTCTime = () => {
//         const dateString = '2021-10-22T00:00:00';
//         const [fullDate, time] = dateString.split('T');
//         const [year, month, date] = fullDate.split('-');
//         const [hour, minute, second] = time.split(':');
//         const dateTime = new Date(year, month, date, hour, minute, second);
//         return dateTime.toISOString();
//     };

//     return (
//         <SafeAreaView style={styles.safe}>
//             <View style={styles.container}>
//                 {/* HEADER BAR */}
//                 <View style={styles.headerRow}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Ionicons name="chevron-back" size={26} color="black" />
//                     </TouchableOpacity>

//                     <View style={styles.badge}>
//                         <Ionicons name="checkmark-circle" size={18} color="#fff" />
//                         <Text style={styles.badgeText}>
//                             Visa on{" "}
//                             <Text style={{ fontWeight: "700" }}>
//                                 {/* just example text – you can compute this from selectedDate */}
//                                 {new Date().toISOString()}
//                             </Text>
//                         </Text>
//                     </View>

//                     <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
//                         <Ionicons name="home-outline" size={24} color="black" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* STEPPER */}
//                 <View style={styles.stepperRow}>
//                     {[
//                         { key: "dates", label: "Dates", icon: "calendar-blank" },
//                         { key: "photo", label: "Photo", icon: "camera-outline" },
//                         { key: "passport", label: "Passport", icon: "passport-biometric" },
//                         { key: "detail", label: "Detail", icon: "account-outline" },
//                         { key: "checkout", label: "Checkout", icon: "check-circle-outline" },
//                     ].map((step, index) => {
//                         const isActive = step.key === "dates";
//                         const isCompleted = false; // on this screen only "Dates" is active
//                         const color = isActive || isCompleted ? ORANGE : "#A0A0A0";

//                         return (
//                             <View key={step.key} style={styles.stepItem}>
//                                 <MaterialCommunityIcons
//                                     name={isCompleted ? "check-circle" : step.icon}
//                                     size={22}
//                                     color={color}
//                                 />
//                                 <Text
//                                     style={[
//                                         styles.stepLabel,
//                                         { color: isActive ? ORANGE : "#444" },
//                                     ]}
//                                 >
//                                     {step.label}
//                                 </Text>
//                                 {/* underline for active tab */}
//                                 {isActive && <View style={styles.stepUnderline} />}
//                                 {/* connector line except last */}
//                                 {index < 4 && <View style={styles.stepConnector} />}
//                             </View>
//                         );
//                     })}
//                 </View>

//                 {/* QUESTION */}
//                 <Text style={styles.question}>What is your departure date?</Text>

//                 {/* TOGGLE: FIXED / FLEXIBLE */}
//                 <View style={styles.modeToggle}>
//                     <TouchableOpacity
//                         style={[
//                             styles.modeButton,
//                             mode === "fixed" && styles.modeButtonActive,
//                         ]}
//                         onPress={() => setMode("fixed")}
//                     >
//                         <Text
//                             style={[
//                                 styles.modeText,
//                                 mode === "fixed" && styles.modeTextActive,
//                             ]}
//                         >
//                             Fixed Date
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[
//                             styles.modeButton,
//                             mode === "flexible" && styles.modeButtonActive,
//                         ]}
//                         onPress={() => setMode("flexible")}
//                     >
//                         <Text
//                             style={[
//                                 styles.modeText,
//                                 mode === "flexible" && styles.modeTextActive,
//                             ]}
//                         >
//                             Flexible Date
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* DAY HEADER ROW (Sun..Sat) is built-in in Calendar */}

//                 {/* CALENDAR */}
//                 <Calendar
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     onDayPress={onDayPress}
//                     markedDates={markedDates}
//                     firstDay={1} // Monday
//                     style={styles.calendar}
//                     theme={{
//                         selectedDayBackgroundColor: ORANGE,
//                         selectedDayTextColor: "#ffffff",
//                         todayTextColor: ORANGE,
//                         arrowColor: ORANGE,
//                         monthTextColor: "#000",
//                         textSectionTitleColor: "#888",
//                     }}
//                 />

//                 {/* CONTINUE BUTTON */}
//                 <View style={styles.footer}>
//                     <TouchableOpacity
//                         style={[
//                             styles.continueButton,
//                             disabledContinue && { opacity: 0.5 },
//                         ]}
//                         disabled={disabledContinue}
//                         onPress={handleContinue}
//                     >
//                         <Text style={styles.continueText}>
//                             {saving ? "Saving..." : "Continue"}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safe: {
//         flex: 1,
//         backgroundColor: "#ffffff",
//     },
//     container: {
//         flex: 1,
//         backgroundColor: "#ffffff",
//         marginTop:40
//     },
//     headerRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 16,
//         paddingTop: 8,
//         paddingBottom: 12,
//         justifyContent: "space-between",
//     },
//     badge: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: ORANGE,
//         paddingHorizontal: 14,
//         paddingVertical: 6,
//         borderRadius: 999,
//     },
//     badgeText: {
//         color: "#fff",
//         marginLeft: 6,
//         fontSize: 13,
//     },
//     stepperRow: {
//         flexDirection: "row",
//         alignItems: "flex-end",
//         paddingHorizontal: 8,
//         paddingTop: 8,
//         paddingBottom: 4,
//     },
//     stepItem: {
//         flex: 1,
//         alignItems: "center",
//         position: "relative",
//     },
//     stepLabel: {
//         fontSize: 12,
//         marginTop: 4,
//     },
//     stepUnderline: {
//         marginTop: 4,
//         height: 2,
//         backgroundColor: ORANGE,
//         alignSelf: "stretch",
//     },
//     stepConnector: {
//         position: "absolute",
//         right: -8,
//         top: 12,
//         width: 16,
//         height: 1,
//         backgroundColor: "#e0e0e0",
//     },
//     question: {
//         fontSize: 20,
//         fontWeight: "700",
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//     },
//     modeToggle: {
//         flexDirection: "row",
//         backgroundColor: "#f4f4f4",
//         marginHorizontal: 20,
//         borderRadius: 999,
//         padding: 3,
//     },
//     modeButton: {
//         flex: 1,
//         borderRadius: 999,
//         paddingVertical: 10,
//         alignItems: "center",
//     },
//     modeButtonActive: {
//         backgroundColor: "#ffffff",
//         borderWidth: 1,
//         borderColor: ORANGE,
//     },
//     modeText: {
//         fontSize: 14,
//         color: "#666",
//     },
//     modeTextActive: {
//         color: ORANGE,
//         fontWeight: "700",
//     },
//     calendar: {
//         marginTop: 12,
//     },
//     footer: {
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//     },
//     continueButton: {
//         backgroundColor: ORANGE,
//         borderRadius: 999,
//         paddingVertical: 14,
//     },
//     continueText: {
//         color: "#fff",
//         textAlign: "center",
//         fontSize: 16,
//         fontWeight: "700",
//     },
// });


// import React, { useMemo, useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     SafeAreaView,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// import { saveTravelDates } from "../../api/user/travelDateService";

// // ⭐ Responsive Helpers
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

// const ORANGE = "#FF5C00";

// function addDays(date, n) {
//     const d = new Date(date);
//     d.setDate(d.getDate() + n);
//     return d;
// }

// function addMonths(date, n) {
//     const d = new Date(date);
//     d.setMonth(d.getMonth() + n);
//     return d;
// }

// function toYMD(date) {
//     return date.toISOString().split("T")[0];
// }

// function formatDisplayDate(dateString) {
//     const [y, m, d] = dateString.split("-");
//     return `${d}/${m}/${y}`;
// }

// export default function TravelDateScreen({ navigation }) {
//     const today = useMemo(() => new Date(), []);
//     const minDate = useMemo(() => toYMD(addDays(today, 3)), [today]);
//     const maxDate = useMemo(() => toYMD(addMonths(today, 3)), [today]);

//     const [selectedDate, setSelectedDate] = useState(null);
//     const [mode, setMode] = useState("fixed");
//     const [saving, setSaving] = useState(false);
//     const [date, setDate] = useState("");
//     const onDayPress = (day) => {
//         setSelectedDate(day.dateString);
//     };

//     const markedDates = useMemo(() => {
//         if (!selectedDate) return {};
//         return {
//             [selectedDate]: {
//                 selected: true,
//                 selectedColor: ORANGE,
//                 selectedTextColor: "#ffffff",
//             },
//         };
//     }, [selectedDate]);

//     const disabledContinue = !selectedDate || saving;

//     const handleContinue = async () => {
//         if (!selectedDate) return;
//         try {
//             setSaving(true);
//             const payload = {
//                 departureDate: selectedDate,
//                 displayDate: formatDisplayDate(selectedDate),
//                 mode,
//             };

//             await saveTravelDates(payload);
//             navigation.navigate("PhotoUploadScreen", { traveldate: payload });

//         } catch (err) {
//             alert("Could not save date. Please try again.");
//         } finally {
//             setSaving(false);
//         }
//     };
//     // Generate a date 5 days ahead
//     const getDateAfterFiveDays = () => {
//         const currentDate = new Date();
//         //currentDate.setDate(currentDate.getDate() + 5);

//         const options = { day: "2-digit", month: "short", year: "numeric" };
//         return currentDate.toLocaleDateString("en-GB", options);
//     };

//     useEffect(() => {
//         setDate(getDateAfterFiveDays());
//     }, []);

//     return (
//         <SafeAreaView style={styles.safe}>
//             <View style={styles.container}>

//                 {/* HEADER */}
//                 <View style={styles.headerRow}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
//                     </TouchableOpacity>

//                     <View style={styles.badge}>
//                         <Ionicons name="checkmark-circle" size={moderateScale(16)} color="#fff" />
//                         <Text style={styles.badgeText}>
//                             Visa on <Text style={{ fontWeight: "700" }}>{date}</Text>
//                         </Text>
//                     </View>

//                     <TouchableOpacity onPress={() => navigation.navigate("Tabs", {
//                         screen: "Destination",
//                     })
//                     }>
//                         <Icon name="home" size={moderateScale(24)} color={ORANGE} />
//                     </TouchableOpacity>
//                 </View>

//                 {/* STEPPER */}
//                 <View style={styles.stepperRow}>
//                     {[
//                         { key: "dates", label: "Dates", icon: "calendar-blank" },
//                         { key: "photo", label: "Photo", icon: "camera-outline" },
//                         { key: "passport", label: "Passport", icon: "passport-biometric" },
//                         { key: "detail", label: "Detail", icon: "account-outline" },
//                         { key: "checkout", label: "Checkout", icon: "check-circle-outline" },
//                     ].map((step, index) => {
//                         const isActive = step.key === "dates";
//                         const color = isActive ? ORANGE : "#A0A0A0";

//                         return (
//                             <View key={step.key} style={styles.stepItem}>
//                                 <MaterialCommunityIcons
//                                     name={step.icon}
//                                     size={moderateScale(22)}
//                                     color={color}
//                                 />
//                                 <Text style={[styles.stepLabel, { color: isActive ? ORANGE : "#444" }]}>
//                                     {step.label}
//                                 </Text>
//                                 {isActive && <View style={styles.stepUnderline} />}
//                                 {index < 4 && <View style={styles.stepConnector} />}
//                             </View>
//                         );
//                     })}
//                 </View>

//                 {/* TITLE */}
//                 <Text style={styles.question}>What is your departure date?</Text>

//                 {/* MODE BUTTONS */}
//                 <View style={styles.modeToggle}>
//                     <TouchableOpacity
//                         style={[styles.modeButton, mode === "fixed" && styles.modeButtonActive]}
//                         onPress={() => setMode("fixed")}
//                     >
//                         <Text style={[styles.modeText, mode === "fixed" && styles.modeTextActive]}>
//                             Fixed Date
//                         </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                         style={[styles.modeButton, mode === "flexible" && styles.modeButtonActive]}
//                         onPress={() => setMode("flexible")}
//                     >
//                         <Text style={[styles.modeText, mode === "flexible" && styles.modeTextActive]}>
//                             Flexible Date
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* CALENDAR */}
//                 <Calendar
//                     minDate={minDate}
//                     maxDate={maxDate}
//                     onDayPress={onDayPress}
//                     markedDates={markedDates}
//                     firstDay={1}
//                     style={styles.calendar}
//                     theme={{
//                         selectedDayBackgroundColor: ORANGE,
//                         todayTextColor: ORANGE,
//                     }}
//                 />

//                 {/* BUTTON */}
//                 <View style={styles.footer}>
//                     <TouchableOpacity
//                         style={[styles.continueButton, disabledContinue && { opacity: 0.5 }]}
//                         disabled={disabledContinue}
//                         onPress={handleContinue}
//                     >
//                         <Text style={styles.continueText}>{saving ? "Saving..." : "Continue"}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safe: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     container: {
//         flex: 1,
//         paddingTop: hp("2%"),
//     },
//     headerRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: wp("4%"),
//         paddingVertical: verticalScale(10),
//         justifyContent: "space-between",
//     },
//     badge: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: ORANGE,
//         paddingHorizontal: moderateScale(12),
//         paddingVertical: verticalScale(5),
//         borderRadius: 999,
//     },
//     badgeText: {
//         color: "#fff",
//         marginLeft: scale(6),
//         fontSize: RFValue(12),
//     },
//     stepperRow: {
//         flexDirection: "row",
//         alignItems: "flex-end",
//         paddingHorizontal: wp("2%"),
//         paddingBottom: verticalScale(6),
//     },
//     stepItem: {
//         flex: 1,
//         alignItems: "center",
//     },
//     stepLabel: {
//         fontSize: RFValue(10),
//         marginTop: verticalScale(4),
//     },
//     stepUnderline: {
//         marginTop: verticalScale(4),
//         height: verticalScale(2),
//         alignSelf: "stretch",
//         backgroundColor: ORANGE,
//     },
//     stepConnector: {
//         position: "absolute",
//         right: -verticalScale(6),
//         top: verticalScale(10),
//         width: wp("4%"),
//         height: scale(1),
//         backgroundColor: "#e0e0e0",
//     },
//     question: {
//         fontSize: RFValue(18),
//         fontWeight: "700",
//         paddingHorizontal: wp("4%"),
//         paddingVertical: verticalScale(12),
//     },
//     modeToggle: {
//         flexDirection: "row",
//         backgroundColor: "#f4f4f4",
//         marginHorizontal: wp("4%"),
//         borderRadius: 999,
//         padding: scale(3),
//     },
//     modeButton: {
//         flex: 1,
//         borderRadius: 999,
//         paddingVertical: verticalScale(10),
//         alignItems: "center",
//     },
//     modeButtonActive: {
//         backgroundColor: "#ffffff",
//         borderWidth: scale(1),
//         borderColor: ORANGE,
//     },
//     modeText: {
//         fontSize: RFValue(13),
//         color: "#666",
//     },
//     modeTextActive: {
//         color: ORANGE,
//         fontWeight: "700",
//     },
//     calendar: {
//         marginTop: verticalScale(12),
//         marginHorizontal: scale(2),
//     },
//     footer: {
//         paddingHorizontal: wp("4%"),
//         paddingVertical: verticalScale(12),
//     },
//     continueButton: {
//         backgroundColor: ORANGE,
//         borderRadius: 999,
//         paddingVertical: verticalScale(14),
//     },
//     continueText: {
//         color: "#fff",
//         textAlign: "center",
//         fontSize: RFValue(16),
//         fontWeight: "700",
//     },
// });


// import React, { useMemo, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useSelector } from "react-redux";

// import { saveTravelDates } from "../../api/user/travelDateService";
// import ScreenWrapper from "../../components/ScreenWrapper";

// // ⭐ Responsive Helpers
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

// const ORANGE = "#FF5C00";

// function addDays(date, n) {
//   const d = new Date(date);
//   d.setDate(d.getDate() + n);
//   return d;
// }

// function addMonths(date, n) {
//   const d = new Date(date);
//   d.setMonth(d.getMonth() + n);
//   return d;
// }

// function toYMD(date) {
//   return date.toISOString().split("T")[0];
// }

// function formatDisplayDate(dateString) {
//   const [y, m, d] = dateString.split("-");
//   return `${d}/${m}/${y}`;
// }

// export default function TravelDateScreen({ navigation }) {
//   const today = useMemo(() => new Date(), []);
//   const minDate = useMemo(() => toYMD(addDays(today, 3)), [today]);
//   const maxDate = useMemo(() => toYMD(addMonths(today, 3)), [today]);

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [mode, setMode] = useState("fixed");
//   const [saving, setSaving] = useState(false);
//   const [date, setDate] = useState("");

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const markedDates = useMemo(() => {
//     if (!selectedDate) return {};
//     return {
//       [selectedDate]: {
//         selected: true,
//         selectedColor: ORANGE,
//         selectedTextColor: "#ffffff",
//       },
//     };
//   }, [selectedDate]);

//   const disabledContinue = !selectedDate || saving;

//   const handleContinue = async () => {
//     if (!selectedDate) return;
//     try {
//       setSaving(true);
//       const payload = {
//         departureDate: selectedDate,
//         displayDate: formatDisplayDate(selectedDate),
//         mode,
//       };

//       await saveTravelDates(payload);
//       navigation.navigate("PhotoUploadScreen", { traveldate: payload });
//     } catch (err) {
//       alert("Could not save date. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getDateAfterFiveDays = () => {
//     const currentDate = new Date();
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     return currentDate.toLocaleDateString("en-GB", options);
//   };

//   useEffect(() => {
//     setDate(getDateAfterFiveDays());
//   }, []);

//   return (
//     <ScreenWrapper style={styles.safe}>
//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
//           </TouchableOpacity>

//           <View style={styles.badge}>
//             <Ionicons name="checkmark-circle" size={moderateScale(16)} color="#fff" />
//             <Text style={styles.badgeText}>
//               Visa on <Text style={{ fontWeight: "700" }}>{date}</Text>
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate("Tabs", { screen: "Destination" })
//             }
//           >
//             <Icon name="home" size={moderateScale(24)} color={ORANGE} />
//           </TouchableOpacity>
//         </View>

//         {/* STEPPER */}
//         <View style={styles.stepperRow}>
//           {[
//             { key: "dates", label: "Dates", icon: "calendar-blank" },
//             { key: "photo", label: "Photo", icon: "camera-outline" },
//             { key: "passport", label: "Passport", icon: "passport-biometric" },
//             { key: "detail", label: "Detail", icon: "account-outline" },
//             { key: "checkout", label: "Checkout", icon: "check-circle-outline" },
//           ].map((step, index) => {
//             const isActive = step.key === "dates";
//             const color = isActive ? ORANGE : "#A0A0A0";

//             return (
//               <View key={step.key} style={styles.stepItem}>
//                 <MaterialCommunityIcons
//                   name={step.icon}
//                   size={moderateScale(22)}
//                   color={color}
//                 />
//                 <Text style={[styles.stepLabel, { color: isActive ? ORANGE : "#444" }]}>
//                   {step.label}
//                 </Text>
//                 {isActive && <View style={styles.stepUnderline} />}
//                 {index < 4 && <View style={styles.stepConnector} />}
//               </View>
//             );
//           })}
//         </View>

//         {/* TITLE */}
//         <Text style={styles.question}>What is your departure date?</Text>

//         {/* MODE TOGGLE */}
//         <View style={styles.modeToggle}>
//           <TouchableOpacity
//             style={[styles.modeButton, mode === "fixed" && styles.modeButtonActive]}
//             onPress={() => setMode("fixed")}
//           >
//             <Text style={[styles.modeText, mode === "fixed" && styles.modeTextActive]}>
//               Fixed Date
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.modeButton, mode === "flexible" && styles.modeButtonActive]}
//             onPress={() => setMode("flexible")}
//           >
//             <Text style={[styles.modeText, mode === "flexible" && styles.modeTextActive]}>
//               Flexible Date
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* CALENDAR */}
//         <Calendar
//           minDate={minDate}
//           maxDate={maxDate}
//           onDayPress={onDayPress}
//           markedDates={markedDates}
//           firstDay={1}
//           style={styles.calendar}
//           theme={{
//             selectedDayBackgroundColor: ORANGE,
//             todayTextColor: ORANGE,
//           }}
//         />

//         {/* FOOTER */}
//         <View style={styles.footer}>
//           <TouchableOpacity
//             style={[styles.continueButton, disabledContinue && { opacity: 0.5 }]}
//             disabled={disabledContinue}
//             onPress={handleContinue}
//           >
//             <Text style={styles.continueText}>
//               {saving ? "Saving..." : "Continue"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//     paddingTop: hp("2%"),
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(10),
//     justifyContent: "space-between",
//   },
//   badge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: ORANGE,
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(5),
//     borderRadius: 999,
//   },
//   badgeText: {
//     color: "#fff",
//     marginLeft: scale(6),
//     fontSize: RFValue(12),
//   },
//   stepperRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingHorizontal: wp("2%"),
//     paddingBottom: verticalScale(6),
//   },
//   stepItem: {
//     flex: 1,
//     alignItems: "center",
//   },
//   stepLabel: {
//     fontSize: RFValue(10),
//     marginTop: verticalScale(4),
//   },
//   stepUnderline: {
//     marginTop: verticalScale(4),
//     height: verticalScale(2),
//     alignSelf: "stretch",
//     backgroundColor: ORANGE,
//   },
//   stepConnector: {
//     position: "absolute",
//     right: -verticalScale(6),
//     top: verticalScale(10),
//     width: wp("4%"),
//     height: scale(1),
//     backgroundColor: "#e0e0e0",
//   },
//   question: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(12),
//   },
//   modeToggle: {
//     flexDirection: "row",
//     backgroundColor: "#f4f4f4",
//     marginHorizontal: wp("4%"),
//     borderRadius: 999,
//     padding: scale(3),
//   },
//   modeButton: {
//     flex: 1,
//     borderRadius: 999,
//     paddingVertical: verticalScale(10),
//     alignItems: "center",
//   },
//   modeButtonActive: {
//     backgroundColor: "#ffffff",
//     borderWidth: scale(1),
//     borderColor: ORANGE,
//   },
//   modeText: {
//     fontSize: RFValue(13),
//     color: "#666",
//   },
//   modeTextActive: {
//     color: ORANGE,
//     fontWeight: "700",
//   },
//   calendar: {
//     marginTop: verticalScale(12),
//     marginHorizontal: scale(2),
//   },
//   footer: {
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(12),
//   },
//   continueButton: {
//     backgroundColor: ORANGE,
//     borderRadius: 999,
//     paddingVertical: verticalScale(14),
//   },
//   continueText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "700",
//   },
// });


// import React, { useMemo, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { useSelector } from "react-redux";

// import { saveTravelDates } from "../../api/user/travelDateService";
// import ScreenWrapper from "../../components/ScreenWrapper";

// // ⭐ Responsive Helpers
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

// const ORANGE = "#FF5C00";

// function addDays(date, n) {
//   const d = new Date(date);
//   d.setDate(d.getDate() + n);
//   return d;
// }

// function addMonths(date, n) {
//   const d = new Date(date);
//   d.setMonth(d.getMonth() + n);
//   return d;
// }

// function toYMD(date) {
//   return date.toISOString().split("T")[0];
// }

// function formatDisplayDate(dateString) {
//   const [y, m, d] = dateString.split("-");
//   return `${d}/${m}/${y}`;
// }

// export default function TravelDateScreen({ navigation, route }) {
//   const today = useMemo(() => new Date(), []);
//   const minDate = useMemo(() => toYMD(addDays(today, 3)), [today]);
//   const maxDate = useMemo(() => toYMD(addMonths(today, 3)), [today]);

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [mode, setMode] = useState("fixed");
//   const [saving, setSaving] = useState(false);
//   const [date, setDate] = useState("");
// }

//   /* 🔥 ADD: READ SELECTED DESTINATION FROM REDUX */
//   export default function TravelDateScreen({ navigation, route }) {

//   const countryType = route?.params?.countryType;

//   const isSchengen =
//     countryType?.toString().trim().toLowerCase() === "schengen";

//   const onDayPress = (day) => {
//     setSelectedDate(day.dateString);
//   };

//   const markedDates = useMemo(() => {
//     if (!selectedDate) return {};
//     return {
//       [selectedDate]: {
//         selected: true,
//         selectedColor: ORANGE,
//         selectedTextColor: "#ffffff",
//       },
//     };
//   }, [selectedDate]);

//   const disabledContinue = !selectedDate || saving;

//   const handleContinue = async () => {
//     if (!selectedDate) return;
//     try {
//       setSaving(true);

//       const payload = {
//         departureDate: selectedDate,
//         displayDate: formatDisplayDate(selectedDate),
//         mode,
//       };

//       await saveTravelDates(payload);

//       /* 🔥 ONLY CHANGE: CONDITIONAL NAVIGATION */
//       if (isSchengen) {
//         navigation.navigate("SchengenPersonalDetails", {
//           travelDate: payload,
//         });
//       } else {
//         navigation.navigate("PhotoUploadScreen", {
//           travelDate: payload,
//         });
//       }
//     } catch (err) {
//       alert("Could not save date. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getDateAfterFiveDays = () => {
//     const currentDate = new Date();
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     return currentDate.toLocaleDateString("en-GB", options);
//   };

//   useEffect(() => {
//     setDate(getDateAfterFiveDays());
//   }, []);

//   return (
//     <ScreenWrapper style={styles.safe}>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
//         </TouchableOpacity>

//         <View style={styles.badge}>
//           <Ionicons
//             name="checkmark-circle"
//             size={moderateScale(16)}
//             color="#fff"
//           />
//           <Text style={styles.badgeText}>
//             Visa on <Text style={{ fontWeight: "700" }}>{date}</Text>
//           </Text>
//         </View>

//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("Tabs", { screen: "Destination" })
//           }
//         >
//           <Icon name="home" size={moderateScale(24)} color={ORANGE} />
//         </TouchableOpacity>
//       </View>

//       {/* STEPPER */}
//       <View style={styles.stepperRow}>
//         {[
//           { key: "dates", label: "Dates", icon: "calendar-blank" },
//           { key: "photo", label: "Photo", icon: "camera-outline" },
//           { key: "passport", label: "Passport", icon: "passport-biometric" },
//           { key: "detail", label: "Detail", icon: "account-outline" },
//           { key: "checkout", label: "Checkout", icon: "check-circle-outline" },
//         ].map((step, index) => {
//           const isActive = step.key === "dates";
//           const color = isActive ? ORANGE : "#A0A0A0";

//           return (
//             <View key={step.key} style={styles.stepItem}>
//               <MaterialCommunityIcons
//                 name={step.icon}
//                 size={moderateScale(22)}
//                 color={color}
//               />
//               <Text
//                 style={[
//                   styles.stepLabel,
//                   { color: isActive ? ORANGE : "#444" },
//                 ]}
//               >
//                 {step.label}
//               </Text>
//               {isActive && <View style={styles.stepUnderline} />}
//               {index < 4 && <View style={styles.stepConnector} />}
//             </View>
//           );
//         })}
//       </View>

//       {/* TITLE */}
//       <Text style={styles.question}>What is your departure date?</Text>

//       {/* MODE TOGGLE */}
//       <View style={styles.modeToggle}>
//         <TouchableOpacity
//           style={[
//             styles.modeButton,
//             mode === "fixed" && styles.modeButtonActive,
//           ]}
//           onPress={() => setMode("fixed")}
//         >
//           <Text
//             style={[
//               styles.modeText,
//               mode === "fixed" && styles.modeTextActive,
//             ]}
//           >
//             Fixed Date
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.modeButton,
//             mode === "flexible" && styles.modeButtonActive,
//           ]}
//           onPress={() => setMode("flexible")}
//         >
//           <Text
//             style={[
//               styles.modeText,
//               mode === "flexible" && styles.modeTextActive,
//             ]}
//           >
//             Flexible Date
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* CALENDAR */}
//       <Calendar
//         minDate={minDate}
//         maxDate={maxDate}
//         onDayPress={onDayPress}
//         markedDates={markedDates}
//         firstDay={1}
//         style={styles.calendar}
//         theme={{
//           selectedDayBackgroundColor: ORANGE,
//           todayTextColor: ORANGE,
//         }}
//       />

//       {/* FOOTER */}
//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={[
//             styles.continueButton,
//             disabledContinue && { opacity: 0.5 },
//           ]}
//           disabled={disabledContinue}
//           onPress={handleContinue}
//         >
//           <Text style={styles.continueText}>
//             {saving ? "Saving..." : "Continue"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   container: {
//     flex: 1,
//     paddingTop: hp("2%"),
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(10),
//     justifyContent: "space-between",
//   },
//   badge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: ORANGE,
//     paddingHorizontal: moderateScale(12),
//     paddingVertical: verticalScale(5),
//     borderRadius: 999,
//   },
//   badgeText: {
//     color: "#fff",
//     marginLeft: scale(6),
//     fontSize: RFValue(12),
//   },
//   stepperRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     paddingHorizontal: wp("2%"),
//     paddingBottom: verticalScale(6),
//   },
//   stepItem: {
//     flex: 1,
//     alignItems: "center",
//   },
//   stepLabel: {
//     fontSize: RFValue(10),
//     marginTop: verticalScale(4),
//   },
//   stepUnderline: {
//     marginTop: verticalScale(4),
//     height: verticalScale(2),
//     alignSelf: "stretch",
//     backgroundColor: ORANGE,
//   },
//   stepConnector: {
//     position: "absolute",
//     right: -verticalScale(6),
//     top: verticalScale(10),
//     width: wp("4%"),
//     height: scale(1),
//     backgroundColor: "#e0e0e0",
//   },
//   question: {
//     fontSize: RFValue(18),
//     fontWeight: "700",
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(12),
//   },
//   modeToggle: {
//     flexDirection: "row",
//     backgroundColor: "#f4f4f4",
//     marginHorizontal: wp("4%"),
//     borderRadius: 999,
//     padding: scale(3),
//   },
//   modeButton: {
//     flex: 1,
//     borderRadius: 999,
//     paddingVertical: verticalScale(10),
//     alignItems: "center",
//   },
//   modeButtonActive: {
//     backgroundColor: "#ffffff",
//     borderWidth: scale(1),
//     borderColor: ORANGE,
//   },
//   modeText: {
//     fontSize: RFValue(13),
//     color: "#666",
//   },
//   modeTextActive: {
//     color: ORANGE,
//     fontWeight: "700",
//   },
//   calendar: {
//     marginTop: verticalScale(12),
//     marginHorizontal: scale(2),
//   },
//   footer: {
//     paddingHorizontal: wp("4%"),
//     paddingVertical: verticalScale(12),
//   },
//   continueButton: {
//     backgroundColor: ORANGE,
//     borderRadius: 999,
//     paddingVertical: verticalScale(14),
//   },
//   continueText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: RFValue(16),
//     fontWeight: "700",
//   },
// });


import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

import { saveTravelDates } from "../../api/user/travelDateService";
import ScreenWrapper from "../../components/ScreenWrapper";

// ⭐ Responsive Helpers
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../../utils/metrics";

const ORANGE = "#FF5C00";

/* ---------------- HELPERS ---------------- */
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

function toYMD(date) {
  return date.toISOString().split("T")[0];
}

function formatDisplayDate(dateString) {
  const [y, m, d] = dateString.split("-");
  return `${d}/${m}/${y}`;
}

function formatBadgeDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


/* ===================== SCREEN ===================== */
export default function TravelDateScreen({ navigation, route }) {
  const selected = useSelector((state) => state.destinations.selected);
  const country = selected?.countrName || "Country";
  const visatype = route.params?.visaType;
  // console.log("VISATYPE=>", visatype)


  // 1️⃣ STATE HOOKS FIRST
  const [selectedDate, setSelectedDate] = useState(null);
  const [mode, setMode] = useState("fixed");
  const [saving, setSaving] = useState(false);

  // 2️⃣ MEMO HOOKS AFTER STATE
  const formattedSelectedDate = useMemo(() => {
    return selectedDate ? formatBadgeDate(selectedDate) : null;
  }, [selectedDate]);

  const today = useMemo(() => new Date(), []);
  const minDate = useMemo(() => toYMD(addDays(today, 3)), [today]);
  const maxDate = useMemo(() => toYMD(addMonths(today, 3)), [today]);

  // 3️⃣ REDUX / OTHER HOOKS
  const selectedDestination = useSelector(
    (state) => state.destinations.selected
  );

  const isSchengen =
    selectedDestination?.countryType?.toLowerCase() === "schengen";
const countryName =
  selectedDestination?.countrName?.toLowerCase();
  

  const SKIP_PHOTO_COUNTRIES = [
  "thailand",
  "malaysia",
  "sri-lanka",
  "maldives",
  "bhutan",
  "mauritius",
  "hong kong",
  "barbados",
];

const shouldSkipPhoto =
  SKIP_PHOTO_COUNTRIES.includes(countryName);

  const steps = [
  { key: "dates", label: "Dates", icon: "calendar-blank" },

  ...(shouldSkipPhoto
    ? []
    : [{ key: "photo", label: "Photo", icon: "camera-outline" }]),

  { key: "passport", label: "Passport", icon: "passport-biometric" },
  { key: "detail", label: "Detail", icon: "account-outline" },
  { key: "checkout", label: "Checkout", icon: "check-circle-outline" },
];


  // 4️⃣ HANDLERS (NOT HOOKS)
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: ORANGE,
        selectedTextColor: "#ffffff",
      },
    };
  }, [selectedDate]);

  const disabledContinue = !selectedDate || saving;


  const handleContinue = async () => {
    if (!selectedDate) return;

    try {
      setSaving(true);

      const payload = {
        departureDate: selectedDate,
        displayDate: formatDisplayDate(selectedDate),
        mode,
      };

      await saveTravelDates(payload);

      /* 🔥 CONDITIONAL FLOW */
      if (isSchengen) {
        navigation.navigate("SchengenFlowScreen", {
          country,
          travelDate: formattedSelectedDate,
          visatype,
        });

      } else if (shouldSkipPhoto) {
        // ✅ Thailand & Malaysia flow
        navigation.navigate("PassportUploadScreen", {
          travelDate: formattedSelectedDate,
          visatype,
        });

      } else {
        // ✅ All other countries
        navigation.navigate("PhotoUploadScreen", {
          travelDate: formattedSelectedDate,
          visatype,
        });
      }

    } catch (err) {
      alert("Could not save date. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return currentDate.toLocaleDateString("en-GB", options);
  };

  // useEffect(() => {
  //   setDate(getDateAfterFiveDays());
  // }, []);

  return (
    <ScreenWrapper style={styles.safe}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
        </TouchableOpacity>

        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={moderateScale(16)} color="#fff" />
          <Text style={styles.badgeText}>
            Visa on{" "}
            <Text style={{ fontWeight: "700" }}>
              {formattedSelectedDate || "Select date"}
            </Text>
          </Text>

        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
        >
          <Icon name="home" size={moderateScale(24)} color={ORANGE} />
        </TouchableOpacity>
      </View>

      {/* STEPPER */}
      <View style={styles.stepperRow}>
  {steps.map((step, index) => {
    const isActive = step.key === "dates";
    const color = isActive ? ORANGE : "#A0A0A0";

    return (
      <View key={step.key} style={styles.stepItem}>
        <MaterialCommunityIcons
          name={step.icon}
          size={moderateScale(22)}
          color={color}
        />
        <Text style={[styles.stepLabel, { color: isActive ? ORANGE : "#444" }]}>
          {step.label}
        </Text>
        {isActive && <View style={styles.stepUnderline} />}
        {index < steps.length - 1 && <View style={styles.stepConnector} />}
      </View>
    );
  })}
</View>


      {/* TITLE */}
      <Text style={styles.question}>What is your departure date?</Text>

      {/* MODE TOGGLE */}
      <View style={styles.modeToggle}>
        <TouchableOpacity
          style={[styles.modeButton, mode === "fixed" && styles.modeButtonActive]}
          onPress={() => setMode("fixed")}
        >
          <Text style={[styles.modeText, mode === "fixed" && styles.modeTextActive]}>
            Fixed Date
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, mode === "flexible" && styles.modeButtonActive]}
          onPress={() => setMode("flexible")}
        >
          <Text style={[styles.modeText, mode === "flexible" && styles.modeTextActive]}>
            Flexible Date
          </Text>
        </TouchableOpacity>
      </View>

      {/* CALENDAR */}
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={onDayPress}
        markedDates={markedDates}
        firstDay={1}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: ORANGE,
          todayTextColor: ORANGE,
        }}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, disabledContinue && { opacity: 0.5 }]}
          disabled={disabledContinue}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            {saving ? "Saving..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

/* ===================== STYLES ===================== */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: verticalScale(10),
    justifyContent: "space-between",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ORANGE,
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(5),
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    marginLeft: scale(6),
    fontSize: RFValue(12),
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: wp("2%"),
    paddingBottom: verticalScale(6),
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
  },
  stepLabel: {
    fontSize: RFValue(10),
    marginTop: verticalScale(4),
  },
  stepUnderline: {
    marginTop: verticalScale(4),
    height: verticalScale(2),
    alignSelf: "stretch",
    backgroundColor: ORANGE,
  },
  stepConnector: {
    position: "absolute",
    right: -verticalScale(6),
    top: verticalScale(10),
    width: wp("4%"),
    height: scale(1),
    backgroundColor: "#e0e0e0",
  },
  question: {
    fontSize: RFValue(18),
    fontWeight: "700",
    paddingHorizontal: wp("4%"),
    paddingVertical: verticalScale(12),
  },
  modeToggle: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    marginHorizontal: wp("4%"),
    borderRadius: 999,
    padding: scale(3),
  },
  modeButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: verticalScale(10),
    alignItems: "center",
  },
  modeButtonActive: {
    backgroundColor: "#ffffff",
    borderWidth: scale(1),
    borderColor: ORANGE,
  },
  modeText: {
    fontSize: RFValue(13),
    color: "#666",
  },
  modeTextActive: {
    color: ORANGE,
    fontWeight: "700",
  },
  calendar: {
    marginTop: verticalScale(12),
    marginHorizontal: scale(2),
  },
  footer: {
    paddingHorizontal: wp("4%"),
    paddingVertical: verticalScale(12),
  },
  continueButton: {
    backgroundColor: ORANGE,
    borderRadius: 999,
    paddingVertical: verticalScale(14),
  },
  continueText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "700",
  },
});
