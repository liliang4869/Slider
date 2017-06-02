

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Slider from './mindex'
export default class Test extends Component {
  render() {
    return (
      <View style={styles.container}>
     <Slider onDrag={(e)=>{console.log('onDrag',e)}}
        endDrag={(e)=>{console.log('endDrag',e)}}
        thumbStyle={{height:20,width:20,backgroundColor:'green'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:400,width:400,
    backgroundColor: '#eeeeee',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MSlider', () => Test);
