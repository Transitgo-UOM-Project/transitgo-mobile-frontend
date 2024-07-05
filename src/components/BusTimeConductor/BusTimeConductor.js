import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Picker,
  Modal,
} from 'react-native';
import axios from 'axios';
import CustomButton from '../CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import Config from '../../../config';

const apiUrl = Config.API_BASE_URL;

function BusTimeConductor({busID, busRegNo, routeNo, direction}) {
  const [schedules, setSchedules] = useState([]);
  const [fromSchedule, setFromSchedule] = useState(null);
  const [toSchedule, setToSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [updateLocationInterval, setUpdateLocationInterval] = useState(null);

  const [journeyStarted, setJourneyStarted] = useState(false);
  const [allStops, setAllStops] = useState([]);
  const [requiredStopLocations, setRequiredStopLocations] = useState([]);

  const [delay, setDelay] = useState();
  const delayRef = useRef(null);
  const nextStopRef = useRef(null);
  const [lastLeftStop, setLastLeftStop] = useState('');
  const [nextLocation, setNextLocation] = useState('');

  const token = localStorage.getItem('token');
  const navigation = useNavigation();

  useEffect(() => {
    function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    function failure(position) {
      console.log('failed to get location');
    }

    navigator.geolocation.getCurrentPosition(success, failure);
  }, []);

  //SEND LOCATION
  const updateLocation = async () => {
    async function success(position) {
      const response = await axios.put(
        `http://localhost:8080/busLocation/${busID}`,
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      console.log(
        'location updated to',
        position.coords.latitude,
        position.coords.longitude,
      );
    }

    function failure(position) {
      console.log('failed to get location');
    }

    navigator.geolocation.getCurrentPosition(success, failure);
  };

  const onJourneyStart = () => {
    let curUpdateLocationInterval = setInterval(updateLocation, 2000);

    setUpdateLocationInterval(curUpdateLocationInterval);

    setJourneyStarted(true);
  };
  const onJourneyEnd = () => {
    clearInterval(updateLocationInterval);

    setJourneyStarted(false);
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      console.log(1111111111);
      try {
        const response = await axios.get(
          `http://localhost:8080/bus/${busID}/stops`,
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        ); //Schedules of the current bus
        //console.log("fetched scheduled for the selected bus ", response.data);
        //console.log("stop:", stops);
        let stops = response.data.map(stop => {
          return {
            stop: stop['busStop']['name'],
            arraivalTime: stop['arrivalTime'],
            departureTime: stop['departureTime'],
          };
        });
        console.log('all stops', stops);
        console.log('response data', response.data);
        setAllStops(stops);
        setSchedules(response.data);
        console.log('schedulessssssss', response.data);
      } catch (error) {
        setError('Error fetching bus schedules.');
        console.error('Error fetching bus schedules:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [busID]);

  useEffect(() => {
    console.log('requiredStopLocations state updated:', requiredStopLocations);
  }, [requiredStopLocations]);

  useEffect(() => {
    const fetchStopLocations = async () => {
      try {
        if (allStops.length) {
          console.log(allStops);
          const response = await axios.get(
            `http://localhost:8080/busstoplocations`,
            {
              headers: {Authorization: `Bearer ${token}`},
            },
          ); //Schedules of the current bus
          //console.log("fetched scheduled for the selected bus ", response.data);
          console.log('all stops in fetchStopLocations', allStops);
          let requiredStopLocationsArr = response.data.filter(location => {
            for (let i = 0; i < allStops.length; i++) {
              if (allStops[i].stop === location.location) {
                return location.location;
              }
            }
          });
          if (direction === 'down') {
            requiredStopLocationsArr.reverse();
          }
          console.log('required StopLocations', requiredStopLocationsArr);
          setRequiredStopLocations(requiredStopLocationsArr);
          console.log(requiredStopLocations);
          console.log('yessssss');
        }
      } catch (error) {
        setError('Error fetching bus schedules.');
        console.error('Error fetching bus schedules:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStopLocations();
  }, [allStops]);

  // //RETRIEVE LOCATION

  //function for getting distance between two locations
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = degree => degree * (Math.PI / 180);

    const R = 6371e3; // Earth radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  }

  //checking is it exist withing the range
  function isWithinRadius(lat1, lon1, lat2, lon2, radius = 500) {
    const distance = haversineDistance(lat1, lon1, lat2, lon2);
    return distance <= radius;
  }

  function getAbsoluteDifferenceInMilliseconds(targetTime) {
    const now = new Date();

    const [targetHour, targetMinute, targetSecond] = targetTime
      .split(':')
      .map(Number);
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      targetHour,
      targetMinute,
      targetSecond,
    );

    const differenceInMilliseconds = targetDate - now;
    const absoluteDifferenceInMilliseconds = Math.abs(differenceInMilliseconds);

    return {
      difference: differenceInMilliseconds,
      absoluteDifference: absoluteDifferenceInMilliseconds,
    };
  }

  function convertMillisecondsToMinutesSeconds(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}`;
  }

  const retrieveLocation = async () => {
    const response = await axios.get(`http://localhost:8080/bus/${busID}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    console.log(
      'current loaction of the bus is ',
      response.data.latitude,
      response.data.longitude,
    );

    let curRetrievedLatitude = response.data.latitude;
    let curRetrievedLongitude = response.data.longitude;

    console.log(
      'curRetrieved Latitude Longtitude ',
      curRetrievedLatitude,
      curRetrievedLongitude,
    );
    console.log('requiredStopLocations before for loop', requiredStopLocations);
    console.log('Schedules', schedules);

    if (
      requiredStopLocations.length &&
      curRetrievedLatitude &&
      curRetrievedLongitude
    ) {
      requiredStopLocations.forEach(async (requiredStopLocation, index) => {
        const isWithin = isWithinRadius(
          requiredStopLocation.latitude,
          requiredStopLocation.longitude,
          7.291006007978523,
          80.63436016153199,
          // ,curRetrievedLatitude,
          // curRetrievedLongitude
        );

        if (isWithin) {
          console.log(
            `Location ${
              requiredStopLocation.location
            } is within ${500} meters of Your current location `,
          );

          let delayTimeInMilliSecondsObj = filteredSchedules
            .filter(stop => stop.busStop.name === requiredStopLocation.location)
            .map(stop => {
              let arrivalOrDepartureTime =
                stop.arrivalTime || stop.departureTime;
              return getAbsoluteDifferenceInMilliseconds(
                arrivalOrDepartureTime,
              );
            })
            .sort((a, b) => a.absoluteDifference - b.absoluteDifference)[0];
          console.log('hi');
          if (delayTimeInMilliSecondsObj.difference < 0) {
            let delayTimeInMinutes = convertMillisecondsToMinutesSeconds(
              delayTimeInMilliSecondsObj.absoluteDifference,
            );

            console.log('delay is ', delayTimeInMinutes);
            delayRef.current = delayTimeInMinutes;
            setDelay(delayTimeInMinutes);
          } else {
            console.log('No delay');
            setDelay('0');
            delayRef.current = '0';
          }

          setLastLeftStop(requiredStopLocation.location);

          console.log('index ', index);
          console.log(
            'requiredStopLocation.length - 1 ',
            requiredStopLocations.length - 1,
          );
          console.log('if condition', index < requiredStopLocations.length - 1);

          if (index < requiredStopLocations.length - 1) {
            nextStopRef.current = requiredStopLocations[index + 1].location;
            setNextLocation(requiredStopLocations[index + 1].location);
          } else {
            console.log('elseee next location ', nextLocation);
            nextStopRef.current = 'End of the Stop';
            setNextLocation('End of the Stop');
          }

          try {
            console.log('delay inside ', delayRef.current);

            const postResponse = await axios.post(
              `http://localhost:8080/bus`,
              {
                id: busID,
                delay: delayRef.current,
                lastLeftStop: requiredStopLocation.location,
                nextLocation: nextStopRef.current,
              },
              {
                headers: {Authorization: `Bearer ${token}`},
              },
            );
            console.log(
              'Updated bus management successfully.',
              postResponse.data,
            );
          } catch (postError) {
            console.error('Error updating bus management:', postError.message);
          }
        } else {
          console.log(
            `Location ${
              requiredStopLocation.location
            } is not within ${500} meters of Your current location`,
          );
        }
      });
    }
  };

  function scheduleTasks(startEndTimes, startTaskFunction, endTaskFunction) {
    const now = new Date();
    console.log(startEndTimes);
    const {startTime, endTime} = startEndTimes;

    const [startHour, startMinute, startSecond] = '11:12:13' //startTime
      .split(':')
      .map(Number);
    const [endHour, endMinute, endSecond] = '18:12:13'.split(':').map(Number); //endTime.split(":").map(Number);

    let startDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond,
      0,
    );
    let endDateTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond,
      0,
    );

    // If the end time is in the past today, schedule for tomorrow
    if (endDateTime < startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    const startDelay = startDateTime - now;
    const endDelay = endDateTime - now;

    console.log(
      `Start task scheduled to start at ${startDateTime} which is after ${startDelay} milliseconds`,
    );
    console.log(
      `End task scheduled to end at ${endDateTime} which is after ${endDelay} milliseconds`,
    );

    setTimeout(() => {
      startTaskFunction();
      setTimeout(endTaskFunction, endDelay - startDelay);
    }, startDelay);
  }

  // // Example task functions
  function startTask() {
    console.log('Start task executed at', new Date());
    const curRetrieveLocationInterval = setInterval(retrieveLocation, 15000);
    setRetrieveLocationInterval(curRetrieveLocationInterval);
  }

  function endTask() {
    console.log('Start task ended at', new Date());
    clearInterval(retrieveLocationInterval);
  }

  // // Example start and end times array (24-hour format with seconds)
  const startEndTimes = {startTime: undefined, endTime: undefined};

  // Schedule the tasks to start and end at each specified time

  useEffect(() => {
    console.log('Schedules', schedules);
    if (schedules.length > 0) {
      const filteredSchedules = schedules.filter(
        schedule => schedule.direction === direction,
      );
      console.log('filtered schedule', filteredSchedules);
      const filteredStopTimes = filteredSchedules.map(schedule => {
        return {
          arrivalTime: schedule.arrivalTime,
          departureTime: schedule.departureTime,
          busStop: schedule.busStop,
        };
      });

      console.log('filteredStopTimes:', filteredStopTimes);

      const startEndTimes = {
        startTime: filteredStopTimes[0].departureTime,
        endTime: filteredStopTimes[filteredStopTimes.length - 1].arrivalTime,
      };
      if (requiredStopLocations.length)
        scheduleTasks(startEndTimes, startTask, endTask);
      setFromSchedule(filteredStopTimes[0].busStop.name);
      setToSchedule(
        filteredStopTimes[filteredStopTimes.length - 1].busStop.name,
      );
    }
  }, [schedules, requiredStopLocations]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const filteredSchedules = schedules.filter(
    schedule => schedule.direction === direction,
  );

  if (!fromSchedule || !toSchedule) {
    return <Text>No schedule available for the selected route.</Text>;
  }

  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.card}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Bus: {busRegNo}</Text>
        <Text style={styles.headerText}>Route No: {routeNo}</Text>
      </View>
      <View style={styles.middleBar}>
        <View>
          <Text style={styles.labelText}>From:</Text>
          <Text style={styles.infoText}>{fromSchedule}</Text>
        </View>
        <View>
          <Text style={styles.labelText}>To:</Text>
          <Text style={styles.infoText}>{toSchedule}</Text>
        </View>
      </View>
      <View style={styles.footerBar}>
        <View style={styles.footerItem2}>
          <Text style={styles.footerText}>Get off from {lastLeftStop}</Text>
        </View>
        <View>
          <Picker
            style={styles.picker}
            selectedValue={filteredSchedules[0]?.busStop.name}>
            {filteredSchedules.map((schedule, index) => (
              <Picker.Item
                key={index}
                label={
                  index === 0
                    ? `${schedule.busStop.name} - Departure: ${schedule.departureTime}`
                    : `${schedule.busStop.name} - Arrival: ${schedule.arrivalTime}`
                }
                value={schedule.busStop.name}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.footerItem}>
          <Text style={styles.delayText}>Delay: {delay}min</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {opacity: journeyStarted ? 0.5 : 1}]}
          onPress={onJourneyStart}
          disabled={journeyStarted}>
          <Text style={styles.buttonText}>Start Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {opacity: journeyStarted ? 1 : 0.5}]}
          onPress={onJourneyEnd}
          disabled={!journeyStarted}>
          <Text style={styles.buttonText}>End Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#bbdfea',
    shadowColor: '#abb6ba',
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E2772',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    color: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 15,
  },
  middleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },

  labelText: {
    fontSize: 15,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E2772',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    color: 'white',
  },
  footerItem: {
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#ff0000',
    borderRadius: 3,
  },
  footerItem2: {
    padding: 5,
    fontWeight: 'bold',
    backgroundColor: '#90EE90',
    borderRadius: 3,
  },
  footerText: {
    padding: 2,
    color: 'black',
  },
  picker: {
    width: 250,
    height: 40,
    backgroundColor: 'white',
  },
  delayText: {
    padding: 6,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'hsl(0, 93%, 70%)',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default BusTimeConductor;
