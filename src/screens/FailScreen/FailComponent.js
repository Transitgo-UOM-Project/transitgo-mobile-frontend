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
 
  
  const FailComponent = () => {
   const navigation = useNavigation();

    const onSignInPressed = () => {
      console.warn("signin");
      navigation.navigate("SignIn");
    };
  
    return (
      <View>
        <SafeAreaView>
          <View style={styles.root}>
            <Text style={styles.title}>Verification Failed, Account maybe already verified or verification code is incorrect </Text>
            <CustomButton
            text="Click here to Sign In"
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
  
  export default FailComponent;
  