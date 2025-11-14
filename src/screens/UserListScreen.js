// import React, { useEffect } from 'react';
// import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import  fetchUsers  from '../Redux/userSlice';

// export default function UserListScreen() {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: 'red' }}>Error: {error}</Text>
//       </View>
//     );
//   }

//   const renderItem = ({ item }) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.email}>{item.email}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   itemContainer: {
//     backgroundColor: '#f2f2f2',
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   email: {
//     fontSize: 14,
//     color: '#555',
//   },
// });


import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Redux/userSlice';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id?.toString() || Math.random().toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    backgroundColor: '#eee',
    marginVertical: 6,
    borderRadius: 8
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  email: {
    fontSize: 14
  }
});
