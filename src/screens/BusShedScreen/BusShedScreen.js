import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import Picker from "@/src/components/Picker/Index";
import DatePic from "../../components/DatePic/Index";

const BusShedScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  

  const onSearchPressed = () => {
    console.warn("Search");
    navigation.navigate('BusTimeTable');
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.al}>
        <Image
          source={logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.sec}>
        <Text style={styles.text}>Search Your Destination</Text>
        <Picker placeholder="From"></Picker>
        <Picker placeholder="To"></Picker>
        <DatePic />
        <CustomButton text="Search" onPress={onSearchPressed} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  al: { alignItems: "center" },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 300,
  },

  sec: {
    backgroundColor: "#bbdfea",
    shadowColor: "#abb6ba",
    borderRadius: 3,
    elevation: 3,
    shadowOpacity: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});

export default BusShedScreen;
