import React, {useEffect, useState} from 'react';
import Config from '../../../config';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,

} from "react-native";
import axios from "axios";
import BusTimeConductor from "../../components/BusTimeConductor/Index";
import BusTimeOFF from "../../components/BusTimeOFF/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = Config.API_BASE_URL;

function Conductor() {
  const [bus, setBus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  const Authorization = {
    headers: {Authorization: `Bearer ${token}`},
  };

  useEffect(() => {
    const getStoredDetails = async () => {
      try {

        const storedToken = await AsyncStorage.getItem("token");
        const storedId = await AsyncStorage.getItem("id");

        if (storedToken && storedId) {
          setToken(storedToken);
          setId(storedId);
        } else {

          setError("No stored token or ID found.");
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError("Failed to fetch user details.");

      }
    };

    getStoredDetails();
  }, []);

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      console.log('iD isss ', id);
      try {
        if (!id || !token) {

          throw new Error("ID or Token is missing.");
        }

        const Authorization = {
          headers: { Authorization: `Bearer ${token}` },

        };

        const empBusResponse = await axios.get(
          `${apiUrl}/userBus/${id}`,
          Authorization,
        );
        if (empBusResponse.data !== 0) {
          const busId = empBusResponse.data;
          console.log('bus IDDDD', busId);
          const response = await axios.get(
            `${apiUrl}/bus/${busId}`,
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
    if (id && token) {
      loadBus();
    }
  }, [id, token]);

  return (
    <ScrollView>
      <Header text="Bus Shedule for Conductor" />
      <View contentContainerStyle={styles.container}>
        {loading && <ActivityIndicator size="large" color="#3182ce" />}
        {error && <Text style={styles.errorText}>{error}</Text>}


      {bus.regNo && bus.routeNo && bus.id && bus.status !== "off" && (
        <View
          style={{
            textAlign: "center",
            marginTop: 30,
            fontSize: 18,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: "#071E60",
                fontSize: 20,
              }}
            >
              Start Your Journey
            </Text>
          </View>


          <BusTimeConductor
            busID={bus.id}
            busRegNo={bus.regNo}
            routeNo={bus.routeNo}
            direction={bus.status}
          />

          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "red",
              fontSize: 12,
            }}
          >
            Note : Click Start Journey When the bus is starting to move from the
            first bus stop to start the bus tracking. You can end the journey
            after reaching the last stop by clicking end journey button.
          </Text>
        </View>
      )}
      {bus.status === "off" && (
        <View
          style={{
            textAlign: "justify",
            marginTop: 30,
            fontSize: 18,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                color: "#071E60",
                fontSize: 20,
              }}
            >
              Usual Bus Journey(s) For Today
            </Text>
          </View>
          {bus.regNo && bus.routeNo && bus.id && (
            <BusTimeOFF
              busID={bus.id}
              busRegNo={bus.regNo}
              routeNo={bus.routeNo}
              direction={"up"}
            />
          )}
          {bus.regNo && bus.routeNo && bus.id && (
            <BusTimeOFF
              busID={bus.id}
              busRegNo={bus.regNo}
              routeNo={bus.routeNo}
              direction={"down"}
            />
          )}

          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "red",
              fontSize: 12,
            }}
          >
            Note : Your Bus is not within the time range to start a journey or
            Today is a Off Day. Please come back around the start time of the
            journey.
          </Text>
        </View>
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
