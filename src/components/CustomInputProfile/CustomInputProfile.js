import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomInputProfile = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  icon,
  editable,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: editable ? "#d4ebf2" : "#FFFFFF",
          borderColor: editable ? "#132968" : "#72bcd4",
        },
      ]}
    >
      <Icon name={icon} size={15} color="red" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999999"
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1, // Add border width
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 10,
  },
  icon: {
    marginTop: 6,
  },
});

export default CustomInputProfile;
