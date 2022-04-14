import AsyncStorage from '@react-native-community/async-storage';

interface IKeys {
  userInfo: string;
  locale: string;
}

const KEYS: IKeys = {
  userInfo: 'userInfo',
  locale: 'locale',
};

const storage = {
  KEYS,
  storeData: async (key: keyof IKeys, value: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  },
  getData: async (key: keyof IKeys): Promise<any> => {
    try {
      const value: string | null = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return JSON.parse(value);
      }
      return null;
    } catch (e) {
      // error reading value
      return null;
    }
  },
};

export default storage;
