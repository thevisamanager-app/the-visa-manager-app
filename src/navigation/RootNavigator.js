import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromStorage } from '../Redux/authSlice';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import auth from "@react-native-firebase/auth";


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
  const userR = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  // Updated check
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
    return subscriber; // unsubscribe on unmount
  }, []);
  console.log("Root user:", user);
  console.log("Logged in?", user?.isLoggedIn);
  return user ? <AppNavigator /> : <AuthNavigator />;
}
