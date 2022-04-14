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
  initImageUrl?: string;
  width?: number;
  height?: number;
  onSelected: (response: string) => any;
  onDelete: () => any;
  onlyUpload?: boolean;
}

const UploadImage = ({
  initImageUrl = '',
  width = apx(230),
  height = apx(230),
  onSelected,
  onlyUpload,
}: IProps) => {
  const [modalZoom, setModalZoom] = useState<boolean>(false);

  const [modalImagePicker, setModalImagePicker] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>(initImageUrl);

  return (
    <Col>
      {!imageUrl || onlyUpload ? (
        <Touchable onPress={() => setModalImagePicker(true)}>
          {/*<FastImage*/}
          {/*  source={require('../assets/images/icon_createPost_add.png')}*/}
          {/*  style={{*/}
          {/*    width,*/}
          {/*    height,*/}
          {/*    borderRadius: apx(8),*/}
          {/*  }}*/}
          {/*/>*/}
        </Touchable>
      ) : (
        <Col>
          <Touchable onPress={() => setModalZoom(true)}>
            <FastImage
              source={{uri: imageUrl}}
              style={{
                width,
                height,
                borderRadius: apx(8),
              }}
            />
          </Touchable>

          <Touchable
            style={{
              position: 'absolute',
              top: apx(10),
              right: apx(10),
            }}
            contentContainerStyle={{
              width: apx(32),
              height: apx(32),
              borderRadius: apx(32),
              backgroundColor: '#333',
              borderWidth: apx(2),
              borderColor: '#fff',
              opacity: 0.65,
            }}
            onPress={() => setImageUrl('')}>
            <SvgIcon icon="icon_close" size={apx(20)} />
          </Touchable>
        </Col>
      )}

      <ModalImagePicker
        isVisible={modalImagePicker}
        onClose={() => setModalImagePicker(false)}
        onImageSelected={async res => {
          //  TODO: Upload image api
          $loading.show();
          const {data} = await $services.settings.uploadImage(res);
          $loading.hide();

          setImageUrl(data);
          onSelected(data);
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
          imageUrls={[
            {
              url: imageUrl,
            },
          ]}
        />
      </Modal>
    </Col>
  );
};

export default connect(state => state)(memo(UploadImage));
