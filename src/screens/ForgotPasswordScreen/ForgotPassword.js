import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onConfirmPressed = () => {
    console.warn("confirm");
    navigation.navigate("ResetPassword");
  };
  const onResendPressed = () => {
    console.warn("resend");
  };
  const onSignInPressed = () => {
    console.warn("signin");
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <View style={styles.head}>
          <Text style={styles.title}>Forgot Password</Text>
        </View>
        <Text style={styles.textt}>E-mail</Text>

        <CustomInput
          placeholder="Enter your email"
          value={email}
          setValue={setEmail}
          icon="envelope"
        />

        <CustomButton text="Send OTP" onPress={onConfirmPressed} />

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
  head: {
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

export default ForgotPassword;
