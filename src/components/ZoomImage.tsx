import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {apx} from '../utils/device';
import Col from './Col';

const ZoomImage = (
  props: FastImageProps & {style: ViewStyle; source: Source & {uri: string}},
) => {
  const [modalZoom, setModalZoom] = useState(false);

  return (
    <Col
      style={{
        overflow: 'hidden',
        borderRadius: apx(8),
      }}>
      <TouchableOpacity
        onPress={() => {
          setModalZoom(true);
        }}>
        <Col
          style={{
            position: 'absolute',
            width: props.style.width,
            height: props.style.height,
            backgroundColor: '#000',
          }}
          justify="center"
          align="center">
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.08)',
              fontSize: apx(36),
              fontWeight: 'bold',
            }}>
            Ubroker
          </Text>
        </Col>
        <FastImage {...props} />
      </TouchableOpacity>

      <Modal
        useNativeDriver
        isVisible={modalZoom}
        style={{
          margin: 0,
          padding: 0,
        }}
        onBackButtonPress={() => setModalZoom(false)}
        onBackdropPress={() => setModalZoom(false)}>
        <ImageViewer
          style={{
            backgroundColor: 'black',
          }}
          onClick={() => {
            setModalZoom(false);
          }}
          onSwipeDown={() => {
            setModalZoom(false);
          }}
          enableSwipeDown
          renderImage={imageProps => <FastImage {...imageProps} />}
          imageUrls={[{url: props.source.uri}]}
        />
      </Modal>
    </Col>
  );
};

export default connect(state => state)(memo(ZoomImage));
