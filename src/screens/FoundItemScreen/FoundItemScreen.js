import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRoute } from "@react-navigation/native";
import CustomBlue from "../../components/CustomBlue/Index";

const FoundItemScreen = () => {
  const route = useRoute();
  const { list } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView >
        <View style={styles.pad}>
          <Text style={styles.title}>Reported Found Items</Text>
          <CustomBlue placeholder="Search..." icon="search" />
          <View style={styles.itemContainer}>
            <Text style={styles.label}>
              Name: <Text style={styles.value}>{list?.name}</Text>
            </Text>
            <Text style={styles.label}>
              Mobile Number: <Text style={styles.value}>{list?.number}</Text>
            </Text>
            <Text style={styles.label}>
              Bus Details: <Text style={styles.value}>{list?.bus}</Text>
            </Text>
            <Text style={styles.label}>
              Description: <Text style={styles.value}>{list?.description}</Text>
            </Text>
            <Text style={styles.labelred}>
              Posted on: <Text style={styles.value}>{list?.postedOn}</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pad: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    paddingTop: 5,
    color: "#132968",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
  },
  labelred: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 5,
    color: "red",
  },
  value: {
    fontWeight: "normal",
  },
});

export default FoundItemScreen;
