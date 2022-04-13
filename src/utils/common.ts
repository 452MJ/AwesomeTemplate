import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BigNumber from 'bignumber.js';
import moment from 'moment';

export const ENV = 'beta'; // production | test | staging

const fetchTimeout = 30 * 1000;
export const timeoutPromise = (fetchPromise, timeout = fetchTimeout) => {
  const abortPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: -1,
        error: $i18n.translation('網絡請求超時', 'Network timeout'),
      });
    }, timeout);
  });

  return Promise.race([fetchPromise, abortPromise]);
};

export const allPromise = (promises, defaultValues) =>
  Promise.all(promises.map((p, i) => p.catch(e => defaultValues[i])));

export const checkEmail = email =>
  /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(
    email,
  );

export const checkParamsInvalid = (params = {}, tips = {}) => {
  let hasShown = false;
  const keys = Object.keys(params);
  keys.forEach(key => {
    if (hasShown) {
      return;
    }
    if (!params[key]) {
      hasShown = true;
      $toast.info(tips[key]);
    }
  });
  return hasShown;
};

export const setCustomKeyboardAwareScrollView = customProps => {
  const ScrollViewRender = KeyboardAwareScrollView.render;
  const initialDefaultProps = KeyboardAwareScrollView.defaultProps;
  KeyboardAwareScrollView.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  KeyboardAwareScrollView.render = function render(props) {
    const oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return ScrollViewRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

export const Price = (price: number | string = 0, decimalPlaces: number) =>
  decimalPlaces
    ? new BigNumber(price).toFormat(decimalPlaces)
    : new BigNumber(price).toFormat();

export const DateDiff = date => {
  const start_date = moment(date);
  const end_date = moment();
  let seconds = parseInt(end_date.diff(start_date, 'seconds'));

  if (seconds < 0) {
    seconds = 0;
  }
  if (seconds < 60) {
    return `${seconds}${$i18n.translation('秒前', 'seconds ago')}`;
  }
  // 分钟
  const minutes = parseInt(seconds / 60);
  if (minutes < 60) {
    return `${minutes}${$i18n.translation('分鐘前', 'minutes ago')}`;
  }

  // 小时
  const hours = parseInt(minutes / 60);
  if (hours < 24) {
    return `${hours}${$i18n.translation('小時前', 'hours ago')}`;
  }

  return end_date.format('MM-DD HH:mm');
};
