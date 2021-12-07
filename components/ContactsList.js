import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { Component } from "react";
import ListElement from "./ListElement";
import { LinearGradient } from "expo-linear-gradient";
import "@firebase/firestore";
import firebase from "firebase";
import moment from "moment";

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    // Runs after the first render() lifecycle
    this.loadItems();
  }

  loadItems() {
    console.log("sss");
    this.getItems().then((item) => this.setState({ users: item }));
  }

  getItems = async () => {
    let eventsList = [];
    const ref = firebase.firestore().collection("counsellors");

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

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={({ ...styles.item }, { padding: 10 })}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/images/profile.png")}
        />
      </View>
      <View
        style={
          ({ ...styles.item },
          { paddingLeft: 10, paddingBottom: 10, alignSelf: "center", width: '100%' })
        }
      >
        {Object.keys(item).map((key) => (
          <View style={{width: '100%', display: 'flex', flexDirection: 'row', padding: 5}}>
            <Text style={{width: '35%', fontWeight: '500', fontStyle:'italic'}}>{key}</Text>
            <Text>{item[key]}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  searchContacts = (value) => {
    const filteredContacts = this.state.users.filter((contact) => {
      let contactLowercase = contact.name.toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  onEndReached = () => {
    this.loadItems();
  };
  render() {
    return (
      <LinearGradient
        colors={["#648880", "#207cca", "#7db9e8"]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView style={{ backgroundColor: "#2f363c" }} />
          <View style={{ flex: 1, backgroundColor: "" }}>
            {this.state.isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size="large" color="#bad555" />
              </View>
            ) : null}
            <FlatList
              data={this.state.users}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                  }}
                >
                  <Text style={{ color: "#bad555" }}>No Contacts Found</Text>
                </View>
              )}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // flexWrap: "wrap",
    // alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    // width: "100%", // is 50% of container width
  },
  list: {
    width: "50%",
    alignSelf: "center",
    // paddingBottom: "100",
  },
  activity: {
    alignSelf: "center",
  },
});
