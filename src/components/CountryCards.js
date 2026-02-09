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



// import React from "react";
// import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";

// const { width } = Dimensions.get("window");

// export default function CountryCards({ source, countrName, date, onPress }) {

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <Image source={source} style={styles.image} />

//       <View style={styles.footer}>
//         <Text style={styles.title}>{countrName}</Text>
//         <View style={{ flexDirection: "row" }}>
//           <Text>Get on </Text>
//           <Text style={styles.date}>{date ?? "N/A"}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     width: wp('92%'),                 // 92% width instead of 100%
//     alignSelf: "center",              // Center horizontally
//     marginVertical: verticalScale(10),
//     backgroundColor: "#fff",
//     borderRadius: moderateScale(12),
//     overflow: "hidden",

//     shadowColor: "#000",
//     shadowOpacity: 1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },

//   image: {
//     width: "100%",
//     height: hp('25%'),               // responsive image height
//     resizeMode: "cover",
//   },

//   footer: {
//     padding: moderateScale(12),
//   },

//   title: {
//     fontSize: RFValue(16),
//     fontWeight: "600",
//     color: "#FF5C00",
//     marginBottom: verticalScale(4),
//   },

//   date: {
//     fontSize: RFValue(14),
//     fontWeight: "bold",
//     color: "#00008B",
//   },
// });

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
// import { getFlagEmoji } from "../utils/countryIsoMap";


// export default function CountryCards({ item, countrName, onPress, date }) {
//   const visaType = item.countryType?.toUpperCase() || "VISA";
// export default function CountryCards({ item, countrName, onPress, date }) {
//   const visaType = item.countryType?.toUpperCase() || "VISA";
//   const flag = getFlagEmoji(countrName);

//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         {/* <Text style={styles.flag}>🏳️</Text> */}
//         <Text style={styles.flag}>{flag}</Text>


//         <View style={styles.headerRight}>
//           <Text style={styles.visaType}>{visaType}</Text>
//           <Text style={styles.info}> ⓘ</Text>
//         </View>
//       </View>

//       {/* COUNTRY NAME */}
//       <Text style={styles.title}>{countrName}</Text>

//       {/* PROCESSING */}
//       {item.subtitle && (
//         <Text style={styles.processing}>
//           {item.subtitle}
//         </Text>
//       )}



//       {/* BULLETS */}
//       {Array.isArray(item.bullets) &&
//         item.bullets.map((text, index) => (
//           <View key={index} style={styles.bulletRow}>
//             <View style={styles.dot} />
//             <Text style={styles.bulletText}>{text}</Text>
//           </View>
//         ))}


//       {/* DIVIDER */}
//       <View style={styles.divider} />

//       {/* PRICE */}
//       <View style={styles.priceRow}>
//         <View>
//           <Text style={styles.price}>
//             ₹{item.VisaManagerFee || 0}
//             <Text style={styles.perAdult}> per adult</Text>
//           </Text>
//           <Text style={styles.fee}>+ ₹{item.AuthorityCharges || 0} service fees</Text>
//         </View>

//         <Text style={styles.arrow}>›</Text>
//       </View>

//       {/* FOOTER */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Apply Now</Text>
//         <Text style={styles.footerText}>Know More</Text>
//       </View>


//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     width: wp("92%"),
//     alignSelf: "center",
//     backgroundColor: "#FFF7ED",
//     borderRadius: moderateScale(16),
//     padding: moderateScale(14),
//     marginVertical: verticalScale(10),
//     elevation: 3,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   flag: {
//     fontSize: RFValue(30),
//     lineHeight: RFValue(30),
//   },


//   visaType: {
//     fontSize: RFValue(12),
//     fontWeight: "700",
//     color: "#1E3A8A",
//   },

//   info: {
//     fontSize: RFValue(12),
//     color: "#1E3A8A",
//   },

//   title: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     marginTop: verticalScale(8),
//   },

//   processing: {
//     color: "#F97316",
//     marginVertical: verticalScale(6),
//     fontWeight: "600",
//     fontSize: RFValue(13),
//   },

//   bulletRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: verticalScale(4),
//   },

//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#F97316",
//     marginRight: 8,
//   },

//   bulletText: {
//     fontSize: RFValue(12),
//     color: "#475569",
//   },

//   divider: {
//     borderTopWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#E2E8F0",
//     marginVertical: verticalScale(10),
//   },

//   priceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   price: {
//     fontSize: RFValue(15),
//     fontWeight: "700",
//   },

//   perAdult: {
//     fontSize: RFValue(11),
//     color: "#64748B",
//   },

//   fee: {
//     fontSize: RFValue(11),
//     color: "#64748B",
//     marginTop: 2,
//   },

//   arrow: {
//     fontSize: RFValue(22),
//     color: "#2563EB",
//   },

//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",

//     backgroundColor: "#0F2A52", // ✅ dark navy
//     paddingVertical: verticalScale(12),
//     paddingHorizontal: moderateScale(16),

//     marginTop: verticalScale(14),
//     borderBottomLeftRadius: moderateScale(16),
//     borderBottomRightRadius: moderateScale(16),
//   },

//   footerText: {
//     fontSize: RFValue(12),
//     fontWeight: "700",
//     color: "#FFFFFF", // ✅ white text
//   },
// });


// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
// import { getFlagEmoji } from "../utils/countryIsoMap";

// export default function CountryCards({ item, countrName, onPress, date }) {
//   const visaType = item.countryType?.toUpperCase() || "VISA";
//   const flag = getFlagEmoji(countrName);

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={onPress}
//       activeOpacity={0.9}
//     >
//       {/* HEADER */}
//       <View style={styles.header}>
//         <Text style={styles.flag}>{flag}</Text>

//         <View style={styles.headerRight}>
//           <Text style={styles.visaType}>{visaType}</Text>
//           <Text style={styles.info}> ⓘ</Text>
//         </View>
//       </View>

//       {/* COUNTRY NAME */}
//       <Text style={styles.title}>{countrName}</Text>

//       {/* PROCESSING DATE */}
//       <Text style={styles.processing}>
//         Get visa by {date}
//       </Text>

//       {/* BULLETS */}
//       <View style={styles.bulletRow}>
//         <View style={styles.dot} />
//         <Text style={styles.bulletText}>Quick & Easy Process</Text>
//       </View>
//       <View style={styles.bulletRow}>
//         <View style={styles.dot} />
//         <Text style={styles.bulletText}>Visas Processed</Text>
//       </View>
//       <View style={styles.bulletRow}>
//         <View style={styles.dot} />
//         <Text style={styles.bulletText}>24x7 Support</Text>
//       </View>

//       {/* DIVIDER */}
//       <View style={styles.divider} />

//       {/* PRICE */}
//       <View style={styles.priceRow}>
//         <View>
//           <Text style={styles.price}>
//             ₹{item.VisaManagerFee || 0}
//             <Text style={styles.perAdult}> per adult</Text>
//           </Text>
//           <Text style={styles.fee}>
//             + ₹{item.AuthorityCharges || 0} service fees
//           </Text>
//         </View>

//         <Text style={styles.arrow}>›</Text>
//       </View>

//       {/* FOOTER – ONLY APPLY NOW */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Apply Now</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// /* ---------------- STYLES ---------------- */

// const styles = StyleSheet.create({
//   card: {
//     width: wp("92%"),
//     alignSelf: "center",
//     backgroundColor: "#FFF7ED",
//     borderRadius: moderateScale(16),
//     padding: moderateScale(14),
//     marginVertical: verticalScale(10),
//     elevation: 3,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   flag: {
//     fontSize: RFValue(30),
//     lineHeight: RFValue(30),
//   },

//   visaType: {
//     fontSize: RFValue(12),
//     fontWeight: "700",
//     color: "#1E3A8A",
//   },

//   info: {
//     fontSize: RFValue(12),
//     color: "#1E3A8A",
//   },

//   title: {
//     fontSize: RFValue(16),
//     fontWeight: "700",
//     marginTop: verticalScale(8),
//   },

//   processing: {
//     color: "#F97316",
//     marginVertical: verticalScale(6),
//     fontWeight: "600",
//     fontSize: RFValue(13),
//   },

//   bulletRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: verticalScale(4),
//   },

//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#F97316",
//     marginRight: 8,
//   },

//   bulletText: {
//     fontSize: RFValue(12),
//     color: "#475569",
//   },

//   divider: {
//     borderTopWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#E2E8F0",
//     marginVertical: verticalScale(10),
//   },

//   priceRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   price: {
//     fontSize: RFValue(15),
//     fontWeight: "700",
//   },

//   perAdult: {
//     fontSize: RFValue(11),
//     color: "#64748B",
//   },

//   fee: {
//     fontSize: RFValue(11),
//     color: "#64748B",
//     marginTop: 2,
//   },

//   arrow: {
//     fontSize: RFValue(22),
//     color: "#2563EB",
//   },

//   /* ✅ FOOTER FIXED */
//   footer: {
//     alignItems: "center",          // 🔥 CENTER TEXT
//     justifyContent: "center",

//     backgroundColor: "#0F2A52",
//     paddingVertical: verticalScale(12),

//     marginTop: verticalScale(14),
//     borderBottomLeftRadius: moderateScale(16),
//     borderBottomRightRadius: moderateScale(16),
//   },

//   footerText: {
//     fontSize: RFValue(13),
//     fontWeight: "800",
//     color: "#FFFFFF",
//     letterSpacing: 0.3,
//   },
// });

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { wp, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import { getFlagEmoji } from "../utils/countryIsoMap";

/* -------- helpers -------- */
const getGovernmentFee = (fee) => {
  if (!fee) return 0;

  if (typeof fee === "number" || typeof fee === "string") {
    return fee;
  }

  if (typeof fee === "object") {
    const values = Object.values(fee)
      .map(v => Number(String(v).replace(/,/g, "")))
      .filter(v => !isNaN(v));

    return values.length ? Math.min(...values) : 0;
  }

  return 0;
};

const getServiceFee = (fee) => {
  if (!fee) return 0;
  if (typeof fee === "number" || typeof fee === "string") return fee;
  if (typeof fee === "object") return fee.Single || 0;
  return 0;
};

export default function CountryCards({ item, countrName, onPress, date }) {
  const visaType = item.countryType?.toUpperCase() || "VISA";
  const flag = getFlagEmoji(countrName);
  const [liveCount, setLiveCount] = useState(item.liveCount ?? 0);

  const governmentFee = getGovernmentFee(item.GovernmentFee);
  const serviceFee = getServiceFee(item.AuthorityCharges);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        const next = prev + change;
        return next < 1 ? 1 : next;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.flag}>{flag}</Text>

        <View style={styles.headerRight}>
          <Text style={styles.visaType}>{visaType}</Text>
          <Text style={styles.info}> ⓘ</Text>

          {liveCount > 0 && (
            <View style={styles.liveInline}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{liveCount} live</Text>
            </View>
          )}
        </View>
      </View>

      {/* COUNTRY NAME */}
      <Text style={styles.title}>{countrName}</Text>

      {/* PROCESSING DATE */}
      {item.subtitle && (
        <Text style={styles.processing}>{item.subtitle}</Text>
      )}

      {/* BULLETS */}
      {Array.isArray(item.bullets) &&
        item.bullets.map((text, index) => (
          <View key={index} style={styles.bulletRow}>
            <View style={styles.dot} />
            <Text style={styles.bulletText}>{text}</Text>
          </View>
        ))}

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* PRICE – ALWAYS SHOW SERVICE FEE */}
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.price}>
            ₹{governmentFee}
            <Text style={styles.perAdult}> visa fee</Text>
          </Text>

          <Text style={styles.fee}>
            + ₹{serviceFee} service fees
          </Text>
        </View>

        <Text style={styles.arrow}>›</Text>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Apply Now</Text>
      </View>
    </TouchableOpacity>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  card: {
    width: wp("92%"),
    alignSelf: "center",
    backgroundColor: "#FFF7ED",
    borderRadius: moderateScale(16),
    padding: moderateScale(14),
    marginVertical: verticalScale(10),
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    fontSize: RFValue(30),
    lineHeight: RFValue(30),
  },

  visaType: {
    fontSize: RFValue(12),
    fontWeight: "700",
    color: "#1E3A8A",
  },

  info: {
    fontSize: RFValue(12),
    color: "#1E3A8A",
  },

  liveInline: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    elevation: 2,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#22C55E",
    marginRight: 6,
  },

  liveText: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: "#334155",
  },

  title: {
    fontSize: RFValue(16),
    fontWeight: "700",
    marginTop: verticalScale(8),
  },

  processing: {
    color: "#F97316",
    marginVertical: verticalScale(6),
    fontWeight: "600",
    fontSize: RFValue(13),
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F97316",
    marginRight: 8,
  },

  bulletText: {
    fontSize: RFValue(12),
    color: "#475569",
  },

  divider: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#E2E8F0",
    marginVertical: verticalScale(10),
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: RFValue(15),
    fontWeight: "700",
  },

  perAdult: {
    fontSize: RFValue(11),
    color: "#64748B",
  },

  fee: {
    fontSize: RFValue(11),
    color: "#64748B",
    marginTop: 2,
  },

  arrow: {
    fontSize: RFValue(22),
    color: "#2563EB",
  },

  footer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F2A52",
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(14),
    borderBottomLeftRadius: moderateScale(16),
    borderBottomRightRadius: moderateScale(16),
  },

  footerText: {
    fontSize: RFValue(13),
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
