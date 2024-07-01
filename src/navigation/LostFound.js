import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LostFoundScreen from "../screens/LostFoundScreen/Index";
import FoundItemScreen from "../screens/FoundItemScreen/Index"
import FoundScreen from "../screens/FoundScreen/Index"
import LostScreen from "../screens/LostScreen/Index"
import LostItemScreen from "../screens/LostItemScreen/Index"
import EditFoundItemScreen from "../screens/EditFoundItemScreen/Index"
import EditLostItemScreen from "../screens/EditLostItemScreen/Index"



const Stack = createNativeStackNavigator();

const LostFound = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="LostFoundScreen" component={LostFoundScreen}  />
        <Stack.Screen name="FoundItemScreen" component={FoundItemScreen} />
        <Stack.Screen name="FoundScreen" component={FoundScreen} />
        <Stack.Screen name="LostScreen" component={LostScreen} />
        <Stack.Screen name="LostItemScreen" component={LostItemScreen} />
        <Stack.Screen name="EditFoundItemScreen" component={EditFoundItemScreen} />
        <Stack.Screen name="EditLostItemScreen" component={EditLostItemScreen} />
        
      </Stack.Navigator>
  );
};

export default LostFound;
