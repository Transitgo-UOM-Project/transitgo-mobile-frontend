import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating, AirbnbRating } from "react-native-ratings";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header/Index";
import Icon from "react-native-vector-icons/FontAwesome";
import Config from "../../../config";

const apiUrl = Config.API_BASE_URL;

const ReviewsRat = ({ route }) => {
  const { busID } = route.params;
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [reviewList, setReviewList] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [username, setUsername] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("uname");
        console.log("user name", storedUsername);
        setUsername(storedUsername);
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    // Fetch existing reviews
    axios
      .get(`${apiUrl}/rates/${busID}`)
      .then((response) => {
        const sortedReviews = response.data
          .map((item) => ({
            key: item.id.toString(),
            username: item.username,
            review: item.review,
            rating: item.rate,
            date: item.createdAt,
            profileColor: getRandomColor(), // Assign a random color
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviewList(sortedReviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews: ", error);
      });
  }, [busID]);

  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#A133FF",
      "#33FFF7",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatDateTime = (date) => {
    const pad = (num, size) => `000${num}`.slice(size * -1);
    const time = date.getTime();
    const milliseconds = `00${time % 1000}`.slice(-3);

    return `${date.getFullYear()}-${pad(date.getMonth() + 1, 2)}-${pad(
      date.getDate(),
      2
    )} ${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(
      date.getSeconds(),
      2
    )}.${milliseconds}`;
  };

  const onSubmitReview = () => {
    if (review === "") {
      return;
    }

    const date = new Date();
    const formattedDate = formatDateTime(date);

    const newReview = {
      username: username,
      profile: null,
      rate: rating,
      review: review,
      date: formattedDate, // Add the formatted date
      buses: {
        busId: busID,
      },
    };

    axios
      .post(`${apiUrl}/rate/bus`, newReview)
      .then((response) => {
        const updatedReviewList = [
          {
            key: response.data.id.toString(),
            username,
            review,
            rating,
            date: formattedDate,
            profileColor: getRandomColor(), // Assign a random color
          },
          ...reviewList,
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviewList(updatedReviewList);
        setReview("");
        setRating(3);
        setRefreshing((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error submitting review: ", error);
      });
  };

  const onDeleteReview = (key) => {
    const updatedList = reviewList.filter((item) => item.key !== key);
    setReviewList(updatedList);
  };

  const onEditReview = (item) => {
    setEditReview(item);
    setReview(item.review);
    setRating(item.rating);
  };

  const onUpdateReview = () => {
    const updatedList = reviewList
      .map((item) => {
        if (item.key === editReview.key) {
          return { ...item, review, rating };
        }
        return item;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    setReviewList(updatedList);
    setEditReview(null);
    setReview("");
    setRating(3);
  };

  const renderReview = ({ item }) => {
    return (
      <View style={styles.list}>
        <View style={styles.listver}>
          <View style={styles.userprofile}>
            <View
              style={[
                styles.profileIcon,
                { backgroundColor: item.profileColor },
              ]}
            >
              <Icon name="user" size={20} color="#fff" />
            </View>
          </View>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={15}
            isDisabled
            showRating={false}
          />
          <Text style={styles.listText}>{item.review}</Text>
          <View style={styles.foot}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.postedbyText}>by : {item.username}</Text>
          </View>

          {username === item.username && (
            <View style={styles.pad}>
              <Icon
                name="trash"
                size={18}
                color="#132968"
                onPress={() => onDeleteReview(item.key)}
              />
              <View style={styles.iconSpacer} />

              <Icon
                name="pencil"
                size={18}
                color="#132968"
                onPress={() => onEditReview(item)}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.tex}>Review & Ratings</Text>
      <View style={styles.content}>
        <AirbnbRating
          count={5}
          reviews={["Useless", "Poor", "Ok", "Good", "Excellent"]}
          size={25}
          selectedColor="#1E2772"
          reviewColor="#1E2772"
          reviewSize={10}
          onFinishRating={(value) => setRating(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your comments"
          multiline={true}
          value={review}
          placeholderTextColor={"#999999"}
          onChangeText={(text) => setReview(text)}
        />
        {editReview ? (
          <CustomButton text="Save" onPress={onUpdateReview} />
        ) : (
          <CustomButton text="Submit" onPress={onSubmitReview} />
        )}
        <FlatList data={reviewList} renderItem={renderReview} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 10,
    flex: 1,
  },
  tex: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 25,
  },
  list: {
    backgroundColor: "#9bedfd33",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listver: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 5,
    padding: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  userprofile: {
    flexDirection: "row",
    alignItems: "center",
  },
  pad: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  iconSpacer: {
    marginLeft: 20,
  },
  listText: {
    color: "#132968",
    fontSize: 17,
    flex: 1,
    padding: 5,
  },
  foot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Make sure the parent View takes full width
  },
  dateText: {
    color: "#888",
    fontSize: 12,
    paddingTop: 5,
  },
  postedbyText: {
    color: "#888",
    fontSize: 12,
    paddingTop: 5,
    textAlign: "right", // Align text to the right
  },
  input: {
    width: "100%",
    height: 140,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ReviewsRat;
