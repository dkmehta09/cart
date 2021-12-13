import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home';
import Cart from './src/Cart';
import { Provider} from 'react-redux'

import { Store } from './src/Redux/store';
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store} >
    <NavigationContainer>
       <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;
