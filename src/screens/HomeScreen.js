import React from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
  const logout = async () => {
    await auth().signOut();
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Welcome to Home!</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}
