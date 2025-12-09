// src/utils/metrics.js
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { RFValue } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('window');

export {
  width,
  height,
  wp,
  hp,
  scale,
  verticalScale,
  moderateScale,
  RFValue,
};
