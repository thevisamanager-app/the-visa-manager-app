// // import auth from '@react-native-firebase/auth';
// // import { GoogleSignin } from '@react-native-google-signin/google-signin';

// // export async function signInWithGoogle() {
// //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

// //   // Step 1: Google popup
// //   const { idToken } = await GoogleSignin.signIn();

// //   // Step 2: Create Firebase credential
// //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

// //   // Step 3: Login into Firebase
// //   return auth().signInWithCredential(googleCredential);
// // }


// // import { GoogleSignin } from '@react-native-google-signin/google-signin';
// // import auth from '@react-native-firebase/auth';

// // GoogleSignin.configure({
// //   webClientId: '973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com',
// // });

// // export async function googleLogin() {
// //   try {
// //     await GoogleSignin.hasPlayServices();
// //     const { idToken } = await GoogleSignin.signIn();

// //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

// //     return auth().signInWithCredential(googleCredential);
// //   } catch (error) {
// //     console.log("GOOGLE LOGIN ERROR", error);
// //   }
// // }


// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId: '973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com', // from Firebase console
// });

// export async function googleLogin() {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//     const { idToken } = await GoogleSignin.signIn();

//     if (!idToken) {
//       throw new Error("Failed to fetch idToken from Google");
//     }

//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//     return await auth().signInWithCredential(googleCredential);
//   // } catch (error) {
//   //   console.log("GoogleSignIn error code:", error.code);
//   //   console.log("GoogleSignIn error message:", error.message);
//   //   console.log("GoogleSignIn raw error:", error);

//   //   // console.log("LOGIN_CREDENTIAL",error)
//   //   // console.error("GOOGLE LOGIN ERROR:", JSON.stringify(error, null, 2));
//   //   alert(error.message || 'Google sign-in failed');
//   // }
//    } catch (error) {
//   console.error("GOOGLE SIGNIN ERROR:", error);
//   throw error;  // 🔥 REQUIRED — let LoginScreen catch it
// }
// }


// import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import auth from "@react-native-firebase/auth";

// GoogleSignin.configure({
//   webClientId: "973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com",
//   offlineAccess: true,
// });

// export const googleLogin = async () => {
//   try {
//     await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//     // Sign in
//     const userInfo = await GoogleSignin.signIn();
//     console.log("USERINFO==>",userInfo)
//     const { idToken } = userInfo.data;

//     if (!idToken) {
//       throw new Error("No ID Token returned from Google");
//     }

//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     return await auth().signInWithCredential(googleCredential);
    
//   } catch (error) {
//     console.log("GOOGLE SIGNIN ERROR:", error);
//     throw error;
//   }
// };


import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId: "973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com",
  offlineAccess: true,
});

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const userInfo = await GoogleSignin.signIn();
    console.log("USERINFO =>", userInfo);

    const { idToken } = userInfo.data;   // <===== FIXED

    if (!idToken) throw new Error("No ID Token returned from Google");

    const credential = auth.GoogleAuthProvider.credential(idToken);

    return await auth().signInWithCredential(credential);

  } catch (error) {
    console.log("GOOGLE SIGNIN ERROR:", error);
    throw error;
  }
};
