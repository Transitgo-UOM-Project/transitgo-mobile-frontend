import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const PickerBuses = ({
  from,
  to,
  date,
  fromOrderIndex,
  toOrderIndex,
  onSelectBus,
}) => {
  const [availableBuses, setAvailableBuses] = useState([]);

  useEffect(() => {
    if (from && to && date) {
      fetchAvailableBuses();
    }
  }, [from, to, date]);

  const fetchAvailableBuses = async () => {
    const direction = fromOrderIndex < toOrderIndex ? "up" : "down";
    try {
      const response = await axios.get(`http://192.168.8.102:8080/bus/search`, {
        params: {
          from,
          to,
          direction,
          date,
        },
      });

      const buses = response.data;
      const busesWithSchedules = await Promise.all(
        buses.map(async (bus) => {
          const scheduleResponse = await axios.get(
            `http://192.168.8.102:8080/bus/${bus.id}/stops`
          );
          const schedules = scheduleResponse.data;
          const fromStopSchedule = schedules.find(
            (schedule) =>
              schedule.busStop.name === from && schedule.direction === direction
          );
          const routeResponse = await axios.get(
            `http://192.168.8.102:8080/busroute/${bus.routeNo}`
          );
          const routeName = routeResponse.data.routename;

          return {
            ...bus,
            routeName,
            fromStopDepartureTime: fromStopSchedule
              ? fromStopSchedule.departureTime === null
                ? fromStopSchedule.arrivalTime
                : fromStopSchedule.departureTime
              : "N/A",
          };
        })
      );
      setAvailableBuses(busesWithSchedules);
    } catch (error) {
      console.error("Error fetching available buses:", error);
    }
  };

  return (
    <View style={styles.input}>
      <RNPickerSelect
        onValueChange={(value) => onSelectBus(value)}
        items={availableBuses.map((bus) => ({
          label: `${bus.id} - ${bus.routeName} - Time of Departure From ${from} - ${bus.fromStopDepartureTime}`,
          value: bus.id,
        }))}
        placeholder={{ label: "Select Bus", value: null }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    width: 180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 8,
    color: "black",
  },
  placeholder: {
    color: "#808080",
  },
});

export default PickerBuses;
