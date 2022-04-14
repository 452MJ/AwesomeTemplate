export {};
declare module 'react-native-gesture-handler' {}

declare global {
  let $store: any;
  let $styles: any;
  let $colors: any;
  let $loading: any;
  let $toast: any;
  let $services: any;
  let $navigation: any;
  let $store: any;
  let $pomelo: any;
  let $storage: any;
  let $codepush: any;
  let $iap: any;
  let $http: any;
  let $i18n: any;
}

declare module 'dva-core' {
  export function create(hooksAndOpts = {}, createOpts = {});
}
