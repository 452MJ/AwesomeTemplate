import React from 'react';
import {apx, isIPhoneX} from '../utils/device';
import Col from './Col';
import {ViewStyle} from 'react-native';

interface IProps {
  style?: ViewStyle;
}

const Container: React.FC<IProps> = ({children, style}) => (
  <Col
    style={{
      width: apx(750),
      flex: 1,
      paddingBottom: isIPhoneX() ? apx(60) : 0,
      backgroundColor: '#F7F9FB',
      ...style,
    }}
    justify="start">
    {children}
  </Col>
);

export default Container;
