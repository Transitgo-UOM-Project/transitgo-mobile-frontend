import {
  View,
  Text,
  Alert,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  validateFname,
  validateLname,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmpassword,
} from "../../components/Validations";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/Index";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Config from "@/config";


const apiURL = Config.API_BASE_URL;

const SignUpScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [userType, setUserType] = useState("passenger");

  //const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const onSignUpPressed = async () => {
    console.warn("sign up");
    const fnameValidation = validateFname(firstname);
    const lnameValidation = validateLname(lastname);
    const usernameValidation = validateUsername(username);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmpasswordValidation = validateConfirmpassword(
      password,
      passwordRepeat
    );

    if (
      !fnameValidation.isValid ||
      !lnameValidation.isValid ||
      !usernameValidation.isValid ||
      !emailValidation.isValid ||
      !passwordValidation.isValid ||
      !confirmpasswordValidation.isValid
    ) {
      setFormErrors({
        firstname: fnameValidation.Message,
        lastname: lnameValidation.Message,
        username: usernameValidation.Message,
        email: emailValidation.Message,
        password: passwordValidation.Message,
        confirmpassword: confirmpasswordValidation.Message,
      });
      console.warn(formErrors);
      return;
    }

    try {
      await axios.post(`${apiURL}/api/v1/auth/register`, {
        fname: firstname,
        lname: lastname,
        email: email,
        uname: username,
        password: password,
        confirmpassword: passwordRepeat,
        type: userType,
      });
      Alert.alert("Registration Successful");
      navigation.navigate("ConfirmEmail");
    } catch (error) {
      if(error.response && error.response.data){
        setFormErrors({
          ...formErrors,
          email: error.response.data
        });
      }
      Alert.alert("Something went wrong, please try again later.");
    }
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
          {formErrors.firstname ? (
            <Text style={styles.error}>{formErrors.firstname}</Text>
          ) : null}
          <CustomInput
            placeholder="Last Name"
            value={lastname}
            setValue={setLastname}
          />
          {formErrors.lastname ? (
            <Text style={styles.error}>{formErrors.lastname}</Text>
          ) : null}
          <CustomInput placeholder="E-mail" value={email} setValue={setEmail} />
          {formErrors.email ? (
            <Text style={styles.error}>{formErrors.email}</Text>
          ) : null}
          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          {formErrors.username ? (
            <Text style={styles.error}>{formErrors.username}</Text>
          ) : null}
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
          {formErrors.password ? (
            <Text style={styles.error}>{formErrors.password}</Text>
          ) : null}
          <CustomInput
            placeholder=" Re-Enter Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry={true}
          />
          {formErrors.confirmpassword ? (
            <Text style={styles.error}>{formErrors.confirmpassword}</Text>
          ) : null}
          <CustomInput value={userType}  editable={false}/>

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
  error: {
    color: "red",
    fontSize: "10px"
  }
})
;

export default SignUpScreen;
