import React, { useEffect ,useState} from 'react';
import { View, Text, Button,TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getPassportData } from '../api/user/passportService';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/authSlice';
import { logout } from "../services/auth/logoutService";
import { log } from 'console';

export default function HomeScreen({ navigation,route }) {
   const visaPreferences = route?.params?.answerPayload || null;
  // const logout = async () => {
  //   await auth().signOut();
  //   navigation.replace("Login");
  // };
  const [data, setData] = useState(null);
const dispatch = useDispatch();
  useEffect(() => {
  getPassportData().then(setData);
}, []);


  // const handleLogout = async () => {
  //   await dispatch(logoutUser());
  // };
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ fontSize: 20 }}>Welcome to Home!</Text>

    //   <Button title="Logout" onPress={logout} />
    // </View>
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome to TheVisaManager</Text>

      <Button
        title="Scan Passport"
        onPress={() => navigation.navigate('PassportUploadScreen',{ visaPreferences })}
      />

      <View style={{ height: 12 }} />

      {/* <Button
        title="Answer Visa Questions"
        onPress={() => navigation.navigate('QuestionScreen')}
      /> */}
            <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "red",
          paddingVertical: 12,
          paddingHorizontal: 25,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
      </TouchableOpacity>
    </View>
    
  );
}
