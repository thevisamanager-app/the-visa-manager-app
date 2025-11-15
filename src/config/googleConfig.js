import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function configureGoogleSignin() {
  GoogleSignin.configure({
    webClientId:
      '973458787565-asdh334k3841q64mcmi17tk993jrqf07.apps.googleusercontent.com',
    offlineAccess: true,
  });
}
