import { View, Text, StyleSheet,StatusBar,SafeAreaView} from "react-native";
import React from "react";

const Header = ({ text }) => {
  return (
      <View style={styles.head}>
        <SafeAreaView>
        <Text style={styles.text} >{text}</Text>
        </SafeAreaView>
      </View>
  );
};

const styles = StyleSheet.create({
  head: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    
    backgroundColor: "#1976d2",
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 10 },
    //shadowOpacity: 0.25,
    //shadowRadius: 10,
    elevation: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
  },
});

export default Header;
