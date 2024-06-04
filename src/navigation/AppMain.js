import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Nav from "./Index";
import Authentication from "./Authentication";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "./Index";
import Draw from "./Draw";
import { AuthContext } from "../context/AuthContext";

const AppMain = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {userToken !== null ? <Draw /> : <Authentication />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppMain;
