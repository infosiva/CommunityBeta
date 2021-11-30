import _ from "lodash";
import React, { Component } from "react";
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";

const testIDs = require("./testIDs");

const today = new Date().toISOString().split("T")[0];
//const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = futureDates;
const themeColor = "#00AAAF";
const lightThemeColor = "#EBF9F9";
import "@firebase/firestore";
import firebase from "firebase";
import moment from "moment";

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split("T")[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split("T")[0];
}

const ITEMS = [
  {
    title: dates[5],
    data: [{ hour: "12am", duration: "2h", title: "Litter Picking" }],
  },
  {
    title: dates[6],
    data: [{ hour: "11pm", duration: "3h", title: "Community Meeting" }],
  },
  {
    title: dates[6],
    data: [{ hour: "4pm", duration: "2h", title: "Nursery Kids Meetup" }],
  },
];

function loadItems() {
  console.log("sss");
  //return this.getItems().then((item) => item);
  return ITEMS
}

export default class ExpandableCalendarScreen extends Component {

  getItems = async () => {
    let eventsList = [];
    const ref = firebase.firestore().collection("upcomingEvents");

    return ref.get().then(async (snap) => {
      return snap.docs
        ?.sort((a, b) => (a?.date > b?.date ? 1 : -1))
        .map((doc) => {
          let docData = doc.data();
          let minutesDiff = moment(moment.unix(docData?.date?.seconds)).diff(
            moment(moment.unix(docData?.duration?.seconds)),
            "minutes"
          );
          console.log("inside...");
          const details = {
            hour: "11 am",
            duration: minutesDiff,
            title: docData?.title,
            date: moment(moment.unix(docData?.date?.seconds)).format(
              "ddd Do MMM YYYY h:mm a"
            ),
          };
          return {
            title: moment(moment.unix(docData?.date?.seconds)).format(
              "ddd do MMM YYYY"
            ),
            data: [details],
          };
        });
    });
  };


  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert("show more");
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    console.log(_.isEmpty(item) ? 'empty' : 'not empty')
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}
        testID={testIDs.agenda.ITEM}
      >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={"grey"} title={"Info"} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };

  getTheme = () => {
    const disabledColor = "grey";

    return {
      // arrows
      arrowColor: "black",
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: "black",
      textMonthFontSize: 16,
      textMonthFontFamily: "HelveticaNeue",
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: "black",
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: "HelveticaNeue",
      textDayHeaderFontWeight: "normal",
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: "HelveticaNeue",
      textDayFontWeight: "500",
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: "white",
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: "white",
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 },
    };
  };

  render() {
    return (
      <CalendarProvider
        date={ITEMS[0].title}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // theme={{
        //   todayButtonTextColor: themeColor
        // }}
        // todayBottomMargin={16}
      >
        {this.props.weekView ? (
          <WeekCalendar
            testID={testIDs.weekCalendar.CONTAINER}
            firstDay={1}
            markedDates={this.getMarkedDates()}
          />
        ) : (
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.calendar} // for horizontal only
            // disableWeekScroll
            // theme={this.getTheme()}
            disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            leftArrowImageSource={require("./img/previous.png")}
            rightArrowImageSource={require("./img/next.png")}
          />
        )}
        <AgendaList
          section={ITEMS}
          extraData={this.state}
          renderItem={this.renderItem}
          // sectionStyle={styles.section}
        />
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14,
  },
});
