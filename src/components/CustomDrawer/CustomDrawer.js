import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {FlipInEasyX} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '@/src/context/AuthContext';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const uname = await AsyncStorage.getItem('uname');
      setUsername(uname);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#FA6B6B'}}>
        <Image
          source={require('../../../assets/images/profile.jpeg')}
          style={styles.prof}
        />
        <Text style={styles.text}>{username}</Text>
        <View style={styles.list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => {
            logout(navigation);
          }}>
          <View style={styles.bot}>
            <Ionicons name="exit" size={20} color="#1E2772" />
            <Text style={styles.botText}>Sign-Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  prof: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 10,
    padding: 20,
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  text: {
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 15,
    fontSize: 20,
    paddingBottom: 10,
  },
  bottom: {
    padding: 20,
    borderTopColor: '#FA6B6B',
    borderTopWidth: 1,
  },
  botText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E2772',
  },
  bot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawer;
