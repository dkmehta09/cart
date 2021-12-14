import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './src/Home';
import Cart from './src/Cart';
import { Provider } from 'react-redux'

import { Store } from './src/Redux/store';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const TabBottom = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name="home2" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Cart2" component={Cart} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}
const App = () => {
  return (
    <Provider store={Store} >
      <NavigationContainer>
        < TabBottom />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
