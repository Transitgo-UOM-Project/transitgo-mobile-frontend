import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import DatePic from "@/src/components/DatePic/Index";
import PickerStops from "../../components/PickerStops/Index";
import PickerBuses from "../../components/PickerBuses/Index";
import axios from "axios";

const Moving = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState(null);
  const [fromOrderIndex, setFromOrderIndex] = useState(null);
  const [to, setTo] = useState(null);
  const [toOrderIndex, setToOrderIndex] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const onConfirmPressed = async () => {
    const pack = {
      busID: selectedBus,
      destination: to,
      payment: "",
      receivedDate: date,
      start: from,
      status: "",
      receiverName: name,
      receiverContact: number,
      receiverNIC: id,
    };

    try {
      const response = await axios.post(
        "http://192.168.8.102:8080/package",
        pack
      );
      if (response.status === 200) {
        Alert.alert("Success", "Booking confirmed!");
      } else {
        Alert.alert("Error", "Failed to confirm booking. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      Alert.alert("Error", "Failed to confirm booking. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.root}>
      <SafeAreaView>
        <Text style={styles.head}>Where is it going?</Text>
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
        <DatePic onDateChange={(selectedDate) => setDate(selectedDate)} />
        <PickerBuses
          from={from}
          to={to}
          date={date}
          fromOrderIndex={fromOrderIndex}
          toOrderIndex={toOrderIndex}
          onSelectBus={(busID) => setSelectedBus(busID)}
        />
        <CustomInput
          placeholder="Receiver Name"
          value={name}
          setValue={setName}
          icon="pencil"
        />
        <CustomInput
          placeholder="Receiver Id"
          value={id}
          setValue={setId}
          icon="pencil"
        />
        <CustomInput
          placeholder="Receiver Contact Number"
          value={number}
          setValue={setNumber}
          icon="phone"
        />
        <View style={styles.safe}>
          <CustomButton text="Confirm Booking" onPress={onConfirmPressed} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  head: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#132968",
    paddingBottom: 10,
    paddingTop: 15,
    justifyContent: "center",
  },
  safe: {
    marginBottom: 20,
  },
});

export default Moving;
