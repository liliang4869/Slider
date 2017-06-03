

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Slider from './mindex'
export default class Test extends Component {
  constructor(props)
  {
    super(props);
    this.state={l:0}
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{height:20,width:20,backgroundColor:'blue'}} onPress={()=>{this.setState({l:this.state.l+0.05})}}/>
     <Slider onDrag={(e)=>{console.log('onDrag',e)}}
        endDrag={(e)=>{console.log('endDrag',e)}}
        thumbStyle={{height:20,width:20,backgroundColor:'green'}}
        defaultLocation={this.state.l}/>
         <Slider onDrag={(e)=>{console.log('onDrag',e)}}
        endDrag={(e)=>{console.log('endDrag',e)}}
        thumbStyle={{height:15,width:15,borderRadius:2,backgroundColor:'red'}}
        trackBarRightColor='blue'
         defaultLocation={0.5}/>
         <Slider onDrag={(e)=>{console.log('onDrag',e)}}
        endDrag={(e)=>{console.log('endDrag',e)}}
        thumbStyle={{height:30,width:30,backgroundColor:'green'}}
        trackBarStyle={{height:20}}
        trackBarBackgroundColor='#852133'
         defaultLocation={-2}/>
         <Slider onDrag={(e)=>{console.log('onDrag',e)}}
        endDrag={(e)=>{console.log('endDrag',e)}}
        thumbStyle={{height:20,width:20,backgroundColor:'green'}}
        style={{backgroundColor:'#741258',height:60}}
         defaultLocation={2.3}/>
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
