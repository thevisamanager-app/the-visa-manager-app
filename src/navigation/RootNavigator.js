import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage } from '../Redux/authSlice';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

// export default function RootNavigator() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     dispatch(loadUserFromStorage());
//   }, []);

//   console.log("USER==>",user)
//   return user ? <AppNavigator /> : <AuthNavigator />;
// }


export default function RootNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  // Updated check
  console.log("Root user:", user);
  console.log("Logged in?", user?.isLoggedIn);
  return user ? <AppNavigator /> : <AuthNavigator />;
}
