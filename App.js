import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Options  from './screens/Options'
import MainScreen from './screens/MainScreen'
import Game from './screens/Game'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"MainScreen"}>
        <Stack.Screen name="Options" component={Options} options={{headerShown : false}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown : false}} />
        <Stack.Screen name="Game" component={Game} options={{headerShown : false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;