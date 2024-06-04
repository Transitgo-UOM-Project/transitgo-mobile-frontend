import { View, Text, StyleSheet } from "react-native";
import React , {useState} from "react";
import Picker from "../Picker/Index";
import CustomButton from "../CustomButton/Index";
import { useNavigation } from "@react-navigation/native";

const BusTime = () => {
  const [showRules, setShowRules] = useState(false);
  const navigation = useNavigation();

  const toggleRules = () => {
    console.warn("drop points");
  };

  const onReviewsPressed = () => {
    console.warn("Reviews & Ratings");
    navigation.navigate("ReviewsRatings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueUp}>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Bus ID: </Text>
          <Text style={styles.midTextW}>REXY101</Text>
        </View>
        <View style={styles.upId}>
          <Text style={styles.smallTextW}>Route No: </Text>
          <Text style={styles.midTextW}>101</Text>
        </View>
      </View>
      <View style={styles.mid}>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Depature</Text>
            <Text style={styles.midText}>Colombo</Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Date</Text>
            <Text style={styles.midText}>2024-10-12</Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Time</Text>
            <Text style={styles.midText}>24.00</Text>
          </View>
        </View>
        <View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Arrival</Text>
            <Text style={styles.midText}>Kandy</Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Date</Text>
            <Text style={styles.midText}>2024-10-12</Text>
          </View>
          <View style={styles.midCon}>
            <Text style={styles.smallText}>Time</Text>
            <Text style={styles.midText}>06.30</Text>
          </View>
        </View>
        <View style={styles.midLeft}>
          <View style={styles.downsub}>
            <Text style={styles.smallText}>Price</Text>
            <Text style={styles.midText}>200.00</Text>
          </View>
          <View style={styles.downsub}>
            <Text style={styles.smallText}>Available Seats</Text>
            <Text style={styles.midText}>57</Text>
          </View>
          <View style={styles.downsub}>
            <Text style={styles.smallText}>Duration</Text>
            <Text style={styles.midText}>04 Hours</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.blueDown}>
          <View style={styles.greendown}>
            <Text style={styles.smallText}>Got Off at:</Text>
            <Text style={styles.midText}>08.00</Text>
          </View>
          <View>
            <CustomButton type="white" text="Dropping Points" onPress={toggleRules}/>
            <CustomButton
              type="white"
              text="Reviews & Ratings"
              onPress={onReviewsPressed}
            />
          </View>
          <View style={styles.reddown}>
            <Text style={styles.smallText}>Delay:</Text>
            <Text style={styles.midText}>10 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#bbdfea",
    shadowColor: "#abb6ba",
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 1,
  },
  blueUp: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2772",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
    color: "white",
  },
  blueDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E2772",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    color: "white",
  },
  upId: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mid: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  midCon: {
    padding: 3,
  },
  midLeft: {
    alignItems: "flex-end",
  },
  downsub: {
    alignItems: "flex-end",
    padding: 3,
  },
  greendown: {
    backgroundColor: "#90ee90",
    borderRadius: 3,
    padding: 5,
  },
  reddown: {
    alignItems: "flex-end",
    backgroundColor: "#ff0000",
    borderRadius: 3,
    padding: 5,
  },
  smallText: {
    fontSize: 10,
  },
  midText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  smallTextW: {
    fontSize: 10,
    color: "white",
  },
  midTextW: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});

export default BusTime;
