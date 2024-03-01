import react,  {useState} from 'react';
import { View, Platform, UIManager, LayoutAnimation, StyleSheet, Button } from "react-native";

if (
  Platform.OS === "android" && 
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App(){
  const [boxPosition, setBoxPosition] = useState('left');
  const togggleBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setBoxPosition(boxPosition === "left" ? "right" : "left");
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    box: {
      height: 100,
      width: 100,
      borderRadius: 5,
      margin: 8,
      backgroundColor: 'blue'
    },
    moveRight: {
      alignSelf: "flex-end",
      height: 200,
      width: 200
    },
    buttonContainer: {
      alignSelf: 'center'
    }
    
  })

  return(
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title='déplacer la boite' onPress={togggleBox} />
        </View>
        <View style={[styles.box, boxPosition === "left" ? null : styles.moveRight]}>

        </View>
      </View>
  )

 
}