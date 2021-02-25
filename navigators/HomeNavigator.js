import { createStackNavigator, createAppContainer } from '@react-navigation/stack';

import React from 'react'
import WebViewScreen from '../screens/WebViewScreen'

const HomeStack = createStackNavigator();

const HomeRootNavigator = ({ navigation }) => (
  <HomeStack.Navigator initialRouteName="Home" activeColor="#fff">
    <HomeStack.Screen
      name="Home"
      component={WebViewScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#FF6347'
      }}
    />
   </HomeStack.Navigator>
) 
export default HomeRootNavigator