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
import Picker from "@/src/components/Picker/Index";
import DatePic from "../../components/DatePic/Index";
import Icon from "react-native-vector-icons/MaterialIcons";
import BusTime from "../../components/BusTime/Index";

const BusTimeTable = () => {
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSearchPressed = () => {
    console.warn("Search pressed");
    navigation.navigate("BusTimeTable");
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.head}>
      <SafeAreaView >
        <View style={styles.headerRow}>
          <Text style={styles.headText}>Colombo</Text>
          <Icon name="arrow-forward" size={15} style={styles.arrowIcon} />
          <Text style={styles.headText}>Kandy</Text>
        </View>
        <Text style={styles.centerText}>10-10-2010</Text>
        <CustomButton text="Modify" onPress={toggleRules} type="special" />
      </SafeAreaView>
      </View>
      {showRules && (
        <View style={styles.sec}>
          <Picker placeholder="From" />
          <Picker placeholder="To" />
          <DatePic />
          <CustomButton text="Search" onPress={onSearchPressed} />
        </View>
      )}
      <View>
        <BusTime />
        <BusTime />
        <BusTime />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  head: {
    backgroundColor: "#90ee90",
    padding:20
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
  },

  headText: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  centerText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
  arrowIcon: {
    flex: 0,
    margin: 5,
  },
  sec: {
    backgroundColor: "#bbdfea",
    shadowColor: "#abb6ba",
    borderRadius: 3,
    elevation: 3,
    shadowOpacity: 1,
    padding: 10,
  },
});

export default BusTimeTable;
