import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function signInWithGoogle() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  // Step 1: Google popup
  const { idToken } = await GoogleSignin.signIn();

  // Step 2: Create Firebase credential
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Step 3: Login into Firebase
  return auth().signInWithCredential(googleCredential);
}
