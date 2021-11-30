import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselItem = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={{ width: 300, height: 300 }} />
      <Text>{item.image}</Text>
      <Text>{item.quote}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    transform: [
      {
        rotate: "0deg",
      },
    ],
    width: ITEM_WIDTH - 25,
    height: ITEM_WIDTH / 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: ITEM_WIDTH,
  },
  header: {
    width: ITEM_WIDTH,
  },
  body: {
    width: ITEM_WIDTH,
  },
});

export default CarouselItem;
