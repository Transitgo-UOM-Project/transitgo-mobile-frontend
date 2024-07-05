import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput/Index';
import CustomButton from '../../components/CustomButton/Index';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '@/config';

const apiURL = Config.API_BASE_URL;

const Profile = ({profileInfo = {}, setProfileInfo}) => {
  const navigation = useNavigation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem('userRole');
      setRole(storedRole);
    };
    fetchRole();
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const isPassenger = role === 'passenger';
  const {fname = '', lname = '', email = '', uname = '', id = ''} = profileInfo;
  const [editData, setEditData] = useState({
    fname: '',
    lname: '',
    uname: '',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      fname: profileInfo.fname ?? '',
      lname: profileInfo.lname ?? '',
      uname: profileInfo.uname ?? '',
    });
  };

  const onEditInput = (name, value) => {
    setEditData({...editData, [name]: value});
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(
        `${apiURL}/admin-user/update/${id}`,
        editData,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      Alert.alert('Changes Saved');
      setProfileInfo(editData);
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error Updating Profile');
    }
  };

  const handleDelete = () => {
    navigation.navigate('VerifyPassword');
  };

  const getProfileInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiURL}/user/profile`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setProfileInfo({
        fname: response.data.fname ?? '',
        lname: response.data.lname ?? '',
        email: response.data.email ?? '',
        uname: response.data.uname ?? '',
        id: response.data.id ?? '',
      });
    } catch (error) {
      console.log('Error Fetching User Information: ', error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <View style={styles.profileform}>
      <View style={styles.form}>
        <CustomInput
          value={isEditing ? editData.fname : fname}
          setValue={value => onEditInput('fname', value)}
          placeholder="First Name"
          editable={isEditing}
        />
        <CustomInput
          value={isEditing ? editData.lname : lname}
          setValue={value => onEditInput('lname', value)}
          placeholder="Last Name"
          editable={isEditing}
        />
        <CustomInput value={email} placeholder="E-mail" editable={false} />
        <CustomInput
          value={isEditing ? editData.uname : uname}
          setValue={value => onEditInput('uname', value)}
          placeholder="User Name"
          editable={isEditing}
        />
        <View style={styles.otherOption}>
          <Text
            style={styles.changePasswordText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Change Password
          </Text>
        </View>
        <View
          style={[
            styles.editAndSave,
            isPassenger ? styles.withDelete : styles.withoutDelete,
          ]}>
          {!isEditing && <CustomButton onPress={handleEdit} text="Edit" />}
          {isEditing && (
            <CustomButton onPress={handleSave} text="Save Changes" />
          )}
          {isPassenger && (
            <CustomButton onPress={handleDelete} text="Delete Account" />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileform: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
  },
  otherOption: {
    marginVertical: 10,
  },
  changePasswordText: {
    color: '#1E2772',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  editAndSave: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  withDelete: {
    justifyContent: 'space-between',
  },
  withoutDelete: {
    justifyContent: 'flex-start',
  },
});

export default Profile;
