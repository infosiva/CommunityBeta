// Example of Calendar with Events Listed in React Native
// https://aboutreact.com/example-of-calendar-with-events-listed-in-react-native/

// import React in our code
import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Dimensions } from "react-native";

//import EventCalendar component
import EventCalendar from "react-native-events-calendar";

//get the size of device
let { width } = Dimensions.get("window");

import "@firebase/firestore";
import firebase from "firebase";
import moment from "moment";

const CalendarScreen = ({navigation}) => {
  const [events, setEvents] = useState();

  const getItems = async () => {
    let eventsList = [];
    const ref = firebase.firestore().collection("upcomingEvents");

    return ref.get().then(async (snap) => {
      return snap.docs
        ?.sort((a, b) => (a?.date > b?.date ? 1 : -1))
        .map((doc) => {
          let docData = doc.data();
          let minutesDiff = moment(
            moment.unix(docData?.duration?.seconds)
          ).diff(moment(moment.unix(docData?.date?.seconds)), "minutes");
          console.log("inside...");
          const details = {
            hour: "11 am",
            start: moment(moment.unix(docData?.date?.seconds)),
            end: moment(moment.unix(docData?.duration?.seconds)),
            title: docData?.title,
            summary: docData?.summary,
            date: moment(moment.unix(docData?.date?.seconds)).format(
              "ddd Do MMM YYYY h:mm a"
            ),
          };
          return {
            ...details
          };
        });
    });
  };

  useEffect(async () => {
    const list = await getItems();
    console.log('date fetched...' + JSON.stringify(list))
    setEvents(list);
  }, []);

  const eventClicked = (event) => {
    //On Click oC a event showing alert from here
    //alert(JSON.stringify(event));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <EventCalendar
          eventTapped={eventClicked}
          //Function on event press
          events={events}
          //passing the Array of event
          width={width}
          //Container width
          size={60}
          //number of date will render before and after initDate
          //(default is 30 will render 30 day before initDate and 29 day after initDate)
          initDate={moment().format('YYYY-MM-DD')}
          //show initial date (default is today)
          scrollToFirst
          //scroll to first event of the day (default true)
        />
      </View>
    </SafeAreaView>
  );
};
export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
