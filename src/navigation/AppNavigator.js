// // // import { createStackNavigator } from '@react-navigation/stack';
// // // import LoginScreen from '../screens/LoginScreen';
// // // import TabNavigator from "./TabNavigator";

// // // const Stack = createStackNavigator();

// // // export default function AppNavigator() {
// // //   return (
// // //     <Stack.Navigator screenOptions={{ headerShown: false }}>
// // //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
// // //         <Stack.Screen name="Tabs" component={TabNavigator} />
// // //     </Stack.Navigator>
// // //   );
// // // }


// // import { createStackNavigator } from '@react-navigation/stack';
// // import TabNavigator from "./TabNavigator";
// // import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// // import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
// // import QuestionScreen from '../screens/questions/QuestionScreen';
// // import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
// // import HomeScreen from '../screens/HomeScreen';

// // const Stack = createStackNavigator();

// // export default function AppNavigator() {
// //   return (
// //     <Stack.Navigator screenOptions={{ headerShown: false }}>
// //       <Stack.Screen name="Tabs" component={TabNavigator} />
// //         <Stack.Screen name="HomeScreen" component={HomeScreen} />
// //       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
// //       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
// //       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
// //       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
// //     </Stack.Navigator>
// //   );
// // }


// import { createStackNavigator } from '@react-navigation/stack';
// import TabNavigator from './TabNavigator';
// import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
// import QuestionScreen from '../screens/questions/QuestionScreen';
// import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Tabs" component={TabNavigator} />
//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//     </Stack.Navigator>
//   );
// }


// import { createStackNavigator } from '@react-navigation/stack';
// import TabNavigator from './TabNavigator';
// import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
// import QuestionScreen from '../screens/questions/QuestionScreen';
// import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
// import HomeScreen from '../screens/HomeScreen';
// import DestinationScreen from '../screens/DestinationScreen'
// import VisaQuestionScreen from '../screens/visa/VisaQuestionScreen'


// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>

//       {/* MAIN APP ENTRY — Tabs must be FIRST */}
//       <Stack.Screen name="Tabs" component={TabNavigator} />

//       {/* Additional screens */}
//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="Destination" component={DestinationScreen} />
//       <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />



//     </Stack.Navigator>
//   );
// }
// import { createStackNavigator } from '@react-navigation/stack';
// import TabNavigator from './TabNavigator';

// import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
// import QuestionScreen from '../screens/questions/QuestionScreen';
// import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
// import HomeScreen from '../screens/HomeScreen';
// import DestinationScreen from '../screens/DestinationScreen';
// import VisaQuestionScreen from '../screens/visa/VisaQuestionScreen';


// // ⭐ Add CheckoutScreen
// // import CheckoutScreen from '../screens/visa/CheckoutScreen';

// const Stack = createStackNavigator();

// export default function AppNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>

//       {/* MAIN APP ENTRY */}
//       <Stack.Screen name="Tabs" component={TabNavigator} />

//       {/* Additional screens */}
//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="Destination" component={DestinationScreen} />
//       <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />




//     </Stack.Navigator>
//   );
// }

import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';

import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
import QuestionScreen from '../screens/questions/QuestionScreen';
import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
import HomeScreen from '../screens/HomeScreen';
import DestinationScreen from '../screens/DestinationScreen';
import VisaQuestionScreen from '../screens/visa/VisaQuestionScreen';
import CheckoutScreen from '../screens/visa/CheckoutScreen';



const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
      <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Destination" component={DestinationScreen} />
      <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

