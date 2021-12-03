import React, { useState, useEffect } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

//import CountDown to show the timer
import CountDown from "react-native-countdown-component";

//import moment to help you play with date and time
import moment from "moment";
import { storage } from "./../firebase/config";
import "@firebase/firestore";
import firebase from "firebase";

const CountDownTimer = () => {
  const [totalDuration, setTotalDuration] = useState();
  const [title, setTitle] = useState("");
  const [settings, setSettings] = useState<any>([]);
  const [hide, setHide] = useState(false);
  const ref = firebase.firestore().collection("countdownData");
  useEffect(() => {
    ref.get().then(async (snap) => {
      let settings: any = [];
      snap.docs
        ?.sort((a: any, b: any) => (a?.order > b?.order ? 1 : -1))
        .map((doc) => {
          let docData = doc.data();
          let secondsDiff = moment(moment.unix(docData?.date?.seconds)).diff(
            moment(new Date()),
            "seconds"
          );
          let temp = {
            durationUntil: secondsDiff,
            title: docData?.title,
            color: docData?.color,
            timerLabelColor: docData?.timerLabelColor,
            titleColor: docData?.titleColor,
            timerBoxColor: docData?.timerBoxColor,
            date: moment(moment.unix(docData?.date?.seconds)).format("lll"),
          };
          if (moment().isBefore(moment.unix(docData?.date?.seconds))) {
            settings.push(temp);
          }
        });
      setSettings(settings);
    });
  }, [setSettings]);

  return settings?.length ? (
    <>
      {settings?.map((setting: any) => (
        <View style={styles.container}>
          <Text style={{ ...styles.title, color: setting.titleColor }}>
            {setting.title}
          </Text>
          <View style={styles.item}>
            <Text style={styles.date}>{setting.date}</Text>
            <CountDown
              size={20}
              until={setting.durationUntil}
              onFinish={() => setHide(true)}
              digitStyle={{
                backgroundColor: setting.timerBoxBackgroundColor,
                borderWidth: 2,
                borderColor: setting.timerBoxColor || "#1CC625",
              }}
              timeLabelStyle={{
                color: setting.timerLabelColor || "lightblue",
                fontWeight: "bold",
              }}
              // separatorStyle={{color: '#1CC625'}}
              timeToShow={["D", "H", "M"]}
              // timeLabels={{ m: null, s: null }}
              showSeparator
            />
          </View>
        </View>
      ))}
    </>
  ) : null;
};

export default CountDownTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    // width: "50%",
  },
  date: {
    textAlign: "center",
    paddingBottom: 4,
    fontSize: 15,
  },
  title: {
    // textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
});
