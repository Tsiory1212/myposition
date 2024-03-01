import { View, Text, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";


export default function App(){
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  })

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  async function getUserLocation() {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(`La permission d'accès a été réfusée`);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  }

  let text = 'en attente de réception...';
  if (errorMsg) {
    text = errorMsg;
  }else if (location) {
    text = JSON.stringify(location, null, 2);
  }

  return(
      <View style={styles.container}>
        <Button title="Récupérer la position" onPress={getUserLocation} />
        <Text>{text}</Text>
      </View>
  )
}