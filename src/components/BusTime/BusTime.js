import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import CustomButton from "../../components/CustomButton/Index";

function BusTime({ busID, busRegNo, routeNo, fromStop, toStop, direction }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://192.168.8.102:8080/bus/${busID}/stops`
        );
        setSchedules(response.data);
        console.log("Fetched schedules:", response.data);
      } catch (error) {
        setError("Error fetching bus schedules.");
        console.error("Error fetching bus schedules:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Hours and ${minutes} Minutes`;
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  console.log("Filter direction:", direction);
  const filteredSchedules = schedules.filter(
    (schedule) => schedule.direction === direction
  );
  console.log("Filtered Schedules:", filteredSchedules);

  const fromSchedule = filteredSchedules.find(
    (schedule) => schedule.busStop.name === fromStop
  );
  const toSchedule = filteredSchedules.find(
    (schedule) => schedule.busStop.name === toStop
  );

  if (!fromSchedule || !toSchedule) {
    return <Text>No schedule available for the selected route.</Text>;
  }

  const fromTime = fromSchedule.departureTime;
  const toTime = toSchedule.arrivalTime;

  return (
    <View style={styles.container}>
      <View style={styles.blueUp}>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Bus ID: </Text>
          <Text style={styles.midTextW}>{busRegNo}</Text>
        </View>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Route No: </Text>
          <Text style={styles.midTextW}>{routeNo}</Text>
        </View>
      </View>
      <View style={styles.mid}>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>From</Text>
            <Text style={styles.midText}>{fromStop}</Text>
            <Text style={styles.midText}>{fromTime}</Text>
          </View>
        </View>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Duration</Text>
            <Text style={styles.midText}>
              {calculateDuration(fromTime, toTime)}
            </Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Date</Text>
            <Text style={styles.midText}>2024-10-12</Text>
          </View>
        </View>
        <View style={styles.midLeft}>
          <View style={styles.downsub}>
            <Text style={styles.smallText}>To</Text>
            <Text style={styles.midText}>{toStop}</Text>

            <Text style={styles.midText}>{toTime}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.blueDown}>
          <View style={styles.greendown}>
            <Text style={styles.smallText}>Got Off at:</Text>
            <Text style={styles.midText}>08.00</Text>
          </View>

          <View style={styles.reddown}>
            <Text style={styles.smallText}>Delay:</Text>
            <Text style={styles.midText}>10 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#bbdfea",
    shadowColor: "#abb6ba",
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 1,
  },
  blueUp: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2772",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    color: "white",
  },
  blueDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2772",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    color: "white",
  },
  upId: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mid: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  midCon: {
    padding: 3,
  },
  midLeft: {
    alignItems: "flex-end",
  },
  downsub: {
    alignItems: "flex-end",
    padding: 3,
  },
  greendown: {
    backgroundColor: "#90ee90",
    borderRadius: 3,
    padding: 5,
  },
  reddown: {
    alignItems: "flex-end",
    backgroundColor: "#ff0000",
    borderRadius: 3,
    padding: 5,
  },
  smallText: {
    fontSize: 10,
  },
  midText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  smallTextW: {
    fontSize: 10,
    color: "white",
  },
  midTextW: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});
export default BusTime;
