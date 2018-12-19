/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView} from 'react-native';





//type Props = {};
export default class Index extends Component {
  render() {
    const handlePress = () => false
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      

          <View style={styles.box1}>  
          <Text style={styles.welcome}>Hello Suthiporn dok</Text>
          </View>

          <View style={styles.container}> 

            {/* <View style={styles.box1}>  
            <Text style={styles.welcome}>Hello Suthiporn dok</Text>
            </View> */}
          
            {/* <View style={[{ width: 160, height: 150, marginLeft: 20, marginTop: 20, backgroundColor: "rgb(255,108,224)", justifyContent: 'center'}]}> */}
            <View style={styles.Btn01}>
              <Button
                onPress={handlePress}
                title="Phone Book"

                color="white"
                accessibilityLabel="Learn more about this purple button"

                style={styles.Btn01}

              />
            </View>

            {/* <View style={[{ width: 160, height: 150, marginLeft: 200, marginTop: -150, backgroundColor: "rgb(255,193,108)", justifyContent: 'center'}]}> */}
            <View style={styles.Btn02}>
              <Button
                onPress={handlePress}
                title="Portals"

                color="white"
                accessibilityLabel="Learn more about this purple button"

                style={styles.Btn02}

              />
            </View>


            <View style={styles.Btn03}>
              <Button
                onPress={handlePress}
                title="DmasApps"

                color="white"
                accessibilityLabel="Learn more about this purple button"

                style={styles.Btn03}

              />
            </View>

          </View>
      </SafeAreaView>
    );
     
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgb(0,0,0)",
    // marginTop: 60,
    paddingRight: 2,
    paddingLeft: 2,
    paddingTop: 4
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 0,
    
    
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
    marginTop: 20,
    width: "100%"
  
  },


  Btn01: {
    backgroundColor: "rgba(255,255,255,.2)",
    // borderRadius: 25,
    flex: 1,
            width: 160,
            height: 150,
            justifyContent: 'center',
            margin: 2


  },

  Btn02: {
    backgroundColor: "rgba(255,255,255,.2)",
    // borderRadius: 25,
    flex: 1,
            width: 160,
            height: 150,
            // marginLeft: 200,
            // marginTop: -150,
            justifyContent: 'center',
          margin: 2

  },

  Btn03: {
    backgroundColor: "rgba(255,255,255,.2)",
    // borderRadius: 25,
    flex: 1,
            width: 160,
            height: 150,
            // marginLeft: 200,
            // marginTop: -150,
            justifyContent: 'center',
            margin: 2

  },


  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'white',
  }
  /*Header: {
    leftComponent={ icon: 'menu', color: '#fff' },
    centerComponent={ text: 'MY TITLE', style: { color: '#fff' } },
    rightComponent={ icon: 'home', color: '#fff' }
  }*/
});
