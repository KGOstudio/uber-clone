import { View, Text, Animated, Dimensions, NativeModules, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import {MaterialIcons} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const WrongView = ({isAvilable, details, closePress}) => {

  const position = new Animated.ValueXY({x: 0, y: -height});




  const {UIManager} = NativeModules;

  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

  let [state, setState] = useState({
    w: 0,
    h: height*0.07,
  });
  
  const _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState({w: width, h: height * 0.5});
  }

  const _onPressClose = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState({w: width, h: height * 0.07});
  }

 
  if (isAvilable) {
    Animated.timing(position, {
      toValue: { x: 0, y: height*0.1},
      duration: 1000,
      useNativeDriver: false
    }).start();
  }



  return (
    <Animated.View 
      onTouchEnd={() => {if (state.h === height*0.07) {_onPress(); } else {_onPressClose(); Animated.timing(position, {position: {x: 0, y: -height}, duration: 1000, useNativeDriver: false}).start(); closePress(); }}}
      style={{position: "absolute", transform: [{translateX: position.x}, {translateY: position.y}], width: width*0.8, backgroundColor: "white", alignSelf: "center", padding: 15, borderRadius: 15, height: state.h}}>

      <View style={{}}>
        <Text style={{fontSize: 20, fontWeight: "700"}}>Error</Text>
        <MaterialIcons name="error" size={24} color="red" style={{position: "absolute", right: 15}}/>
      </View>
      {state.h === height*0.5 &&
        <View style={{width: "100%", alignSelf: "center", padding: 10, marginTop: 5, alignItems: "center"}}>
          <View style={{padding: 1, width: "100%", alignSelf: "center", backgroundColor: "black", marginTop: 15}}></View>

          <Text style={{fontWeight: "700", color: "gray", marginTop: 15}}>details</Text>
          <Text style={{padding: 0}}>{details}</Text>


        </View>
      }
      
    </Animated.View>
  )
}

export default WrongView