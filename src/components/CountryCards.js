// // import { Text, View, StyleSheet, Image,TouchableHighlight } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';


// // export default function CountryCards({ title, source, countrName, item }) {
// //  // console.log('DATA', item);
// //  const navigation = useNavigation();
// //   return (
// //     <View style={{margin:20}}>
// //       <TouchableHighlight style={styles.container} onPress={() => navigation.navigate('FormScreen')} >
// //         <Image style={styles.logo} source={source} />
// //       </TouchableHighlight>
// //       <Text style={{ marginLeft: 15, fontWeight: 'bold' }}> {countrName} </Text>
// //       <View style={{ flexDirection: 'row', paddingLeft: 15, margin: 5 }}>
// //         <Text>Get on</Text>
// //         <Text style={styles.textCard}> {title} </Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },

// //   logo: {
// //     flex: 1,
// //   },
// //   textCard: {
// //     marginLeft: 0,
// //     fontWeight: 'bold',
// //     color: '#00008B',
// //   },
// // });


// import React from "react";
// import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// const { width } = Dimensions.get("window");
// //const CARD_WIDTH = width * 0.45; // 2 cards per row like Atlys

// export default function CountryCard({ title, source, countrName, item }) {
//     const navigation = useNavigation();   // ✅ FIX

//     return (
//         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("StartApplicationScreen", { country: item.countrName })}>
//             <Image source={source} style={styles.image} />

//             <View style={styles.footer}>
//                 <Text style={styles.title}>{countrName}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         width: width,
//         margin:10,
//         // padding:10,
//         // marginVertical: 5,
//         backgroundColor: "#fff",
//         borderRadius: 10,
//         overflow: "hidden",
//         alignContent:"center",

//         // Shadow (iOS)
//         shadowColor: "#000",
//         shadowOpacity: 4,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 6,

//         // Shadow (Android)
//         elevation: 4,

//     },

//     image: {
//         width: "95%",
//         height: 210,
//        // padding: 10
//     },

//     footer: {
//         padding: 10,
//     },

//     title: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#FF5C00",
//     },
// });



import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

export default function CountryCards({ title, source, countrName, item, onPress }) {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={source} style={styles.image} />

      <View style={styles.footer}>
        <Text style={styles.title}>{countrName}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Get on </Text>
          <Text style={styles.date}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 210,
  },

  footer: {
    padding: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5C00",
  },

  date: {
    fontWeight: "bold",
    color: "#00008B",
  },
});
