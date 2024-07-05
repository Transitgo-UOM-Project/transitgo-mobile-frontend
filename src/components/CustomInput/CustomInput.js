import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  icon,
  editable,
  onChangeText,
}) => {
  return (
    <View style={[styles.container]}>
      <Icon name={icon} size={15} color="#132968" style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={setValue}
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
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderColor: '#808080',
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
    flexDirection: 'row',
    marginVertical: 6,
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

export default CustomInput;
