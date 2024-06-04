import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header/Index";
import CustomInput from "@/src/components/CustomInput/Index";
import CustomButton from "@/src/components/CustomButton/Index";
import Icon from "react-native-vector-icons/FontAwesome";

const Announcement = () => {
  const [ann, setAnn] = useState("");
  const [annlist, setAnnlist] = useState([]);
  const [editlist, setEditlist] = useState(null);

  const onbutPressed = () => {
    if (ann === "") {
      return;
    }
    setAnnlist([...annlist, { key: Date.now().toString(), title: ann }]);
    setAnn("");
  };

  const onDelete = (key) => {
    const updatedDelete = annlist.filter((ann) => ann.key !== key);
    setAnnlist(updatedDelete);
  };

  const onEdit = (ann) => {
    setEditlist(ann);
    setAnn(ann.title);
  };

  const onUpdate = () => {
    const updatedAnn = annlist.map((item) => {
      if (item.key === editlist.key) {
        return { ...item, title: ann };
      }
      return item;
    });
    setAnnlist(updatedAnn);
    setEditlist(null);
    setAnn("");
  };

  const renderAnn = ({ item }) => {
    return (
      <View style={styles.list}>
        <Text style={styles.listText}>{item.title}</Text>
        <View style={styles.iconSpacer} />
        <Icon
          name="pencil"
          size={15}
          color="#132968"
          onPress={() => onEdit(item)}
        />
        <View style={styles.iconSpacer} />
        <Icon
          name="trash"
          size={15}
          color="#132968"
          onPress={() => onDelete(item.key)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header text="Announcement" />
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <CustomInput
          placeholder="Add Announcement"
          value={ann}
          setValue={(userText) => setAnn(userText)}
        />
        {editlist ? (
          <CustomButton text="Save" onPress={onUpdate} />
        ) : (
          <CustomButton text="Submit Post" onPress={onbutPressed} />
        )}
        <FlatList
          data={annlist}
          renderItem={renderAnn}
        />
      </View>
    </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  list: {
    backgroundColor: "#9bedfd33",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  listText: {
    color: "#132968",
    fontSize: 17,
    flex: 1,
  },
  iconSpacer: {
    width: 10,
  },

});

export default Announcement;
