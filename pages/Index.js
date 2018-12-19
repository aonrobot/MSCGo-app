/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, ImageBackground, SafeAreaView, Image} from 'react-native';
import { Container, Header, Button, Content, ActionSheet, Text, Icon} from "native-base";

// var Button = [ {Text: "Phone Book"}];



//type Props = {};
export default class Index extends Component {
  render() {
    const handlePress = () => false
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <ImageBackground source={require('../asset/bg1.png')} style={ { flex: 1, width: null, height: null } }>
          <View style={styles.box1}>  
          <Image source={require('../asset/Avartar.png')} style={{width: 60,height: 60, marginLeft: -275, marginTop: 0, borderWidth: 1,borderRadius:30}}/>
          <Text style={{fontSize: 20, marginTop: -50}}>Hello Suthiporn</Text>
          <Text style={{fontSize: 20, marginTop: 0}}>Description</Text>
          </View>

          <View style={styles.container}> 

            
              <Button style={styles.Btn01}>
                  <Image source={require('../asset/PhoneBook.png')} style={{width: 75,height: 75, marginLeft: 25, marginTop: -30}}/>
                  <Text style={{marginTop: 80, marginLeft: -100}}>Phone Book</Text>
              </Button>


              <Button style={styles.Btn02}>
                <Text>WorkFlow</Text>
              </Button>


            
              <Button
                onPress={handlePress}
                title="DmasApps"

                color="white"
                accessibilityLabel="Learn more about this purple button"

                style={styles.Btn03}

              />
         

          </View>
          </ImageBackground>
      </SafeAreaView>
    );
     
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "rgb(0,0,0)",
    
    // marginTop: 60,
    paddingRight: 2,
    paddingLeft: 2,
    paddingTop: 2
  },
  welcome: {
    fontSize: 20,
    marginLeft: 220,
    
    
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 20,
    width: "100%"
  
  },


  Btn01: {
    backgroundColor: "rgba(255,255,255,.2)",
    // flex: 1,
            width: '33.33%',
            height: 120,
            justifyContent: 'center',
            margin: 2


  },

  Btn02: {
    backgroundColor: "rgba(255,255,255,.2)",
    // flex: 1,
            width: 160,
            height: 120,
            display: 'none',
            justifyContent: 'center',
          margin: 2

  },

  Btn03: {
    backgroundColor: "rgba(255,255,255,.2)",
    // flex: 1,
            width: 160,
            height: 120,
            display: 'none',
            justifyContent: 'center',
            margin: 2

  },


  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: 'white',
    borderWidth: 1,
  }
  /*Header: {
    leftComponent={ icon: 'menu', color: '#fff' },
    centerComponent={ text: 'MY TITLE', style: { color: '#fff' } },
    rightComponent={ icon: 'home', color: '#fff' }
  }*/
});
