import * as React from 'react';
import { Animated, Text, useWindowDimensions, Easing } from "react-native";


export default function App(){
  const windowHeight = Math.round(useWindowDimensions().height);
  const heightAnimation = React.useRef(new Animated.Value(0)).current
  
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(heightAnimation, {
        toValue: windowHeight,
        duration: 10000,
        useNativeDriver: false,
      })).start();
  }, [heightAnimation, windowHeight])

  return(
      <Animated.View 
        style={{ backgroundColor: "red", width: "100%", height: heightAnimation}}
      />
  )
}