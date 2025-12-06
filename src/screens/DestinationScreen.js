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
    VisaManagerFee:"1770",
    AuthorityCharges:"750",
    GovernmentFee:"2350",
    currency:""
  },
  {
    id: 2,
    source: require('../assets/images/singapore.jpeg'),
    title: '08 DEC 12:15 PM',
    countrName: 'Singapore',
    VisaManagerFee:"799",
    AuthorityCharges:"999",
    GovernmentFee:"1900",
    currency:""
  },
  {
    id: 3,
    source: require('../assets/images/South Korea.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'South Korea',
    VisaManagerFee:"3540",
    AuthorityCharges:"1200",
    GovernmentFee:"5800",
    currency:""
  },
  {
    id: 4,
    source: require('../assets/images/indonesia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Indonesia',
    VisaManagerFee:" 590",
    AuthorityCharges:"0",
    GovernmentFee:"2900",
    currency:""
  },
  {
    id: 5,
    source: require('../assets/images/Hong-Kong'),
    title: '09 JAN 11:00 AM',
    countrName: 'Hong Kong',
    VisaManagerFee:"588.82",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
  {
    id: 6,
    source: require('../assets/images/Combodia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Combodia',
    VisaManagerFee:"1770",
    AuthorityCharges:"944",
    GovernmentFee:"3100",
    currency:""
  },
  {
    id: 7,
    source: require('../assets/images/Sri lanka.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sri-Lanka',
    VisaManagerFee:"800",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
  {
    id: 8,
    source: require('../assets/images/Philippines.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Philippines',
    VisaManagerFee:"1180",
    AuthorityCharges:"0",
    GovernmentFee:"5800",
    currency:""
  },
  {
    id: 9,
    source: require('../assets/images/Uzbekistan.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uzbekistan',
    VisaManagerFee:"1770 per traveler",
    AuthorityCharges:"0",
    GovernmentFee:{
        Single:"1721",
        Double:"3012",
        multiple:"4303 "
    },
    currency:""
  },
  {
    id: 10,
    source: require('../assets/images/Armenia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Armenia',
    VisaManagerFee:"1770 per traveler",
    AuthorityCharges:"0",
    GovernmentFee:"3600",
    currency:""
  },
  {
    id: 11,
    source: require('../assets/images/Russia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Russia',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"8200",
    currency:""
  },
 {
    id: 12,
    source: require('../assets/images/France.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'France',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"2311.62",
    GovernmentFee:"9100",
    currency:""
  },
   {
    id: 13,
    source: require('../assets/images/Italy.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Italy',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"537",
    GovernmentFee:"9200 ",
    currency:""
  },
   {
    id: 14,
    source: require('../assets/images/Usa.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Usa',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"0",
    GovernmentFee:"17020",
    currency:""
  },
   {
    id: 15,
    source: require('../assets/images/Sweden.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sweden',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"8200",
    currency:""
  },
   {
    id: 16,
    source: require('../assets/images/Qatar.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Qatar',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"5000",
    currency:""
  },
   {
    id: 17,
    source: require('../assets/images/Romania.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Romania',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"5000",
    currency:""
  },
   {
    id: 18,
    source: require('../assets/images/Uganda.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uganda',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"6395",
    currency:""
  },
   {
    id: 19,
    source: require('../assets/images/Uk.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uk',
    VisaManagerFee:"4130",
    AuthorityCharges:"0",
    GovernmentFee:"15400 ",
    currency:""
  },
   {
    id: 20,
    source: require('../assets/images/Poland.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Poland',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"9743",
    currency:""
  },
   {
    id: 21,
    source: require('../assets/images/Portugal.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Portugal',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"9200",
    currency:""
  },
   {
    id: 22,
    source: require('../assets/images/Norway.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Norway',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"1740(",
    currency:""
  },
   {
    id: 23,
    source: require('../assets/images/Nigeria.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Nigeria',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"3000",
    currency:""
  },
   {
    id: 24,
    source: require('../assets/images/Netherland.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Netherland',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"1931.66",
    GovernmentFee:"9200 ",
    currency:""
  },
   {
    id: 25,
    source: require('../assets/images/Monoglia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Monoglia',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"5720",
    currency:""
  },
   {
    id: 26,
    source: require('../assets/images/Maldives.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Maldives',
    VisaManagerFee:"590",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
   {
    id: 27,
    source: require('../assets/images/Malawi.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Malawi',
    VisaManagerFee:"1770",
    AuthorityCharges:"944",
    GovernmentFee:"4306",
    currency:""
  },
   {
    id: 28,
    source: require('../assets/images/Liechtenstein.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Liechtenstein',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"2500",
    currency:""
  },
   {
    id: 29,
    source: require('../assets/images/Lebanon.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Lebanon',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"10870",
    currency:""
  },
   {
    id: 30,
    source: require('../assets/images/Finland.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Finland',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"9100",
    currency:""
  },
   {
    id: 31,
    source: require('../assets/images/Colombia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Colombia',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"6500",
    currency:""
  },
  {
    id: 32,
    source: require('../assets/images/Australia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Australia',
    VisaManagerFee:"4130",
    AuthorityCharges:"0",
    GovernmentFee:"12400",
    currency:""
  },
  {
    id: 33,
    source: require('../assets/images/Austria.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Austria',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"1931.66",
    GovernmentFee:"9100",
    currency:""
  },
  {
    id: 34,
    source: require('../assets/images/Buleria.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Bularia',
    VisaManagerFee:"2950",
    AuthorityCharges:"2070",
    GovernmentFee:"8600",
    currency:""
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
        placeholderTextColor={"#FF5C00"}
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
