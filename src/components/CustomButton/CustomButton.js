import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomButton = ({ onPress, text, type = "primary", icon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>
        {" "}
        <Icon name={icon} size={15} color="#132968" />
        {text}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FA6B6B",
    width: "100%",
    padding: 15,
    marginVertical: 10,

    alignItems: "center",
    borderRadius: 5,
  },

  container_primary: {
    backgroundColor: "#FA6B6B",
  },
  container_tertiary1: {
    backgroundColor: "transparent",
    padding: 10,
    marginVertical: 35,
  },
  container_tertiary2: {
    backgroundColor: "transparent",
    padding: 5,
    marginVertical: 2,
  },
  container_white: {
    backgroundColor: "transparent",
    padding: 1,
    marginVertical: 1,
  },
  container_special: {
    backgroundColor: "#E7EAF4",
  },
  container_secondary: {
    backgroundColor: "transparent",
    borderColor: "#FA6B6B",
    borderWidth: 2,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_tertiary1: {
    color: "#1E2772",
    fontSize: 15,
  },
  text_white: {
    color: "white",
    fontSize: 12,
  },
  text_tertiary2: {
    color: "#1E2772",
    fontSize: 10,
  },
  text_special: {
    color: "#4765A9",
    marginLeft: 5
  },
  text_secondary: {
    color: "#FA6B6B",
  },

});

export default CustomButton;
