import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import CustomButton from '@/src/components/CustomButton/Index';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/src/context/AuthContext';

const PackageScreen = () => {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const {userToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        console.log('Fetched user role:', role);
        setUserRole(role);
      } catch (e) {
        console.error('Failed to load user role:', e);
      }
    };

    fetchUserRole();
  }, []);

  const onpackagePressed = () => {
    console.warn(' Move my package');
    navigation.navigate('MovingScreen');
  };

  const ontrackPressed = () => {
    console.warn('tracking screen');
    if (userRole === 'passenger') {
      navigation.navigate('TrackingScreen');
    } else if (userRole === 'employee') {
      navigation.navigate('FormConductor');
    } else {
      console.warn('User role not defined or not authorized.');
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={[styles.dis, {height: height * 0.6}]}>
        <ImageBackground
          source={require('../../../assets/SmallImage/packimg.png')}
          style={styles.logo}
        />
        <Text style={styles.move}>Move your packages with us.</Text>
        <Text style={styles.safe}>
          Safely move your belongings to your desired places through our bus
          route in a fair price.
        </Text>
      </View>

      <CustomButton
        text="Move My Package!"
        onPress={onpackagePressed}></CustomButton>
      <CustomButton
        text="Track My Package"
        onPress={ontrackPressed}
        type="tertiary1"></CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  dis: {
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 20,
  },

  but: {},
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: 450,
    maxHeight: 250,
    padding: 20,
    resizeMode: 'contain',
  },
  move: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#132968',
    paddingBottom: 10,
  },
  safe: {
    fontSize: 16,
    color: '#132968',
    paddingBottom: 10,
  },
});

export default PackageScreen;
