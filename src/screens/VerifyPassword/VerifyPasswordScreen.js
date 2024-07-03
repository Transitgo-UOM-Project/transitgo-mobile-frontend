import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Config from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiURL = Config.API_BASE_URL;

const ResetPassword = ({ route }) => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const tokenRes = await AsyncStorage.getItem('token');
      const emailRes = await AsyncStorage.getItem('email');
      setToken(tokenRes);
      setEmail(emailRes);
    };
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${apiURL}/deleteUser/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error deleting user");
    }
  };

  const onDeletePressed = async () => {
    try {
      const response = await axios.post(`${apiURL}/verifyPassword/${email}`, { password: password }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        
        Alert.alert(
          "Confirm Delete",
          "Are you sure you want to delete your account?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "OK",
              onPress: handleConfirmDelete
            }
          ],
          { cancelable: false }
        );
      }

    } catch (error) {
      console.error("Invalid Password:", error);
      Alert.alert("Invalid Password");
    }
  };

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.roothead}>
          <Text style={styles.title}>Password Verification</Text>
        </View>

        <Text style={styles.textt}>Password</Text>

        <CustomInput
          placeholder="Enter your Password"
          value={password}
          setValue={setPassword}
          icon="lock"
          secureTextEntry={true}
        />

        <CustomButton 
          text="Delete Account" 
          onPress={onDeletePressed} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  roothead: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#132968",
    margin: 10,
  },
  textt: {
    fontSize: 15,
    color: "#FA6B6B",
    paddingTop: 20,
    alignItems: "flex-start",
  },
});

export default ResetPassword;
