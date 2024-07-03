import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/ProfileScreen";
import MassegesScreen from "../screens/MassegesScreen";
import CustomDrawer from "../components/CustomDrawer";
import BottomTab from "./BottomTab";
import Tracking from "../screens/TrackingScreen/Tracking";

const Drawer = createDrawerNavigator();

const Draw = () => {
 const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole'); 
        setUserRole(role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    getUserRole();
  }, []);

  const getPackageStatusComponent = () => {
    if (userRole === 'pasenger') {
      return Tracking; // or some other screen for admins
    } else if (userRole === 'employee') {
      return Tracking; // or some other screen for regular users
    }
    return Tracking; // default screen if role is undefined
  };

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
        name="Package Status"
        component={getPackageStatusComponent()}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Activity History"
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
