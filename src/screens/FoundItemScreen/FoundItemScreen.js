import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomBlue from "../../components/CustomBlue/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "../../../config";

const apiUrl = Config.API_BASE_URL;

const FoundItemScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { list } = route.params || {};

  const [foundItems, setFoundItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setToken(token);
          fetchFoundItems(token);
        } else {
          // Handle case where token is not available
          Alert.alert("No token found, please login again");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchTokenAndData();
  }, []);

  const fetchFoundItems = (token) => {
    fetch(`${apiUrl}/founds`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFoundItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
      });
  };

  const formatDate = (dateTime) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  const handleDelete = (item) => {
    fetch(`${apiUrl}/found/${item.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setFoundItems((prevItems) =>
            prevItems.filter((foundItem) => foundItem.id !== item.id)
          );
          setFilteredItems((prevItems) =>
            prevItems.filter((foundItem) => foundItem.id !== item.id)
          );
          Alert.alert("Item Deleted Successfully");
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        Alert.alert("Failed to delete item");
      });
  };

  const handleEdit = (item) => {
    navigation.navigate("EditFoundItemScreen", {
      item,
      updateFoundItems: () => fetchFoundItems(token), // Pass the function that refreshes the found items list
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = foundItems.filter(
      (item) =>
        item.bus_Description.toLowerCase().includes(text.toLowerCase()) ||
        item.item_Description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.padding}>
          <Text style={styles.title}>Reported Found Items</Text>

          <CustomBlue
            placeholder="Search..."
            icon="search"
            onChangeText={handleSearch}
            value={searchQuery}
          />

          {filteredItems.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              {item.name && (
                <Text style={styles.label}>
                  Name: <Text style={styles.value}>{item.name}</Text>
                </Text>
              )}
              {item.mobile_Number && (
                <Text style={styles.label}>
                  Mobile Number:{" "}
                  <Text style={styles.value}>{item.mobile_Number}</Text>
                </Text>
              )}
              {item.bus_Description && (
                <Text style={styles.label}>
                  Bus Details:{" "}
                  <Text style={styles.value}>{item.bus_Description}</Text>
                </Text>
              )}
              {item.item_Description && (
                <Text style={styles.label}>
                  Description:{" "}
                  <Text style={styles.value}>{item.item_Description}</Text>
                </Text>
              )}
              {item.dateTime && (
                <Text style={styles.labelred}>
                  Posted on:{" "}
                  <Text style={styles.value}>{formatDate(item.dateTime)}</Text>
                </Text>
              )}
              <View style={styles.pad}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <View style={styles.icon}>
                    <Icon name="pencil" size={15} color="#132968" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <View style={styles.icon}>
                    <Icon name="trash" size={15} color="#132968" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    paddingTop: 5,
    color: "#132968",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderColor: "darkblue",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
  },
  labelred: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
    color: "red",
  },
  value: {
    fontWeight: "normal",
  },
  pad: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default FoundItemScreen;
