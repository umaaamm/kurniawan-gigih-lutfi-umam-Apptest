import { createStackNavigator } from '@react-navigation/stack';
import Contact from '../modules/contact/contact';
import React from 'react';

const Stack = createStackNavigator();

const MainStackNavigator = (navigation) => {
    return (
    <Stack.Navigator>
      <Stack.Screen name="Contact" component={Contact} options={{headerMode: 'none', headerShown : false}} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;