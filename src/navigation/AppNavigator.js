// // import { createStackNavigator } from "@react-navigation/stack";
// // import TabNavigator from "./TabNavigator";

// // import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
// // import PassportDetailsScreen from "../screens/passport/PassportDetailsScreen";
// // import QuestionScreen from "../screens/questions/QuestionScreen";
// // import ReviewAnswersScreen from "../screens/questions/ReviewAnswerScreen";
// // import DestinationScreen from "../screens/DestinationScreen";
// // import VisaQuestionScreen from "../screens/visa/VisaQuestionScreen";
// // import CheckoutScreen from "../screens/visa/CheckoutScreen";
// // import StartApplicationScreen from "../screens/start/StartApllicationScreen";
// // import TravelDateScreen from "../screens/date/TravelDateScreen";
// // import PhotoUploadScreen from "../screens/passport/PhotoUploadScreen";
// // import PassportListScreen from "../components/PassportListScreen";
// // import AddTravellerScreen from "../screens/passport/AddTravellerScreen";
// // import RatingScreen from "../screens/visa/RatingScreen";
// // import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
// // import AdminVisaStatusScreen from "../screens/visa/AdminVisaStatusScreen";
// // import EditProfileScreen from "../screens/profile/EditProfileScreen";
// // import ProfileScreen from "../screens/profile/ProfileScreen";

// // const Stack = createStackNavigator();

// // export default function AppNavigator({ isAdmin }) {
// //   console.log("IS ADMIN:", isAdmin);

// //   return (
// //     <Stack.Navigator
// //       screenOptions={{ headerShown: false }}
// //       initialRouteName={isAdmin ? "PassportListScreen" : "Tabs"}
// //     >
// //       {/* ADMIN HOME */}
// //       <Stack.Screen
// //         name="PassportListScreen"
// //         component={PassportListScreen}
// //       />

// //       {/* USER HOME */}
// //       <Stack.Screen name="Tabs" component={TabNavigator} />

// //       {/* SHARED SCREENS */}
// //       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
// //       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
// //       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
// //       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
// //       <Stack.Screen name="Destination" component={DestinationScreen} />
// //       <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
// //       <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
// //       <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
// //       <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />
// //       <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
// //       <Stack.Screen name="AddTravellerScreen" component={AddTravellerScreen} />
// //       <Stack.Screen name="RatingScreen" component={RatingScreen} />
// //       <Stack.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
// //       <Stack.Screen name="AdminVisaStatusScreen" component={AdminVisaStatusScreen} />
// //       <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
// //       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
// //     </Stack.Navigator>
// //   );
// // }



// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";

// /* =======================
//    USER NAVIGATION
// ======================= */
// import TabNavigator from "./TabNavigator";
// import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
// import PassportDetailsScreen from "../screens/passport/PassportDetailsScreen";
// import QuestionScreen from "../screens/questions/QuestionScreen";
// import ReviewAnswersScreen from "../screens/questions/ReviewAnswerScreen";
// import DestinationScreen from "../screens/DestinationScreen";
// import VisaQuestionScreen from "../screens/visa/VisaQuestionScreen";
// import CheckoutScreen from "../screens/visa/CheckoutScreen";
// import StartApplicationScreen from "../screens/start/StartApllicationScreen";
// import TravelDateScreen from "../screens/date/TravelDateScreen";
// import PhotoUploadScreen from "../screens/passport/PhotoUploadScreen";
// import AddTravellerScreen from "../screens/passport/AddTravellerScreen";
// import RatingScreen from "../screens/visa/RatingScreen";
// import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
// import EditProfileScreen from "../screens/profile/EditProfileScreen";
// import ProfileScreen from "../screens/profile/ProfileScreen";

// /* =======================
//    ADMIN NAVIGATION
// ======================= */
// import PassportListScreen from "../components/PassportListScreen";
// import AdminVisaStatusScreen from "../screens/visa/AdminVisaStatusScreen";

// const Stack = createStackNavigator();

// /* =====================================================
//    ADMIN STACK (NO TABS)
// ===================================================== */
// function AdminStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         name="PassportListScreen"
//         component={PassportListScreen}
//       />
//       <Stack.Screen
//         name="AdminVisaStatusScreen"
//         component={AdminVisaStatusScreen}
//       />
//     </Stack.Navigator>
//   );
// }

// /* =====================================================
//    USER STACK (WITH TABS)
// ===================================================== */
// function UserStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Tabs" component={TabNavigator} />

//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//       <Stack.Screen name="Destination" component={DestinationScreen} />
//       <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
//       <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
//       <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
//       <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />
//       <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
//       <Stack.Screen name="AddTravellerScreen" component={AddTravellerScreen} />
//       <Stack.Screen name="RatingScreen" component={RatingScreen} />
//       <Stack.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
//       <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
//       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// }

// /* =====================================================
//    ROOT APP NAVIGATOR
// ===================================================== */
// export default function AppNavigator({ isAdmin }) {
//   console.log("IS ADMIN →", isAdmin);

//   // 🚨 THIS IS THE KEY FIX
//   return isAdmin ? <AdminStack /> : <UserStack />;
// }


import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import PassportListScreen from "../components/PassportListScreen";
import AdminVisaStatusScreen from "../screens/visa/AdminVisaStatusScreen";

const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PassportListScreen" component={PassportListScreen} />
      <Stack.Screen name="AdminVisaStatusScreen" component={AdminVisaStatusScreen} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}

export default function AppNavigator({ isAdmin }) {
  return isAdmin ? <AdminStack /> : <UserStack />;
}
