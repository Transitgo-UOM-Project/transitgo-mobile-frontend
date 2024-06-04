import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "@/src/components/Header/Index";
import CustomInput from "@/src/components/CustomInput/Index";

const Tracking = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Want to track your belonging?</Text>
        <CustomInput placeholder="Your Parcel's Tracking ID" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  text:{
    fontSize:20,
    paddingVertical:20,
    color:"#132968"
  }
});

export default Tracking;
