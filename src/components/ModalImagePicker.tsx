import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {apx, IPXBarHeight} from '../utils/device';
import Col from './Col';
import Button from './Button';
import Dash from './Dash';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onImageSelected: (uri: string) => void;
}

function ModalImagePicker({isVisible, onClose, onImageSelected}: IProps) {
  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{margin: 0, padding: 0}}
      backdropOpacity={0.65}>
      <Col
        style={{
          flex: 1,
        }}
        justify="end"
        align="center">
        <TouchableWithoutFeedback onPress={onClose}>
          <Col style={{width: apx(750), flex: 1}} />
        </TouchableWithoutFeedback>
        <Col
          style={{
            width: apx(750),
            backgroundColor: 'rgba(31, 31, 31, 1)',
            borderTopLeftRadius: apx(16),
            borderTopRightRadius: apx(16),
            paddingBottom: IPXBarHeight,
          }}>
          <Col
            style={{
              borderRadius: apx(8),
              marginTop: apx(95),
            }}>
            <Button
              text={$i18n.t('Album')}
              theme="grey"
              style={{
                width: apx(690),
                height: apx(97),
                borderRadius: 0,
              }}
              textStyle={{fontSize: apx(36), color: 'rgba(255,255,255,0.85)'}}
              onPress={async (): Promise<void> => {
                const res: Image = await ImagePicker.openPicker({
                  mediaType: 'photo',
                  includeBase64: false,
                });
                if (res.data) {
                  onClose();
                  onImageSelected(res.data);
                }
              }}
            />
            <Dash
              style={{
                width: apx(690),
                backgroundColor: 'rgba(255,255,255,0.12)',
              }}
            />

            <Button
              text={$i18n.t('Take a photo')}
              theme="grey"
              style={{
                width: apx(690),
                height: apx(97),
                borderRadius: 0,
              }}
              textStyle={{fontSize: apx(36), color: 'rgba(255,255,255,0.85)'}}
              onPress={async (): Promise<void> => {
                const res: Image = await ImagePicker.openCamera({
                  mediaType: 'photo',
                  includeBase64: false,
                });
                if (res.data) {
                  onClose();
                  onImageSelected(res.data);
                }
              }}
            />
          </Col>

          <Button
            text={$i18n.t('Cancel')}
            theme="grey"
            style={{
              width: apx(690),
              height: apx(88),
              borderRadius: apx(8),
              marginVertical: apx(40),
            }}
            textStyle={{fontSize: apx(36), color: '#E0BC88'}}
            onPress={onClose}
          />
        </Col>
      </Col>
    </Modal>
  );
}

export default ModalImagePicker;
