import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import BusTime from "../../components/BusTime/BusTime";

const BusTimeTable = () => {
  const route = useRoute();
  const { busSchedules, direction, from, to, date } = route.params;
  console.log("route params", route.params);

  return (
    <View style={styles.container}>
      <ScrollView>
        {busSchedules.length === 0 ? (
          <Text style={styles.noDataText}>No bus schedules available</Text>
        ) : (
          busSchedules.map((bus) => (
            <BusTime
              key={bus.id}
              busID={bus.id}
              busRegNo={bus.regNo}
              routeNo={bus.routeNo}
              fromStop={from}
              toStop={to}
              direction={direction}
              date={date}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20,
  },
});

export default BusTimeTable;
