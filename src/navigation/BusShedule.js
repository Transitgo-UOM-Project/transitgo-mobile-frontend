import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BusShedScreen from '../screens/BusShedScreen/Index';
import BusTimeTable from '../screens/BusTimeTable/Index';
import ReviewsRatingScreen from '../screens/ReviewsRatScreen/Index';
import ConductorScreen from '../screens/ConductorScreen/Index';

const Stack = createNativeStackNavigator();

const BusShedule = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BusShedScreen" component={BusShedScreen} />
      <Stack.Screen name="BusTimeTable" component={BusTimeTable} />
      <Stack.Screen name="ReviewsRatings" component={ReviewsRatingScreen} />
      <Stack.Screen name="ConductorScreen" component={ConductorScreen} />
    </Stack.Navigator>
  );
};

export default BusShedule;
