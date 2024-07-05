import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";

const apiUrl = Config.API_BASE_URL;

const EditLostItemScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item, updateLostItems } = route.params;
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState(item.name);
  const [busDescription, setBusDescription] = useState(item.bus_Description);
  const [mobileNumber, setMobileNumber] = useState(item.mobile_Number);
  const [itemDescription, setItemDescription] = useState(item.item_Description);

  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const updatedItem = {
      ...item,
      name,
      bus_Description: busDescription,
      mobile_Number: mobileNumber,
      item_Description: itemDescription,
    };

    try {
      const response = await axios.put(
        `${apiUrl}/lost/${item.id}`,
        updatedItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Item updated:", response.data);

      updateLostItems(); // Refresh the lostItems list in FoundItemScreen

      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error("Error updating item:", error);

      if (error.response && error.response.status === 400) {
        // Backend validation error
        const errorData = error.response.data;
        const errorMessage = Object.values(errorData).join("\n"); // Combine all error messages
        setErrorMsg(errorMessage);
      } else {
        // Other types of errors
        setErrorMsg("Failed to update item. Please try again later.");
      }

      // Display alert with the error message
      Alert.alert("Failed to update item", errorMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Lost Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bus Details"
        value={busDescription}
        onChangeText={setBusDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default EditLostItemScreen;
