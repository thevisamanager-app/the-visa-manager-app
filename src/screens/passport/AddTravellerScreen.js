import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";


export default function AddTravellerScreen({ navigation, route }) {
  const { onSave } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);

  const saveTraveller = () => {
    const newPassenger = { firstName, lastName, photo };
    onSave(newPassenger);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="First Name" onChangeText={setFirstName} style={{borderWidth:1,padding:8}} />
      <TextInput placeholder="Last Name" onChangeText={setLastName} style={{borderWidth:1,padding:8,marginTop:10}} />

      <TouchableOpacity onPress={saveTraveller} style={{marginTop:20,backgroundColor:"orange",padding:12,borderRadius:10}}>
        <Text style={{textAlign:"center",color:"#fff"}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
