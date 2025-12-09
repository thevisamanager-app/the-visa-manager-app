import React, { useState, useMemo } from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  View,
} from 'react-native';
import CountryCards from '../components/CountryCards';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDestination } from '../Redux/destinationsSlice';
import { useNavigation } from '@react-navigation/native';


export default function DestinationScreen() {

  const [searchText, setSearchText] = useState('');
  const destinations = useSelector((state) => state.destinations.list);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const searchFilterFunction = (text) => {
  //   setSearchText(text);

  //   if (text) {
  //     const upperText = text.toUpperCase();
  //     const newData = data.filter((item) => {
  //       const itemName = item.countrName
  //         ? item.countrName.toUpperCase()
  //         : ''.toUpperCase();
  //       return itemName.indexOf(upperText) > -1;
  //     });
  //     setFilteredData(newData);
  //   } else {
  //     // reset if search is cleared
  //     setFilteredData(data);
  //   }
  // };


  // ⬇️ Filter from Redux store list
  const filteredData = useMemo(() => {
    if (!searchText) return destinations;

    const upperText = searchText.toUpperCase();
    return destinations.filter((item) => {
      const itemName = item.countrName ? item.countrName.toUpperCase() : '';
      return itemName.indexOf(upperText) > -1;
    });
  }, [searchText, destinations]);

console.log("DTAFILTER==>",destinations)
  // ⬇️ When card pressed, save item to Redux & navigate
  const handleCardPress = (item) => {
    dispatch(setSelectedDestination(item));
    navigation.navigate('StartApplicationScreen');   // make sure route name matches your stack
  };
  return (
    <SafeAreaView>

      <TextInput
        style={styles.input}
        onChangeText={(text) => searchFilterFunction(text)}
        value={searchText}
        placeholder="Search destination"
        placeholderTextColor={"#FF5C00"}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CountryCards
            title={item.countrName}
            source={item.source}
            countrName={item.countrName}
            item={item}
            onPress={() => handleCardPress(item)}
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
    color: "#111"
  },
});
