import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnnouncementScreen from "../screens/AnnouncementScreen/Index";



const Stack = createNativeStackNavigator();

const Delay = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Delay Announcement" component={AnnouncementScreen} />
      </Stack.Navigator>
  );
};

export default Delay;
