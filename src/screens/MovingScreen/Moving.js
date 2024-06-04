import { View, Text, StyleSheet, TouchableOpacity,ScrollView,SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import DateTimePicker from "@react-native-community/datetimepicker";
import Picker from "../../components/Picker/Index";
import Fontisto from "react-native-vector-icons/Fontisto";
import DatePic from "@/src/components/DatePic/Index";


const Moving = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");

  const onConfirmPressed = () => {
    console.warn("confirm");
  };

  return (
    <ScrollView style={styles.root}>
    <SafeAreaView>
    <Text style={styles.head}>Where is it going?</Text>
      <Picker placeholder="From"/>
      <Picker placeholder="To"/>
      <DatePic/>
      <Picker placeholder="Select Bus"></Picker>
      <CustomInput
        placeholder="Reciever Name"
        value={name}
        setValue={setName}
        icon="pencil"
      ></CustomInput>
      <CustomInput
        placeholder="Receiver Id"
        value={id}
        setValue={setId}
        icon="pencil"
      ></CustomInput>
      <CustomInput
        placeholder="Receiver Contact Number"
        value={number}
        setValue={setNumber}
        icon="phone"
      ></CustomInput>
      <View style={styles.safe}>
      <CustomButton text="Confirm Booking" onPress={onConfirmPressed} ></CustomButton>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  dis: {
    justifyContent: "center",
    width: "100%",
    textAlign:"center"
  },

  head: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#132968",
    paddingBottom: 10,
    paddingTop:15,
    justifyContent:"center"
  },
  safe: {
    marginBottom: 20,
  },

});

export default Moving;
