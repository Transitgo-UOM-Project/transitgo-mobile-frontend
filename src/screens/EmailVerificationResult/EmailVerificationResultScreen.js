import {
  Alert,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Config from "@/config";

const apiURL = Config.API_BASE_URL;

const EmailVerificationResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const token = route.params?.token;
    if (!token) {
      Alert.alert("Error", "Email verification token not found!", [
        { text: "Ok", onPress: () => navigation.navigate("SignUp") },
      ]);
      return;
    }

    const verifyEmail = async () => {
      try {
        console.log(`Verifying email with token: ${token}`);
        const response = await axios.get(`${apiURL}/api/v1/auth/verify-email`, {
          params: {token},
        });
        console.log(response);
        const verificationStatus = response.data; // Adjust according to your API response
        setStatus(verificationStatus);
      } catch (error) {
        console.log("Failed to verify email", error.response);
        setStatus("Failed");
      }
    };
    verifyEmail();
  }, [navigation, route.params?.token]);

  useEffect(() => {
    if (status) {
      if (status === "Verified") {
        navigation.navigate("Success");
      } else {
        navigation.navigate("Fail");
      }
    }
  }, [status, navigation]);

  return null;
};

export default EmailVerificationResultScreen;
