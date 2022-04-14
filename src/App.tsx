import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {lockToPortrait} from 'react-native-orientation';
// @ts-ignore
import {create} from 'dva-core';
import {Dimensions, LogBox, Platform, UIManager, View} from 'react-native';
import Entry from './entry';
import models from './models/index';

LogBox.ignoreAllLogs(true);

if (!__DEV__) {
  global.console.log = () => {};
}

lockToPortrait();

const app = create();
models.forEach((model: any) => app.model(model));
app.start();

const store = app._store;
$store = app._store;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(): JSX.Element {
  const onChange = (): void => {};

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return (): void => {
      Dimensions.removeEventListener('change', onChange);
    };
  });

  let width: number = Dimensions.get('window').width;
  if (width > 600) {
    width = 600;
  }

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        flex: 1,
      }}>
      <View style={{flex: 1, width}}>
        <Provider store={store}>
          <Entry />
        </Provider>
      </View>
    </View>
  );
}

export default App;
