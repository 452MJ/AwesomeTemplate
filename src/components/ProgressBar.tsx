import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {apx} from '../utils/device';

export default class ProgressBar extends React.PureComponent {
  static propTypes = {
    inactiveColor: PropTypes.string,
    activeColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    progress: PropTypes.number.isRequired,
  };

  static defaultProps = {
    inactiveColor: '#1E1B1C',
    activeColor: '#C51F1F',
    width: apx(200),
    height: apx(10),
  };

  render = () => (
    <View
      style={{
        height: this.props.height,
        width: this.props.width,
        backgroundColor: this.props.inactiveColor,
      }}>
      <View
        style={{
          height: this.props.height,
          position: 'absolute',
          backgroundColor: this.props.activeColor,
          left: 0,
          width: this.props.width * this.props.progress,
        }}
      />
    </View>
  );
}
