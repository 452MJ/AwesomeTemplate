import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import Touchable from '../components/Touchable';
import Container from '../components/Container';

function Counter() {
  return (
    <Container style={{flex: 1, justifyContent: 'center'}}>
      <Touchable onPress={() => $navigation.navigate('Counter')}>
        <Text style={{}}>1111</Text>
      </Touchable>
    </Container>
  );
}

export default connect(state => state)(Counter);
