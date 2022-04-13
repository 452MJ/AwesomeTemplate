import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Flex} from '@ant-design/react-native';
import Col from './Col';

// export default Platform.OS === 'ios'
//   ? TouchableOpacity
//   : TouchableNativeFeedback

interface IProps {
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  onPress?: () => void;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
}

const Touchable: React.FC<IProps> = ({
  children,
  style,
  contentContainerStyle,
  direction = 'column',
  justify = 'center',
  align = 'center',
  onPress,
}) => {
  return (
    <Col style={style}>
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={onPress}>
          <Flex
            justify={justify}
            direction={direction}
            align={align}
            style={contentContainerStyle}>
            {children}
          </Flex>
        </TouchableOpacity>
      ) : (
        <TouchableNativeFeedback onPress={onPress} useForeground>
          <Flex
            justify={justify}
            direction={direction}
            align={align}
            style={contentContainerStyle}>
            {children}
          </Flex>
        </TouchableNativeFeedback>
      )}
    </Col>
  );
};

export default Touchable;
