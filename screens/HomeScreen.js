import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Images from '../model/images';
import CarouselCards from './CustomCarousel'
import Redirect from '../model/links';
import { LinearGradient } from 'expo-linear-gradient'

const HomeScreen = ({ navigation }) => {
  const [showmore, setShowmore] = useState(false);
  const theme = useTheme();
  return (
    <ScrollView style={styles.MainContainer}>
      <LinearGradient
        colors={['#648880', '#207cca', '#7db9e8']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* <ImageBackground source={require('./../assets/images/community-background.png')} style={{ width: null }}> */}
        <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
        <View style={styles.sliderContainer}>
          <CarouselCards navigation={navigation}/>
        </View>
        <View style={styles.categoryContainer2}>
          {/* <View style={{
            alignItems: 'center',
            justifyContent: 'flex-end', width: 20
          }}>
            <FontAwesome5 name="chevron-left" size={25} color="#FF6347" />
                      </View> */}
          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.categoryBtn}
              onPress={() =>
                navigation.navigate('EventsCalendar')
              }
            >
              <View style={styles.categoryIcon}>
                <MaterialIcons name="event" size={35} color="#FF6347" />
              </View>
              <Text style={styles.categoryBtnTxt}>Upcoming Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn}
              onPress={() =>
                navigation.navigate('CardListScreen', { title: 'News & Blogs' })
              }
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="people" size={35} color="#FF6347" />

              </View>
              <Text style={styles.categoryBtnTxt}>Latest Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {
                Linking.openURL(Redirect.MKBINCOLLECTION.link)
              }}
            >
              <View style={styles.categoryIcon}>
                <Ionicons name="trash-bin-sharp" size={35} color="#FF6347" />

              </View>
              <Text style={styles.categoryBtnTxt}>Bin Collection</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end', width: 20
          }}>
            <FontAwesome5 name="chevron-right" size={25} color="#FF6347" />
          </View> */}
          <View style={[styles.categoryContainer1]}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => {
                Linking.openURL(Redirect.MKREPORTPROBLEM.link)
              }
              }
            >
              <View style={styles.categoryIcon}>
                <MaterialIcons name="report-problem" size={35} color="#FF6347" />
              </View>
              <Text style={styles.categoryBtnTxt}>Report a Problem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() =>
                Linking.openURL(Redirect.MKPARISHCOUNCIL.link)
              }
            >
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons name="google-circles-communities" size={35} color="#FF6347" />
              </View>
              <Text style={styles.categoryBtnTxt}>Community Page</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBtn} onPress={() => {
              navigation.navigate('ContactsList', { title: 'Council Members' })
            }}>
              <View style={styles.categoryIcon}>
                <FontAwesome5 name="hands-helping" size={35} color="#FF6347" />
              </View>
              <Text style={styles.categoryBtnTxt}>Counsellors</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Most recent
        </Text>
        <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={Images[9].image}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>The V4 Watling Street is now fully open</Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
              <Text style={styles.cardDetails}>
                Section of grid road that's been closed for months re-opens
            </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={Images[8].image}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>New Secondary due to open</Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
              <Text style={styles.cardDetails}>
                New secondary school that will be the biggest in Milton Keynes will open early next year
            </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={Images[7].image}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>New GP surgery just opened...</Text>
              {/* <StarRating ratings={4} reviews={99} /> */}
              <Text style={styles.cardDetails}>
                A new state-of-the-art health centre has opened its doors in Milton Keynes.
            </Text>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </LinearGradient>

    </ScrollView>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  sliderContainer: {
    height: 300,
    width: '85%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  backgroundImage: {
    backgroundColor: 'rgba(255,0,0,0.5)',
    //opacity: 0.2,
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'red',
    opacity: 0.8
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    //width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    // marginLeft: 10,
    //marginBottom: 10,
  },
  categoryContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    //width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    //marginLeft: 20,
    //marginBottom: 10
  },
  categoryContainer2: {
    flex: 1,
//    marginLeft: 25,
justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignSelf: 'center'
  },
  list: {
    width: "28%",
    alignSelf: "center"
  },
  categoryBtn2: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryBtn: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
