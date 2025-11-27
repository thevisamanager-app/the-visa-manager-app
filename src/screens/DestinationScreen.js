import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
} from 'react-native';
import CountryCards from '../components/CountryCards';
import { SafeAreaView } from 'react-native-safe-area-context';


const DATA = [
  {
    id: 1,
    source: require('../assets/images/vietnam.jpeg'),
    title: '07 NOV 11:42 AM',
    countrName: 'Vietnam',
  },
  {
    id: 2,
    source: require('../assets/images/singapore.jpeg'),
    title: '08 DEC 12:15 PM',
    countrName: 'Singapore',
  },
  {
    id: 3,
    source: require('../assets/images/indonesia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Indonesia',
  },
];

export default function DestinationScreen() {
  const [data, setData] = useState(DATA);
  const [filteredData, setFilteredData] = useState(DATA);
  const [searchText, setSearchText] = useState('');

  const searchFilterFunction = (text) => {
    setSearchText(text);

    if (text) {
      const upperText = text.toUpperCase();
      const newData = data.filter((item) => {
        const itemName = item.countrName
          ? item.countrName.toUpperCase()
          : ''.toUpperCase();
        return itemName.indexOf(upperText) > -1;
      });
      setFilteredData(newData);
    } else {
      // reset if search is cleared
      setFilteredData(data);
    }
  };

  return (
    <SafeAreaView>

      <TextInput
        style={styles.input}
        onChangeText={(text) => searchFilterFunction(text)}
        value={searchText}
        placeholder="Search destination"
        placeholderTextColor={"#111"}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CountryCards
            title={item.title}
            source={item.source}
            countrName={item.countrName}
            item={item}
          />
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'grey',
    color:"#111"
  },
});
