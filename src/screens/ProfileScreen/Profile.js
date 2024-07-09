import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, ImageBackground,useWindowDimensions } from "react-native";
import CustomInputProfile from "../../components/CustomInputProfile/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "@/config";
import { TouchableOpacity } from "react-native-gesture-handler";

const apiURL = Config.API_BASE_URL;

const Profile = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [role, setRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const isPassenger = role === "passenger";
  const [profileInfo, setProfileInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    id: "",
  });
  const [editData, setEditData] = useState({
    fname: "",
    lname: "",
    uname: "",
    email: "",
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      fname: profileInfo.fname,
      lname: profileInfo.lname,
      uname: profileInfo.uname,
      email: profileInfo.email,
    });
  };

  const handleSave = async (e) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${apiURL}/admin-user/update/${profileInfo.id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.warn("Saved");
      Alert.alert("Changed Saved");

      setProfileInfo(editData);
      setIsEditing(false);
    } catch (error) {
      console.warn(error);
      Alert.alert("Error Updating profile");
    }
  };

  const handleDelete = () => {
    navigation.navigate("VerifyPassword");
  };

  const getProfileInfo = async (e) => {
    const token = await AsyncStorage.getItem("token");
    const type = await AsyncStorage.getItem("role");
    setRole(type);
    console.log(type);
    try {
      const response = await axios.get(`${apiURL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileInfo({
        fname: response.data.fname,
        lname: response.data.lname,
        email: response.data.email,
        uname: response.data.uname,
        id: response.data.id,
      });
    } catch (error) {
      console.warn("Error fetching data");
    }
  };

  const handlePasswordChange = () => {
    navigation.navigate("ConfirmEmail");
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const onEditInput = (name, value) => {
    setEditData({ ...editData, [name]: value });
  };

  const isSaveButtonVisible = () => {
    return (
      editData.fname !== profileInfo.fname ||
      editData.lname !== profileInfo.lname ||
      editData.uname !== profileInfo.uname
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
            <View style={styles.profile }>
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
        </View>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <CustomInputProfile
          placeholder="First Name"
          value={isEditing ? editData.fname : profileInfo.fname}
          editable={isEditing}
          onChangeText={(text) => onEditInput("fname", text)}
        />

        <Text style={styles.label}>Last Name</Text>
        <CustomInputProfile
          placeholder="Last Name"
          value={isEditing ? editData.lname : profileInfo.lname}
          editable={isEditing}
          onChangeText={(text) => onEditInput("lname", text)}
        />

        <Text style={styles.label}>E-mail</Text>
        <CustomInputProfile
          placeholder="Email"
          value={profileInfo.email}
          editable={isEditing}
        />

        <Text style={styles.label}>User Name</Text>
        <CustomInputProfile
          placeholder="User Name"
          value={isEditing ? editData.uname : profileInfo.uname}
          editable={isEditing}
          onChangeText={(text) => onEditInput("uname", text)}
        />
        {isEditing && (
          <TouchableOpacity
            onPress={handlePasswordChange}
            style={styles.changePasswordContainer}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonsContainer}>
          {!isEditing && <CustomButton text="Edit" onPress={handleEdit} />}
          {isEditing && isSaveButtonVisible() && (
            <CustomButton text="Save" onPress={handleSave} />
          )}
          {isEditing && (
            <CustomButton text="Discard" onPress={() => setIsEditing(false)} />
          )}
          {isPassenger && (
            <CustomButton text="Delete Account" onPress={handleDelete} />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  changePasswordContainer: {
    alignSelf: "flex-end",
  },
  changePasswordText: {
    color: "red",
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

export default Profile;
