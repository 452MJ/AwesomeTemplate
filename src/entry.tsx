import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from '@ant-design/react-native';
import {StatusBar} from 'react-native';
import GlobalNavigation from './utils/GlobalNavigation';
import LoadingIndicator from './components/LoadingIndicator';
import styles from './styles';
import colors from './styles/colors';
import services from './services';
import storages from './utils/storages';
import Router from './router';
import ModalCodePush from './components/ModalCodePush';
import http from './utils/httpUtil';
import i18nUtil from './translations/i18n';
import CustomToast from './components/CustomToast';

$styles = styles;
$colors = colors;
$services = services;
$navigation = GlobalNavigation;
$storage = storages;
$http = http;
$i18n = i18nUtil;

export default Entry;

function Entry(): JSX.Element {
  useEffect(() => {
    const init = async () => {
      const userInfo = (await $storage.getData($storage.KEYS.userInfo)) || {};
      if (userInfo) {
        $store.dispatch({type: 'user/updateUserInfo', payload: userInfo});
      }

      await initLocale();
    };

    const initLocale = async () => {
      const defaultLocale = {
        isRTL: false,
        languageTag: 'zh-TW',
        countryCode: 'TW',
        languageCode: 'zh',
      };
      // 语言
      const locale =
        (await $storage.getData($storage.KEYS.locale)) || defaultLocale;

      $i18n.setI18nConfig(locale);
      $store.dispatch({type: 'settings/setLocale', payload: locale});
    };

    init();
  }, []);

  return (
    <Provider>
      <StatusBar
        animated
        translucent
        // barStyle="light-content"
        // backgroundColor="rgba(0,0,0,0)"
      />
      <Router />

      <LoadingIndicator
        ref={ref => {
          $loading = ref;
        }}
      />
      <CustomToast
        ref={ref => {
          $toast = {
            info: msg => {
              ref.info(msg);
            },
            success: msg => {
              ref.success(msg);
            },
            error: msg => {
              ref.error(msg);
            },
          };
        }}
      />
      <ModalCodePush
        ref={ref => {
          $codepush = ref;
        }}
      />
    </Provider>
  );
}
