import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import Header from "../../components/Header/Index";
import Icon from "react-native-vector-icons/FontAwesome";

const ReviewsRat = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [reviewList, setReviewList] = useState([]);
  const [editReview, setEditReview] = useState(null);

  const onSubmitReview = () => {
    if (review === "") {
      return;
    }
    setReviewList([
      ...reviewList,
      { key: Date.now().toString(), review, rating },
    ]);
    setReview("");
    setRating(3);
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
    const updatedList = reviewList.map((item) => {
      if (item.key === editReview.key) {
        return { ...item, review, rating };
      }
      return item;
    });
    setReviewList(updatedList);
    setEditReview(null);
    setReview("");
    setRating(3);
  };

  const renderReview = ({ item }) => {
    return (
      <View style={styles.list}>
        <View style={styles.listver}>
          <Text>Name</Text>
          <AirbnbRating
            count={5}
            defaultRating={item.rating}
            size={15}
            isDisabled
            showRating={false}
          />
          <Text style={styles.listText}>{item.review}</Text>

          <View style={styles.pad}>
            <Icon
              name="trash"
              size={15}
              color="#132968"
              onPress={() => onDeleteReview(item.key)}
            />
            <View style={styles.iconSpacer} />

            <Icon
              name="pencil"
              size={15}
              color="#132968"
              onPress={() => onEditReview(item)}
            />
          </View>
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
          onChangeText={(text) => setReview(text)}
        />
        {editReview ? (
          <CustomButton text="Save" onPress={onUpdateReview} />
        ) : (
          <CustomButton text="Submit" onPress={onSubmitReview} />
        )}
        <FlatList
          data={reviewList}
          renderItem={renderReview}
        />
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
  pad: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-end",
  },
  listText: {
    color: "#132968",
    fontSize: 17,
    flex: 1,
    padding: 5,
  },
  iconSpacer: {
    width: 10,
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
