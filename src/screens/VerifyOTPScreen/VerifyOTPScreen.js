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
  import React, { useEffect, useState } from "react";
  import logo from "../../../assets/images/logo.png";
  import CustomInput from "../../components/CustomInput/Index";
  import CustomButton from "../../components/CustomButton/Index";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import Config from "@/config";
  
  const apiURL = Config.API_BASE_URL;
  
  const VerifyOTPScreen = ({ route }) => {
    const email  = route.params.email;
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(300);//5 min in seconds
    const [otpExpired, setOtpExpired] = useState(false);
    
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
  
    useEffect(() => {
        if (timeLeft > 0){
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }else{
            setOtpExpired(true);
        }
    },[timeLeft]);
   
    const onVerifyPressed = async (e) => {
      if(otpExpired){
        Alert.alert("OTP has Expired, Please request a new OTP");
        return;
      }

      try{
        const response = await axios.post(`${apiURL}/api/v1/auth/verify-otp`,null,{params: {email,otp}});
        console.log(response);
        const responseStatus = response.data;
        if (responseStatus === "OTP Verified"){
            console.warn("OTP Verified");
            Alert.alert("OTP Verified");
            navigation.navigate(`ResetPassword`,{ email: email });
        }else if(responseStatus === "Invalid OTP"){
            Alert.alert("Invalid OTP, Try again");
            console.warn("Invalid OTP");
        }else{
            console.warn('Error while verifying OTP');
            Alert.alert("Something went wrong, Try again later");
        }
      }catch(error){
        console.warn('Error while verifying OTP',error);
        Alert.alert("Something went wrong, Try again later");
      }
    };

    const onResendPressed = async (e) => {
       try{
        const response = await axios.post(`${apiURL}/api/v1/auth/forgot-password`,null,{params: {email}});
        const responseStatus = response.data.message;
        console.log(responseStatus);
        if (responseStatus === "OTP sent successfully"){
            setTimeLeft(300);
            setOtpExpired(false);
            navigation.navigate(`VerifyOTP`,{ email: encodedEmail });
        }else if(responseStatus === "Email does not exist"){
            console.log("Email does not exist, Enter a valid Email");
            Alert.alert("Email does not exist, Enter a valid Email");
        }else{
            console.log("Error occurred while sending otp, Try again");
            Alert.alert("Error occurred while sending otp, Try again");
        }
       }catch(error){
            console.log("Error sending OTP", error);
            Alert.alert("Error sending OTP");
       }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds/60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    const onSignInPressed = () => {
      console.warn("signin");
      navigation.navigate("SignIn");
    };
  
    return (
      <View>
        <SafeAreaView>
          <View style={styles.root}>
            <Text style={styles.title}>Please Enter the 4 Digit Code your mail</Text>
            <CustomInput
              placeholder="OTP"
              value={otp}
              setValue={setOtp}
            />

            {otpExpired ? (
                <Text>OTP Expired, Please request a new OTP</Text>
            ):(
                <Text>Time Left : {formatTime(timeLeft)}</Text>
            )}
  
            <CustomButton
              text="Verify"
              onPress={onVerifyPressed}
              type="secondary"
            />
             <CustomButton
              text="Resend OTP"
              onPress={onResendPressed}
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
  
  export default VerifyOTPScreen;
  