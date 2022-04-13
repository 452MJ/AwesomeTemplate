import AsyncStorage from '@react-native-community/async-storage';

const storage = {
  KEYS: {
    userInfo: 'userInfo',
    locale: 'locale',
  },
  storeData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  },
  getData: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
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
