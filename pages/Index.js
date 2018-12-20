/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, View, ImageBackground, SafeAreaView, Image, AsyncStorage} from 'react-native';
import { Container, Header, Button, Content, ActionSheet, Text, Icon} from "native-base";

// var Button = [ {Text: "Phone Book"}];



//type Props = {};
export default class Index extends Component {


  componentWillMount() {

    const getUserToken = async () => {
      
      let userId = '';
      try {
        userId = await AsyncStorage.getItem('UserInfo') || 'NoData';
      } catch (error) {
        console.log(error.message);
      }
      return userId;
    }

    getUserToken().then((token) => {
      // TODO Change Page 

      if (token !== 'NoData'){ 

        this.props.navigation.navigate('Login');
      }

    })  
  }

  render() {
    const handlePress = () => false
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      
      <ImageBackground source={require('../asset/bg2.png')} style={ { flex: 1, width: null, height: null } }>
          <View style={styles.box1}>  
          <Image source={require('../asset/Avartar.png')} style={{width: 60,height: 60, marginLeft: -275, marginTop: 30, borderRadius:30}}/>
            <View style={{height: 60, width: '50%'}}>          
              <Text style={{fontSize: 20, marginTop: -35}}>Hello Suthiporn</Text>
              <Text style={{fontSize: 15, marginTop: 0}}>Description</Text>
            </View>
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
 
            width: '32.50%',
            height: 120,
            justifyContent: 'center',
            margin: ".50%"


  },

  Btn02: {
    backgroundColor: "rgba(255,255,255,.2)",
    
            width: '32.50%',
            height: 120,
            display: 'none',
            justifyContent: 'center',
          margin: ".50%"

  },

  Btn03: {
    backgroundColor: "rgba(255,255,255,.2)",

            width: '32.50%',
            height: 120,
            display: 'none',
            justifyContent: 'center',
            margin: ".50%"

  },


  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 20,
    // borderWidth: 1,
  }
  /*Header: {
    leftComponent={ icon: 'menu', color: '#fff' },
    centerComponent={ text: 'MY TITLE', style: { color: '#fff' } },
    rightComponent={ icon: 'home', color: '#fff' }
  }*/
});
