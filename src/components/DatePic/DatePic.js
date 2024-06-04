import { View, Text, TouchableOpacity,ScrollView,StyleSheet  } from "react-native";
import React, {useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Fontisto from "react-native-vector-icons/Fontisto";


const DatePic = () => {
    const [date, setDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
    };
  
    const showDatePicker = () => {
      setShowPicker(true);
    };
  
    const formatDate = (rawDate) => {
      let date = new Date(rawDate);
  
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
  
      return `${day < 10 ? "0" + day : day} - ${
        month < 10 ? "0" + month : month
      } - ${year}`;
    };
  
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Fontisto name="date" size={15} color="#132968" />
        <Text style={styles.inputText}>
          {date ? formatDate(date) : "Pick the Date"}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="inline"
          value={date || new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
 
    input: {
      backgroundColor: "#FFFFFF",
      width: "100%",
      borderColor: "#808080",
      borderRadius: 5,
      padding: 20,
      marginVertical: 6,
      flexDirection: "row",
      marginVertical: 6,
    },
    inputText: {
      fontSize: 13,
      color: "#808080",
      marginLeft: 10,
      paddingLeft: 10,
    },
  });

export default DatePic;
