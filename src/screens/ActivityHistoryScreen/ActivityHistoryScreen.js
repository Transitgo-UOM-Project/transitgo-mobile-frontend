import React, { useState, useEffect } from "react";
import Config from "../../../config";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInputProfile from "@/src/components/CustomInputProfile/CustomInputProfile";

const apiUrl = Config.API_BASE_URL;

const ActivityHistoryScreen = () => {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const getStoredDetails = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedId = await AsyncStorage.getItem("id");
        setToken(storedToken);
        setId(storedId);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getStoredDetails();
  }, []);

  useEffect(() => {
    if (token && id) {
      loadActivityLogs();
    }
  }, [token, id]);

  const loadActivityLogs = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/user/${id}/activity-logs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setActivityLog(response.data.activityLogList || []);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    }
  };

  const handleDelete = async (type, activityId) => {
    try {
      let response;
      if (type === "Announcement") {
        response = await axios.delete(`${apiUrl}/announcement/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "Lost Item") {
        response = await axios.delete(`${apiUrl}/lost/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "Found Item") {
        response = await axios.delete(`${apiUrl}/found/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (type === "Package") {
        response = await axios.delete(`${apiUrl}/package/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      loadActivityLogs();
      Alert.alert("Activity Deleted");
    } catch (error) {
      console.error("Error deleting the Activity:", error);
    }
  };

  const handleEditClick = (activity) => {
    setIsEditing(activity.activityId);
    setEditDescription(activity.description);
  };

  const handleSaveEdit = async (activity) => {
    const type = activity.activityType;
    try {
      if (type === "Lost Item") {
        const itemResponse = await axios.get(
          `${apiUrl}/lost/${activity.activityId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const updatedLostFound = {
          ...itemResponse.data,
          item_Description: editDescription,
          dateTime: itemResponse.data.dateTime || new Date().toISOString(),
        };
        await axios.put(
          `${apiUrl}/lost/${activity.activityId}`,
          updatedLostFound,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (type === "Found Item") {
        const itemResponse = await axios.get(
          `${apiUrl}/found/${activity.activityId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const updatedLostFound = {
          ...itemResponse.data,
          item_Description: editDescription,
          dateTime: itemResponse.data.dateTime || new Date().toISOString(),
        };
        await axios.put(
          `${apiUrl}/found/${activity.activityId}`,
          updatedLostFound,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else if (type === "Announcement") {
        await axios.put(
          `${apiUrl}/announcement/${activity.activityId}`,
          {
            details: editDescription,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        console.warn("No Response Found");
      }
      loadActivityLogs();
      setIsEditing(null);
      Alert.alert("Activity Updated");
    } catch (error) {
      console.error("Error updating the Activity:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "red";
      case "Received":
        return "blue";
      case "Completed":
        return "green";
      default:
        return "#000";
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ScrollView style={styles.container}>
          <View style={styles.profile}>
            <Text style={styles.proftex}></Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <ImageBackground
                source={require("../../../assets/images/profile.jpeg")}
                style={{ width: 50, height: 50 }}
                imageStyle={{
                  borderRadius: 24,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              ></ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.pad}>
            {activityLog.length > 0 ? (
              activityLog.map((activity) => (
                <View key={activity.id} style={styles.itemContainer}>
                  <Text style={styles.label}>
                    {activity.activityType}
                    {activity.activityType === "Package" && (
                      <Text style={styles.label}>- {activity.activityId}</Text>
                    )}
                  </Text>
                  {isEditing === activity.activityId ? (
                    <CustomInputProfile
                      value={editDescription}
                      onChangeText={(text) => setEditDescription(text)}
                    />
                  ) : (
                    <Text style={styles.value}>
                      {activity.description} {activity.info}
                    </Text>
                  )}
                  <Text style={styles.labelred}>
                    Posted On:{" "}
                    <Text>{new Date(activity.dateTime).toLocaleString()}</Text>
                  </Text>
                  <View style={styles.card}>
                    {activity.activityType !== "Package" ? (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            handleDelete(
                              activity.activityType,
                              activity.activityId
                            )
                          }
                        >
                          <View style={styles.icon}>
                            <Icon name="trash" size={15} color="#132968" />
                          </View>
                        </TouchableOpacity>
                        {isEditing === activity.activityId ? (
                          <TouchableOpacity
                            onPress={() => handleSaveEdit(activity)}
                          >
                            <View style={styles.icon}>
                              <Text>Save</Text>
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleEditClick(activity)}
                          >
                            <View style={styles.icon}>
                              <Icon name="pencil" size={15} color="#132968" />
                            </View>
                          </TouchableOpacity>
                        )}
                      </>
                    ) : (
                      <CustomButton
                        style={{
                          ...styles.btn,
                          backgroundColor: getStatusColor(activity.pacStatus),
                        }}
                        text={activity.pacStatus}
                      />
                    )}
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.no}>No Activity Found</Text>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
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
  statusButton: {
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  statusButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  no: {
    textAlign: "center",
    fontSize: "2rem",
    opacity: "0.5",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    marginTop: 20,
  },
  proftex: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ActivityHistoryScreen;
