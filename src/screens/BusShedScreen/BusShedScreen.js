import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/Index';
import {useNavigation} from '@react-navigation/native';
import PickerStops from '../../components/PickerStops/Index';
import DatePic from '../../components/DatePic/Index';
import axios from 'axios';
import Config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '@/src/context/AuthContext';

const apiUrl = Config.API_BASE_URL;

const BusShedScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [from, setFrom] = useState(null);
  const [fromOrderIndex, setFromOrderIndex] = useState(null);
  const [to, setTo] = useState(null);
  const [toOrderIndex, setToOrderIndex] = useState(null);
  const [date, setDate] = useState(null);
  const [direction, setDirection] = useState(null);
  const [busSchedules, setBusSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const onSearchPressed = async () => {
    if (!from || !to || !date) {
      setError('Please fill all the fields');
      Alert.alert('Missing Fields', 'Please fill all the fields.');
      return;
    }

    setError(null);
    console.log(
      'from',
      from,
      'order index',
      fromOrderIndex,
      'to',
      to,
      'order index',
      toOrderIndex,
    );
    const direction = calculateDirection(fromOrderIndex, toOrderIndex);
    setDirection(direction);
    console.log('from', from, 'to', to, 'direction', direction, 'date', date);
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/bus/search`, {
        params: {
          from,
          to,
          direction,
          date,
        },
      });
      setBusSchedules(response.data);
      console.log('response data is ', response.data);
      navigation.navigate('BusTimeTable', {
        busSchedules: response.data,
        direction,
        from,
        to,
        date,
      });
    } catch (error) {
      setError('Error fetching bus schedules. Please try again later.');
      console.error('Error fetching bus schedules:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDirection = (fromOrderIndex, toOrderIndex) => {
    return fromOrderIndex < toOrderIndex ? 'up' : 'down';
  };

  const onStartJourneyPressed = () => {
    console.log('onStartJourneyPressed');
    navigation.navigate('ConductorScreen');
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../../assets/images/pikaso_bus.png')}>
      <View style={styles.al}>
        <Image
          source={logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
      </View>
      <ScrollView style={styles.root}>
        <View style={styles.sec}>
          <Text style={styles.text}>Search Your Destination</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <PickerStops
            placeholder="From"
            onSelect={(value, orderIndex) => {
              setFrom(value);
              setFromOrderIndex(orderIndex);
            }}
          />
          <PickerStops
            placeholder="To"
            onSelect={(value, orderIndex) => {
              setTo(value);
              setToOrderIndex(orderIndex);
            }}
          />
          <DatePic onDateChange={selectedDate => setDate(selectedDate)} />
          <CustomButton text="Search" onPress={onSearchPressed} />

          {userRole === 'employee' && (
            <CustomButton
              text="Start Bus Journey"
              onPress={onStartJourneyPressed}
              type="special"
            />
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  al: {
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 300,
  },
  sec: {
    backgroundColor: '#bbdfea',
    shadowColor: '#abb6ba',
    borderRadius: 3,
    elevation: 3,
    shadowOpacity: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
});

export default BusShedScreen;
