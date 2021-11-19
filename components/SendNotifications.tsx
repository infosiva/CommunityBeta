import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import * as Notifications from "expo-notifications";
import { sendPushNotification } from "../functions";
import * as firebase from "firebase";
import "@firebase/functions";
import { Title } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import Checkbox from "expo-checkbox";

const SendNotifications = () => {
  const [title, onTitlechange] = useState("");
  const [body, onBodyChange] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isSendRightNowSelected, setSelection] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const triggerLocalNotificationHandler = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey:
          "AAAAIMPDlhg:APA91bE1tZHcVIsXGj8t6Z2NBrTlSuI5l2uLN4EPQJvPP3_8_gRgDwd7npb9YIQppvbFyXpEeoCCUTVQGrHdKAVpt4kivRJHiHtQCVc21nUeyfqoZznNT-RS5RAf5QlNitptlnS6Zo71",
        authDomain: "communityapp-datastore.firebaseapp.com",
        databaseURL: "https://communityapp-datastore.firebaseio.com",
        projectId: "communityapp-datastore",
        storageBucket: "communityapp-datastore.appspot.com",
      });
    }
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "hi there",
    //     body: "Hello this is a local notification!",
    //   },
    //   trigger: { seconds: 5 },
    // })
    const func = firebase.functions().httpsCallable("sendPushNotification");
    func({
      title: title,
      message: body,
      scheduleDate: date.toString(),
      isSendRightNowSelected,
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    // <TouchableOpacity>
    <View style={{ margin: 10, paddingTop: 10 }}>
      <View style={{ alignSelf: "flex-end" }}>
        <Button
          disabled={!title || !body}
          title="Trigger a Notification"
          onPress={triggerLocalNotificationHandler}
        />
      </View>
      <Text>Title</Text>
      <TextInput
        defaultValue="Bin Collection"
        style={{ fontSize: 40, color: "green" }}
        onChangeText={onTitlechange}
        value={title}
        placeholder="Title"
      />
      <View style={{ paddingTop: 20 }}>
        <Text>Message</Text>
        <TextInput
          defaultValue="Remember to keep the binds outside before 7AM tomorrow!!!"
          style={{ fontSize: 30, color: "blue" }}
          onChangeText={onBodyChange}
          value={body}
          placeholder="Message to send"
          multiline={true}
        />
      </View>
      <View style={{ paddingTop: 20, alignSelf: "flex-start" }}>
        <Text>Schedule at:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isSendRightNowSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>right now ?</Text>
        </View>
        <Text style={{fontSize: 20}}>OR</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          mode="datetime"
          display="default"
          onChange={onChange}
        />
        <Text style={styles.label}>{date.toString()}</Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default SendNotifications;
