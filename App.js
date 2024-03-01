import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Share } from "react-native";
import * as Location from "expo-location";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons"
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const home = "Acceuil";
const contact = "Contact"

export default function App(){
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    text: {
      marginTop: 100,
      marginBottom: 100,
      fontSize: 20,
    }
  })

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  let latitude = null;
  let longitude = null;
  let altitude = null;

  async function getUserLocation() {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(`La permission d'accès a été réfusée`);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  }

  // let text = 'en attente de réception...';
  // if (errorMsg) {
  //   text = errorMsg;
  // }else if (location) {
  //   text = JSON.stringify(location, null, 2);
  // }

  useEffect(() => {
    getUserLocation()
  }, [])


  async function sharePosition() {
    try {
      await Share.share({
        message: `Au secour ! Je suis coincé à la position indiqué par le lien ci dessous. Cliquez sur le lien pour afficher ma position`+
        '\n latitude : '+latitude+ 
        '\n longitude : '+longitude+ 
        '\n altitude : '+altitude+ 
        '\n https://www.google.com/maps/search/?api=1&query= : '+latitude+'%2C'+longitude 
      })
    } catch (e) {
      alert(e.message)
    }
  }

  let text = 'cliquez sur le boutton "Obtenir ma position"';
  if (errorMsg) {
    text = errorMsg;
  }else if (location){
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    altitude = location.coords.altitude;

    text = 'latitude :'+latitude+
            '\nlongitude : '+longitude+
            '\naltitude : '+altitude;
  }


  function HomeScreen() {
    const navigation = useNavigation();
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
        <ShareView></ShareView>
      </View>
    )
  };
  
  function ContactScreen() {
    const navigation = useNavigation();
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
        <ShareView></ShareView>
      </View>
    )
  };
  
  
  function ShareView(){
    return (
      <View style={styles.container}>
        <Button title="Obtenir ma position" onPress={getUserLocation} />
        <Text style={styles.text}>{text}</Text>
        <Button title="Partager ma position" onPress={sharePosition} />
      </View>
    )
  }


  return(
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName={home}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let routeName = route.name;

            if (routeName === home) {
              iconName = focused ? iconName = "home" : "home-outline";
            } else if(routeName === contact) {
              iconName = focused ? iconName = "receipt" : "receipt-outline";
            }

            return(
              <Ionicons name={iconName} color={color} size={size} />
            )
          }
        })}
      >
        <Tab.Screen name={home} component={HomeScreen} />
        <Tab.Screen name={contact} component={ContactScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}