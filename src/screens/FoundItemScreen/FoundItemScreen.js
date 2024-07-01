import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import CustomBlue from '../../components/CustomBlue/Index';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

const FoundItemScreen = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchFoundItems();
  }, []);

  const fetchFoundItems = () => {
    fetch('http://192.168.179.137:8080/founds')
      .then(response => response.json())
      .then(data => {
        setFoundItems(data);
      })
      .catch(error => {
        console.error('Error fetching found items:', error);
      });
  };

  const formatDate = (dateTime) => {
    const options = { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric' 
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  const handleDelete = (item) => {
    fetch(`http://192.168.179.137:8080/found/${item.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        setFoundItems(foundItems.filter(foundItem => foundItem.id !== item.id));
        Alert.alert('Item Deleted Successfully');
      } else {
        throw new Error('Failed to delete item');
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      Alert.alert('Failed to delete item');
    });
  };

  const handleEdit = (item) => {
    navigation.navigate('EditFoundItemScreen', { 
      item, 
      updateFoundItems: fetchFoundItems // Pass the function that refreshes the found items list
    });
  };
  const handleSearch = text => {
    setSearchQuery(text);
    const filteredData = foundItems.filter(
      item =>
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

          {filteredItems.map(item => (
            <View key={item.id} style={styles.itemContainer}>
              {item.name && (
                <Text style={styles.label}>
                  Name: <Text style={styles.value}>{item.name}</Text>
                </Text>
              )}
              {item.mobile_Number && (
                <Text style={styles.label}>
                  Mobile Number: <Text style={styles.value}>{item.mobile_Number}</Text>
                </Text>
              )}
              {item.bus_Description && (
                <Text style={styles.label}>
                  Bus Details: <Text style={styles.value}>{item.bus_Description}</Text>
                </Text>
              )}
              {item.item_Description && (
                <Text style={styles.label}>
                  Description: <Text style={styles.value}>{item.item_Description}</Text>
                </Text>
              )}
              {item.dateTime && (
                <Text style={styles.labelred}>
                  Posted on: <Text style={styles.value}>{formatDate(item.dateTime)}</Text>
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
    color: '#132968',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderColor: 'darkblue',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  labelred: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'red',
  },
  value: {
    fontWeight: 'normal',
  },
  pad: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default FoundItemScreen;


