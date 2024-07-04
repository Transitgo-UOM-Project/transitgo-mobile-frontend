import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Config from "@/config";


const apiURL = Config.API_BASE_URL;

const ResetPassword = ({route}) => {
  const [password, setPassword] = useState("");
  const email  = route.params.email;
  
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onConfirmPressed = async () => {
    try{
      const response = await axios.post(`${apiURL}/api/v1/auth/new-password`,null,{params: {email,password}});
      const responseStatus = response.data.message;
      console.log(responseStatus);
      if (responseStatus === "Password Saved"){
        Alert.alert("Password Updated");
        navigation.navigate("SignIn");
     }else if (responseStatus === "User does not exist"){
        console.log("User does not exist");
        Alert.alert("User does not exist");
     }else{
        console.log("Error occurred while updating password");
        Alert.alert("Error occurred while updating password");
     }
    }catch(error){
      console.log("Error updating new password", error);
      Alert.alert("Error updating new password, Try again later")
    }
  };
  
  const onSignInPressed = () => {
    console.warn("signin");
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.roothead}>
          <Text style={styles.title}>New Password</Text>
          <Text>Please Enter Your New Password</Text>
        </View>

        <Text style={styles.textt}>Password</Text>

        <CustomInput
          placeholder="Enter your New Password"
          value={password}
          setValue={setPassword}
          icon="lock"
        />

        <CustomButton 
        text="Save and Login" 
        onPress={onConfirmPressed} 
        />

        <CustomButton
          text="Back to Sign In"
          onPress={onSignInPressed}
          type="tertiary1"
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
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 300,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#132968",
    margin: 10,
  },
  link: {
    color: "#FA6B6B",
    fontWeight: "bold",
  },
  textt: {
    fontSize: 15,
    color: "#FA6B6B",
    paddingTop: 20,
    alignItems: "flex-start",
  },
});

export default ResetPassword;
