import { StyleSheet, View, Button, Text } from "react-native";
import * as Location from "expo-location";
import i18n from "./i18n";
import { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons"
import { Share } from "react-native";

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
        setErrorMsg( i18n.t('permission'));
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
        message: `Au secour ! Je suis coincé à la position indiqué par le lien ci dessous. Cliquez sur le lien pour afficher ma position
        \n ${i18n.t('latitude')} : ${latitude}
        \n ${i18n.t('longitude')} : ${longitude}
        \n ${i18n.t('altitude')} : ${altitude}
        \n https://www.google.com/maps/search/?api=1&query= : ${latitude}%2C${longitude}`
      })
    } catch (e) {
      alert(e.message)
    }
  }

  let text = `${i18n.t('click')} "${i18n.t('addPosition')}"`;
  if (errorMsg) {
    text = i18n.t('permission');
  }else if (location){
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    altitude = location.coords.altitude;

    text = `${i18n.t('latitude')} :${latitude}
            \n${i18n.t('longitude')} : ${longitude}
            \n${i18n.t('altitude')} : ${altitude}`;
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
        <Button title={i18n.t('addPosition')} onPress={getUserLocation} />
        <Text style={styles.text}>{text}</Text>
        <Button title={i18n.t('sharePosition')} onPress={sharePosition} />
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