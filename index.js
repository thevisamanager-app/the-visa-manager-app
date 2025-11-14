// // /**
// //  * @format
// //  */

// // import { AppRegistry } from 'react-native';
// // import React from 'react';
// // import { Provider } from 'react-redux';
// // import { store } from './src/Redux/store';
// // import { name as appName } from './app.json';

// // const ReduxApp = () => (
// //   <Provider store={store}>
// //     <App />
// //   </Provider>
// // );

// // AppRegistry.registerComponent(appName, () => ReduxApp);


// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/Redux/store';
// import App from './App';  // <-- Important!
// import { name as appName } from './app.json';

// // Wrap App inside Provider
// const ReduxApp = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// // Register your main component
// AppRegistry.registerComponent(appName, () => ReduxApp);
import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';
import App from './App';
import { name as appName } from './app.json';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
