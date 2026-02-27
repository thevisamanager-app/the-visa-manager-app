// // import React from "react";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/MaterialIcons";

// // import HomeScreen from "../screens/HomeScreen";
// // import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
// // import QuestionScreen from "../screens/questions/QuestionScreen";

// // const Tab = createBottomTabNavigator();

// // export default function TabNavigator() {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         headerShown: false,
// //         tabBarActiveTintColor: "#007bff",
// //         tabBarInactiveTintColor: "gray",
// //         tabBarIcon: ({ color, size }) => {
// //           let iconName = "home";

// //           if (route.name === "Home") iconName = "home";
// //           else if (route.name === "Passport") iconName = "camera-alt";
// //           else if (route.name === "Questions") iconName = "question-answer";

// //           return <Icon name={iconName} size={size} color={color} />;
// //         },
// //       })}
// //     >
// //       <Tab.Screen name="Home" component={HomeScreen} />
// //       <Tab.Screen name="Passport" component={PassportUploadScreen} />
// //       <Tab.Screen name="Questions" component={QuestionScreen} />
// //     </Tab.Navigator>
// //   );
// // }


// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import ProfileScreen from '../screens/profile/ProfileScreen';
// // import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// // import PassportListScreen from '../components/PassportListScreen';
// // import DestinationScreen from '../screens/DestinationScreen';




// // const Tab = createBottomTabNavigator();

// // export default function TabNavigator() {
// //   return (
// //     <Tab.Navigator screenOptions={{ headerShown: false }}>
// //       <Tab.Screen name="Destination" component={DestinationScreen} />
// //       <Tab.Screen name="Passport" component={PassportUploadScreen} />
// //       <Tab.Screen name="PassportListScreen" component={PassportListScreen} />
// //        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
// //     </Tab.Navigator>
// //   );
// // }


// // import React from "react";
// // import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import Icon from "react-native-vector-icons/Ionicons";

// // import ProfileScreen from "../screens/profile/ProfileScreen";
// // import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
// // import PassportListScreen from "../components/PassportListScreen";
// // import DestinationScreen from "../screens/DestinationScreen";

// // import { RFValue } from "../utils/metrics";

// // const Tab = createBottomTabNavigator();

// // export default function TabNavigator() {
// //   return (
// //     <Tab.Navigator
// //       screenOptions={({ route }) => ({
// //         headerShown: false,

// //         tabBarStyle: {
// //           height: RFValue(60),
// //           paddingBottom: RFValue(8),
// //           paddingTop: RFValue(6),
// //           backgroundColor: "#ffffff",
// //           borderTopWidth: 0.6,
// //           borderTopColor: "#e6e6e6",
// //         },

// //         tabBarActiveTintColor: "#FF5C00",
// //         tabBarInactiveTintColor: "#808080",

// //         tabBarIcon: ({ color, size }) => {
// //           let iconName = "ellipse";

// //           if (route.name === "Destination") {
// //             iconName = "globe-outline";
// //           } else if (route.name === "Passport") {
// //             iconName = "document-text-outline";
// //           } else if (route.name === "PassportListScreen") {
// //             iconName = "folder-open-outline";
// //           } else if (route.name === "ProfileScreen") {
// //             iconName = "person-circle-outline";
// //           }

// //           return <Icon name={iconName} size={RFValue(22)} color={color} />;
// //         },

// //         tabBarLabelStyle: {
// //           fontSize: RFValue(11),
// //           fontWeight: "600",
// //         },
// //       })}
// //     >
// //       <Tab.Screen 
// //         name="Destination" 
// //         component={DestinationScreen} 
// //         options={{ title: "Destination" }}
// //       />

// //       <Tab.Screen 
// //         name="Passport" 
// //         component={PassportUploadScreen}
// //         options={{ title: "Upload" }}
// //       />

// //       <Tab.Screen
// //         name="PassportListScreen"
// //         component={PassportListScreen}
// //         options={{ title: "My Passports" }}
// //       />

// //       <Tab.Screen 
// //         name="ProfileScreen" 
// //         component={ProfileScreen}
// //         options={{ title: "Profile" }}
// //       />
// //     </Tab.Navigator>
// //   );
// // }


// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Ionicons";
// import DestinationScreen from "../screens/DestinationScreen";
// import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
// import PassportListScreen from "../components/PassportListScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   const insets = useSafeAreaInsets();

//   return (
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     headerShown: false,
    //     tabBarStyle: {
    //       height: 60 + insets.bottom,   // ⭐ FIX: Prevents overlap
    //       paddingBottom: insets.bottom, // ⭐ FIX: Adjust to safe-area
    //       paddingTop: 8,
    //       backgroundColor:"#FF5C00",
    //       borderRadius:50
    //     },
    //     tabBarLabelStyle: {
    //       fontSize: 11,
    //       marginBottom: 4,
    //     },
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName = "ellipse";

    //       if (route.name === "Destination") iconName = "globe-outline"; // 🌍 Your requested globe icon
    //       if (route.name === "VisaStatusScreen") iconName = "cloud-upload-outline";
    //       if (route.name === "PassportListScreen") iconName = "folder-open-outline";
    //       if (route.name === "ProfileScreen") iconName = "person-circle-outline";

    //       return <Icon name={iconName} size={22} color={color} />;
    //     },
    //     tabBarActiveTintColor: "#fff",
    //     tabBarInactiveTintColor: "#000",
    //   })}
    // >
//       <Tab.Screen name="Destination" component={DestinationScreen} />
//       <Tab.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
//       <Tab.Screen name="PassportListScreen" component={PassportListScreen} />
//       <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }


// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import HomeStack from "./HomeStack";
// import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";
// import Icon from "react-native-vector-icons/MaterialIcons";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//    const insets = useSafeAreaInsets();
//   return (
//      <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarStyle: {
//           height: 60 + insets.bottom,   // ⭐ FIX: Prevents overlap
//           paddingBottom: insets.bottom, // ⭐ FIX: Adjust to safe-area
//           paddingTop: 8,
//           backgroundColor:"#FF5C00",
//           borderRadius:50
//         },
//         tabBarLabelStyle: {
//           fontSize: 11,
//           marginBottom: 4,
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = "ellipse";

//           if (route.name === "Destination") iconName = "globe-outline"; // 🌍 Your requested globe icon
//           if (route.name === "VisaStatusScreen") iconName = "cloud-upload-outline";
//           if (route.name === "PassportListScreen") iconName = "folder-open-outline";
//           if (route.name === "Profile") iconName = "person-circle-outline";

//           return <Icon name={iconName} size={22} color={color} />;
//         },
//         tabBarActiveTintColor: "#fff",
//         tabBarInactiveTintColor: "#000",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Status" component={VisaStatusScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }


// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/Ionicons";
// import HomeStack from "./HomeStack";
// import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   const insets = useSafeAreaInsets();

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,

//         tabBarStyle: {
//           height: 60 + insets.bottom,
//           paddingBottom: insets.bottom,
//           paddingTop: 6,
//           backgroundColor: "#FF5C00",
//         },

//         tabBarLabelStyle: {
//           fontSize: 11,
//           marginBottom: 4,
//         },

//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === "Home") iconName = "globe-outline";
//           else if (route.name === "Status") iconName = "cloud-upload-outline";
//           else if (route.name === "Profile") iconName = "person-circle-outline";

//           return <Icon name={iconName} size={22} color={color} />;
//         },

//         tabBarActiveTintColor: "#fff",
//         tabBarInactiveTintColor: "#000",
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Status" component={VisaStatusScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

import HomeStack from "./HomeStack";
import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import JoinTravelAgentScreen from "../screens/agent/JoinAsTravelAgentScreen";
import EnquiryNowScreen from "../screens/EnquiryNowScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
          backgroundColor: "#FF5C00",
        },

        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },

        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "globe-outline";
          } else if (route.name === "Status") {
            iconName = "cloud-upload-outline";
          } else if (route.name === "EnquiryNow") {
            iconName = "chatbubble-outline";
          } else if (route.name === "JoinAgent") {
            iconName = "briefcase-outline"; // Join Travel Agent
          } else if (route.name === "Profile") {
            iconName = "person-circle-outline";
          }

          return <Icon name={iconName} size={22} color={color} />;
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />

      <Tab.Screen
        name="Status"
        component={VisaStatusScreen}
        options={{ tabBarLabel: "Status" }}
      />

      <Tab.Screen
        name="EnquiryNow"
        component={EnquiryNowScreen}
        options={{ tabBarLabel: "Enquiry Now" }}
      />

      <Tab.Screen
        name="JoinAgent"
        component={JoinTravelAgentScreen}
        options={{ tabBarLabel: "Join Agent" }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
