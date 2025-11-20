// // import React, { useState } from 'react';
// // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // import { parseMRZ } from '../../api/ocr/mrzParser';

// // export default function PassportUploadScreen({ navigation }) {
// //   const [imageUri, setImageUri] = useState(null);

// //   const pickImage = async () => {
// //     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

// //     if (result?.assets?.length > 0) {
// //       const base64 = result.assets[0].base64;
// //       setImageUri(result.assets[0].uri);

// //       const ocrText = await extractTextFromImage(base64);
// //       const parsed = parseMRZ(ocrText);

// //       navigation.navigate("PassportDetailsScreen", { data: parsed });
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

// import React, { useState } from 'react';
// import { View, Image, TouchableOpacity, Text } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { extractTextFromImage } from '../../api/ocr/visionApi';
// import { parseMRZ } from '../../api/ocr/mrzParser';

// export default function PassportUploadScreen({ navigation }) {
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [frontParsed, setFrontParsed] = useState(null);
//   const [backParsed, setBackParsed] = useState(null);

//   const pickFront = async () => {
//     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
//     if (!res.assets) return;

//     const base64 = res.assets[0].base64;
//     setFrontImage(res.assets[0].uri);

//     const text = await extractTextFromImage(base64);
//     const mrzData = parseMRZ(text);
//     setFrontParsed(mrzData);
//   };

//   const pickBack = async () => {
//     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
//     if (!res.assets) return;

//     const base64 = res.assets[0].base64;
//     setBackImage(res.assets[0].uri);

//     const text = await extractTextFromImage(base64);

//     // OPTIONAL: create back-side parser (address, parents name)
//     const backDetails = { rawBackText: text };
//     setBackParsed(backDetails);

//     // navigation.navigate("PassportDetailsScreen", {
//     //   front: frontParsed,
//     //   back: backDetails,
//     //   frontImage,
//     //   backImage: res.assets[0].uri,
//     // });
//     navigation.navigate("PassportDetailsScreen", {
//       frontData: frontParsed,
//       backData: {},
//       frontImage: imageUri,
//       backImage: null
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>

//       {!frontImage && (
//         <TouchableOpacity onPress={pickFront} style={{ padding: 20, backgroundColor: "#2196F3" }}>
//           <Text style={{ color: "white", textAlign: "center" }}>Upload FRONT Side</Text>
//         </TouchableOpacity>
//       )}

//       {frontImage && !backImage && (
//         <>
//           <Image source={{ uri: frontImage }} style={{ width: "100%", height: 200 }} />
//           <TouchableOpacity onPress={pickBack} style={{ padding: 20, backgroundColor: "green", marginTop: 20 }}>
//             <Text style={{ color: "white", textAlign: "center" }}>Upload BACK Side</Text>
//           </TouchableOpacity>
//         </>
//       )}

//     </View>
//   );
// }


// // import React, { useState } from 'react';
// // import { View, Image, TouchableOpacity, Text } from 'react-native';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { extractTextFromImage } from '../../api/ocr/visionApi';
// // import { parseMRZ } from '../../api/ocr/mrzParser';

// // export default function PassportUploadScreen({ navigation }) {
// //   const [imageUri, setImageUri] = useState(null);

// //   const pickImage = async () => {
// //     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

// //     if (result?.assets?.length > 0) {
// //       const base64 = result.assets[0].base64;
// //       setImageUri(result.assets[0].uri);

// //       const ocrText = await extractTextFromImage(base64);
// //       const parsed = parseMRZ(ocrText);

// //       navigation.navigate("PassportDetailsScreen", { data: parsed });
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

// import React, { useState } from 'react';
// import { View, Image, TouchableOpacity, Text } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { extractTextFromImage } from '../../api/ocr/visionApi';
// import { parseMRZ } from '../../api/ocr/mrzParser';
// import { ScrollView } from 'react-native-gesture-handler';

// export default function PassportUploadScreen({ navigation }) {
//   const [frontImage, setFrontImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
//   const [frontParsed, setFrontParsed] = useState(null);
//   const [backParsed, setBackParsed] = useState(null);

//   const pickFront = async () => {
//     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
//     if (!res.assets) return;

//     const base64 = res.assets[0].base64;
//     setFrontImage(res.assets[0].uri);

//     const text = await extractTextFromImage(base64);
//     const mrzData = parseMRZ(text);
//     setFrontParsed(mrzData);
//   };

//   const pickBack = async () => {
//     const res = await launchImageLibrary({ mediaType: "photo", includeBase64: true });
//     if (!res.assets) return;

//     const base64 = res.assets[0].base64;
//     setBackImage(res.assets[0].uri);

//     const text = await extractTextFromImage(base64);

//     // OPTIONAL: create back-side parser (address, parents name)
//     const backDetails = { rawBackText: text };
//     setBackParsed(backDetails);

//     // navigation.navigate("PassportDetailsScreen", {
//     //   front: frontParsed,
//     //   back: backDetails,
//     //   frontImage,
//     //   backImage: res.assets[0].uri,
//     // });
//     navigation.navigate("PassportDetailsScreen", {
//       frontData: frontParsed,
//       backData: backParsed,
//       frontImage: null,
//       backImage: null
//     });
//   };

//   return (
//     <ScrollView horizontal={true}>
//     <View style={{ flex: 1, padding: 20 }}>

//       {!frontImage && (
//         <TouchableOpacity onPress={pickFront} style={{ padding: 20, backgroundColor: "#2196F3" }}>
//           <Text style={{ color: "white", textAlign: "center" }}>Upload FRONT Side</Text>
//         </TouchableOpacity>
//       )}

//       {frontImage && !backImage && (
//         <>
//           <Image source={{ uri: frontImage }} style={{ width: "100%", height: 200 }} />
//           <TouchableOpacity onPress={pickBack} style={{ padding: 20, backgroundColor: "green", marginTop: 20 }}>
//             <Text style={{ color: "white", textAlign: "center" }}>Upload BACK Side</Text>
//           </TouchableOpacity>
//         </>
//       )}

//     </View>
//     </ScrollView>
//   );
// }


// import React, { useState } from 'react';
// import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { extractTextFromImage } from '../../api/ocr/visionApi';
// import { parseMRZ } from '../../api/ocr/mrzParser';

// export default function PassportUploadScreen({ navigation }) {
//   const [imageUri, setImageUri] = useState(null);

//   const pickImage = async () => {
//     const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true });

//     if (!result?.assets?.length) return;

//     const base64 = result.assets[0].base64;
//     const uri = result.assets[0].uri;

//     setImageUri(uri);

//     try {
//       // 1. Extract text
//       const ocrText = await extractTextFromImage(base64);

//       // 2. Parse MRZ
//       const parsedFront = parseMRZ(ocrText);

//       if (!parsedFront) {
//         Alert.alert("OCR Failed", "Could not detect passport details. Try another image.");
//         return;
//       }

//       // 3. Navigate to details screen
//       navigation.navigate("PassportDetailsScreen", {
//         frontData: parsedFront,
//         backData: {},     // default empty
//         frontImage: uri,
//         backImage: null,  // default null
//       });
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("Error", "Failed to scan passport.");
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: 200 }} />}

//       <TouchableOpacity onPress={pickImage} style={{ padding: 20, backgroundColor: "#2196F3" }}>
//         <Text style={{ color: "white", textAlign: "center" }}>Upload Passport</Text>
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

// export default function PassportUploadScreen({ navigation }) {
//   const [frontImageUri, setFrontImageUri] = useState(null);
//   const [backImageUri, setBackImageUri] = useState(null);

//   const [frontBase64, setFrontBase64] = useState(null);
//   const [backBase64, setBackBase64] = useState(null);

//   const pickFront = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!result?.assets?.length) return;

//     setFrontImageUri(result.assets[0].uri);
//     setFrontBase64(result.assets[0].base64);

//     // Extract MRZ only from FRONT
//     try {
//       const ocrText = await extractTextFromImage(result.assets[0].base64);
//       const parsed = parseMRZ(ocrText);

//       if (!parsed) {
//         Alert.alert("OCR Failed", "Could not detect passport MRZ.");
//         return;
//       }
//     } catch (err) {
//       console.log("OCR ERROR:", err);
//       Alert.alert("OCR Error", "Failed to scan passport.");
//     }
//   };

//   const pickBack = async () => {
//     const result = await launchImageLibrary({
//       mediaType: "photo",
//       includeBase64: true,
//     });

//     if (!result?.assets?.length) return;
//     navigation.navigate("PassportDetailsScreen", {
//       frontData: parsed,
//       backData: {},
//       frontImageUri: result.assets[0].uri,
//       backImageUri,
//       frontBase64: result.assets[0].base64,
//       backBase64,
//     });
//     setBackImageUri(result.assets[0].uri);
//     setBackBase64(result.assets[0].base64);

//     Alert.alert("Back image added!");
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <ScrollView horizontal>
//         {frontImageUri && (
//           <Image
//             source={{ uri: frontImageUri }}
//             style={{
//               width: 200,
//               height: 120,
//               marginRight: 10,
//               borderRadius: 6,
//             }}
//           />
//         )}

//         {backImageUri && (
//           <Image
//             source={{ uri: backImageUri }}
//             style={{
//               width: 200,
//               height: 120,
//               marginRight: 10,
//               borderRadius: 6,
//             }}
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



import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { extractTextFromImage } from "../../api/ocr/visionApi";
import { parseMRZ } from "../../api/ocr/mrzParser";

export default function PassportUploadScreen({ navigation }) {
  const [frontImageUri, setFrontImageUri] = useState(null);
  const [backImageUri, setBackImageUri] = useState(null);

  const [frontBase64, setFrontBase64] = useState(null);
  const [backBase64, setBackBase64] = useState(null);

  const [parsedFront, setParsedFront] = useState(null); // <-- FIX

  // ---- PICK FRONT ----
  const pickFront = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (!result?.assets?.length) return;

    const asset = result.assets[0];

    setFrontImageUri(asset.uri);
    setFrontBase64(asset.base64);

    try {
      const ocrText = await extractTextFromImage(asset.base64);
      const parsed = parseMRZ(ocrText);

      if (!parsed) {
        Alert.alert("OCR Failed", "Could not read passport MRZ.");
        return;
      }

      setParsedFront(parsed); // <-- SAVE PARSED RESULT
      Alert.alert("Success", "Front side scanned successfully!");

    } catch (err) {
      console.log("OCR ERROR:", err);
      Alert.alert("Error", "Failed to scan passport front.");
    }
  };

  // ---- PICK BACK ----
  const pickBack = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (!result?.assets?.length) return;

    const asset = result.assets[0];

    setBackImageUri(asset.uri);
    setBackBase64(asset.base64);

    Alert.alert("Back side added!");

    // ❗ Navigate ONLY when both images + parsed MRZ exist
    if (!parsedFront) {
      Alert.alert("Scan Front First", "Please upload the FRONT side before saving.");
      return;
    }

    navigation.navigate("PassportDetailsScreen", {
      frontData: parsedFront,
      backData: {},

      frontImageUri,
      backImageUri: asset.uri,

      frontBase64,
      backBase64: asset.base64,
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Preview Images */}
      <ScrollView horizontal>
        {frontImageUri && (
          <Image
            source={{ uri: frontImageUri }}
            style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
          />
        )}
        {backImageUri && (
          <Image
            source={{ uri: backImageUri }}
            style={{ width: 200, height: 120, marginRight: 10, borderRadius: 6 }}
          />
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={pickFront}
        style={{
          padding: 20,
          backgroundColor: "#4CAF50",
          marginVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Upload passport size photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickFront}
        style={{
          padding: 20,
          backgroundColor: "#4CAF50",
          marginVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Upload FRONT of Passport
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pickBack}
        style={{
          padding: 20,
          backgroundColor: "#2196F3",
          marginVertical: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Upload BACK of Passport
        </Text>
      </TouchableOpacity>
    </View>
  );
}
