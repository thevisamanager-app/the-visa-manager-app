// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../screens/LoginScreen';
// import OtpScreen from '../screens/OtpScreen';
// import HomeScreen from '../screens/HomeScreen';
// import PassportUploadScreen from '../screens/passport/PassportUploadScreen';
// import PassportDetailsScreen from '../screens/passport/PassportDetailsScreen';
// import QuestionScreen from '../screens/questions/QuestionScreen';
// import ReviewAnswersScreen from '../screens/questions/ReviewAnswerScreen';
// import TabNavigator from "./TabNavigator";

// const Stack = createStackNavigator();

// export default function AuthNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Tabs" component={TabNavigator} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="OtpScreen" component={OtpScreen} />
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="PassportUploadScreen" component={PassportUploadScreen} />
//       <Stack.Screen name="PassportDetailsScreen" component={PassportDetailsScreen} />
//       <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
//       <Stack.Screen name="ReviewAnswersScreen" component={ReviewAnswersScreen} />
//     </Stack.Navigator>
//   );
// }


import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';



const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
}
