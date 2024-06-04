import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import bus from "../../../assets/images/bus.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const { height, width } = useWindowDimensions();
  const onStartPressed = () => {
    console.warn("Started");
    navigation.navigate("SignIn");
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/background.png")}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.contain}>
          <Image
            source={require("../../../assets/SmallImage/logo.png")}
            style={[styles.logo, { height: height * 0.1 }]}
          />

          <ImageBackground
            source={require("../../../assets/images/bus.png")}
            style={{
              height: height * 0.29,
              width: width * 1,
            }}
            imageStyle={{
              marginLeft: 40,
              justifyContent: "center",
              top: "35%",
            }}
          />
          <Text style={styles.tex}>
            Transforming Bus Travel in Sri Lanka with Real-Time Updates,
            Community Engagement, and Enhanced Passenger Services!
          </Text>
          <View
            style={[styles.home, { width: width * 0.7, height: height * 0.22 }]}
          >
            <View>
              <Text style={styles.text}>Travel with Us !</Text>
            </View>
            <View>
              <CustomButton
                text="Get Started"
                onPress={onStartPressed}
              ></CustomButton>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
  },
  contain: {
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  tex:{
    fontSize: 14,
    padding:10,
    marginTop:120,
    fontWeight:"bold",
    color:"#132968",
    textAlign:"justify"
  },
  home: {
    padding: 10,
    position: "absolute",
    bottom: "1%",
    margin: 10,
  },
  logo: {
    width: "80%",
    maxWidth: 300,
    maxHeight: 100,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Index;
