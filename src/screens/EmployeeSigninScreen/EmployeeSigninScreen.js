import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";


const EmployeeSigninScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    console.warn("sign in");
    // navigation.navigate('HomeScreen')
    
  };

  const onForgotPasswordPressed = () => {
    console.warn("forgot password");
    navigation.navigate('ForgotPassword')
  };

  const onCustomerPressed = () => {
    console.warn("Customer");
    navigation.navigate('SignIn')
  };

  return (
    <ScrollView>
    <View style={styles.root}>
      <Image
        source={logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="Username or Email address"
        value={username}
        setValue={setUsername}
        icon="user"
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
        icon="lock"
      />

      <CustomButton text="Sign In" onPress={onSignInPressed} />
      <View style={styles.sec}>
        <View>
          <CustomButton
            text="Login as Customer?"
            onPress={onCustomerPressed}
            type="tertiary2"
          />
        </View>
        <View>
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPressed}
            type="tertiary2"
          />
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 300,
  },

  sec: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default EmployeeSigninScreen;
