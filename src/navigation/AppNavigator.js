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

// <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
// <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
// <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
// <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
// <Stack.Screen name="Destination" component={DestinationScreen} />
// <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
// <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
// <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
// <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />
// <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
// <Stack.Screen name="AddTravellerScreen" component={AddTravellerScreen} />
// <Stack.Screen name="RatingScreen" component={RatingScreen} />
// <Stack.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
// <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
// <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
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


// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import TabNavigator from "./TabNavigator";
// import PassportListScreen from "../components/PassportListScreen";
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



// const Stack = createStackNavigator();

// function AdminStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="PassportListScreen" component={PassportListScreen} />
//     </Stack.Navigator>
//   );
// }

// function UserStack() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Tabs" component={TabNavigator} />
//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//       <Stack.Screen name="DestinationScreen" component={DestinationScreen} />
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

// export default function AppNavigator({ isAdmin }) {
//   return isAdmin ? <AdminStack /> : <UserStack />;
// }

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* -------------------- NAVIGATORS -------------------- */
import TabNavigator from "./TabNavigator";

/* -------------------- ADMIN -------------------- */
import PassportListScreen from "../components/PassportListScreen";

/* -------------------- USER SCREENS -------------------- */
import PassportUploadScreen from "../screens/passport/PassportUploadScreen";
import PassportDetailsScreen from "../screens/passport/PassportDetailsScreen";
import QuestionScreen from "../screens/questions/QuestionScreen";
import DestinationScreen from "../screens/DestinationScreen";
import VisaQuestionScreen from "../screens/visa/VisaQuestionScreen";
import CheckoutScreen from "../screens/visa/CheckoutScreen";
import StartApplicationScreen from "../screens/start/StartApllicationScreen";
import TravelDateScreen from "../screens/date/TravelDateScreen";
import PhotoUploadScreen from "../screens/passport/PhotoUploadScreen";
import AddTravellerScreen from "../screens/passport/AddTravellerScreen";
import RatingScreen from "../screens/visa/RatingScreen";
import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MyTripsScreen from "../screens/profile/MyTripsScreen"
import VisaDetailsScreen from "../screens/moreinfo/VisaDetailsScreen";
import VisaTypeScreen from "../screens/visa/VisaTypeScreen";
import EntrytypeScreen from "../screens/visa/EntryTypeScreen";

/* -------------------- SCHENGEN SCREENS -------------------- */
import SchengenPersonalDetailsScreen from "../screens/Schengen/SchengenPersonalDetailsScreen";
import SchengenSponsorScreen from "../screens/Schengen/SchengenSponsorScreen";
import SchengenAddressScreen from "../screens/Schengen/SchengenAddressScreen";
import SchengenAppointmentScreen from "../screens/Schengen/SchengenAppointmentScreen";
import SchengenCountriesVisitScreen from "../screens/Schengen/SchengenCountriesVisitScreen";
import SchengenDocumentsScreen from "../screens/Schengen/SchengenDocumentsScreen";
import SchengenStepper from "../components/SchengenStepper"
const Stack = createStackNavigator();

/* ===================== ADMIN STACK ===================== */
function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PassportListScreen"
        component={PassportListScreen}
      />
    </Stack.Navigator>
  );
}

/* ===================== USER STACK ===================== */
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* MAIN */}
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="DestinationScreen" component={DestinationScreen} />
      <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
      <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />

      {/* SCHENGEN FLOW (ALWAYS REGISTERED) */}
      <Stack.Screen
        name="SchengenPersonalDetails"
        component={SchengenPersonalDetailsScreen}
      />
      <Stack.Screen
        name="SchengenSponsor"
        component={SchengenSponsorScreen}
      />
        <Stack.Screen
        name="MyTripScreen"
        component={MyTripsScreen}
      />
      <Stack.Screen
        name="SchengenAddress"
        component={SchengenAddressScreen}
      />
      <Stack.Screen
        name="SchengenAppointment"
        component={SchengenAppointmentScreen}
      />
      <Stack.Screen
        name="SchengenCountriesVisit"
        component={SchengenCountriesVisitScreen}
      />
      <Stack.Screen
        name="SchengenDocuments"
        component={SchengenDocumentsScreen}
      />

      {/* EXISTING FLOW */}
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
      <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
      <Stack.Screen name="VisaDetailsScreen" component={VisaDetailsScreen} />
      <Stack.Screen name="VisaTypeScreen" component={VisaTypeScreen} />
      <Stack.Screen name="EntryTypeScreen" component={EntrytypeScreen} />

      {/* EXTRA */}
      <Stack.Screen name="AddTravellerScreen" component={AddTravellerScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SchengenStepper" component={SchengenStepper} />
    </Stack.Navigator>
  );
}

/* ===================== ROOT ===================== */
export default function AppNavigator({ isAdmin }) {
  return isAdmin ? <AdminStack /> : <UserStack />;
}
