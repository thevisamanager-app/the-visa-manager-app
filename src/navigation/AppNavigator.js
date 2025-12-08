
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
import StartApplicationScreen from '../screens/start/StartApllicationScreen';
import TravelDateScreen from '../screens/date/TravelDateScreen';
import PhotoUploadScreen from '../screens/passport/PhotoUploadScreen';
import PassportListScreen from '../components/PassportListScreen';
import AddTravellerScreen from "../screens/passport/AddTravellerScreen";
import RatingScreen from "../screens/visa/RatingScreen";
import VisaStatusScreen from "../screens/visa/VisaStatusScreen";
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
      <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
      <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />
      <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
      <Stack.Screen name="PassportListScreen" component={PassportListScreen} />
      <Stack.Screen name="AddTravellerScreen" component={AddTravellerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
      <Stack.Screen name="VisaStatusScreen" component={VisaStatusScreen} />
    </Stack.Navigator>
  );
}

