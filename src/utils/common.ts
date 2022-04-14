import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BigNumber from 'bignumber.js';

export const ENV: 'production' | 'beta' = 'beta';

const fetchTimeout = 30 * 1000;
export const timeoutPromise = (
  fetchPromise: Promise<any>,
  timeout: number = fetchTimeout,
) => {
  const abortPromise: Promise<any> = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: -1,
        error: $i18n.translation('網絡請求超時', 'Network timeout'),
      });
    }, timeout);
  });

  return Promise.race([fetchPromise, abortPromise]);
};

export const allPromise = (promises: Promise<any>[], defaultValues: any[]) =>
  Promise.all(promises.map((p, i) => p.catch(() => defaultValues[i])));

export const checkEmail = (email: string) =>
  /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/.test(
    email,
  );

export const checkParamsInvalid = (
  params: {[key: string]: any} = {},
  tips: {[key: string]: any} = {},
) => {
  let hasShown: boolean = false;
  const keys: string[] = Object.keys(params);
  keys.forEach((key: string) => {
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

export const setCustomKeyboardAwareScrollView = (customProps: {
  [key: string]: any;
}): void => {
  // @ts-ignore
  const ScrollViewRender = KeyboardAwareScrollView.render;
  // @ts-ignore
  const initialDefaultProps = KeyboardAwareScrollView.defaultProps;
  // @ts-ignore
  KeyboardAwareScrollView.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  // @ts-ignore
  KeyboardAwareScrollView.render = function render(props: any) {
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
