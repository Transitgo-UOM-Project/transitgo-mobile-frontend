
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from "react-native";
import Header from "../../components/Header/Index";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = Config.API_BASE_URL;

const Announcement = () => {
  const [ann, setAnn] = useState("");
  const [annlist, setAnnlist] = useState([]);
  const [editlist, setEditlist] = useState(null);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const email = await AsyncStorage.getItem('email');
        const role = await AsyncStorage.getItem('role');
        setToken(token);
        setEmail(email);
        setRole(role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [token]);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${apiUrl}/announcements`);
      setAnnlist(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const onbutPressed = async () => {
    if (ann === "") {
      Alert.alert("Announcement cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/announcement`, {
        details: ann,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnlist([...annlist, response.data]);
      setAnn("");
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const onEdit = (ann) => {
    setEditlist(ann);
    setAnn(ann.details);
  };

  const onUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/announcement/${editlist.id}`, {
        details: ann,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedAnn = annlist.map((item) => {
        if (item.id === editlist.id) {
          return { ...item, details: ann };
        }
        return item;
      });
      setAnnlist(updatedAnn);
      setEditlist(null);
      setAnn("");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/announcement/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedDelete = annlist.filter((ann) => ann.id !== id);
      setAnnlist(updatedDelete);
      Alert.alert("Announcement deleted successfully.");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      Alert.alert("Failed to delete announcement.");
    }
  };

  const renderAnn = ({ item }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listText}>{item.details}</Text>
        <View style={styles.iconSpacer} />
        <Icon
          name="pencil"
          size={15}
          color="#132968"
          onPress={() => onEdit(item)}
        />
        <View style={styles.iconSpacer} />
        <Icon
          name="trash"
          size={15}
          color="#132968"
          onPress={() => onDelete(item.id)}
        />
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
            setValue={setAnn}
          />
          {editlist ? (
            <CustomButton text="Save" onPress={onUpdate} />
          ) : (
            <CustomButton text="Submit Post" onPress={onbutPressed} />
          )}
          <FlatList data={annlist} renderItem={renderAnn} keyExtractor={(item) => item.id.toString()} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  list: {
    backgroundColor: "#9bedfd33",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  listText: {
    color: "#132968",
    fontSize: 17,
    flex: 1,
  },
  iconSpacer: {
    width: 10,
  },
});

export default Announcement;
