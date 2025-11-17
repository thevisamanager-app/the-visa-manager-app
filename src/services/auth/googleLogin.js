// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// export async function signInWithGoogle() {
//   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//   // Step 1: Google popup
//   const { idToken } = await GoogleSignin.signIn();

//   // Step 2: Create Firebase credential
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Step 3: Login into Firebase
//   return auth().signInWithCredential(googleCredential);
// }


import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getApp } from '@react-native-firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com', // Found in Firebase Console → Project Settings → OAuth client type: Web
});

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      // Ensure Google Play Services are available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential using the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      // Sign in with the credential using the modular API
      const auth = getAuth(getApp());
      const result = await signInWithCredential(auth, googleCredential);

      console.log('User signed in:', result.user);
      // Navigate or update UI on success
    } catch (error) {
      console.error('Google Sign-in error:', error);
      Alert.alert('Login Failed', error?.message || 'Unknown error during Google sign-in');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleGoogleLogin}>
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
