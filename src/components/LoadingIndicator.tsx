import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { apx } from "../utils/device";

const LoadingIndicator = forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [mask, setMask] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    show: (enableMask?: boolean) => {
      setVisible(true);
      setMask(enableMask || false);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  if (!visible) {
    return null;
  }

  return (
    <View
      style={
        mask
          ? [
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]
          : {
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: apx(10),
          width: apx(170),
          height: apx(170),
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}>
        <ActivityIndicator size="large" color="white" />
        <Text
          style={{
            fontSize: apx(26),
            marginTop: apx(10),
            color: 'white',
          }}>
          Loading...
        </Text>
      </View>
    </View>
  );
});

export default connect(state => state, null, null, {forwardRef: true})(
  LoadingIndicator,
);
