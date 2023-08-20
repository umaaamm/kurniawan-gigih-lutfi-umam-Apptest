/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  LogBox,
  StyleSheet,
} from 'react-native';

import MainStackNavigator from './src/navigator/mainStackNavigator'
import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/component/Loading/Loading';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {

  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Loading />
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
