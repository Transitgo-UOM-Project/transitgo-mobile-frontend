import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView,SafeAreaView } from 'react-native';
import CustomInput from '@/src/components/CustomInput/Index';
import CustomButton from '@/src/components/CustomButton/Index';
import { useNavigation } from '@react-navigation/native';

const Found = () => {
  const [name, setName] = useState('');
  const [bus, setBus] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const Submit = () => {
    console.warn('Submit');

    const now = new Date();
    const fDate = now.toISOString().split('T')[0];
    const fTime = now.toTimeString().split(' ')[0]; 
    const postedOn = `${fDate} at ${fTime}`;

    const list = {
      key: Date.now().toString(),
      name,
      bus,
      number,
      description,
      postedOn: postedOn, 
    };

    setBus('');
    setName('');
    setDescription('');
    setNumber('');

    navigation.navigate('FoundItemScreen', {
      list,
    });
  };

  const SubmitLost = () => {
    console.warn('Submit Lost');
    navigation.navigate('LostScreen');
  };

  return (
    <ScrollView style={styles.root}>
    <SafeAreaView>
      <View style={styles.roo}>
        <Text style={styles.text}>Report Found Items</Text>
        <CustomInput
          placeholder="Name"
          value={name}
          setValue={setName}
          icon="pencil"
        ></CustomInput>
        <CustomInput
          placeholder="Mobile Number"
          value={number}
          setValue={setNumber}
          icon="phone"
        ></CustomInput>
        <CustomInput
          placeholder="Bus Details"
          value={bus}
          setValue={setBus}
          icon="bus"
        ></CustomInput>
        <CustomInput
          placeholder="Item Discription"
          value={description}
          setValue={setDescription}
          icon="pencil"
        ></CustomInput>
        <CustomButton text="Submit" onPress={Submit}></CustomButton>
        <CustomButton
          text="Submit Lost Item!"
          onPress={SubmitLost}
          type="tertiary1"
        />
      </View>
    </SafeAreaView>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  roo:{
    flex:1,
    alignItems:"center",
    padding:20
  },
  text: {
    fontSize: 25,
    color: '#132968',
    paddingTop: 20,
    fontWeight: 'bold',
  },
});

export default Found;
