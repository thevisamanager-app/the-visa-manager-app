// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUserFromStorage } from '../Redux/authSlice';
// import AuthNavigator from './AuthNavigator';
// import AppNavigator from './AppNavigator';
// import auth from "@react-native-firebase/auth";
// import { getAllPassportDataAdmin } from "../api/user/passportService";


// // export default function RootNavigator() {
// //   const dispatch = useDispatch();
// //   const user = useSelector((state) => state.auth.user);

// //   useEffect(() => {
// //     dispatch(loadUserFromStorage());
// //   }, []);

// //   console.log("USER==>",user)
// //   return user ? <AppNavigator /> : <AuthNavigator />;
// // }


// export default function RootNavigator() {

//   const dispatch = useDispatch();
//   const userR = useSelector((state) => state.auth.user);
//   const checkAdmin = async () => {
//     const uid = auth().currentUser?.uid;
//     if (!uid) return false;

//     const snap = await firestore().collection("users").doc(uid).get();
//     return snap.exists && snap.data()?.isAdmin === true;
//   };
//   const AdminUser = async () => {
//     const isAdmin = await checkAdmin();
//     if(isAdmin) setAdminUser(true)
//     if (!isAdmin) {
//       Alert.alert("Access Denied", "Admin only");
//       return;
//     }
//   }

//   console.log("ISADMIN===>",adminuser)
//   useEffect(() => {
//     dispatch(loadUserFromStorage());
//   }, []);

//   // Updated check
//   const [user, setUser] = useState(null);
//   const [adminuser, setAdminUser] =useState(false)
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged((authUser) => {
//       setUser(authUser);
//     });
//     return subscriber; // unsubscribe on unmount
//   }, []);
//   console.log("Root user:", user?.isAdmin);
//   console.log("Logged in?", user?.isLoggedIn);
//   return user ? <AppNavigator /> : <AuthNavigator />;
// }


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { loadUserFromStorage } from "../Redux/authSlice";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const dispatch = useDispatch();

  const [initializing, setInitializing] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ----------------------------------
  // Load redux user (optional but OK)
  // ----------------------------------
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  // ----------------------------------
  // Listen to Firebase Auth
  // ----------------------------------
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      setFirebaseUser(user);

      if (user) {
        try {
          const userDoc = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();

          setIsAdmin(userDoc.exists && userDoc.data()?.isAdmin === true);
        } catch (err) {
          console.log("Admin check error:", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  // ----------------------------------
  // Splash / loading guard
  // ----------------------------------
  if (initializing) {
    return null; // or <SplashScreen />
  }

  // ----------------------------------
  // Routing
  // ----------------------------------
  console.log("ADMIN==>",isAdmin)
  return firebaseUser ? (
    <AppNavigator isAdmin={isAdmin} />
  ) : (
    <AuthNavigator />
  );
}
