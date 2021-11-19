import SettingsList from 'react-native-settings-list';
import icons from '../model/icons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
 }
 from 'react-native';

const NotificationSettings = () => {
  const [switchValue, setSwitchValue] = useState();
  var bgColor = '#DCE3F4';
  return (
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>
      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
        <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
      </View>
      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={
                <Ionicons name="notifications" style={styles.imageStyle}/>
            }
            hasSwitch={true}
            switchState={switchValue}
            switchOnValueChange={onValueChange}
            hasNavArrow={false}
            title='Enable Notifications'
          />
        </SettingsList>
      </View>
    </View>
  );

function onValueChange(value) {
  setSwitchValue(value);
}

};


const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    marginRight:20,
    marginTop:10,
    alignSelf:'center',
    width:25,
    height:24,
    justifyContent:'center'
  },
  customImageStyle:{
    marginLeft:15,
    marginRight:20,
    alignSelf:'center',
    width:20,
    height:24,
    justifyContent:'center'
  }
});

export default NotificationSettings;