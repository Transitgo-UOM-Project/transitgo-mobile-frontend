import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";


const CustomCard = ({ onPress, text,imageSource }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/SmallImage/Rectangle 3.png")}
        resizeMode="cover"
        borderRadius={20}
      >
        <View style={styles.content}>
          <Image style={[styles.img]} source={imageSource}  resizeMode="contain"></Image>
          <Text style={[styles.text]}> {text}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 10,
    // margin:1,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor:"#FA6B6B",
    shadowOpacity:0.75,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  background: {
    width: "100%", 
    height: 160, 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  img:{
    width: '100%',
    height: 100,
    marginBottom: 8, 
    alignItems:"center"
  },
  text: {
    fontWeight: "bold",
    color: "#1E2772",
    textAlign: "center",
  },
});

export default CustomCard;
