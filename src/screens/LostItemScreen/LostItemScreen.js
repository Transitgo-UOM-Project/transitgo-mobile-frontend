import React, { useState, useEffect } from "react";
import Config from "../../../config";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import CustomBlue from "../../components/CustomBlue/Index";
import Icon from "react-native-vector-icons/FontAwesome";

const apiUrl = Config.API_BASE_URL;

const LostItemScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { list } = route.params || {};

  const [lostItems, setLostItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [token, setToken] = useState('');
  const Authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = () => {
    fetch(`${apiUrl}/losts`)
      .then((response) => response.json())
      .then((data) => {
        setLostItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        console.error("Error fetching lost items:", error);
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
    fetch(`${apiUrl}/lost/${item.id}`, {
      method: "DELETE",
    },Authorization)
      .then((response) => {
        if (response.ok) {
          setLostItems(lostItems.filter((lostItem) => lostItem.id !== item.id));
          setFilteredItems(
            filteredItems.filter((lostItem) => lostItem.id !== item.id)
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
    navigation.navigate("EditLostItemScreen", {
      item,
      updateLostItems: fetchLostItems,
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = lostItems.filter(
      (item) =>
        item.bus_Description.toLowerCase().includes(text.toLowerCase()) ||
        item.item_Description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filteredData);
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.pad}>
          <Text style={styles.title}>Reported Lost Items</Text>
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
              <View style={styles.card}>
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
  pad: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    color: "#132968",
    paddingTop: 5,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderColor: "red",
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
  card: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default LostItemScreen;
