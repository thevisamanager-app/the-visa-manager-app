// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import HomeScreen from "../screens/HomeScreen";
// import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
// import QuestionScreen from "../screens/questions/QuestionScreen";

// const Tab = createBottomTabNavigator();

// export default function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: "#007bff",
//         tabBarInactiveTintColor: "gray",
//         tabBarIcon: ({ color, size }) => {
//           let iconName = "home";

//           if (route.name === "Home") iconName = "home";
//           else if (route.name === "Passport") iconName = "camera-alt";
//           else if (route.name === "Questions") iconName = "question-answer";

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Passport" component={PassportUploadScreen} />
//       <Tab.Screen name="Questions" component={QuestionScreen} />
//     </Tab.Navigator>
//   );
// }


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
import PassportListScreen from '../components/PassportListScreen';
import DestinationScreen from '../screens/DestinationScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Destination" component={DestinationScreen} />
      <Tab.Screen name="Passport" component={PassportUploadScreen} />
      <Tab.Screen name="PassportListScreen" component={PassportListScreen} />
       <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
}
