import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Header from '@/src/components/Header/Index';
import CustomInput from '@/src/components/CustomInput/Index';
import Config from '../../../config';
import axios from 'axios';
import CustomButton from '@/src/components/CustomButton/CustomButton';

const apiUrl = Config.API_BASE_URL;

const Tracking = () => {
  const [packageID, setPackageID] = useState('');
  const [busID, setBusID] = useState(null);
  const [lastLeftStop, setLastLeftStop] = useState(null);
  const [nextLocation, setNextLocation] = useState(null);

  useEffect(() => {
    if (busID) {
      const fetchTrackingData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/bus/${busID}`);
          setLastLeftStop(response.data.lastLeftStop);
          setNextLocation(response.data.nextLocation);
        } catch (error) {
          console.error('Error fetching tracking data:', error.message);
        }
      };

      fetchTrackingData();
    }
  }, [busID]);

  const handleSearch = async () => {
    try {
      const packageResponse = await axios.get(`${apiUrl}/package/${packageID}`);
      setBusID(packageResponse.data.busID);
    } catch (error) {
      console.error('Error fetching package data:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Want to track your belonging?</Text>
        <Image
          source={require('../../../assets/SmallImage/track.png')}
          style={styles.img}
        />
        <CustomInput
          placeholder="Your Parcel's Tracking ID"
          value={packageID}
          setValue={setPackageID}
        />
        <CustomButton text="Track My Package" onPress={handleSearch} />
        <View style={styles.trackInfo}>
          <Text style={styles.infoText}>
            Last Left Location: {lastLeftStop}
          </Text>
          <Text style={styles.infoText}>Next Location: {nextLocation}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    padding: 20,
    paddingTop: 30,
  },
  text: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#132968',
  },

  img: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
    marginBottom: 20,
  },

  trackInfo: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#132968',
  },
});

export default Tracking;
