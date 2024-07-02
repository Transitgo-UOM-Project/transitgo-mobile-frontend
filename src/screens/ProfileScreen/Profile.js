import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput/Index';
import CustomButton from '../../components/CustomButton/Index';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    fname: 'zaki',
    lname: 'ajhhj',
    email: 'jhgfghjk@gmail.com',
    uname: 'hello',
  });
  const [editData, setEditData] = useState({
    fname: '',
    lname: '',
    email: '',
    uname: '',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      fname: profileInfo.fname,
      lname: profileInfo.lname,
      email: profileInfo.email,
      uname: profileInfo.uname,
    });
  };

  const handleSave = () => {
    setProfileInfo(editData);
    setIsEditing(false);
  };

  const onEditInput = (name, value) => {
    setEditData({...editData, [name]: value});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <CustomInput
          placeholder="First Name"
          value={isEditing ? editData.fname : profileInfo.fname}
          editable={isEditing}
          onChangeText={text => onEditInput('fname', text)}
        />

        <Text style={styles.label}>Last Name</Text>
        <CustomInput
          placeholder="Last Name"
          value={isEditing ? editData.lname : profileInfo.lname}
          editable={isEditing}
          onChangeText={text => onEditInput('lname', text)}
        />

        <Text style={styles.label}>E-mail</Text>
        <CustomInput
          placeholder="Email"
          value={isEditing ? editData.email : profileInfo.email}
          editable={isEditing}
          onChangeText={text => onEditInput('email', text)}
        />

        <Text style={styles.label}>User Name</Text>
        <CustomInput
          placeholder="User Name"
          value={isEditing ? editData.uname : profileInfo.uname}
          editable={isEditing}
          onChangeText={text => onEditInput('uname', text)}
        />

        <View style={styles.buttonsContainer}>
          {!isEditing && <CustomButton text="Edit" onPress={handleEdit} />}
          {isEditing && <CustomButton text="Save" onPress={handleSave} />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    marginTop: 20,
  },
});

export default Profile;
