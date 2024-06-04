import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Nav from "./Index";
import BusShedule from "./BusShedule";
import LostFound from "./LostFound";
import Package from "./Package";
import Delay from "./Delay";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#1976d2", paddingTop:5,  },
        tabBarLabelStyle:{fontSize:8, fontWeight:"bold"},
        tabBarInactiveTintColor:"#fff",
        tabBarActiveTintColor:"#1E2772"
      }}
    >
      <Tab.Screen
        name="Home"
        component={Nav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bus Shedule"
        component={BusShedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bus" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lost&Found"
        component={LostFound}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Package"
        component={Package}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="package" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Delay"
        component={Delay}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="speaker-wireless"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};



export default BottomTab;
