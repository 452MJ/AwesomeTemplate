import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {apx} from '../utils/device';
import Col from './Col';
import Touchable from './Touchable';
import ModalImagePicker from './ModalImagePicker';
import SvgIcon from './SvgIcon';

interface IProps {
  initImage?: string;
  width?: number;
  height?: number;
  onSelected: (response: string) => any;
}

const UploadImage = ({
  initImage,
  width = apx(230),
  height = apx(230),
  onSelected,
}: IProps) => {
  const [image, setImage] = useState(initImage);
  const [modalZoom, setModalZoom] = useState(false);

  const [modalImagePicker, setModalImagePicker] = useState(false);

  const [uploadUrl, setUploadUrl] = useState('');
  const [response, setResponse] = useState('');

  return (
    <Col>
      {!response ? (
        <Touchable onPress={() => setModalImagePicker(true)}>
          <FastImage
            source={require('../assets/images/icon_createPost_add.png')}
            style={{
              width,
              height,
              borderRadius: apx(4),
            }}
          />
        </Touchable>
      ) : (
        <Col>
          <Touchable onPress={() => setModalZoom(true)}>
            <FastImage
              source={response}
              style={{
                width,
                height,
                borderRadius: apx(4),
              }}
            />
          </Touchable>

          <Touchable
            style={{
              position: 'absolute',
              top: apx(10),
              right: apx(10),
            }}
            onPress={() => setResponse('')}>
            <Col
              style={{
                width: apx(32),
                height: apx(32),
                borderRadius: apx(32),
                backgroundColor: '#333',
                borderWidth: apx(2),
                borderColor: '#fff',
                opacity: 0.65,
              }}
              justify="center"
              align="center">
              <SvgIcon icon="icon_close" size={apx(20)} />
            </Col>
          </Touchable>
        </Col>
      )}

      <ModalImagePicker
        isVisible={modalImagePicker}
        onClose={() => setModalImagePicker(false)}
        onImageSelected={res => {
          setResponse(res);
          //  TODO: Upload image api
        }}
      />

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
          renderIndicator={() => null}
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
          menuContext={{
            saveToLocal: $i18n.t('Save to local'),
            cancel: $i18n.t('Cancel'),
          }}
          imageUrls={[
            {
              url: response.uri,
            },
          ]}
        />
      </Modal>
    </Col>
  );
};

export default connect(state => state)(memo(UploadImage));
