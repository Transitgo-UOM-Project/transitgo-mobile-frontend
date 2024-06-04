import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import index from './index'

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
       <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Index" component={index} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
