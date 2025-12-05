// // // import React, { useState } from 'react';
// // // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // // import { launchImageLibrary } from 'react-native-image-picker';
// // // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // // import { parseMRZ } from '../../api/ocr/mrzParser';

// // // export default function PassportUploadScreen({ navigation }) {
// // //   const [imageUri, setImageUri] = useState(null);

// // //   const pickImage = async () => {
// // //     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

// // //     if (result?.assets?.length > 0) {
// // //       const base64 = result.assets[0].base64;
// // //       setImageUri(result.assets[0].uri);

// // //       const ocrText = await extractTextFromImage(base64);
// // //       const parsed = parseMRZ(ocrText);

// // //       navigation.navigate("PassportDetailsScreen", { data: parsed });
// // //     }
// // //   };

// // //   return (
// // //     <View style={{ flex: 1, padding: 20 }}>
// // //       {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200 }} />}

// // //       <TouchableOpacity onPress={pickImage} style={{ padding: 20, backgroundColor: "#2196F3" }}>
// // //         <Text style={{ color: "white", textAlign: "center" }}>Upload Passport</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // }

// // import React, { useState } from 'react';
// // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // import { parseMRZ } from '../../api/ocr/mrzParser';

// // export default function PassportUploadScreen({ navigation }) {
// //   const [frontImage, setFrontImage] = useState(null);
// //   const [backImage, setBackImage] = useState(null);
// //   const [frontParsed, setFrontParsed] = useState(null);
// //   const [backParsed, setBackParsed] = useState(null);

// //   const pickFront = async () => {
// //     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
// //     if (!res.assets) return;

// //     const base64 = res.assets[0].base64;
// //     setFrontImage(res.assets[0].uri);

// //     const text = await extractTextFromImage(base64);
// //     const mrzData = parseMRZ(text);
// //     setFrontParsed(mrzData);
// //   };

// //   const pickBack = async () => {
// //     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
// //     if (!res.assets) return;

// //     const base64 = res.assets[0].base64;
// //     setBackImage(res.assets[0].uri);

// //     const text = await extractTextFromImage(base64);

// //     // OPTIONAL: create back-side parser (address, parents name)
// //     const backDetails = { rawBackText: text };
// //     setBackParsed(backDetails);

// //     // navigation.navigate("PassportDetailsScreen", {
// //     //   front: frontParsed,
// //     //   back: backDetails,
// //     //   frontImage,
// //     //   backImage: res.assets[0].uri,
// //     // });
// //     navigation.navigate("PassportDetailsScreen", {
// //       frontData: frontParsed,
// //       backData: {},
// //       frontImage: imageUri,
// //       backImage: null
// //     });
// //   };

// //   return (
// //     <View style={{ flex: 1, padding: 20 }}>

// //       {!frontImage && (
// //         <TouchableOpacity onPress={pickFront} style={{ padding: 20, backgroundColor: "#2196F3" }}>
// //           <Text style={{ color: "white", textAlign: "center" }}>Upload FRONT Side</Text>
// //         </TouchableOpacity>
// //       )}

// //       {frontImage && !backImage && (
// //         <>
// //           <Image source={{ uri: frontImage }} style={{ width: "100%", height: 200 }} />
// //           <TouchableOpacity onPress={pickBack} style={{ padding: 20, backgroundColor: "green", marginTop: 20 }}>
// //             <Text style={{ color: "white", textAlign: "center" }}>Upload BACK Side</Text>
// //           </TouchableOpacity>
// //         </>
// //       )}

// //     </View>
// //   );
// // }


// // // import React, { useState } from 'react';
// // // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // // import { launchImageLibrary } from 'react-native-image-picker';
// // // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // // import { parseMRZ } from '../../api/ocr/mrzParser';

// // // export default function PassportUploadScreen({ navigation }) {
// // //   const [imageUri, setImageUri] = useState(null);

// // //   const pickImage = async () => {
// // //     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

// // //     if (result?.assets?.length > 0) {
// // //       const base64 = result.assets[0].base64;
// // //       setImageUri(result.assets[0].uri);

// // //       const ocrText = await extractTextFromImage(base64);
// // //       const parsed = parseMRZ(ocrText);

// // //       navigation.navigate("PassportDetailsScreen", { data: parsed });
// // //     }
// // //   };

// // //   return (
// // //     <View style={{ flex: 1, padding: 20 }}>
// // //       {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200 }} />}

// // //       <TouchableOpacity onPress={pickImage} style={{ padding: 20, backgroundColor: "#2196F3" }}>
// // //         <Text style={{ color: "white", textAlign: "center" }}>Upload Passport</Text>
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // }

// // import React, { useState } from 'react';
// // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // import { parseMRZ } from '../../api/ocr/mrzParser';
// // import { ScrollView } from 'react-native-gesture-handler';

// // export default function PassportUploadScreen({ navigation }) {
// //   const [frontImage, setFrontImage] = useState(null);
// //   const [backImage, setBackImage] = useState(null);
// //   const [frontParsed, setFrontParsed] = useState(null);
// //   const [backParsed, setBackParsed] = useState(null);

// //   const pickFront = async () => {
// //     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
// //     if (!res.assets) return;

// //     const base64 = res.assets[0].base64;
// //     setFrontImage(res.assets[0].uri);

// //     const text = await extractTextFromImage(base64);
// //     const mrzData = parseMRZ(text);
// //     setFrontParsed(mrzData);
// //   };

// //   const pickBack = async () => {
// //     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
// //     if (!res.assets) return;

// //     const base64 = res.assets[0].base64;
// //     setBackImage(res.assets[0].uri);

// //     const text = await extractTextFromImage(base64);

// //     // OPTIONAL: create back-side parser (address, parents name)
// //     const backDetails = { rawBackText: text };
// //     setBackParsed(backDetails);

// //     // navigation.navigate("PassportDetailsScreen", {
// //     //   front: frontParsed,
// //     //   back: backDetails,
// //     //   frontImage,
// //     //   backImage: res.assets[0].uri,
// //     // });
// //     navigation.navigate("PassportDetailsScreen", {
// //       frontData: frontParsed,
// //       backData: backParsed,
// //       frontImage: null,
// //       backImage: null
// //     });
// //   };

// //   return (
// //     <ScrollView horizontal={true}>
// //     <View style={{ flex: 1, padding: 20 }}>

// //       {!frontImage && (
// //         <TouchableOpacity onPress={pickFront} style={{ padding: 20, backgroundColor: "#2196F3" }}>
// //           <Text style={{ color: "white", textAlign: "center" }}>Upload FRONT Side</Text>
// //         </TouchableOpacity>
// //       )}

// //       {frontImage && !backImage && (
// //         <>
// //           <Image source={{ uri: frontImage }} style={{ width: "100%", height: 200 }} />
// //           <TouchableOpacity onPress={pickBack} style={{ padding: 20, backgroundColor: "green", marginTop: 20 }}>
// //             <Text style={{ color: "white", textAlign: "center" }}>Upload BACK Side</Text>
// //           </TouchableOpacity>
// //         </>
// //       )}

// //     </View>
// //     </ScrollView>
// //   );
// // }


// // import React, { useState } from 'react';
// // import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // import { parseMRZ } from '../../api/ocr/mrzParser';

// // export default function PassportUploadScreen({ navigation }) {
// //   const [imageUri, setImageUri] = useState(null);

// //   const pickImage = async () => {
// //     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

// //     if (!result?.assets?.length) return;

// //     const base64 = result.assets[0].base64;
// //     const uri = result.assets[0].uri;

// //     setImageUri(uri);

// //     try {
// //       // 1. Extract text
// //       const ocrText = await extractTextFromImage(base64);

// //       // 2. Parse MRZ
// //       const parsedFront = parseMRZ(ocrText);

// //       if (!parsedFront) {
// //         Alert.alert("OCR Failed", "Could not detect passport details. Try another image.");
// //         return;
// //       }

// //       // 3. Navigate to details screen
// //       navigation.navigate("PassportDetailsScreen", {
// //         frontData: parsedFront,
// //         backData: {},     // default empty
// //         frontImage: uri,
// //         backImage: null,  // default null
// //       });
// //     } catch (err) {
// //       console.log("OCR ERROR:", err);
// //       Alert.alert("Error", "Failed to scan passport.");
// //     }
// //   };

// //   return (
// //     <View style={{ flex: 1, padding: 20 }}>
// //       {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200 }} />}

// //       <TouchableOpacity onPress={pickImage} style={{ padding: 20, backgroundColor: "#2196F3" }}>
// //         <Text style={{ color: "white", textAlign: "center" }}>Upload Passport</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }



// // import React, { useState } from "react";
// // import {
// //   View,
// //   Image,
// //   TouchableOpacity,
// //   Text,
// //   Alert,
// //   ScrollView,
// // } from "react-native";
// // import { launchImageLibrary } from "react-native-image-picker";
// // import { extractTextFromImage } from "../../api/ocr/visionApi";
// // import { parseMRZ } from "../../api/ocr/mrzParser";

// // export default function PassportUploadScreen({ navigation }) {
// //   const [frontImageUri, setFrontImageUri] = useState(null);
// //   const [backImageUri, setBackImageUri] = useState(null);

// //   const [frontBase64, setFrontBase64] = useState(null);
// //   const [backBase64, setBackBase64] = useState(null);

// //   const pickFront = async () => {
// //     const result = await launchImageLibrary({
// //       mediaType: "photo",
// //       includeBase64: true,
// //     });

// //     if (!result?.assets?.length) return;

// //     setFrontImageUri(result.assets[0].uri);
// //     setFrontBase64(result.assets[0].base64);

// //     // Extract MRZ only from FRONT
// //     try {
// //       const ocrText = await extractTextFromImage(result.assets[0].base64);
// //       const parsed = parseMRZ(ocrText);

// //       if (!parsed) {
// //         Alert.alert("OCR Failed", "Could not detect passport MRZ.");
// //         return;
// //       }
// //     } catch (err) {
// //       console.log("OCR ERROR:", err);
// //       Alert.alert("OCR Error", "Failed to scan passport.");
// //     }
// //   };

// //   const pickBack = async () => {
// //     const result = await launchImageLibrary({
// //       mediaType: "photo",
// //       includeBase64: true,
// //     });

// //     if (!result?.assets?.length) return;
// //     navigation.navigate("PassportDetailsScreen", {
// //       frontData: parsed,
// //       backData: {},
// //       frontImageUri: result.assets[0].uri,
// //       backImageUri,
// //       frontBase64: result.assets[0].base64,
// //       backBase64,
// //     });
// //     setBackImageUri(result.assets[0].uri);
// //     setBackBase64(result.assets[0].base64);

// //     Alert.alert("Back image added!");
// //   };

// //   return (
// //     <View style={{ flex: 1, padding: 20 }}>
// //       <ScrollView horizontal>
// //         {frontImageUri && (
// //           <Image
// //             source={{ uri: frontImageUri }}
// //             style={{
// //               width: 200,
// //               height: 120,
// //               marginRight: 10,
// //               borderRadius: 6,
// //             }}
// //           />
// //         )}

// //         {backImageUri && (
// //           <Image
// //             source={{ uri: backImageUri }}
// //             style={{
// //               width: 200,
// //               height: 120,
// //               marginRight: 10,
// //               borderRadius: 6,
// //             }}
// //           />
// //         )}
// //       </ScrollView>

// //       <TouchableOpacity
// //         onPress={pickFront}
// //         style={{
// //           padding: 20,
// //           backgroundColor: "#4CAF50",
// //           marginVertical: 10,
// //           borderRadius: 8,
// //         }}
// //       >
// //         <Text style={{ color: "white", textAlign: "center" }}>
// //           Upload FRONT of Passport
// //         </Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         onPress={pickBack}
// //         style={{
// //           padding: 20,
// //           backgroundColor: "#2196F3",
// //           marginVertical: 10,
// //           borderRadius: 8,
// //         }}
// //       >
// //         <Text style={{ color: "white", textAlign: "center" }}>
// //           Upload BACK of Passport
// //         </Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }



// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   Text,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";

// export default function PassportUploadScreen({ navigation }) {
//   const [frontImageUri, setFrontImageUri] = useState(null);
//   const [backImageUri, setBackImageUri] = useState(null);

//   const [frontBase64, setFrontBase64] = useState(null);
//   const [backBase64, setBackBase64] = useState(null);

//   const [parsedFront, setParsedFront] = useState(null); // <-- FIX

//   // ---- PICK FRONT ----
//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!result?.assets?.length) return;

//     const asset = result.assets[0];

//     setFrontImageUri(asset.uri);
//     setFrontBase64(asset.base64);

//     try {
//       const ocrText = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(ocrText);

//       if (!parsed) {
//         Alert.alert("OCR Failed", "Could not read passport MRZ.");
//         return;
//       }

//       setParsedFront(parsed); // <-- SAVE PARSED RESULT
//       Alert.alert("Success", "Front side scanned successfully!");

//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };

//   // ---- PICK BACK ----
//   const pickBack = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!result?.assets?.length) return;

//     const asset = result.assets[0];

//     setBackImageUri(asset.uri);
//     setBackBase64(asset.base64);

//     Alert.alert("Back side added!");

//     // ❗ Navigate ONLY when both images + parsed MRZ exist
//     if (!parsedFront) {
//       Alert.alert("Scan Front First", "Please upload the FRONT side before saving.");
//       return;
//     }

//     navigation.navigate("PassportDetailsScreen", {
//       frontData: parsedFront,
//       backData: {},

//       frontImageUri,
//       backImageUri: asset.uri,

//       frontBase64,
//       backBase64: asset.base64,
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {/* Preview Images */}
//       <ScrollView horizontal>
//         {frontImageUri && (
//           <Image
//             source={{ uri: frontImageUri }}
//             style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
//           />
//         )}
//         {backImageUri && (
//           <Image
//             source={{ uri: backImageUri }}
//             style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
//           />
//         )}
//       </ScrollView>

//       <TouchableOpacity
//         onPress={pickFront}
//         style={{
//           padding: 20,
//           backgroundColor: "#4CAF50",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload passport size photo
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={pickFront}
//         style={{
//           padding: 20,
//           backgroundColor: "#4CAF50",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload FRONT of Passport
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={pickBack}
//         style={{
//           padding: 20,
//           backgroundColor: "#2196F3",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload BACK of Passport
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


// import React, { useState } from "react";
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   Text,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";


// export default function PassportUploadScreen({ navigation ,route}) {
//     const visaPreferences = route?.params?.visaPreferences || null;
//     const uploadedPhoto = route?.params?.uploadedPhoto || null;

// console.log("UPLOAD==>",visaPreferences)
//   const [photoUri, setPhotoUri] = useState(null);
//   const [photoBase64, setPhotoBase64] = useState(null);

//   const [frontImageUri, setFrontImageUri] = useState(null);
//   const [backImageUri, setBackImageUri] = useState(null);

//   const [frontBase64, setFrontBase64] = useState(null);
//   const [backBase64, setBackBase64] = useState(null);

//   const [parsedFront, setParsedFront] = useState(null); 


//   // 📌 1. PICK PASSPORT SIZE PHOTO
//   const pickPhoto = async () => {
//     const res = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!res?.assets) return;

//     const asset = res.assets[0];

//     setPhotoUri(asset.uri);
//     setPhotoBase64(asset.base64);

//     Alert.alert("Success", "Photo uploaded successfully!");
//   };


//   // 📌 2. PICK FRONT SIDE
//   const pickFront = async () => {
//     const res = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!res?.assets) return;

//     const asset = res.assets[0];

//     setFrontImageUri(asset.uri);
//     setFrontBase64(asset.base64);

//     try {
//       const ocrText = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(ocrText);

//       if (!parsed) {
//         Alert.alert("OCR Error", "Failed to read passport MRZ.");
//         return;
//       }

//       setParsedFront(parsed);
//       Alert.alert("Success", "Front side scanned successfully!");

//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };


//   // 📌 3. PICK BACK SIDE → Navigate to next screen
//   const pickBack = async () => {
//     const res = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!res?.assets) return;

//     const asset = res.assets[0];

//     setBackImageUri(asset.uri);
//     setBackBase64(asset.base64);

//     if (!parsedFront) {
//       Alert.alert("Upload Front First", "Please scan the FRONT side first.");
//       return;
//     }

//     // Navigate to details screen
//     navigation.navigate("PassportDetailsScreen", {
//       frontData: parsedFront,
//       backData: {},
//       photoUri,
//       frontImageUri,
//       backImageUri: asset.uri,
//       photoBase64,
//       frontBase64,
//       backBase64: asset.base64,
//       visa:visaPreferences
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>

//       {/* Preview Images */}
//       <ScrollView horizontal>
//         {photoUri && (
//           <Image
//             source={{ uri: photoUri }}
//             style={{ width: 120, height: 120, marginRight: 10, borderRadius: 8 }}
//           />
//         )}
//         {frontImageUri && (
//           <Image
//             source={{ uri: frontImageUri }}
//             style={{ width: 200, height: 120, marginRight: 10, borderRadius: 8 }}
//           />
//         )}
//         {backImageUri && (
//           <Image
//             source={{ uri: backImageUri }}
//             style={{ width: 200, height: 120, marginRight: 10, borderRadius: 8 }}
//           />
//         )}
//       </ScrollView>


//       {/* 📌 Upload Photo */}
//       <TouchableOpacity
//         onPress={pickPhoto}
//         style={{
//           padding: 20,
//           backgroundColor: "#8E44AD",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload Passport Size Photo
//         </Text>
//       </TouchableOpacity>


//       {/* 📌 Upload Front */}
//       <TouchableOpacity
//         onPress={pickFront}
//         style={{
//           padding: 20,
//           backgroundColor: "#4CAF50",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload FRONT of Passport
//         </Text>
//       </TouchableOpacity>


//       {/* 📌 Upload Back */}
//       <TouchableOpacity
//         onPress={pickBack}
//         style={{
//           padding: 20,
//           backgroundColor: "#2196F3",
//           marginVertical: 10,
//           borderRadius: 8,
//         }}
//       >
//         <Text style={{ color: "white", textAlign: "center" }}>
//           Upload BACK of Passport
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// src/screens/passport/PassportUploadScreen.js
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";
// import { uploadPassportImage, savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportUploadScreen({ navigation, route }) {
//   // optional: coming from TravelDateScreen / PhotoUploadScreen
//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.photoUrl || null;
//   console.log("PAYLOAD==>", photoUrl)
//   const [front, setFront] = useState(null);
//   const [back, setBack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mrzData, setMrzData] = useState(null);

//   // pick FRONT image + OCR
//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//       quality: 0.9,
//     });

//     if (!result.assets) return;

//     const asset = result.assets[0];
//     setFront(asset);

//     try {
//       if (!asset.base64) {
//         Alert.alert("Error", "No image base64 found.");
//         return;
//       }
//       const text = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(text);

//       if (!parsed) {
//         Alert.alert("OCR Failed", "Could not read passport MRZ. Try another photo.");
//         return;
//       }

//       setMrzData(parsed);
//       // Alert.alert("Success", "Front image scanned successfully.");
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };

//   // pick BACK image
//   const pickBack = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       quality: 0.9,
//     });

//     if (!result.assets) return;

//     const asset = result.assets[0];
//     setBack(asset);
//     //Alert.alert("Success", "Back image selected.");
//   };

//   const onContinue = async () => {
//     if (!front || !back) {
//       Alert.alert("Upload Required", "Please upload both front and back images.");
//       return;
//     }
//     if (!mrzData) {
//       Alert.alert("Scan Required", "Please make sure front page was scanned successfully.");
//       return;
//     }

//     try {
//       setLoading(true);

//       // upload images to Storage
//       const frontUrl = await uploadPassportImage(front, "front");
//       const backUrl = await uploadPassportImage(back, "back");

//       const passportPayload = {
//         ...mrzData,          // parsed MRZ fields (firstName, lastName, passportNumber, etc.)
//         frontImageURL: frontUrl,
//         backImageURL: backUrl,
//         travel,
//         photoUrl
//       };

//       const docRef = await savePassportData(passportPayload);

//       setLoading(false);

//       // go to detail screen with all info

//       // navigation.navigate("PassportDetailsScreen", {
//       //   passport: { id: docRef.id, ...passportPayload },
//       //   travel,
//       //   photoUrl,
//       // });

//       if (route?.params?.editMode || addMode) {
//         navigation.navigate(route.params.returnTo, {
//           updatedPassport : {...passportPayload },
//           travelDate: route.params.travelDate,
//           photoUrl
//         });
//         return;
//       } else {
//         navigation.navigate("PassportDetailsScreen", {
//           passport: { id: docRef.id, ...passportPayload },
//           travel,
//           photoUrl,
//         });
//       }

//     } catch (err) {
//       console.log("PASSPORT SAVE ERROR:", err);
//       setLoading(false);
//       Alert.alert("Error", "Failed to save passport data.");
//     }
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

//   {/* Passport (current) */}
//   <View style={styles.stepItem}>
//     <Icon name="check-circle" size={22} color={ORANGE} />
//     <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Detail */}
//   <View style={styles.stepItem}>
//     <Icon name="radio-button-unchecked" size={22} color="#777" />
//     <Text style={styles.stepLabel}>Detail</Text>
//   </View>
//   <View style={styles.line} />

//   {/* Checkout */}
//   <View style={styles.stepItem}>
//     <Icon name="radio-button-unchecked" size={22} color="#777" />
//     <Text style={styles.stepLabel}>Checkout</Text>
//   </View>
// </View>

//       {/* CONTENT */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>
//           The government requires the front & back pages of your passport
//         </Text>

//         {/* small security banner (simplified) */}
//         <View style={styles.securityBox}>
//           <Icon name="verified-user" size={18} color={ORANGE} />
//           <Text style={styles.securityText}>
//             AES-256 encrypted maximum security
//           </Text>
//         </View>

//         {/* Upload from device block */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Upload from device</Text>

//           {/* FRONT */}
//           <View style={{ marginTop: 16 }}>
//             <Text style={styles.label}>Front page</Text>
//             {front && (
//               <Image
//                 source={{ uri: front.uri }}
//                 style={styles.preview}
//                 resizeMode="cover"
//               />
//             )}
//             <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
//               <Text style={styles.primaryButtonText}>
//                 {front ? "Change front image" : "Select passport front image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* BACK */}
//           <View style={{ marginTop: 24 }}>
//             <Text style={styles.label}>Back page</Text>
//             {back && (
//               <Image
//                 source={{ uri: back.uri }}
//                 style={styles.preview}
//                 resizeMode="cover"
//               />
//             )}
//             <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
//               <Text style={styles.secondaryButtonText}>
//                 {back ? "Change back image" : "Select passport back image"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Bottom Upload button */}
//       <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
//         <Text style={styles.bottomButtonText}>
//           {loading ? "Saving..." : "Continue"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const ORANGE_LIGHT = "#FFE1CC";

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
//     fontSize: 18,
//     fontWeight: "700",
//     marginTop: 30,
//     marginBottom: 15,
//   },
//   securityBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: ORANGE_LIGHT,
//     padding: 10,
//     borderRadius: 10,
//   },
//   securityText: {
//     marginLeft: 8,
//     color: "#333",
//     fontSize: 13,
//     fontWeight: "500",
//   },
//   card: {
//     marginTop: 20,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 16,
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     marginBottom: 6,
//   },
//   preview: {
//     width: "100%",
//     height: 140,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: "#eee",
//   },
//   primaryButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   primaryButtonText: {
//     color: "white",
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   secondaryButton: {
//     borderWidth: 1,
//     borderColor: ORANGE,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   secondaryButtonText: {
//     color: ORANGE,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   bottomButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   bottomButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";
// import { uploadPassportImage, savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportUploadScreen({ navigation, route }) {
//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.photoUrl || null;

//   // addMode / editMode flags
//   const addMode = route?.params?.addMode || false;
//   const editMode = route?.params?.editMode || false;

//   console.log("PASSPORT UPLOAD SCREEN => addMode:", addMode);

//   const [front, setFront] = useState(null);
//   const [back, setBack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mrzData, setMrzData] = useState(null);

//   // PICK FRONT
//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//       quality: 0.9,
//     });

//     if (!result.assets) return;
//     const asset = result.assets[0];
//     setFront(asset);

//     try {
//       if (!asset.base64) {
//         Alert.alert("Error", "No image base64 found.");
//         return;
//       }
//       const text = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(text);

//       if (!parsed) {
//         Alert.alert("OCR Failed", "Could not read passport MRZ. Try another photo.");
//         return;
//       }
//       setMrzData(parsed);
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };

//   // PICK BACK
//   const pickBack = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       quality: 0.9,
//     });

//     if (!result.assets) return;
//     const asset = result.assets[0];
//     setBack(asset);
//   };

//   // Continue upload SAVE
//   const onContinue = async () => {
//     if (!front || !back) {
//       Alert.alert("Upload Required", "Please upload both front & back images.");
//       return;
//     }
//     if (!mrzData) {
//       Alert.alert("Scan Required", "Please ensure MRZ scan succeeded.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const frontUrl = await uploadPassportImage(front, "front");
//       const backUrl = await uploadPassportImage(back, "back");

//       const passportPayload = {
//         ...mrzData,
//         frontImageURL: frontUrl,
//         backImageURL: backUrl,
//         travel,
//         photoUrl,
//       };

//       const docRef = await savePassportData(passportPayload);
//       setLoading(false);

//       // ================= NEW CO-PASSENGER FLOW ==================
//       // if (addMode) {
//       //   console.log("ADDING CO TRAVELLER RETURN");

//       //   const newTraveller = {
//       //     id: docRef.id,
//       //     ...passportPayload,
//       //   };

//       //   navigation.navigate("PassportDetailsScreen", {
//       //     passport: route?.params?.passport, // original main traveller
//       //     travelDate: route?.params?.travelDate,
//       //     photoUrl: route?.params?.photoUrl,
//       //     coTravellers: [
//       //       ...(route?.params?.coTravellers || []),
//       //       newTraveller,
//       //     ],
//       //   });

//       //   return;
//       // }

//       // ================= NEW CO-PASSENGER FLOW ==================
//       // ================= NEW CO-PASSENGER FLOW ==================
//       if (addMode) {
//         console.log("ADDING CO TRAVELLER RETURN");

//         const newTraveller = {
//           id: docRef.id,
//           ...passportPayload,
//         };

//         navigation.navigate("PassportDetailsScreen", {
//           passport: route?.params?.passport, // keep original main traveller
//           travelDate: travel,
//           photoUrl,
//           coTravellers: [
//             ...(route?.params?.coTravellers || []),
//             newTraveller,   // just append
//           ],
//         });

//         return;
//       }


//       // ================= EDIT MODE ==================
//       if (editMode) {
//         navigation.navigate(route.params.returnTo, {
//           updatedPassport: { ...passportPayload },
//           travelDate: route.params.travelDate,
//           photoUrl,
//         });
//         return;
//       }

//       // ================= PRIMARY NEW FLOW ==================
//       navigation.navigate("PassportDetailsScreen", {
//         passport: { id: docRef.id, ...passportPayload },
//         travel,
//         photoUrl,
//         coTravellers: [],
//       });
//     } catch (err) {
//       console.log("PASSPORT SAVE ERROR:", err);
//       setLoading(false);
//       Alert.alert("Error", "Failed to save passport.");
//     }
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
//       {/* <View style={styles.progressContainer}>
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
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Detail</Text>
//         </View>
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

//         {/* Passport (current) */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Detail */}
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Detail</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Checkout */}
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Checkout</Text>
//         </View>
//       </View>


//       {/* CONTENT */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>
//           The government requires the front & back pages of your passport
//         </Text>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Upload from device</Text>

//           {/* FRONT */}
//           <View style={{ marginTop: 16 }}>
//             <Text style={styles.label}>Front page</Text>
//             {front && <Image source={{ uri: front.uri }} style={styles.preview} />}
//             <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
//               <Text style={styles.primaryButtonText}>
//                 {front ? "Change front image" : "Select passport front image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* BACK */}
//           <View style={{ marginTop: 24 }}>
//             <Text style={styles.label}>Back page</Text>
//             {back && <Image source={{ uri: back.uri }} style={styles.preview} />}
//             <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
//               <Text style={styles.secondaryButtonText}>
//                 {back ? "Change back image" : "Select passport back image"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
//         <Text style={styles.bottomButtonText}>
//           {loading ? "Saving..." : "Continue"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const ORANGE_LIGHT = "#FFE1CC";

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   stepBadge: { flexDirection: "row", alignItems: "center", backgroundColor: ORANGE, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
//   stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },
//   progressContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "center" },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: { fontSize: 18, fontWeight: "700", marginTop: 30, marginBottom: 15 },
//   card: { marginTop: 20, backgroundColor: "#F8F8F8", borderRadius: 16, padding: 16 },
//   sectionTitle: { fontSize: 16, fontWeight: "700" },
//   label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
//   preview: { width: "100%", height: 140, borderRadius: 10, marginBottom: 10, backgroundColor: "#eee" },
//   primaryButton: { backgroundColor: ORANGE, paddingVertical: 12, borderRadius: 10 },
//   primaryButtonText: { color: "white", textAlign: "center", fontWeight: "600" },
//   secondaryButton: { borderWidth: 1, borderColor: ORANGE, paddingVertical: 12, borderRadius: 10 },
//   secondaryButtonText: { color: ORANGE, textAlign: "center", fontWeight: "600" },
//   bottomButton: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 12, marginTop: 10 },
//   bottomButtonText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "700" },
// });


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";
// import { uploadPassportImage, savePassportData } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";

// export default function PassportUploadScreen({ navigation, route }) {
//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.photoUrl || null;

//   const addMode = route?.params?.addMode || false;
//   const editMode = route?.params?.editMode || false;

//   const [front, setFront] = useState(null);
//   const [back, setBack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mrzData, setMrzData] = useState(null);

//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//       quality: 0.9,
//     });

//     if (!result.assets) return;
//     const asset = result.assets[0];
//     setFront(asset);

//     try {
//       if (!asset.base64) {
//         Alert.alert("Error", "No image base64 found.");
//         return;
//       }
//       const text = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(text);

//       if (!parsed) {
//         Alert.alert("OCR Failed", "Could not read passport MRZ. Try another photo.");
//         return;
//       }
//       setMrzData(parsed);
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };

//   const pickBack = async () => {
//     const result = await launchImageLibrary({ mediaType: "photo", quality: 0.9 });
//     if (!result.assets) return;
//     setBack(result.assets[0]);
//   };

//   const onContinue = async () => {
//     if (!front || !back) {
//       Alert.alert("Upload Required", "Please upload both front & back images.");
//       return;
//     }
//     if (!mrzData) {
//       Alert.alert("Scan Required", "Please ensure MRZ scan succeeded.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const frontUrl = await uploadPassportImage(front, "front");
//       const backUrl = await uploadPassportImage(back, "back");

//       const passportPayload = {
//         ...mrzData,
//         frontImageURL: frontUrl,
//         backImageURL: backUrl,
//         travel,
//         photoUrl,
//       };

//       const docRef = await savePassportData(passportPayload);
//       setLoading(false);

//       // if (addMode) {
//       //   const newTraveller = { id: docRef.id, ...passportPayload };

//       //   navigation.navigate("PassportDetailsScreen", {
//       //     passport: route?.params?.passport, // keep original traveller unchanged
//       //     travelDate: travel,
//       //     photoUrl,
//       //     coTravellers: [
//       //       ...(route?.params?.coTravellers || []),
//       //       newTraveller,
//       //     ],
//       //   });

//       //   return;
//       // }

//       // ================= NEW CO-PASSENGER FLOW ==================
//       if (addMode) {
//         console.log("ADDING CO TRAVELLER RETURN");

//         const newTraveller = {
//           id: docRef.id,
//           firstName: mrzData.firstName,
//           lastName: mrzData.lastName,
//           passportNumber: mrzData.passportNumber,
//           nationality: mrzData.nationality,
//           birthDate: mrzData.birthDate,
//           expiryDate: mrzData.expiryDate,

//           // FIX: include photo and passport image urls
//           photoUrl: photoUrl,
//           frontImageURL: frontUrl,
//           backImageURL: backUrl,
//         };

//         navigation.navigate("PassportDetailsScreen", {
//           passport: route?.params?.passport,
//           travelDate: route?.params?.travelDate,
//           photoUrl: route?.params?.photoUrl,
//           coTravellers: [
//             ...(route?.params?.coTravellers || []),
//             newTraveller,
//           ],
//         });

//         return;
//       }


//       // if (editMode) {
//       //   navigation.navigate(route.params.returnTo, {
//       //     updatedPassport: { ...passportPayload },
//       //     travelDate: route.params.travelDate,
//       //     photoUrl,
//       //   });
//       //   return;
//       // }

//       // ================= EDIT MODE ==================
//       if (editMode) {
//         navigation.navigate(route.params.returnTo, {
//           editedDocument: {
//             frontImageURL: frontUrl,
//             backImageURL: backUrl,
//             // do NOT send photoUrl or overwrite passport unless photo editing
//           },
//           coTravellers: route.params?.coTravellers || [],
//           travelDate: route.params.travelDate,
//         });
//         return;
//       }


//       navigation.navigate("PassportDetailsScreen", {
//         passport: { id: docRef.id, ...passportPayload },
//         travel,
//         photoUrl,
//         coTravellers: [],
//       });
//     } catch (err) {
//       console.log("PASSPORT SAVE ERROR:", err);
//       setLoading(false);
//       Alert.alert("Error", "Failed to save passport.");
//     }
//   };

//   return (
//     <View style={styles.container}>
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
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Detail</Text>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Checkout</Text>
//         </View>
//       </View>

//       <ScrollView>
//         <Text style={styles.title}>
//           The government requires the front & back pages of your passport
//         </Text>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Upload from device</Text>

//           <View style={{ marginTop: 16 }}>
//             <Text style={styles.label}>Front page</Text>
//             {front && <Image source={{ uri: front.uri }} style={styles.preview} />}
//             <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
//               <Text style={styles.primaryButtonText}>
//                 {front ? "Change front image" : "Select passport front image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ marginTop: 24 }}>
//             <Text style={styles.label}>Back page</Text>
//             {back && <Image source={{ uri: back.uri }} style={styles.preview} />}
//             <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
//               <Text style={styles.secondaryButtonText}>
//                 {back ? "Change back image" : "Select passport back image"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
//         <Text style={styles.bottomButtonText}>{loading ? "Saving..." : "Continue"}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const ORANGE_LIGHT = "#FFE1CC";

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   topNav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   stepBadge: { flexDirection: "row", backgroundColor: ORANGE, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
//   stepBadgeText: { color: "white", fontWeight: "600", marginLeft: 6 },
//   progressContainer: { flexDirection: "row", alignItems: "center", marginTop: 20, justifyContent: "center" },
//   stepItem: { alignItems: "center" },
//   stepLabel: { fontSize: 12, color: "#777", marginTop: 4 },
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: { fontSize: 18, fontWeight: "700", marginTop: 30 },
//   card: { marginTop: 20, backgroundColor: "#F8F8F8", borderRadius: 16, padding: 16 },
//   sectionTitle: { fontSize: 16, fontWeight: "700" },
//   label: { marginBottom: 6, fontWeight: "600" },
//   preview: { width: "100%", height: 140, backgroundColor: "#eee", marginBottom: 10, borderRadius: 10 },
//   primaryButton: { backgroundColor: ORANGE, paddingVertical: 12, borderRadius: 10 },
//   primaryButtonText: { color: "white", textAlign: "center", fontWeight: "600" },
//   secondaryButton: { borderWidth: 1, borderColor: ORANGE, paddingVertical: 12, borderRadius: 10 },
//   secondaryButtonText: { color: ORANGE, textAlign: "center", fontWeight: "600" },
//   bottomButton: { backgroundColor: ORANGE, paddingVertical: 16, borderRadius: 12, marginTop: 10 },
//   bottomButtonText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "700" },
// });



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import { extractTextFromImage } from "../../api/ocr/visionApi";
// import { parseMRZ } from "../../api/ocr/mrzParser";
// import {
//   uploadPassportImage,
//   savePassportData,
// } from "../../api/user/passportService";

// const ORANGE = "#FF5C00";
// const ORANGE_LIGHT = "#FFE1CC";

// export default function PassportUploadScreen({ navigation, route }) {
//   // From previous screens
//   const travel = route?.params?.travelDate || null;
//   const photoUrl = route?.params?.photoUrl || null;

//   const addMode = route?.params?.addMode || false;
//   const editMode = route?.params?.editMode || false;

//   // Existing main traveller + co-travellers (if any)
//   const mainPassportFromRoute =
//     route?.params?.passport ||
//     route?.params?.passportState ||
//     null;
//   const existingCoTravellers = route?.params?.coTravellers || [];

//   const [front, setFront] = useState(null);
//   const [back, setBack] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [mrzData, setMrzData] = useState(null);

//   // PICK FRONT
//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//       quality: 0.9,
//     });

//     if (!result.assets) return;
//     const asset = result.assets[0];
//     setFront(asset);

//     try {
//       if (!asset.base64) {
//         Alert.alert("Error", "No image base64 found.");
//         return;
//       }
//       const text = await extractTextFromImage(asset.base64);
//       const parsed = parseMRZ(text);

//       if (!parsed) {
//         Alert.alert(
//           "OCR Failed",
//           "Could not read passport MRZ. Try another photo."
//         );
//         return;
//       }
//       setMrzData(parsed);
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport front.");
//     }
//   };

//   // PICK BACK
//   const pickBack = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       quality: 0.9,
//     });

//     if (!result.assets) return;
//     const asset = result.assets[0];
//     setBack(asset);
//   };

//   // CONTINUE / SAVE
//   const onContinue = async () => {
//     if (!front || !back) {
//       Alert.alert("Upload Required", "Please upload both front & back images.");
//       return;
//     }
//     if (!mrzData) {
//       Alert.alert("Scan Required", "Please ensure MRZ scan succeeded.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const frontUrl = await uploadPassportImage(front, "front");
//       const backUrl = await uploadPassportImage(back, "back");

//       const passportPayload = {
//         ...mrzData,
//         frontImageURL: frontUrl,
//         backImageURL: backUrl,
//         travel,
//         photoUrl, // THIS is the photo for this specific traveller
//       };

//       const docRef = await savePassportData(passportPayload);
//       setLoading(false);

//       // ================ ADD CO-TRAVELLER FLOW =================
//       if (addMode) {
//         console.log("ADDING CO TRAVELLER");

//         const newTraveller = {
//           id: docRef.id,
//           ...passportPayload, // includes this co-traveller's photoUrl
//         };

//         navigation.navigate("PassportDetailsScreen", {
//           // Keep existing main traveller exactly as it was
//           passport: mainPassportFromRoute,
//           travelDate: route?.params?.travelDate || travel,
//           // DO NOT send `photoUrl` here to avoid overwriting main traveller photo
//           coTravellers: [...existingCoTravellers, newTraveller],
//         });

//         return;
//       }

//       // ================ EDIT MODE (MAIN PASSPORT) =================
//       if (editMode) {
//         navigation.navigate(route.params.returnTo, {
//           updatedPassport: {
//             id: docRef.id,
//             ...passportPayload,
//           },
//           travelDate: route.params.travelDate || travel,
//           // Preserve existing co-travellers
//           coTravellers: existingCoTravellers,
//         });
//         return;
//       }

//       // ================ PRIMARY NEW FLOW (FIRST TRAVELLER) ================
//       navigation.navigate("PassportDetailsScreen", {
//         passport: { id: docRef.id, ...passportPayload },
//         travelDate: travel,
//         // For first time we still send photoUrl, but also it's inside passportPayload
//         photoUrl,
//         coTravellers: [],
//       });
//     } catch (err) {
//       console.log("PASSPORT SAVE ERROR:", err);
//       setLoading(false);
//       Alert.alert("Error", "Failed to save passport.");
//     }
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

//         {/* Passport (current) */}
//         <View style={styles.stepItem}>
//           <Icon name="check-circle" size={22} color={ORANGE} />
//           <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Detail */}
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Detail</Text>
//         </View>
//         <View style={styles.line} />

//         {/* Checkout */}
//         <View style={styles.stepItem}>
//           <Icon name="radio-button-unchecked" size={22} color="#777" />
//           <Text style={styles.stepLabel}>Checkout</Text>
//         </View>
//       </View>

//       {/* CONTENT */}
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <Text style={styles.title}>
//           The government requires the front & back pages of your passport
//         </Text>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Upload from device</Text>

//           {/* FRONT */}
//           <View style={{ marginTop: 16 }}>
//             <Text style={styles.label}>Front page</Text>
//             {front && (
//               <Image source={{ uri: front.uri }} style={styles.preview} />
//             )}
//             <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
//               <Text style={styles.primaryButtonText}>
//                 {front ? "Change front image" : "Select passport front image"}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* BACK */}
//           <View style={{ marginTop: 24 }}>
//             <Text style={styles.label}>Back page</Text>
//             {back && (
//               <Image source={{ uri: back.uri }} style={styles.preview} />
//             )}
//             <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
//               <Text style={styles.secondaryButtonText}>
//                 {back ? "Change back image" : "Select passport back image"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
//         <Text style={styles.bottomButtonText}>
//           {loading ? "Saving..." : "Continue"}
//         </Text>
//       </TouchableOpacity>
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
//   line: { width: 30, height: 2, backgroundColor: ORANGE, marginHorizontal: 5 },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginTop: 30,
//     marginBottom: 15,
//   },
//   card: {
//     marginTop: 20,
//     backgroundColor: "#F8F8F8",
//     borderRadius: 16,
//     padding: 16,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "700" },
//   label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
//   preview: {
//     width: "100%",
//     height: 140,
//     borderRadius: 10,
//     marginBottom: 10,
//     backgroundColor: "#eee",
//   },
//   primaryButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   primaryButtonText: { color: "white", textAlign: "center", fontWeight: "600" },
//   secondaryButton: {
//     borderWidth: 1,
//     borderColor: ORANGE,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   secondaryButtonText: {
//     color: ORANGE,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   bottomButton: {
//     backgroundColor: ORANGE,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   bottomButtonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "700",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";

import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";
import {
  uploadPassportImage,
  savePassportData,
} from "../../api/user/passportService";

const ORANGE = "#FF5C00";
const ORANGE_LIGHT = "#FFE1CC";

export default function PassportUploadScreen({ navigation, route }) {
  const travel = route?.params?.travelDate || null;

  // current traveller photo (main or co-traveller)
  const currentPhotoUrl = route?.params?.photoUrl || null;

  // main traveller photo (for when we are adding co-traveller)
  const mainPhotoUrl =
    route?.params?.mainPhotoUrl ||
    route?.params?.passport?.photoUrl ||
    null;

  // flags
  const addMode = route?.params?.addMode || false; // adding co-traveller
  const editMode = route?.params?.editMode || false; // editing main passport

  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mrzData, setMrzData] = useState(null);

  // PICK FRONT
  const pickFront = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
      quality: 0.9,
    });

    if (!result.assets) return;
    const asset = result.assets[0];
    setFront(asset);

    try {
      if (!asset.base64) {
        Alert.alert("Error", "No image base64 found.");
        return;
      }
      const text = await extractTextFromImage(asset.base64);
      const parsed = parseMRZ(text);

      if (!parsed) {
        Alert.alert("OCR Failed", "Could not read passport MRZ. Try another photo.");
        return;
      }
      setMrzData(parsed);
    } catch (err) {
      console.log("OCR ERROR:", err);
      Alert.alert("Error", "Failed to scan passport front.");
    }
  };

  // PICK BACK
  const pickBack = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.9,
    });

    if (!result.assets) return;
    const asset = result.assets[0];
    setBack(asset);
  };

  // Continue upload SAVE
  const onContinue = async () => {
    if (!front || !back) {
      Alert.alert("Upload Required", "Please upload both front & back images.");
      return;
    }
    if (!mrzData) {
      Alert.alert("Scan Required", "Please ensure MRZ scan succeeded.");
      return;
    }

    try {
      setLoading(true);

      const frontUrl = await uploadPassportImage(front, "front");
      const backUrl = await uploadPassportImage(back, "back");

      const passportPayload = {
        ...mrzData,
        frontImageURL: frontUrl,
        backImageURL: backUrl,
        travel,
        photoUrl: currentPhotoUrl, // photo of the traveller going through this screen
      };

      // ===================== ADD CO-TRAVELLER FLOW =====================
      if (addMode) {
        console.log("ADDING CO-TRAVELLER");

        const newTraveller = {
          id: Date.now().toString(),
          ...passportPayload,
        };

        const existingCoTravellers = route?.params?.coTravellers || [];
        const mainPassport = route?.params?.passport || {};

        navigation.navigate("PassportDetailsScreen", {
          // keep original main passenger as-is
          passport: mainPassport,
          travelDate: route?.params?.travelDate,
          // very important: keep main traveller photo, not co-traveller photo
          photoUrl: mainPhotoUrl || mainPassport.photoUrl || currentPhotoUrl,
          // append new co-traveller
          coTravellers: [...existingCoTravellers, newTraveller],
        });

        setLoading(false);
        return;
      }

      // ===================== EDIT (MAIN PASSPORT) FLOW =====================
      // ===================== EDIT MAIN PASSPORT FLOW =====================
      if (editMode) {
        console.log("EDIT MAIN PASSPORT");

        const existingPassport = route?.params?.passport || {};

        const updatedPassport = {
          ...existingPassport,
          // only update document-related fields
          frontImageURL: frontUrl,
          backImageURL: backUrl,
          birthDate: mrzData?.birthDate || existingPassport.birthDate,
          expiryDate: mrzData?.expiryDate || existingPassport.expiryDate,
          passportNumber: mrzData?.passportNumber || existingPassport.passportNumber,
        };

        navigation.navigate(route.params.returnTo, {
          updatedPassport,
          travelDate: route.params.travelDate,
          photoUrl: route.params.photoUrl,
          coTravellers: route.params.coTravellers,   // PRESERVE cotravellers
          // DO NOT update passport: this would remove coTravellers
        });

        setLoading(false);
        return;
      }

      // ===================== PRIMARY INITIAL FLOW (MAIN TRAVELLER) =====================
      console.log("SAVING PRIMARY PASSPORT");

      const docRef = await savePassportData(passportPayload);

      navigation.navigate("PassportDetailsScreen", {
        passport: { id: docRef.id, ...passportPayload },
        travelDate: travel,
        photoUrl: currentPhotoUrl,
        coTravellers: [],
      });

      setLoading(false);
    } catch (err) {
      console.log("PASSPORT SAVE ERROR:", err);
      setLoading(false);
      Alert.alert("Error", "Failed to save passport.");
    }
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
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

        {/* Passport (current) */}
        <View style={styles.stepItem}>
          <Icon name="check-circle" size={22} color={ORANGE} />
          <Text style={[styles.stepLabel, { color: ORANGE }]}>Passport</Text>
        </View>
        <View style={styles.line} />

        {/* Detail */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Detail</Text>
        </View>
        <View style={styles.line} />

        {/* Checkout */}
        <View style={styles.stepItem}>
          <Icon name="radio-button-unchecked" size={22} color="#777" />
          <Text style={styles.stepLabel}>Checkout</Text>
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          The government requires the front & back pages of your passport
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upload from device</Text>

          {/* FRONT */}
          <View style={{ marginTop: 16 }}>
            <Text style={styles.label}>Front page</Text>
            {front && <Image source={{ uri: front.uri }} style={styles.preview} />}
            <TouchableOpacity style={styles.primaryButton} onPress={pickFront}>
              <Text style={styles.primaryButtonText}>
                {front ? "Change front image" : "Select passport front image"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* BACK */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>Back page</Text>
            {back && <Image source={{ uri: back.uri }} style={styles.preview} />}
            <TouchableOpacity style={styles.secondaryButton} onPress={pickBack}>
              <Text style={styles.secondaryButtonText}>
                {back ? "Change back image" : "Select passport back image"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM CONTINUE BUTTON (UNCHANGED UI) */}
      <TouchableOpacity style={styles.bottomButton} onPress={onContinue}>
        <Text style={styles.bottomButtonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  title: { fontSize: 18, fontWeight: "700", marginTop: 30, marginBottom: 15 },
  card: {
    marginTop: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  preview: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
  },
  primaryButton: {
    backgroundColor: ORANGE,
    paddingVertical: 12,
    borderRadius: 10,
  },
  primaryButtonText: { color: "white", textAlign: "center", fontWeight: "600" },
  secondaryButton: {
    borderWidth: 1,
    borderColor: ORANGE,
    paddingVertical: 12,
    borderRadius: 10,
  },
  secondaryButtonText: {
    color: ORANGE,
    textAlign: "center",
    fontWeight: "600",
  },
  bottomButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  bottomButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
});

