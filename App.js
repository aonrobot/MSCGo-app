/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './pages/Login';
import HomeScreen from './pages/Index';
import ContactScreen from './pages/Contact';

// iCard
import IcardHomeScreen from './pages/icard/pages/MyCard';
import IcardViewCardScreen from './pages/icard/pages/ViewCard';
import IcardNewCardInfoScreen from './pages/icard/pages/NewCard/CardInfo';
import IcardNewCardPreviewScreen from './pages/icard/pages/NewCard/ShowCard';
import IcardProfileScreen from './pages/icard/pages/Profile';

export default class App extends Component {
  render() {
    return (
          <AppContainer />
        //  <HomeScreen />
    );
  }
}

const AppStackNavigator = createStackNavigator({
    Home: HomeScreen,
    Login : LoginScreen,
    Contact : ContactScreen,

    IcardHome : IcardHomeScreen,
    IcardViewCard : IcardViewCardScreen,
    IcardNewCardInfo : IcardNewCardInfoScreen,
    IcardNewCardPreview : IcardNewCardPreviewScreen,
    IcardProfile: IcardProfileScreen
  },{
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
