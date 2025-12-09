// // // /**
// // //  * Sample React Native App
// // //  * https://github.com/facebook/react-native
// // //  *
// // //  * @format
// // //  */

// // // import { NewAppScreen } from '@react-native/new-app-screen';
// // // import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// // // import {
// // //   SafeAreaProvider,
// // //   useSafeAreaInsets,
// // // } from 'react-native-safe-area-context';
// // // import Counter from './src/components/counter'

// // // function App() {
// // //   const isDarkMode = useColorScheme() === 'dark';

// // //   return (
// // //     <SafeAreaProvider>
// // //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// // //       <AppContent />
// // //     </SafeAreaProvider>
// // //   );
// // // }

// // // function AppContent() {
// // //   const safeAreaInsets = useSafeAreaInsets();

// // //   return (
// // //     <View style={styles.container}>
// // //       <NewAppScreen
// // //         templateFileName="App.tsx"
// // //         safeAreaInsets={safeAreaInsets}
// // //       />
// // //     </View>
// // //   );
// // // }

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //   },
// // // });

// // // export default App;



// // // App.js
// // import { useEffect } from 'react';
// // // import { Provider } from 'react-redux';
// // // import { store } from './src/Redux/store';
// //  import UserListScreen from './src/screens/UserListScreen';
// // import Counter from'./src/components/Counter';
// //  import { View ,Text} from 'react-native';
// //  import { configureGoogleSignin } from './src/config/googleConfig';
 

// // export default function App() {
  
// //   useEffect(() => {
// //     configureGoogleSignin();
// //   }, []);

// //   return (
// //     <View>
// //       <Text>Hello World</Text>
// //       <Counter/>
// //       <UserListScreen />
// //     </View>
// //   );
// // }

// // import React, { useEffect } from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import RootNavigator from './src/navigation/RootNavigator';
// // import { configureGoogleSignin } from './src/config/googleConfig';

// // export default function App() {
// //   useEffect(() => {
// //     configureGoogleSignin();
// //   }, []);

// //   return (
// //     <NavigationContainer>
// //       <RootNavigator />
// //     </NavigationContainer>
// //   );
// // }


// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './src/navigation/RootNavigator';
// import { configureGoogleSignin } from './src/config/googleConfig';
// import { Provider } from 'react-redux';
// import { store } from './src/Redux/store';   // <- path depends on your structure

// export default function App() {
//   useEffect(() => {
//     configureGoogleSignin();
//   }, []);

//   return (
//     <Provider store={store}>             {/* Wrap whole app */}
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { configureGoogleSignin } from './src/config/googleConfig';

import { Provider } from 'react-redux';
import { store } from './src/Redux/store';  // ⬅️ check correct path

export default function App() {
  useEffect(() => {
    configureGoogleSignin();
  }, []);

  return (
    <Provider store={store}>                {/* MUST wrap here */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
