import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {apx} from '../utils/device';
import Row from './Row';
import Col from './Col';
import {FontFamily} from '../styles';
import SvgIcon from './SvgIcon';

enum TYPE {
  SUCCESS,
  ERROR,
  INFO,
}

const CustomToast: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<{}> & React.RefAttributes<unknown>
> = forwardRef(
  (
    props: React.PropsWithoutRef<{}> &
      React.RefAttributes<unknown> & {children?: React.ReactNode | undefined},
    ref,
  ) => {
    const DURATION: number = 3 * 1000;

    const [visible, setVisible] = useState<boolean>(false);
    const [type, setType] = useState<number>(TYPE.SUCCESS);
    const [message, setMessage] = useState<string>('');

    let timer: NodeJS.Timeout;

    useEffect(() => () => {
      clearTimeout(timer);
    });

    const exposeFunc = () => ({
      success: (msg: string): void => {
        clearTimeout(timer);
        setType(TYPE.SUCCESS);
        setMessage(msg);
        setVisible(true);
        setTimeout(() => setVisible(false), DURATION);
      },

      error: (msg: string): void => {
        clearTimeout(timer);
        setType(TYPE.ERROR);
        setMessage(msg);
        setVisible(true);
        setTimeout(() => setVisible(false), DURATION);
      },
      info: (msg: string): void => {
        clearTimeout(timer);
        setType(TYPE.INFO);
        setMessage(msg);
        setVisible(true);
        setTimeout(() => setVisible(false), DURATION);
      },
    });

    useImperativeHandle(ref, exposeFunc);

    if (!visible) {
      return null;
    }

    return (
      <Col
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
        }}>
        <Row
          style={{
            borderRadius: apx(16),
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <Col style={{width: apx(96), height: apx(96)}}>
            <SvgIcon
              icon={
                {
                  [TYPE.SUCCESS]: 'toast_success',
                  [TYPE.ERROR]: 'toast_error',
                  [TYPE.INFO]: 'toast_info',
                }[String(type)] || 'toast_success'
              }
              style={{width: apx(48), height: apx(48)}}
            />
          </Col>

          <Col
            style={{
              width: apx(2),
              height: apx(48),
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: apx(1),
            }}
          />
          <Text
            style={{
              width: 'auto',
              maxWidth: apx(300),
              color: 'white',
              fontWeight: 'bold',
              fontFamily: FontFamily.Medium,
              paddingHorizontal: apx(30),
              paddingVertical: apx(28),
            }}>
            {message}
          </Text>
        </Row>
      </Col>
    );
  },
);

export default connect(state => state, null, null, {forwardRef: true})(
  CustomToast,
);
