import RNFetchBlob from 'rn-fetch-blob';
import {ENV, timeoutPromise} from './common';

let host: string;
// export const defaultUrl = 'ws://192.168.12.135:9944'

if (ENV === 'production') {
  host = '';
} else if (ENV === 'beta') {
  host = '';
}

const api = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    phoneVerifyCode: '/auth/phone/send-code',
  },
};

type ExtrasHeader = Partial<{
  Authorization: string;
  ['accept-language']: string;
}> &
  HeadersInit_;

interface FetchOption extends RequestInit {
  headers: ExtrasHeader;
}
async function getHttpHeaders(): Promise<ExtrasHeader> {
  let token = $store.getState().user.token;
  if (!token) {
    const user = await $storage.getData($storage.KEYS.userInfo);
    token = user?.token;
  }

  return {
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
    'accept-language':
      {
        'en-US': 'en-US',
        'zh-TW': 'zh-HK',
      }[String($store.getState().settings.language)] || 'en-US',
  };
}

async function customFetch(
  url: RequestInfo,
  opt: FetchOption,
  needUpload: boolean = false,
): Promise<Awaited<any> | void> {
  const customHeader: ExtrasHeader = await getHttpHeaders();
  opt.headers = {
    ...opt.headers,
    ...customHeader,
  };

  return timeoutPromise(
    fetch(url, opt).then((res: Response) => res.json()),
    needUpload ? 60 * 1000 : 30 * 1000,
  ).catch(err => {
    console.log(err);
    $loading.hide();
    throw err;
    // $toast.error(err.message)
  });
}

const http = {
  api,
  get: async (url: string, params: {[key: string]: any} = {}) => {
    let finalUrl: string = host + url;

    Object.keys(params).forEach((key: string, index: number) => {
      finalUrl += `${index === 0 ? '?' : '&'}${key}=${encodeURIComponent(
        params[key],
      )}`;
    });

    return customFetch(
      finalUrl,
      {
        headers: {},
      },
      false,
    ).then(result => {
      if (__DEV__) {
        console.log({url, method: 'GET', params, result});
      }
      return result;
    });
  },

  post: (url: string, params: {[key: string]: any} = {}) =>
    customFetch(host + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(result => {
      if (__DEV__) {
        console.log({url, method: 'POST', params, result});
      }
      return result;
    }),

  put: (url: string, params: {[key: string]: any} = {}) =>
    customFetch(host + url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(result => {
      if (__DEV__) {
        console.log({url, method: 'PUT', params, result});
      }
      return result;
    }),

  delete: (url: string, params: {[key: string]: any} = {}) =>
    customFetch(host + url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(result => {
      if (__DEV__) {
        console.log({url, method: 'DELETE', params, result});
      }
      return result;
    }),

  patch: async (url: string, params: {[key: string]: any} = {}) =>
    customFetch(host + url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(result => {
      if (__DEV__) {
        console.log({url, method: 'PATCH', params, result});
      }
      return result;
    }),
  uploadMedia: async (
    {
      type,
      uri,
    }: {
      type: 'image' | 'video' | 'audio';
      uri: string;
    },
    ossInfo: {
      url: string;
      key: string;
      OSSAccessKeyId: string;
      policy: string;
      Signature: string;
    },
  ) => {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1, uri.length);
    const key = `${ossInfo.key}/${fileName}`;

    const body = [
      {name: 'OSSAccessKeyId', data: ossInfo.OSSAccessKeyId},
      {name: 'policy', data: ossInfo.policy},
      {name: 'Signature', data: ossInfo.Signature},
      {name: 'key', data: key},
      {
        name: 'file',
        filename: fileName,
        type: {
          image: 'image/png',
          video: 'video/mp4',
          audio: 'multipart/form-data',
        }[type],
        data: RNFetchBlob.wrap(uri),
      },
    ];

    await RNFetchBlob.fetch(
      'POST',
      ossInfo.url,
      {
        'Content-Type': 'multipart/form-data',
      },
      body,
    );

    return `${ossInfo.url}/${key}`;
  },
};

export default http;
