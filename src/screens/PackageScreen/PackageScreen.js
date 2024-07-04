import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import CustomButton from "@/src/components/CustomButton/Index";
import { useNavigation } from "@react-navigation/native";



const PackageScreen = () => {
  const { height,width } = useWindowDimensions();
  const navigation = useNavigation();

  const onpackagePressed = () => {
    console.warn(" Move my package");
    navigation.navigate("MovingScreen");

  };
  const ontrackPressed = () => {
    console.warn("tracking screen");
    navigation.navigate("TrackingScreen");

  };
  return (
    <ScrollView style={styles.root}>
      <View style={[styles.dis, { height: height * 0.6 }]}>
        <ImageBackground
          source={require("../../../assets/SmallImage/packimg.png")}
          style={styles.logo}
        />
        <Text style={styles.move}>Move your packages with us.</Text>
        <Text style={styles.safe}>
          Safely move your belongings to your desired places through our bus
          route in a fair price.
        </Text>
      </View>

      <CustomButton
        text="Move My Package!"
        onPress={onpackagePressed}
      ></CustomButton>
      <CustomButton
        text="Track My Package"
        onPress={ontrackPressed}
        type="tertiary1"
      ></CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  dis: {
    justifyContent: "center",
    width:"100%",
    paddingBottom:20
  },

  but: {},
  logo: {
    width: "100%",
    height: "100%",
    maxWidth: 450,
    maxHeight: 250,
    padding:20,
    resizeMode: "contain",
  },
  move: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#132968",
    paddingBottom: 10,
  },
  safe: {
    fontSize: 16,
    color: "#132968",
    paddingBottom: 10,
  },
});

export default PackageScreen;
