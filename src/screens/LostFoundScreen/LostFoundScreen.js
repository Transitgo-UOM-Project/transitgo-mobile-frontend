import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import CustomCard from "../../components/CustomCard/Index";
import logo from "../../../assets/SmallImage/logo.png";
import { useNavigation } from "@react-navigation/native";

const LostFoundScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLostPressed = () => {
    console.warn("Lost Announcement");
    navigation.navigate("LostItemScreen");
  };

  const onFoundpressed = () => {
    console.warn("Found Announcement");
    navigation.navigate("FoundItemScreen");
  };
  const onLFPressed = () => {
    console.warn("Report Lost & Found");
    navigation.navigate("LostScreen");
  };

  return (
    <View style={styles.root}>
      <View style={[styles.head, { height: height * 0.25 }]}>
        <Text style={styles.text}>Get Your Things Back with</Text>
        <Text style={styles.textb}>Lost & Found</Text>
      </View>
      <View style={[styles.cardsContainer, { height: height * 0.6 }]}>
        <CustomCard
          onPress={onLostPressed}
          text="Lost Announcement"
          imageSource={require("../../../assets/images/LostAnno.png")}
        />
        <CustomCard
          onPress={onFoundpressed}
          text="Found Announcement"
          imageSource={require("../../../assets/images/FoundAnno.png")}
        />
        <CustomCard
          onPress={onLFPressed}
          text="Lost/Found Report"
          imageSource={require("../../../assets/images/Report.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  head: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop:20
  },
  text: {
    fontSize: 25,
    textAlign: "center",
  },
  textb: {
    fontSize: 30,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },
});

export default LostFoundScreen;
