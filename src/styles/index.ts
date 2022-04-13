import {StyleSheet} from 'react-native';
import {apx} from '../utils/device';

export const FontFamily = {
  Regular: 'Montserrat-Regular',
  Medium: 'Montserrat-Medium',
  Bold: 'Montserrat-SemiBold',
  Light: 'Montserrat-Light',
};

export default StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupWindow: {
    zIndex: 999,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  shadow: {
    shadowOffset: {width: apx(5), height: apx(21)},
    shadowColor: 'rgb(194, 193, 199)',
    shadowOpacity: 0.1,
    shadowRadius: apx(10),
    elevation: apx(5),
  },
});
