// In App.js in a new project

import 'react-native-gesture-handler';
import * as React from 'react';
import {Dimensions, Text, TouchableWithoutFeedback} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GlobalNavigation, {navigationRef} from './utils/GlobalNavigation';
import {apx, IPXBarHeight} from './utils/device';
import Col from './components/Col';
import Row from './components/Row';
import Counter from './pages/Counter';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs/lib/typescript/src/types';

$navigation = GlobalNavigation;

const Tab = createMaterialTopTabNavigator();

const renderTabBar = ({
  state,
  descriptors,
  navigation,
}: MaterialTopTabBarProps) => (
  <Row
    style={{
      backgroundColor: '#fff',
      width: apx(750),

      paddingBottom: IPXBarHeight,
    }}>
    {state.routes.map((route, index) => {
      const {options} = descriptors[route.key];
      const routeName: string = route.name;

      const isFocused: boolean = state.index === index;

      const onPress = (): void => {
        if (!isFocused) {
          navigation.navigate(route.name);
        }
      };

      const tabLabels: {Welcome: string; Settings: string} | any = {
        Welcome: '欢迎',
        Settings: '设置',
      };

      return (
        <TouchableWithoutFeedback
          key={index.toString()}
          // accessibilityRole="button"
          // accessibilityStates={isFocused ? ['selected'] : []}
          // accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}>
          <Col
            style={{
              width: apx(750 / 2),
              height: apx(90),
              ...$styles.center,
            }}>
            {/* <SvgIcon */}
            {/*  icon={icons[routeName][isFocused ? 'selected' : 'normal']} */}
            {/*  size={apx(54)} */}
            {/* /> */}
            <Text
              style={{
                fontSize: apx(14),
                marginTop: apx(9),
                color: isFocused ? '#FF0062' : '#fff',
              }}>
              {tabLabels[routeName]}
            </Text>
          </Col>
        </TouchableWithoutFeedback>
      );
    })}
  </Row>
);

function TabScreen() {
  return (
    <Tab.Navigator
      // initialRouteName="Diamond"
      tabBarPosition="bottom"
      tabBar={renderTabBar}
      keyboardDismissMode="on-drag"
      initialLayout={{width: Dimensions.get('window').width}}
      sceneContainerStyle={
        {
          // paddingBottom: isIPhoneX() ? apx(60) : 0,
        }
      }>
      <Tab.Screen name="Welcome" component={Counter} />
      <Tab.Screen name="Settings" component={Counter} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const Root = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName={__DEV__ ? 'Tab' : 'Welcome'}
      screenOptions={({}) => ({
        headerShown: false,
        gestureEnabled: true,
        presentation: 'card',
        ...TransitionPresets.SlideFromRightIOS,
      })}>
      <Stack.Screen name="Tab" component={TabScreen} initialParams={{}} />
      <Stack.Screen name="Counter" component={Counter} initialParams={{}} />
    </Stack.Navigator>
  );
}

function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Root.Navigator
        screenOptions={({}) => ({
          headerShown: false,
          gestureEnabled: false,
          presentation: 'modal',
        })}>
        <Root.Screen name="Main" component={StackScreen} />
        <Root.Screen name="ModalScreen" component={StackScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
}

export default Router;
