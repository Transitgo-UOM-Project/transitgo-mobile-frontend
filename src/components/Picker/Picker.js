import { View, Text, StyleSheet } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";

const Picker = ({ placeholder }) => {
  return (
    <View style={styles.input}>
      <AntDesign name="caretdown" size={15} color="#132968" style={styles.icon} />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "Kandy", value: "Kandy" },
          { label: "Colombo", value: "Colombo" },
          { label: "Nawalapitiya", value: "Nawalapitiya" },
        ]}
        placeholder={{ label: placeholder, value: null }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",  
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    fontSize: 13,
    color: "#808080",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width:180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 4,
    color: 'black',
    
  },
  inputAndroid: {
    width:180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 8,
    color: 'black', 
  },
  placeholder: {
    color: "#808080",
  },
});

export default Picker;
