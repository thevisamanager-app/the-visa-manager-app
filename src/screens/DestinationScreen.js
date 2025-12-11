// import React, { useState, useMemo } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   View,
// } from 'react-native';
// import CountryCards from '../components/CountryCards';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedDestination } from '../Redux/destinationsSlice';
// import { useNavigation } from '@react-navigation/native';
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from '../utils/metrics';

// export default function DestinationScreen() {

//   const [date, setDate] = useState('');

//   const [searchText, setSearchText] = useState('');
//   const destinations = useSelector((state) => state.destinations.list);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // const searchFilterFunction = (text) => {
//   //   setSearchText(text);

//   //   if (text) {
//   //     const upperText = text.toUpperCase();
//   //     const newData = data.filter((item) => {
//   //       const itemName = item.countrName
//   //         ? item.countrName.toUpperCase()
//   //         : ''.toUpperCase();
//   //       return itemName.indexOf(upperText) > -1;
//   //     });
//   //     setFilteredData(newData);
//   //   } else {
//   //     // reset if search is cleared
//   //     setFilteredData(data);
//   //   }
//   // };


//   // ⬇️ Filter from Redux store list
//   const filteredData = useMemo(() => {
//     if (!searchText) return destinations;

//     const upperText = searchText.toUpperCase();
//     return destinations.filter((item) => {
//       const itemName = item.countrName ? item.countrName.toUpperCase() : '';
//       return itemName.indexOf(upperText) > -1;
//     });
//   }, [searchText, destinations]);


//   console.log("DTAFILTER==>", destinations)
//   // ⬇️ When card pressed, save item to Redux & navigate
//   const handleCardPress = (item) => {
//     dispatch(setSelectedDestination(item));
//     navigation.navigate('StartApplicationScreen');   // make sure route name matches your stack
//   };
//    const getDateAfterFiveDays = () => {
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 5);

//     const futureDate = getDateAfterFiveDays();
//     setDate(futureDate);
//     console.log(futureDate);  // Example output: 14 Feb 2025


//     // Format: DD MMM YYYY (e.g., 14 Feb 2025)
//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return currentDate.toLocaleDateString('en-GB', options);
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>

//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => searchFilterFunction(text)}
//         value={searchText}
//         placeholder="Search destination"
//         placeholderTextColor={"#FF5C00"}
//       />

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <CountryCards
//             title={item.countrName}
//             source={item.source}
//             countrName={item.countrName}
//             item={item}
//             onPress={() => handleCardPress(item)}
//             date={date}
//           />
//         )}
//       />

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FFF'
//   },
//   input: {
//     height: hp('6%'),                 // Responsive height
//     marginHorizontal: wp('4%'),       // Responsive margin
//     marginVertical: verticalScale(10),
//     borderWidth: scale(1),
//     padding: moderateScale(10),       // Responsive padding
//     borderRadius: moderateScale(10),  // Responsive border radius
//     borderColor: 'grey',
//     color: '#111',
//     fontSize: RFValue(14),            // Responsive text size
//   },
// });


import React, { useState, useMemo, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import CountryCards from '../components/CountryCards';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDestination } from '../Redux/destinationsSlice';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from '../utils/metrics';

export default function DestinationScreen() {

  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState('');

  const destinations = useSelector((state) => state.destinations.list);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // ---------------------------
  // Get date 5 days from now
  // ---------------------------
  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString('en-GB', options);
  };

  // Call once when screen loads
  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);

  // ---------------------------
  // Search filter
  // ---------------------------
  const filteredData = useMemo(() => {
    if (!searchText) return destinations;

    const upperText = searchText.toUpperCase();
    return destinations.filter((item) => {
      const itemName = item.countrName ? item.countrName.toUpperCase() : '';
      return itemName.indexOf(upperText) > -1;
    });
  }, [searchText, destinations]);


  const handleCardPress = (item) => {
    dispatch(setSelectedDestination(item));
    navigation.navigate('StartApplicationScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Search destination"
        placeholderTextColor={"#000"}
      />

      {/* <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CountryCards
            title={item.countrName}
            source={item.source}
            countrName={item.countrName}
            item={item}
            onPress={() => handleCardPress(item)}
            date={date}      // Now date is passed correctly
          />
        )}
      /> */
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 120 }}  // ⭐ Important
          renderItem={({ item }) => (
            <CountryCards
              title={item.countrName}
              source={item.source}
              countrName={item.countrName}
              item={item}
              onPress={() => handleCardPress(item)}
              date={date}
            />
          )}
        />
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  input: {
    height: hp('6%'),
    marginHorizontal: wp('4%'),
    marginVertical: verticalScale(10),
    borderWidth: scale(1),
    padding: moderateScale(10),
    borderRadius: moderateScale(50),
    borderColor: 'grey',
    color: '#fff',
    fontSize: RFValue(14),
    backgroundColor: "#fff"
  },
});
