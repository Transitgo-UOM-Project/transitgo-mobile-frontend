import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/FontAwesome";


const CustomBlue = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.con}>
      <Icon name={icon} size={15} color="white"   />
      </View>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="white"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#132968",
    width: "100%",
    borderColor: "#808080",
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
    flexDirection: "row",
    marginVertical: 6,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingLeft:10,
    color:"white"
  },
  con:{
    paddingTop:7
  }
});

export default CustomBlue;
