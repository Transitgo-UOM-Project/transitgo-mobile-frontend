import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    SafeAreaView,
  } from "react-native";
  import React from "react";
 
  const  EmailVerificationScreen= () => {
    
  
    return (
      <View>
        <SafeAreaView>
          <View style={styles.root}>
            <Text style={styles.title}>Please Check your Email to verify your Account</Text>
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
      fontSize: 20,
      fontWeight: "bold",
      color: "#132968",
      margin: 10,
    },
  });
  
  export default EmailVerificationScreen;
  