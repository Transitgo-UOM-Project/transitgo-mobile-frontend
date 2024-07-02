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
  import { useNavigation, useRoute } from "@react-navigation/native";

 
  const  EmailVerificationScreen= () => {
    
  
    return (
      <View>
        <SafeAreaView>
          <View style={styles.root}>
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
  