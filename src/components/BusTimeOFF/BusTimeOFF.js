BusTimeOFF;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
const apiUrl = Config.API_BASE_URL;

function BusTimeOFF({ busID, busRegNo, routeNo, direction }) {
  const [schedules, setSchedules] = useState([]);
  const [fromSchedule, setFromSchedule] = useState(null);
  const [toSchedule, setToSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getStoredDetails = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        setToken(storedToken);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getStoredDetails();
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${apiUrl}/bus/${busID}/stops`, {
          headers: { Authorization: `Bearer ${token}` },
        }); //Schedules of the current bus
        //console.log("fetched scheduled for the selected bus ", response.data);
        //console.log("stop:", stops);
        let stops = response.data.map((stop) => {
          return {
            stop: stop["busStop"]["name"],
            arraivalTime: stop["arrivalTime"],
            departureTime: stop["departureTime"],
          };
        });
        console.log("all stops", stops);
        console.log("response data", response.data);

        setSchedules(response.data);
        console.log("schedulessssssss", response.data);
      } catch (error) {
        setError("Error fetching bus schedules.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  useEffect(() => {
    console.log("Schedules", schedules);
    if (schedules.length > 0) {
      const filteredSchedules = schedules.filter(
        (schedule) => schedule.direction === direction
      );
      console.log("filtered schedule", filteredSchedules);
      const filteredStopTimes = filteredSchedules.map((schedule) => {
        return {
          arrivalTime: schedule.arrivalTime,
          departureTime: schedule.departureTime,
          busStop: schedule.busStop,
        };
      });

      console.log("filteredStopTimes:", filteredStopTimes);

      const startEndTimes = {
        startTime: filteredStopTimes[0].departureTime,
        endTime: filteredStopTimes[filteredStopTimes.length - 1].arrivalTime,
      };

      setFromSchedule(filteredStopTimes[0].busStop.name);
      setToSchedule(
        filteredStopTimes[filteredStopTimes.length - 1].busStop.name
      );
    }
  }, [schedules]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.direction === direction
  );

  const fromTime = filteredSchedules[0].departureTime;

  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Bus: {busRegNo}</Text>
          <Text style={styles.headerText}>Route No: {routeNo}</Text>
        </View>
        <View style={styles.middleBar}>
          <View>
            <Text style={styles.labelText}>From:</Text>
            <Text style={styles.infoText}>{fromSchedule}</Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.midText}>Journey Starts</Text>
            <Text style={styles.midText}>at {fromTime}</Text>
          </View>
          <View>
            <Text style={styles.labelText}>To:</Text>
            <Text style={styles.infoText}>{toSchedule}</Text>
          </View>
        </View>
        <View style={styles.blueDown}>
          <View>
            <CustomButton
              type="white"
              text="Dropping Points"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Dropping Points</Text>
              <ScrollView>
                {filteredSchedules.map((schedule, index) => (
                  <View key={index} style={styles.scheduleItem}>
                    <Text style={styles.scheduleText}>
                      {index === 0
                        ? `${schedule.busStop.name} - Departure: ${schedule.departureTime}`
                        : `${schedule.busStop.name} - Arrival: ${schedule.arrivalTime}`}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    borderRadius: 10,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#004ba0",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    color: "white",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  middleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  labelText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333333",
  },
  infoText: {
    fontSize: 18,
    color: "#666666",
  },
  blueDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#004ba0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "white",
  },
  footerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#004ba0",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    color: "white",
  },
  footerItem: {
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#ff0000",
    borderRadius: 3,
  },
  footerItem2: {
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#90EE90",
    borderRadius: 3,
  },
  footerText: {
    padding: 2,
    color: "black",
  },
  delayText: {
    padding: 6,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "hsl(0, 93%, 70%)",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  midText: {
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scheduleItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  scheduleText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#004ba0",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  midCon: {
    padding: 3,
  },
});

export default BusTimeOFF;
