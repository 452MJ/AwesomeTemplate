import React, {memo} from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {apx} from '../utils/device';
import Col from './Col';
import Touchable from './Touchable';

interface IProps {
  theme?: 'gold' | 'white' | 'grey' | 'green' | 'red';
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  onPress?: () => any;
  clickable?: boolean;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
}

const Button = (props: IProps) => {
  const {
    theme = 'gold',
    style = {},
    contentContainerStyle = {},
    textStyle = {},
    text = '',
    onPress = () => {},
    clickable = true,
    renderLeft,
    renderRight,
  } = props;

  const Touch = clickable ? Touchable : Col;

  return (
    <Touch
      style={style}
      onPress={() => {
        if (!clickable) {
          return;
        }
        onPress();
      }}>
      <LinearGradient
        colors={
          {
            gold: ['#FDA00A', '#FFB248', '#FEBE18'],
            white: ['#FFF', '#FFF'],
            grey: ['#CFD5DA', '#CFD5DA'],
            green: ['#0DD38C', '#0DD38C'],
            red: ['#F56464', '#F56464'],
          }[theme] || ['#FEBE18', '#FFB248', '#FDA00A']
        }
        useAngle
        angle={61}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{
          borderRadius: apx(10),
          borderColor: '#EEF3F6',
          borderWidth: {
            gold: 0,
            white: apx(2),
            grey: 0,
            green: 0,
            red: 0,
          }[theme],
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: apx(650),
          height: apx(106),
          ...contentContainerStyle,
        }}>
        {renderLeft}
        <Text
          style={{
            color: {
              gold: '#fff',
              white: '#FEBE18',
              grey: '#fff',
              green: '#fff',
              red: '#fff',
            }[theme],
            fontSize: apx(30),
            fontWeight: '600',
            ...textStyle,
          }}>
          {text}
        </Text>

        {renderRight}
      </LinearGradient>
    </Touch>
  );
};

export default memo(Button);
