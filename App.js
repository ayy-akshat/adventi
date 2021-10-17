import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNav from './navigation/Drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

export default function App() {
  return (
    <NavigationContainer>
      <AppCont/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppSN = createSwitchNavigator({
  Main: DrawerNav
});

const AppCont = createAppContainer(AppSN);