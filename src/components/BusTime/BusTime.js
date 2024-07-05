import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import CustomButton from '../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Config from '../../../config';

const apiUrl = Config.API_BASE_URL;

function BusTime({
  busID,
  busRegNo,
  routeNo,
  fromStop,
  toStop,
  direction,
  date,
}) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`${apiUrl}/bus/${busID}/stops`);
        setSchedules(response.data);
      } catch (error) {
        setError('Error fetching bus schedules.');
        console.error('Error fetching bus schedules:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} Hours and ${minutes} Minutes`;
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const filteredSchedules = schedules.filter(
    schedule => schedule.direction === direction,
  );

  const fromSchedule = filteredSchedules.find(
    schedule => schedule.busStop.name === fromStop,
  );
  const toSchedule = filteredSchedules.find(
    schedule => schedule.busStop.name === toStop,
  );

  if (!fromSchedule || !toSchedule) {
    return;
  }

  const fromTime = fromSchedule.departureTime;
  const toTime = toSchedule.arrivalTime;

  return (
    <View style={styles.container}>
      <View style={styles.blueUp}>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Bus ID: </Text>
          <Text style={styles.midTextW}>{busRegNo}</Text>
        </View>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Route No: </Text>
          <Text style={styles.midTextW}>{routeNo}</Text>
        </View>
      </View>
      <View style={styles.mid}>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>From</Text>
            <Text style={styles.midText}>{fromStop}</Text>
            <Text style={styles.midText}>{fromTime}</Text>
          </View>
        </View>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Duration</Text>
            <Text style={styles.midText}>
              {calculateDuration(fromTime, toTime)}
            </Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Date</Text>
            <Text style={styles.midText}>{date}</Text>
          </View>
        </View>
        <View style={styles.midLeft}>
          <View style={styles.downsub}>
            <Text style={styles.smallText}>To</Text>
            <Text style={styles.midText}>{toStop}</Text>
            <Text style={styles.midText}>{toTime}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.blueDown}>
          <View style={styles.greendown}>
            <Text style={styles.smallText}>Got Off at:</Text>
            <Text style={styles.midText}>08.00</Text>
          </View>
          <View>
            <CustomButton
              type="white"
              text="Dropping Points"
              onPress={() => setModalVisible(true)}
            />
            <CustomButton
              type="white"
              text="Reviews & Ratings"
              onPress={() => navigation.navigate('ReviewsRatings', {busID})}
            />
          </View>
          <View style={styles.reddown}>
            <Text style={styles.smallText}>Delay:</Text>
            <Text style={styles.midText}>10 min</Text>
          </View>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Dropping Points</Text>
            <ScrollView>
              {filteredSchedules.map((schedule, index) => (
                <View key={index} style={styles.scheduleItem}>
                  <Text style={styles.scheduleText}>
                    {index === 0
                      ? `${schedule.busStop.name} - Departure: ${schedule.departureTime}`
                      : `${schedule.busStop.name} - Arrival: ${schedule.arrivalTime}`}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,

    flexDirection: 'column',
    backgroundColor: '#bbdfea',
    shadowColor: '#abb6ba',
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 1,
  },
  blueUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E2772',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  blueDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E2772',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'white',
  },
  upId: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  midCon: {
    padding: 3,
  },
  midLeft: {
    alignItems: 'flex-end',
  },
  downsub: {
    alignItems: 'flex-end',
    padding: 3,
  },
  greendown: {
    backgroundColor: '#90ee90',
    borderRadius: 3,
    padding: 5,
  },
  reddown: {
    alignItems: 'flex-end',
    backgroundColor: '#ff0000',
    borderRadius: 3,
    padding: 5,
  },
  smallText: {
    fontSize: 10,
  },
  midText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  smallTextW: {
    fontSize: 10,
    color: 'white',
  },
  midTextW: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scheduleItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  scheduleText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1E2772',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BusTime;
