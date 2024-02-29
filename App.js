import * as React from 'react';
import { View, Text, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


function HomeScreen(props) {
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Text>Bonjour</Text>
      <Text>{ JSON.stringify(props.route.params) }</Text>
      <Button title='Home' onPress={() => (props.navigation.navigate('Home', {id: 1, name: "Laurent"}))} />
      <Button title='Home' onPress={() => (props.navigation.navigate('Home', {id: 2, name: "Mark"}))} />
    </View>
  )
};

function ContactScreen() {
  const navigation = useNavigation();
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
      <Text>Accueil</Text>
      <Button title='Home' onPress={() => (navigation.goBack())} />
    </View>
  )
};


const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}