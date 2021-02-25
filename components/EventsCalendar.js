import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

//import EventCalendar component
import EventCalendar from 'react-native-events-calendar';

//get the size of device
let {width} = Dimensions.get('window');

const CustomEventCalendar = () => {
  const [events, setEvents] = useState([
    {
      start: '2020-01-01 00:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Party',
      summary: 'xyz Location',
    },
    {
      start: '2020-01-01 01:00:00',
      end: '2020-01-01 02:00:00',
      title: 'New Year Wishes',
      summary: 'Call to every one',
    },
    {
      start: '2020-01-02 00:30:00',
      end: '2020-01-02 01:30:00',
      title: 'Parag Birthday Party',
      summary: 'Call him',
    },
    {
      start: '2020-01-03 01:30:00',
      end: '2020-01-03 02:20:00',
      title: 'My Birthday Party',
      summary: 'Lets Enjoy',
    },
    {
      start: '2020-02-04 04:10:00',
      end: '2020-02-04 04:40:00',
      title: 'Engg Expo 2020',
      summary: 'Expoo Vanue not confirm',
    },
  ]);

  const eventClicked = (event) => {
    //On Click of event showing alert from here
    alert(JSON.stringify(event));
  };

  return (
    <EventCalendar
      // eventTapped={this._eventTapped.bind(this)}
      events={events}
      width={width}
      initDate={'2017-09-08'}
    />
  )
};
export default CustomEventCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});