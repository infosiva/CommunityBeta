import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import "@firebase/firestore";
import firebase from "firebase";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";

const RecentNews = () => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    let eventsList = [];
    const ref = firebase.firestore().collection("recentNews");

    return ref.get().then(async (snap) => {
      return (
        snap.docs
          // ?.sort((a, b) => (a?.date > b?.date ? 1 : -1))
          .map((doc) => {
            let docData = doc.data();
            return { ...docData };
          })
      );
    });
  };

  useEffect(async () => {
    const list = await getItems();
    console.log("date fetched..." + JSON.stringify(list));
    setItems(list);
  }, []);

  return items?.length > 0 && (
    <View style={styles.cardsWrapper}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: items?.length && items[0].textColor ? items[0].textColor : "lightblue",
        }}
      >
        Most recent
      </Text>
      {items.map((item) => (
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            {item.imageUrl ? (
              <Image
                source={item.image}
                resizeMode="cover"
                style={styles.cardImg}
              />
            ) : (
              <Icon.Button
                size={75}
                name="newspaper-o"
                style={styles.cardImg}
                backgroundColor="#3b5998"
              />
            )}
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            {/* <StarRating ratings={4} reviews={99} /> */}
            <Text style={styles.cardDetails}>
              {item.details}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    width: 100
    
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 8
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});

export default RecentNews;
