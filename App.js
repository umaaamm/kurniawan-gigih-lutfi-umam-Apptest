/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MainStackNavigator from './src/navigator/mainStackNavigator'
import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/component/Loading/Loading';

const App = () =>{
  return (
    <SafeAreaView style={styles.mainStyle}>
      <NavigationContainer>
      <Loading/>
      <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor:'white',
    flex: 1
  },
});

export default App;
