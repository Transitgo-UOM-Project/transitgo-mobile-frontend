import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomCard from "../../components/CustomCard/Index";
import logo from "../../../assets/SmallImage/logo.png";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onBusPressed = () => {
    console.warn("Bus shedule");
    navigation.navigate("BusShedule");
  };

  const onLostfoundpressed = () => {
    console.warn("lost & found");
    navigation.navigate("LostFound");
  };
  const onPackagePressed = () => {
    console.warn("Package");
    navigation.navigate("Package");
  };
  const onAnnouncementPressed = () => {
    console.warn("Announcement");
    navigation.navigate("Delay");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <ImageBackground
            source={require("../../../assets/SmallImage/coverpichomepage.png")}
            style={[{ height: height * 0.28 }]}
            resizeMode="stretch"
          >
            <View style={styles.profile }>
              <Text style={styles.proftex}></Text>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <ImageBackground
                  source={require("../../../assets/images/profile.jpeg")}
                  style={{ width: 50, height: 50 }}
                  imageStyle={{
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: "white",
                  }}
                ></ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <Image source={logo} style={[styles.logo,{ height: height * 0.2 }]} resizeMode="contain" />
        <SafeAreaView style={[styles.cardsContainer, { height: height * 0.6 }]}>
          <CustomCard
            onPress={onBusPressed}
            text="Bus Schedules"
            imageSource={require("../../../assets/SmallImage/busschimg.png")}
          />
          <CustomCard
            onPress={onLostfoundpressed}
            text="Lost/Found"
            imageSource={require("../../../assets/SmallImage/lostimg.png")}
          />
          <CustomCard
            onPress={onPackagePressed}
            text="Package Transfer"
            imageSource={require("../../../assets/SmallImage/packimg.png")}
          />
          <CustomCard
            onPress={onAnnouncementPressed}
            text="Delay Announcements"
            imageSource={require("../../../assets/SmallImage/announceimg.png")}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    marginTop: 20,
  },
  proftex: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 300,
    alignSelf: "flex-start",
    position: "absolute",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default HomeScreen;
