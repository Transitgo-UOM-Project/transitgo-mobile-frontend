import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PackageScreen from '../screens/PackageScreen/Index';
import MovingScreen from '../screens/MovingScreen/Index';
import TrackingScreen from '../screens/TrackingScreen/Index';
import FormConductor from '../screens/FormConductor/Index';

const Stack = createNativeStackNavigator();

const Package = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PackageScreen" component={PackageScreen} />
      <Stack.Screen
        name="TrackingScreen"
        component={TrackingScreen}
        screenOptions={{headerShown: true}}
      />
      <Stack.Screen name="MovingScreen" component={MovingScreen} />
      <Stack.Screen name="FormConductor" component={FormConductor} />
    </Stack.Navigator>
  );
};

export default Package;
