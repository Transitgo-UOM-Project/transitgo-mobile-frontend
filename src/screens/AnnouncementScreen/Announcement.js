import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../../components/Header/Index';
import CustomInput from '@/src/components/CustomInput/Index';
import CustomButton from '@/src/components/CustomButton/Index';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = Config.API_BASE_URL;

const Announcement = () => {
  const [ann, setAnn] = useState('');
  const [annlist, setAnnlist] = useState([]);
  const [editlist, setEditlist] = useState(null);

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const Authorization = {
    headers: {Authorization: `Bearer ${token}`},
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      const role = await AsyncStorage.getItem('role');
      setToken(token);
      setEmail(email);
      setRole(role);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${apiUrl}/announcements`);
      setAnnlist(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const onbutPressed = async () => {
    if (ann === '') {
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/announcement`,
        {
          details: ann,
        },
        Authorization,
      );
      setAnnlist([...annlist, response.data]);
      setAnn('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const onEdit = ann => {
    if (ann.createdBy === email) {
      setEditlist(ann);
      setAnn(ann.details);
    } else {
      Alert.alert('You can only edit your own announcements.');
    }
  };

  const onUpdate = async () => {
    try {
      await axios.put(
        `${apiUrl}/announcement/${editlist.id}`,
        {
          details: ann,
        },
        Authorization,
      );
      const updatedAnn = annlist.map(item => {
        if (item.id === editlist.id) {
          return {...item, details: ann};
        }
        return item;
      });
      setAnnlist(updatedAnn);
      setEditlist(null);
      setAnn('');
    } catch (error) {
      console.error('Error updating announcement:', error);
    }
  };

  const onDelete = async id => {
    const announcement = annlist.find(ann => ann.id === id);
    if (role === 'admin' || announcement.createdBy === email) {
      try {
        await axios.delete(`${apiUrl}/announcement/${id}`, Authorization);
        const updatedDelete = annlist.filter(ann => ann.id !== id);
        setAnnlist(updatedDelete);
        Alert.alert('Announcement deleted successfully.');
      } catch (error) {
        console.error('Error deleting announcement:', error);
        Alert.alert('Failed to delete announcement.');
      }
    } else {
      Alert.alert(
        'You can only delete your own announcements or if you are an admin.',
      );
    }
  };

  const renderAnn = ({item}) => {
    return (
      <View
        style={[
          styles.list,
          item.createdByRole === 'admin' ? styles.adminPost : styles.userPost,
        ]}>
        <Text style={styles.listText}>{item.details}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.iconContainer}>
            {item.createdBy === email && (
              <>
                <Icon
                  name="pencil"
                  size={15}
                  color="#132968"
                  onPress={() => onEdit(item)}
                />
                <View style={styles.iconSpacer} />
              </>
            )}
            {(role === 'admin' || item.createdBy === email) && (
              <Icon
                name="trash"
                size={15}
                color="#132968"
                onPress={() => onDelete(item.id)}
              />
            )}
          </View>
          <View
            style={[
              styles.authorDetails,
              item.createdByRole === 'admin'
                ? styles.adminPostt
                : styles.userPostt,
            ]}>
            <Text style={styles.authorText}>Posted by : {item.user}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header text="Announcement" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <CustomInput
            placeholder="Add Announcement"
            value={ann}
            setValue={userText => setAnn(userText)}
          />
          {editlist ? (
            <CustomButton text="Save" onPress={onUpdate} />
          ) : (
            <CustomButton text="Submit Post" onPress={onbutPressed} />
          )}
          <FlatList data={annlist} renderItem={renderAnn} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  list: {
    backgroundColor: '#9bedfd33',
    paddingHorizontal: 8,
    paddingVertical: 12,
    margin: 5,
  },
  adminPost: {
    backgroundColor: '#00c3ff',
  },
  userPost: {
    backgroundColor: '#e1f5fe',
  },
  listText: {
    color: '#132968',
    fontSize: 17,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  authorDetails: {
    backgroundColor: '#ff6f61',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: '12rem',
  },
  adminPostt: {
    backgroundColor: '#c40303e0',
    color: 'white',
  },
  userPostt: {
    backgroundColor: '#fa6b6b',
    color: '#132968',
  },
  authorText: {
    color: '#fff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacer: {
    width: 10,
  },
});

export default Announcement;
