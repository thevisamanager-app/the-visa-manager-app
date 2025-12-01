// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "react-native-linear-gradient";

// const ORANGE = "#FF5C00";
// const ORANGE = "#FF5C00";

// export default function VisaStatusScreen({ navigation }) {
//   const [expanded, setExpanded] = useState(null);

//   const steps = [
//     {
//       id: 1,
//       title: "Your Sri Lanka visa has arrived!",
//       time: "29 Nov 05:34 pm",
//     },
//     {
//       id: 2,
//       title: "We have received your payment 1.0 INR",
//       time: "29 Nov 05:08 pm",
//     },
//     {
//       id: 3,
//       title: "Your application is being internally processed by Visa Manager.",
//       time: "29 Nov 05:12 pm",
//     },
//     {
//       id: 4,
//       title:
//         "Your application has been submitted to Ministry of Home Affairs E-Visa System for processing.",
//       time: "29 Nov 05:12 pm",
//     },
//     {
//       id: 5,
//       title:
//         "Your Visa is being processed by Ministry of Home Affairs.",
//       time: "29 Nov 05:34 pm",
//     },
//     {
//       id: 6,
//       title: "Your Visa has arrived.",
//       time: "29 Nov 05:35 pm",
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={26} color="black" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.helpButton}>
//           <Icon name="help-circle-outline" size={24} color={PURPLE} />
//           <Text style={styles.helpText}>Help</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* TOP CARD */}
//         <View style={styles.topSection}>
//           <View style={styles.dateCard}>
//             <Text style={styles.dateDay}>29</Text>
//             <Text style={styles.dateMonth}>Nov</Text>

//             <View style={styles.dateTimePill}>
//               <Text style={styles.dateTime}>05:34 PM</Text>
//             </View>
//           </View>

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>Yash Tupe</Text>
//             <Text style={styles.country}>Sri Lanka</Text>

//             <View style={styles.approvedTag}>
//               <Text style={styles.approvedText}>Approved • 3d 11h before time</Text>
//             </View>
//           </View>
//         </View>

//         {/* GRADIENT SECTION */}
//         <TouchableOpacity>
//           <LinearGradient
//             colors={["#FF5C00", "#FF5C00"]}
//             style={styles.bannerCard}
//           >
//             <Text style={styles.bannerText}>Waive off your entire service fee!</Text>
//             <Icon name="chevron-forward" size={20} color="white" />
//           </LinearGradient>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Your Visa Status</Text>

//         {/* TIMELINE */}
//         <View style={styles.timelineContainer}>
//           {steps.map((step, idx) => (
//             <View key={step.id}>
//               <View style={styles.row}>
//                 <View style={styles.columnLeft}>
//                   <View style={styles.dot} />
//                   {idx !== steps.length - 1 && <View style={styles.line} />}
//                 </View>

//                 <View style={styles.columnRight}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       setExpanded(expanded === step.id ? null : step.id)
//                     }
//                   >
//                     <Text style={styles.stepTitle}>{step.title}</Text>
//                     <Text style={styles.time}>{step.time}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* FIXED BUTTON */}
//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.viewButton}>
//           <Text style={styles.viewBtnText}>View Visa</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFFFFF" },

//   headerRow: {
//     padding: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   helpButton: { flexDirection: "row", alignItems: "center" },
//   helpText: { marginLeft: 4, color: PURPLE, fontWeight: "700" },

//   topSection: { flexDirection: "row", paddingHorizontal: 16, marginTop: 6 },

//   dateCard: {
//     width: 82,
//     height: 120,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderColor: ORANGE,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dateDay: { fontSize: 34, fontWeight: "900", color: PURPLE },
//   dateMonth: { fontSize: 18, fontWeight: "600", color: PURPLE },
//   dateTimePill: {
//     backgroundColor: ORANGE,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     marginTop: 6,
//   },
//   dateTime: { fontSize: 12, fontWeight: "700", color: PURPLE },

//   userInfo: { marginLeft: 14, justifyContent: "center" },
//   userName: { fontSize: 22, fontWeight: "800", color: "#000" },
//   country: { marginTop: 4, fontSize: 15, color: "#666" },

//   approvedTag: {
//     backgroundColor: "#C9F7CF",
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   approvedText: { color: "#1A8C2E", fontWeight: "700", fontSize: 13 },

//   bannerCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 14,
//     borderRadius: 12,
//     marginHorizontal: 16,
//     marginTop: 16,
//   },
//   bannerText: { color: "#FFF", fontWeight: "700", fontSize: 15 },

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     marginLeft: 16,
//     marginTop: 20,
//     marginBottom: 10,
//     color: "#222",
//   },

//   timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
//   row: { flexDirection: "row" },
//   columnLeft: { alignItems: "center", width: 30 },
//   columnRight: { flex: 1, paddingBottom: 20 },

//   dot: {
//     width: 12,
//     height: 12,
//     backgroundColor: PURPLE,
//     borderRadius: 6,
//     marginTop: 4,
//   },
//   line: {
//     width: 2,
//     height: 40,
//     backgroundColor: PURPLE,
//     marginTop: 2,
//   },

//   stepTitle: { fontSize: 15, fontWeight: "600", color: "#111" },
//   time: { fontSize: 13, color: "#666", marginTop: 2 },

//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: 14,
//     backgroundColor: "#FFF",
//   },

//   viewButton: {
//     backgroundColor: PURPLE,
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   viewBtnText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const ORANGE = "#FF5C00";
const BLACK = "#000";
const GRAY = "#666";

export default function VisaStatusScreen({ navigation }) {
  const [expanded, setExpanded] = useState(null);

  const steps = [
    { id: 1, title: "Your Sri Lanka visa has arrived!", time: "29 Nov 05:34 pm" },
    { id: 2, title: "We have received your payment 1.0 INR", time: "29 Nov 05:08 pm" },
    { id: 3, title: "Your application is being internally processed by Visa Manager.", time: "29 Nov 05:12 pm" },
    { id: 4, title: "Your application has been submitted to Ministry of Home Affairs E-Visa System for processing.", time: "29 Nov 05:12 pm" },
    { id: 5, title: "Your Visa is being processed by Ministry of Home Affairs.", time: "29 Nov 05:34 pm" },
    { id: 6, title: "Your Visa has arrived.", time: "29 Nov 05:35 pm" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={BLACK} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color={ORANGE} />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* TOP CARD */}
        <View style={styles.topSection}>
          <View style={styles.dateCard}>
            <Text style={styles.dateDay}>29</Text>
            <Text style={styles.dateMonth}>Nov</Text>

            <View style={styles.dateTimePill}>
              <Text style={styles.dateTime}>05:34 PM</Text>
            </View>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Yash Tupe</Text>
            <Text style={styles.country}>Sri Lanka</Text>

            <View style={styles.approvedTag}>
              <Text style={styles.approvedText}>Approved • 3d 11h before time</Text>
            </View>
          </View>
        </View>

        {/* BANNER */}
        <TouchableOpacity>
          <LinearGradient colors={[ORANGE, ORANGE]} style={styles.bannerCard}>
            <Text style={styles.bannerText}>Waive off your entire service fee!</Text>
            <Icon name="chevron-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Visa Status</Text>

        {/* TIMELINE */}
        <View style={styles.timelineContainer}>
          {steps.map((step, idx) => (
            <View key={step.id}>
              <View style={styles.row}>
                <View style={styles.columnLeft}>
                  <View style={styles.dot} />
                  {idx !== steps.length - 1 && <View style={styles.line} />}
                </View>

                <View style={styles.columnRight}>
                  <TouchableOpacity
                    onPress={() =>
                      setExpanded(expanded === step.id ? null : step.id)
                    }
                  >
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.time}>{step.time}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewBtnText}>View Visa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  headerRow: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helpButton: { flexDirection: "row", alignItems: "center" },
  helpText: { marginLeft: 4, color: ORANGE, fontWeight: "700" },

  topSection: { flexDirection: "row", paddingHorizontal: 16, marginTop: 6 },

  dateCard: {
    width: 82,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: { fontSize: 34, fontWeight: "900", color: ORANGE },
  dateMonth: { fontSize: 18, fontWeight: "600", color: ORANGE },
  dateTimePill: {
    backgroundColor: ORANGE,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 6,
  },
  dateTime: { fontSize: 12, fontWeight: "700", color: "#fff" },

  userInfo: { marginLeft: 14, justifyContent: "center" },
  userName: { fontSize: 22, fontWeight: "800", color: BLACK },
  country: { marginTop: 4, fontSize: 15, color: GRAY },

  approvedTag: {
    backgroundColor: "#FFD7C6",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  approvedText: { color: ORANGE, fontWeight: "700", fontSize: 13 },

  bannerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  bannerText: { color: "#FFF", fontWeight: "700", fontSize: 15 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
    color: BLACK,
  },

  timelineContainer: { paddingHorizontal: 16, paddingBottom: 140 },
  row: { flexDirection: "row" },
  columnLeft: { alignItems: "center", width: 30 },
  columnRight: { flex: 1, paddingBottom: 20 },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: ORANGE,
    borderRadius: 6,
    marginTop: 4,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: ORANGE,
    marginTop: 2,
  },

  stepTitle: { fontSize: 15, fontWeight: "600", color: BLACK },
  time: { fontSize: 13, color: GRAY, marginTop: 2 },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 14,
    backgroundColor: "#FFF",
  },

  viewButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  viewBtnText: { color: "#FFF", fontSize: 18, fontWeight: "900" },
});
