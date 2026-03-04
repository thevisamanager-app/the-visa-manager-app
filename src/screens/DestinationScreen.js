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


// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import CountryCards from '../components/CountryCards';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedDestination } from '../Redux/destinationsSlice';
// import { useNavigation } from '@react-navigation/native';
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from '../utils/metrics';

// export default function DestinationScreen() {

//   const [searchText, setSearchText] = useState('');
//   const [date, setDate] = useState('');

//   const destinations = useSelector((state) => state.destinations.list);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // ---------------------------
//   // Get date 5 days from now
//   // ---------------------------
//   const getDateAfterFiveDays = () => {
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 5);

//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return currentDate.toLocaleDateString('en-GB', options);
//   };

//   // Call once when screen loads
//   useEffect(() => {
//     setDate(getDateAfterFiveDays());
//   }, []);

//   // ---------------------------
//   // Search filter
//   // ---------------------------
//   const filteredData = useMemo(() => {
//     if (!searchText) return destinations;

//     const upperText = searchText.toUpperCase();
//     return destinations.filter((item) => {
//       const itemName = item.countrName ? item.countrName.toUpperCase() : '';
//       return itemName.indexOf(upperText) > -1;
//     });
//   }, [searchText, destinations]);


//   const handleCardPress = (item) => {
//     dispatch(setSelectedDestination(item));
//     navigation.navigate('StartApplicationScreen');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>

//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setSearchText(text)}
//         value={searchText}
//         placeholder="Search destination"
//         placeholderTextColor={"#FF5C00"}
//       />

//       {
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           renderItem={({ item }) => (
//             <CountryCards
//               title={item.countrName}
//               source={item.source}
//               countrName={item.countrName}
//               item={item}
//               onPress={() => handleCardPress(item)}
//               date={date}
//             />
//           )}
//         />
//       }

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FFF'
//   },
//   input: {
//     height: hp('6%'),
//     marginHorizontal: wp('4%'),
//     marginVertical: verticalScale(10),
//     borderWidth: scale(1),
//     padding: moderateScale(10),
//     borderRadius: moderateScale(10),
//     borderColor: 'grey',
//     color: '#111',
//     fontSize: RFValue(14),
//   },
// });


// import React, { useState, useMemo, useEffect } from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import CountryCards from '../components/CountryCards';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSelectedDestination } from '../Redux/destinationsSlice';
// import { useNavigation } from '@react-navigation/native';
// import { wp, hp, scale, verticalScale, moderateScale, RFValue } from '../utils/metrics';

// export default function DestinationScreen() {

//   const [searchText, setSearchText] = useState('');
//   const [date, setDate] = useState('');

//   const destinations = useSelector((state) => state.destinations.list);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   // ---------------------------
//   // Get date 5 days from now
//   // ---------------------------
//   const getDateAfterFiveDays = () => {
//     const currentDate = new Date();
//     currentDate.setDate(currentDate.getDate() + 5);

//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return currentDate.toLocaleDateString('en-GB', options);
//   };

//   // Call once when screen loads
//   useEffect(() => {
//     setDate(getDateAfterFiveDays());
//   }, []);

//   // ---------------------------
//   // Search filter
//   // ---------------------------
//   const filteredData = useMemo(() => {
//     if (!searchText) return destinations;

//     const upperText = searchText.toUpperCase();
//     return destinations.filter((item) => {
//       const itemName = item.countrName ? item.countrName.toUpperCase() : '';
//       return itemName.indexOf(upperText) > -1;
//     });
//   }, [searchText, destinations]);


//   const handleCardPress = (item) => {
//     dispatch(setSelectedDestination(item));
//     navigation.navigate('StartApplicationScreen');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>

//       <TextInput
//         style={styles.input}
//         onChangeText={(text) => setSearchText(text)}
//         value={searchText}
//         placeholder="Search destination"
//         placeholderTextColor={"#FF5C00"}
//       />

//       {/* <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <CountryCards
//             title={item.countrName}
//             source={item.source}
//             countrName={item.countrName}
//             item={item}
//             onPress={() => handleCardPress(item)}
//             date={date}      // Now date is passed correctly
//           />
//         )}
//       /> */
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id.toString()}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           renderItem={({ item }) => (
//             <CountryCards
//              // title={item.countrName}
//               source={item.source}
//               countrName={item.countrName}
//               item={item}
//               onPress={() => handleCardPress(item)}
//               date={date}
//             />
//           )}
//         />
//       }

//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FFF'
//   },
//   input: {
//     height: hp('6%'),
//     marginHorizontal: wp('4%'),
//     marginVertical: verticalScale(10),
//     borderWidth: scale(1),
//     padding: moderateScale(10),
//     borderRadius: moderateScale(10),
//     borderColor: 'grey',
//     color: '#111',
//     fontSize: RFValue(14),
//   },
// });


import React, { useState, useMemo, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

import CountryCards from '../components/CountryCards';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDestination } from '../Redux/destinationsSlice';
import { useNavigation } from '@react-navigation/native';
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from '../utils/metrics';

const FILTERS = [
  { key: 'ALL', label: 'All' },
  { key: 'Schengen', label: 'Schengen' },
  { key: 'Visa Free', label: 'Visa Free' },
  { key: 'evisa', label: 'eVisa' },
];
export default function DestinationScreen() {
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  const destinations = useSelector((state) => state.destinations.list);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /* ---------------------------
     Get date 5 days from now
  --------------------------- */
  const getDateAfterFiveDays = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 5);

    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return currentDate.toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    setDate(getDateAfterFiveDays());
  }, []);

  /* ---------------------------
     SEARCH + FILTER (FIXED)
  --------------------------- */
  const filteredData = useMemo(() => {
    let data = destinations;

    // ✅ FILTER BY countryType
    if (activeFilter !== 'ALL') {
      data = data.filter(
        (item) =>
          item.countryType?.toLowerCase() ===
          activeFilter.toLowerCase()
      );
    }

    // ✅ SEARCH BY COUNTRY NAME
    if (searchText) {
      const upperText = searchText.toUpperCase();
      data = data.filter((item) =>
        item.countrName?.toUpperCase().includes(upperText)
      );
    }

    return data;
  }, [searchText, destinations, activeFilter]);

  const handleCardPress = (item) => {
    dispatch(setSelectedDestination(item));
    const isSchengen =
      String(item?.countryType || "").trim().toLowerCase() === "schengen";

    if (isSchengen) {
      navigation.navigate("SchengenFlowScreen", {
        country: item?.countrName || "Schengen",
        destination: item,
        date,
      });
      return;
    }

    navigation.navigate("VisaDetailsScreen", { date });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#94A3B8" />
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search destination"
          placeholderTextColor={"#94A3B8"}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText("")} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* 🔥 FILTER BUTTONS */}
      <View style={styles.filterWrap}>
        <View style={styles.filterRow}>
          {FILTERS.map((filter, index) => {
            const isActive =
              activeFilter.toLowerCase() === filter.key.toLowerCase();

            return (
              <TouchableOpacity
                key={filter.key}
                onPress={() => setActiveFilter(filter.key)}
                style={[
                  styles.filterBtn,
                  filter.key === 'ALL' && styles.filterBtnAll,
                  filter.key === 'Schengen' && styles.filterBtnSchengen,
                  filter.key === 'Visa Free' && styles.filterBtnVisaFree,
                  filter.key === 'evisa' && styles.filterBtnEVisa,
                  index === FILTERS.length - 1 && styles.filterBtnLast,
                  isActive && styles.activeFilterBtn,
                ]}
                activeOpacity={0.85}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.activeFilterText,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>


      {/* Country List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) =>
          `${String(item?.id ?? "na")}-${String(item?.countrName ?? "country")}-${index}`
        }
        renderItem={({ item }) => (
          <CountryCards
            item={item}
            countrName={item.countrName}
            date={date}
            onPress={() => handleCardPress(item)}
          />
        )}
      />

    </SafeAreaView>
  );
}

/* ---------------------------
   STYLES
--------------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },

  searchWrap: {
    marginHorizontal: wp('4%'),
    marginVertical: verticalScale(10),
    minHeight: hp('6%'),
    borderWidth: scale(1.1),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(999),
    borderColor: '#D3DEEC',
    backgroundColor: '#FFFFFF',
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    color: '#111',
    fontSize: RFValue(14),
    paddingVertical: 0,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(8),
  },
  filterWrap: {
    marginHorizontal: wp('4%'),
    marginBottom: verticalScale(10),
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DFEC',
    borderRadius: moderateScale(14),
    elevation: 1,
  },

  filterBtn: {
    flex: 1,
    minWidth: 0,
    minHeight: verticalScale(34),
    justifyContent: 'center',
    paddingVertical: verticalScale(7),
    paddingHorizontal: moderateScale(6),
    marginRight: moderateScale(8),
    borderRadius: moderateScale(999),
    borderWidth: 1,
    borderColor: '#C9D5E6',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  filterBtnAll: {
    flex: 0.82,
  },
  filterBtnSchengen: {
    flex: 1.32,
  },
  filterBtnVisaFree: {
    flex: 1.22,
  },
  filterBtnEVisa: {
    flex: 0.9,
  },

  filterBtnLast: {
    marginRight: 0,
  },

  activeFilterBtn: {
    backgroundColor: '#FF5C00',
    borderColor: '#FF5C00',
  },

  filterText: {
    fontSize: RFValue(12),
    color: '#334155',
    fontWeight: '600',
    alignSelf: "center",
  },

  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
