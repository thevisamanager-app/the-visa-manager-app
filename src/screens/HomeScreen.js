import React, { useEffect ,useState} from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getPassportData } from '../api/user/passportService';

export default function HomeScreen({ navigation }) {
  const logout = async () => {
    await auth().signOut();
    navigation.replace("Login");
  };
  const [data, setData] = useState(null);

  useEffect(() => {
  getPassportData().then(setData);
}, []);


  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ fontSize: 20 }}>Welcome to Home!</Text>

    //   <Button title="Logout" onPress={logout} />
    // </View>
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome to TheVisaManager</Text>

      <Button
        title="Scan Passport"
        onPress={() => navigation.navigate('PassportUploadScreen')}
      />

      <View style={{ height: 12 }} />

      <Button
        title="Answer Visa Questions"
        onPress={() => navigation.navigate('QuestionScreen')}
      />
    </View>
    
  );
}
