expo build:ios
download .ipa from expo.io for the transporter app delivery
https://developer.apple.com/account/resources/identifiers/list - bundle creation
wait for few mins before it appear the new bundle identifier
Transported upload the .ipa

push notification on simulators
    xcrun simctl list - find the guid of booted
    xcrun simctl push D0D004C6-3087-4C65-AF23-CBDBE1A83750 ./notification-test.apns