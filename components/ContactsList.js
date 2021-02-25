import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  Image
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import React, { Component } from "react";
import dataGenerator from "./../model/DataGenerator";
import ListElement from "./ListElement";
import { LinearGradient } from 'expo-linear-gradient'


export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      users: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.addData();
  }

  renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={{...styles.item}, {paddingLeft: 30}}>
        <Image
          style={{ width: 100, height: 100 }}
          source={require('../assets/images/profile.png')}
        />
      </View>
      <View style={{...styles.item} ,{paddingLeft: 30, paddingBottom: 50,  alignSelf: "center" }}>

        <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 20 }}>
          {item.name + ' '}
        </Text>
        <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 12,}}>
          {item.designation + ' '}  
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold'}}>
          <FontAwesome5 name="phone-volume" size={20} color="#FF6347" /> {item.phone}
        </Text>
        <Text style={{ color: 'white', fontWeight: 'bold'}}>
          <MaterialCommunityIcons name="email-send" size={20} color="#FF6347" /> {item.email}
        </Text>
      </View>

    </View>
  );

  addData = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        setTimeout(() => {
          let newUsers = dataGenerator(this.state.page);
          if (newUsers && newUsers.length > 0) {
            this.setState({
              users: [...this.state.users, ...newUsers],
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        }, 100);
      }
    );
  };

  searchContacts = value => {
    const filteredContacts = this.state.users.filter(contact => {
      let contactLowercase = (
        contact.name
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  onEndReached = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.addData();
      }
    );
  };
  render() {
    return (
      <LinearGradient
        colors={['#648880', '#207cca', '#7db9e8']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
          <View style={{ flex: 1, backgroundColor: '' }}>
            {this.state.isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: 'center',
                  justifyContent: 'center'
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                  }}
                >
                  <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
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
    //  alignSelf: "flex-start",
    flexWrap: 'wrap',
    //    paddingBottom: '10'
  },
  list: {
    width: "50%",
    alignSelf: "center",
    paddingBottom: '100'
  },
  activity: {
    alignSelf: "center"
  }
});
