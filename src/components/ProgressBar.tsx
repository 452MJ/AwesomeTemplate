import React, {memo} from 'react';
import {View} from 'react-native';
import {apx} from '../utils/device';

interface IProps {
  inactiveColor?: string;
  activeColor?: string;
  width?: number;
  height?: number;
  progress: number;
}

function ProgressBar({
  inactiveColor = '#1E1B1C',
  activeColor = '#C51F1F',
  width = apx(200),
  height = apx(10),
  progress,
}: IProps) {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: inactiveColor,
      }}>
      <View
        style={{
          height: height,
          position: 'absolute',
          backgroundColor: activeColor,
          left: 0,
          width: width * progress,
        }}
      />
    </View>
  );
}

export default memo(ProgressBar);
