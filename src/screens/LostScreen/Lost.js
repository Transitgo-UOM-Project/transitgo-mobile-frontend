import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import axios from "axios"; // Import axios for HTTP requests
import { useNavigation } from "@react-navigation/native";
import Config from "../../../config";

const apiUrl = Config.API_BASE_URL;

const Lost = () => {
  const [name, setName] = useState("");
  const [bus_Description, setBus] = useState("");
  const [mobile_Number, setNumber] = useState("");
  const [item_Description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigation = useNavigation();

  const postedOn = new Date().toISOString(); // Define postedOn with the current date and time

  const Submit = async () => {
    const postedOn = new Date().toISOString(); // Define postedOn with the current date and time
    const data = {
      name,
      bus_Description,
      mobile_Number: mobile_Number || null, // Set to null if not provided
      item_Description,
      postedOn,
    };

    try {
      const response = await axios.post(`${apiUrl}/lost`, data);

      console.log("POST response:", response.data);

      // Check if response.data is an array before sorting
      if (Array.isArray(response.data)) {
        const sortedItems = response.data.sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );
        setItems(sortedItems); //sort by date time
      } else {
        console.error(
          "Expected response data to be an array, but got:",
          typeof response.data
        );
      }

      // Navigate to FoundItemScreen with the submitted data
      navigation.navigate("LostItemScreen", {
        list: { ...data },
      });

      // Clear input fields after successful submission
      setBus("");
      setName("");
      setDescription("");
      setNumber("");
      setErrorMsg("");
    } catch (error) {
      console.error("Error submitting data:", error);

      if (error.response && error.response.status === 400) {
        // Backend validation error
        const {
          Mobile_Number,
          Name,
          Bus_Description,
          Item_Description,
        } = error.response.data;
        setErrorMsg(
          `${Mobile_Number || Name || Bus_Description || Item_Description}`
        );
      } else {
        // Other types of errors
        Alert.alert("Error", "Failed to submit data. Please try again later.");
      }
    }
  };

  const SubmitFound = () => {
    console.warn("Submit found");
    navigation.navigate("FoundScreen");
  };

  return (
    <ScrollView style={styles.root}>
      <SafeAreaView>
        <View style={styles.roo}>
          <Text style={styles.Text}>Report Lost Items</Text>
          <CustomInput
            placeholder="Name"
            value={name}
            setValue={setName}
            icon="user"
          ></CustomInput>
          <CustomInput
            placeholder="Mobile Number"
            value={mobile_Number}
            setValue={setNumber}
            icon="phone"
          ></CustomInput>
          <CustomInput
            placeholder="Bus Details"
            value={bus_Description}
            setValue={setBus}
            icon="bus"
          ></CustomInput>
          <CustomInput
            placeholder="Item Discription"
            value={item_Description}
            setValue={setDescription}
            icon="pencil"
          ></CustomInput>
          {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
          <CustomButton text="Submit" onPress={Submit}></CustomButton>
          <CustomButton
            text="Submit Found Item!"
            onPress={SubmitFound}
            type="tertiary1"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  roo: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  Text: {
    fontSize: 25,
    color: "#132968",
    paddingTop: 20,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default Lost;
