import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

function FormConductor() {
  const [pack, setPack] = useState({
    packageID: '',
    status: '',
  });

  const [pacDet, setPacDet] = useState([]);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const loadTokenAndId = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedId = await AsyncStorage.getItem('id');
      setToken(storedToken);
      setId(storedId);
    };

    loadTokenAndId().then(() => {
      if (token && id) {
        loadPackageDetails();
      }
    });
  }, [token, id]);

  const { packageID, status } = pack;

  const onInputChange = (key, value) => {
    setPack({ ...pack, [key]: value });
  };

  const loadPackageDetails = async () => {
    try {
      const packages = await axios.get('http://localhost:8080/packages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const packageArray = packages.data || [];
      const filteredPackages = packageArray.filter(
        (pac) => String(pac.employeeId) === String(id)
      );
      setPacDet(filteredPackages);
    } catch (error) {
      console.log('Error loading packages', error);
    }
  };

  const onSubmitPack = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/package/${packageID}`, pack, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setPack({
        packageID: "",
        status: "",
      });
      loadPackageDetails();
    } catch (error) {
      Alert.alert('Package is not available', error.message);
    }
  };

  const clearForm = () => {
    setPack({
      packageID: '',
      status: '',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Booked':
        return 'red';
      case 'Received':
        return 'blue';
      case 'Completed':
        return 'green';
      default:
        return '#000';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Receive / Transfer Package</Text>
      <TextInput
        style={styles.input}
        placeholder="Package ID"
        value={packageID}
        editable={false}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => onInputChange('status', itemValue)}
        >
          <Picker.Item label="Received" value="Received" />
          <Picker.Item label="Completed" value="Completed" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={onSubmitPack} />
        <Button title="Clear" onPress={clearForm} />
      </View>
      <View style={styles.packageList}>
        {pacDet.length > 0 ? (
          pacDet.map((pac) => (
            <TouchableOpacity
              key={pac.packageID}
              style={styles.packageItem}
              onPress={() =>
                setPack({
                  packageID: pac.packageID,
                  status: pac.status,
                })
              }
            >
              <Text style={styles.packageText}>Package ID: {pac.packageID}</Text>
              <Text style={styles.packageText}>
                {pac.start} - {pac.destination}
              </Text>
              <Text style={styles.packageText}>{pac.receiverName}</Text>
              <Text style={[styles.packageText, { color: '#FA6B6B' }]}>
                {pac.receiverContact}
              </Text>
              <Text
                style={[
                  styles.packageText,
                  { backgroundColor: getStatusColor(pac.status), color: 'white' },
                ]}
              >
                {pac.status}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noPackageText}>No Package Found</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  packageList: {
    marginTop: 20,
  },
  packageItem: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  packageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noPackageText: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default FormConductor;
