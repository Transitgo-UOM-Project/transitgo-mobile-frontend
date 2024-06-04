import { View, Text,StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen/Index";
import BusShedule from "./BusShedule";
import LostFound from "./LostFound";
import Package from "./Package";
import Delay from "./Delay";


const Stack = createNativeStackNavigator();

const Nav = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>   
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BusShedule" component={BusShedule} />
        <Stack.Screen name="LostFound" component={LostFound} />
        <Stack.Screen name="Package" component={Package} />
        <Stack.Screen name="Delay" component={Delay} screenOptions={{ headerShown:true  }}/>
      </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  Area: {
    flex: 1,
  },
});

export default Nav;
