import React, { memo } from "react";
import { ViewStyle } from "react-native";
import { apx } from "../utils/device";
import Col from "./Col";
import Row from "./Row";

interface IProps {
  style?: ViewStyle;
  lineStyle?: ViewStyle;
}

function Dash({
  style = {
    width: apx(628),
  },
  lineStyle = {
    width: apx(6),
    height: apx(2),
    borderRadius: apx(2),
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginLeft: apx(6),
  },
}: IProps) {
  return (
    <Row style={{...style, overflow: 'hidden'}} wrap="nowrap">
      {new Array(200).fill(0).map((item, index) => (
        <Col key={index.toString()} style={lineStyle} />
      ))}
    </Row>
  );
}

export default memo(Dash);
