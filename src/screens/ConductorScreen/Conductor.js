import React, { useEffect, useState } from "react";
import Config from "../../../config";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import BusTimeConductor from "../../components/BusTimeConductor/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = Config.API_BASE_URL;

function Conductor() {
  const [bus, setBus] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const getStoredDetails = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedId = await AsyncStorage.getItem("id");
        setToken(storedToken);
        setId(storedId);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getStoredDetails();
  }, []);

  useEffect(() => {
    const loadBus = async () => {
      setLoading(true);
      setError(null);
      console.log("iD isss ", id);
      try {
        const empBusResponse = await axios.get(
          `${apiUrl}/userBus/${id}`,
          Authorization
        );
        if (empBusResponse.data !== 0) {
          const busId = empBusResponse.data;
          console.log("bus IDDDD", busId);
          const response = await axios.get(
            `${apiUrl}/bus/${busId}`,
            Authorization
          );
          console.log("bus response ", response.data);
          setBus(response.data);
        } else {
          console.log("Employee is not yet assigned with a bus");
        }
      } catch (error) {
        setError("Error fetching bus schedules. Please try again later.");
        console.error("Error fetching bus schedules:", error.message);
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
    backgroundColor: "#f5f5f5",
  },
  headerBar: {
    backgroundColor: "#3182ce",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Conductor;
