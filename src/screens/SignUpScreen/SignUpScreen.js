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

const SignUpScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignUpPressed = () => {
    console.warn("sign up");
    navigation.navigate("ConfirmEmail");
  };

  const onSignInGoogle = () => {
    console.warn("google");
  };
  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate("SignIn");
  };
  const onTermsPressed = () => {
    console.warn("terms");
    navigation.navigate("Terms");

  };
  const onPrivacyPressed = () => {
    console.warn("privacy");
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          <Text style={styles.title}>Create New Account</Text>
          <CustomInput
            placeholder="First Name"
            value={firstname}
            setValue={setFirstname}
          />
          <CustomInput
            placeholder="Last Name"
            value={lastname}
            setValue={setLastname}
          />
          <CustomInput placeholder="E-mail" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          <CustomInput
            placeholder=" Re-Enter Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry={true}
          />

          <CustomButton text="Sign Up" onPress={onSignUpPressed} />
          <Text style={styles.text}>
            I agree with the{" "}
            <Text style={styles.link} onPress={onTermsPressed}>
              Terms of services
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>

          <CustomButton
            text="Sign in with Google"
            onPress={onSignInGoogle}
            type="special"
          />
          <CustomButton
            text="Don't Have an account? Sign In"
            onPress={onSignInPressed}
            type="tertiary1"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
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
});

export default SignUpScreen;
