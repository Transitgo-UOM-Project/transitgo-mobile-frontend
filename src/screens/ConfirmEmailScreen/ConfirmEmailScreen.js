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

const ConfirmEmailScreen = () => {
  const [email, setEmail] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

 
  const onSendPressed = async (e) => {
    try{
      const response = await axios.post(`${apiURL}/api/v1/auth/forgot-password`,null,{params:{email}});
      const responseStatus = response.data.message;
      console.warn(responseStatus);
      if (responseStatus === "OTP sent successfully"){
        Alert.alert("OTP Sent to your mail");
        console.warn("otp sent");
        navigation.navigate(`VerifyOTP`,{ email:email });
      }else if(responseStatus === "Email does not exist"){
        Alert.alert("Email does not exist, Enter a valid Email");
      }else{
        Alert.alert("Error occurred while sending otp, Try again")
      }
    }catch(error){
      console.warn("Error sending OTP", error);
      Alert.alert("Error occurred while sending otp, Try again later");
    }
  };
  const onSignInPressed = () => {
    console.warn("signin");
    navigation.navigate("SignIn");
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.root}>
          <Text style={styles.title}>Please Enter a Valid E-mail Address to Receive a Verification Code</Text>
          <CustomInput
            placeholder="Enter Your Email"
            value={email}
            setValue={setEmail}
          />

          <CustomButton
            text="Send OTP"
            onPress={onSendPressed}
            type="secondary"
          />
          <CustomButton
            text="Back to Sign In"
            onPress={onSignInPressed}
            type="tertiary1"
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#132968",
    margin: 10,
  },
});

export default ConfirmEmailScreen;
