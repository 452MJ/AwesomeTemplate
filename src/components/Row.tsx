import React, {memo} from 'react';
import Flex from '@ant-design/react-native/lib/flex';
import {FlexPropsType} from '@ant-design/react-native/lib/flex/PropsType';
import {ViewStyle} from 'react-native';

interface IProps extends FlexPropsType {
  style?: ViewStyle;
}

const Row: React.FC<IProps> = props => {
  const {children, ...other} = props;
  return (
    <Flex justify="center" align="center" {...other}>
      {children}
    </Flex>
  );
};

export default memo(Row);
