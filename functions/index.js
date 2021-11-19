const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.sendPushNotification = functions.https.onCall((data, context) => {
  // Get the information of the user who is going to recieve the notification
  console.log("data.scheduleDate" + data.scheduleDate.toString());
  console.log("data.isSendRightNowSelected" + data.isSendRightNowSelected);
  const scheduleInMS = new Date(data.scheduleDate).getTime() -
                      new Date().getTime() || 0;
  console.log("scheduleInMS" + scheduleInMS);
  try {
    const messages = [];
    admin.firestore().
        collection("users").get().then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(JSON.stringify(doc));
            if (doc.data().deviceToken) {
              // Write the notification and add it to messages
              messages.push({
                "to": doc.data().deviceToken,
                "sound": data.sound || "default",
                "title": data.title || "",
                "body": data.message || "",
                "ttl": 300,
              });
            } else {
              // eslint-disable-next-line max-len
              console.log("doesnt accept push notifications: " + doc.data().deviceToken);
              return;
            }
          });
          // Post it to expo
          setTimeout(()=> {
            fetch("https://exp.host/--/api/v2/push/send", {
              method: "POST",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(messages),
            });
          }, scheduleInMS || 0);
        });
  } catch (error) {
    console.log(error);
  }
});
