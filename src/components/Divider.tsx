import React, { memo } from "react";

import { apx } from "../utils/device";
import Row from "./Row";
import { ViewStyle } from "react-native";

interface IProps {
  style?: ViewStyle;
  lineStyle?: ViewStyle;
}

function Divider({style = {}}: IProps) {
  return (
    <Row
      style={{
        alignSelf: 'stretch',
        borderColor: '#EEF3F6',
        borderTopWidth: apx(2),
        overflow: 'hidden',

        ...style,
      }}
    />
  );
}

export default memo(Divider);
