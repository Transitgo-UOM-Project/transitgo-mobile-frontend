import { View, Text } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import MassegesScreen from "../screens/MassegesScreen";
import CustomDrawer from "../components/CustomDrawer";
import BottomTab from "./BottomTab";

const Drawer = createDrawerNavigator();

const Draw = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
        drawerActiveBackgroundColor:"#FA6B6B",
        drawerActiveTintColor:"white",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="HOME"
        component={BottomTab}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={MassegesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Draw;
