import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import BusTimeConductor from '../../components/BusTimeConductor/Index';

function Conductor() {
  const [bus, setBus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const Authorization = {
    headers: {Authorization: `Bearer ${token}`},
  };

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      try {
        const empBusResponse = await axios.get(
          `http://localhost:8080/userBus/${id}`,
          Authorization,
        );
        if (empBusResponse.data !== 0) {
          const busId = empBusResponse.data;
          console.log(busId);
          const response = await axios.get(
            `http://localhost:8080/bus/${busId}`,
            Authorization,
          );
          console.log('bus response ', response.data);
          setBus(response.data);
        } else {
          console.log('Employee is not yet assigned with a bus');
        }
      } catch (error) {
        setError('Error fetching bus schedules. Please try again later.');
        console.error('Error fetching bus schedules:', error.message);
      } finally {
        setLoading(false);
      }
    };
    loadBus();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && <ActivityIndicator size="large" color="#3182ce" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {bus.regNo && bus.routeNo && bus.id && (
        <BusTimeConductor
          busID={bus.id}
          busRegNo={bus.regNo}
          routeNo={bus.routeNo}
          direction={bus.status}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerBar: {
    backgroundColor: '#3182ce',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Conductor;
