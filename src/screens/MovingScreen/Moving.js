import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import CustomInput from '@/src/components/CustomInput/Index';
import CustomButton from '@/src/components/CustomButton/Index';
import DatePic from '@/src/components/DatePic/Index';
import PickerStops from '../../components/PickerStops/Index';
import PickerBuses from '../../components/PickerBuses/Index';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const Moving = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [number, setNumber] = useState('');
  const [from, setFrom] = useState(null);
  const [fromOrderIndex, setFromOrderIndex] = useState(null);
  const [to, setTo] = useState(null);
  const [toOrderIndex, setToOrderIndex] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (submitAttempted) {
      validateForm();
    }
  }, [name, id, number, from, to, date, selectedBus]);

  const validateForm = () => {
    const newErrors = {};

    if (!from) {
      newErrors.from = 'From location is required.';
    }

    if (!to) {
      newErrors.to = 'To location is required.';
    }

    if (!date) {
      newErrors.date = 'Date is required.';
    }

    if (!selectedBus) {
      newErrors.selectedBus = 'Bus selection is required.';
    }

    if (!name) {
      newErrors.name = 'Receiver name is required.';
    } else if (/\d/.test(name)) {
      newErrors.name = 'Receiver name cannot contain numbers.';
    }

    if (!number) {
      newErrors.number = 'Receiver contact number is required.';
    } else if (!/^\d{9,10}$/.test(number)) {
      newErrors.number = 'Receiver contact number must be 9 or 10 digits.';
    }

    if (!id) {
      newErrors.id = 'Receiver ID is required.';
    } else if (!/^\d{12}$/.test(id) && !/^\d{9}[vV]$/.test(id)) {
      newErrors.id =
        "Receiver ID must be 12 digits or 9 digits followed by 'V'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onConfirmPressed = async () => {
    setSubmitAttempted(true);

    if (!validateForm()) {
      Alert.alert('Failed', 'Please fill all the fields correctly.');
      return;
    }

    const pack = {
      busID: selectedBus,
      destination: to,
      payment: '',
      receivedDate: date,
      start: from,
      status: '',
      receiverName: name,
      receiverContact: number,
      receiverNIC: id,
    };

    try {
      const response = await axios.post(
        "http://192.168.8.160192.168.8.104:8080/package",
        pack
      );
      if (response.status === 200) {
        Alert.alert('Success', 'Booking confirmed!');
        navigation.navigate('PackageScreen');
      } else {
        Alert.alert('Error', 'Failed to confirm booking. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      Alert.alert('Error', 'Failed to confirm booking. Please try again.');
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
        {submitAttempted && errors.from && (
          <Text style={styles.error}>{errors.from}</Text>
        )}
        <PickerStops
          placeholder="To"
          onSelect={(value, orderIndex) => {
            setTo(value);
            setToOrderIndex(orderIndex);
          }}
        />
        {submitAttempted && errors.to && (
          <Text style={styles.error}>{errors.to}</Text>
        )}
        <DatePic onDateChange={selectedDate => setDate(selectedDate)} />
        {submitAttempted && errors.date && (
          <Text style={styles.error}>{errors.date}</Text>
        )}
        <PickerBuses
          from={from}
          to={to}
          date={date}
          fromOrderIndex={fromOrderIndex}
          toOrderIndex={toOrderIndex}
          onSelectBus={busID => setSelectedBus(busID)}
        />
        {submitAttempted && errors.selectedBus && (
          <Text style={styles.error}>{errors.selectedBus}</Text>
        )}
        <CustomInput
          placeholder="Receiver Name"
          value={name}
          setValue={setName}
          icon="user"
        />
        {submitAttempted && errors.name && (
          <Text style={styles.error}>{errors.name}</Text>
        )}
        <CustomInput
          placeholder="Receiver Id"
          value={id}
          setValue={setId}
          icon="pencil"
        />
        {submitAttempted && errors.id && (
          <Text style={styles.error}>{errors.id}</Text>
        )}
        <CustomInput
          placeholder="Receiver Contact Number"
          value={number}
          setValue={setNumber}
          icon="phone"
        />
        {submitAttempted && errors.number && (
          <Text style={styles.error}>{errors.number}</Text>
        )}
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
    fontWeight: 'bold',
    fontSize: 32,
    color: '#132968',
    paddingBottom: 10,
    paddingTop: 15,
    justifyContent: 'center',
  },
  safe: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});

export default Moving;
