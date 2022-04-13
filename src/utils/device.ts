import {Dimensions, Keyboard, Platform, StatusBar} from 'react-native';

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function isIPhoneX() {
  const {width, height} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    ((height >= X_HEIGHT && width >= X_WIDTH) ||
      (height >= X_WIDTH && width >= X_HEIGHT))
  );
}

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return isIPhoneX() ? 40 : 20;
  }
  return Platform.Version >= 21 ? StatusBar.currentHeight : 0;
};

const statusBarHeight = getStatusBarHeight();

export const apx = (size = 0) => {
  let width = Dimensions.get('window').width;
  if (width > 600) {
    width = 600;
  }
  return (width / 750) * size;
};
export const apxInt = (size = 0) => {
  let width = Dimensions.get('window').width;
  if (width > 600) {
    width = 600;
  }
  return parseInt((width / 750) * size);
};

export const dismissKeyboard = Keyboard.dismiss;

const titleBarHeight = statusBarHeight + apx(94);
const IPXBarHeight = isIPhoneX() ? 20 : 0;
const tabBarHeight = (isIPhoneX() ? apx(60) : 0) + apx(98);

export {statusBarHeight, titleBarHeight, tabBarHeight, IPXBarHeight};
