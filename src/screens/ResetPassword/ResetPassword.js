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

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onConfirmPressed = () => {
    console.warn("confirm");
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

        <Text style={styles.textt}>Confirm Password</Text>

        <CustomInput
          placeholder="Re-Enter your New Password"
          value={newPassword}
          setValue={setNewPassword}
          icon="lock"
        />

        <CustomButton text="Save and Login" onPress={onConfirmPressed} />

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
