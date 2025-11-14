// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from './counterSlice'

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  },
});
