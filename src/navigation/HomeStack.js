import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import DestinationScreen from "../screens/DestinationScreen";
import VisaQuestionScreen from "../screens/visa/VisaQuestionScreen";
import CheckoutScreen from "../screens/visa/CheckoutScreen";
import StartApplicationScreen from "../screens/start/StartApllicationScreen";
import TravelDateScreen from "../screens/date/TravelDateScreen";
import MyTripsScreen from "../screens/profile/MyTripsScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Destination" component={DestinationScreen} />
            <Stack.Screen name="VisaQuestionScreen" component={VisaQuestionScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="StartApplicationScreen" component={StartApplicationScreen} />
            <Stack.Screen name="TravelDateScreen" component={TravelDateScreen} />
            <Stack.Screen name="MyTripScreen" component={MyTripsScreen} />
        </Stack.Navigator>
    );
}
