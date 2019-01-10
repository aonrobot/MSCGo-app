import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, View, ImageBackground, SafeAreaView, Image, AsyncStorage} from 'react-native';
import { Container, Header, Title, Left, Right, Body, Button, Content, ActionSheet, Text, Icon} from "native-base";
import Config from 'react-native-config'

export default class Index extends Component {

  constructor(props) {
      super(props);
      
      this.state = {
          userInfo : {},   
      };
  }

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
      if (token === 'NoData') { 
        this.props.navigation.navigate('Login');
      } else {
        let userInfo = JSON.parse(token);
        this.setState({
          userInfo: userInfo.userInfo
        })
      }

    })
  }

  async logout() {
    await AsyncStorage.setItem('UserInfo', 'NoData');
    this.props.navigation.navigate('Login');
  }

  render() {
    const handlePress = () => false
    return (
      
      <SafeAreaView style={{flex: 1, backgroundColor: '#f7f7f7'}}>
        {/* <ImageBackground source={require('../asset/bg2.png')} style={ { flex: 1, width: null, height: null } }> */}
          
          <ImageBackground source={require('../asset/images/77-4.png')} style={ { height: 100 } }> 
          <Image source={{uri: this.state.userInfo.imgPath }} style={{width:70,height:70, marginTop:25,marginLeft:10,borderRadius:40, backgroundColor: '#f7f7f7'}}/>
            <View style={{height: 60, width: '100%'}}>          
              <Text style={{fontSize: 20, marginTop: -43,marginLeft:85}}> {this.state.userInfo.FirstName} {this.state.userInfo.LastName}  </Text>
              <Text style={{fontSize: 15, marginTop: 0,marginLeft:85}}> { this.state.userInfo.PositionNameEng } </Text>
            </View>
            </ImageBackground>
            <Text style={{fontSize: 18,marginLeft:10,marginTop:10,fontWeight:'bold', color:'#282828'}}>Explore METRO Go</Text>
            <Text style={{fontSize: 12,marginLeft:10, color:'#4a4a4a'}}>Checkout all 2 services</Text>

          <View style={styles.container}>
              <Button style={styles.Btn01} onPress={() => {  this.props.navigation.navigate('Contact'); }}>
                  <Image source={require('../asset/images/contact.png')} style={{width: 65,height: 65,marginLeft:18,marginTop:5,marginBottom:'auto'}}/>
                  <Text style={{fontSize: 12,marginTop:'auto', marginLeft:'auto', color:'#282828'}}>Phone Book</Text>
              </Button>
          </View>
          <View style={styles.containers}>
            <Text style={{fontSize: 18,marginLeft:10,fontWeight:'bold', color:'#282828'}}>METRO Happiness</Text>
          </View>
          

          <Button danger full onPress={() => { this.logout() }}>
            <Icon name='ios-exit'/>
            <Text>Logout</Text>
          </Button>
        {/* </ImageBackground> */}
      </SafeAreaView>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 2,
    paddingLeft: 2,
    paddingTop: 2,
    margin:'auto',
    height:'60%'
    
  },
  containers: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    marginLeft: 220,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 20,
    width: "100%"
  },
  Btn01: {
    
    backgroundColor: "rgb(255,255,255)",
    width: '29%',
    height: 100,
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 10,
    //shadow for ios
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowColor: '#cacaca',
    shadowOffset: { height: 0, width: 0 },
    marginTop:10,
    //shadow for android
    elevation: 8,
    position:'relative',

  

  },
  Btn02: {
    
    backgroundColor: "rgb(255,255,255)",
    width: '25%',
    height: 100,
    justifyContent: 'center',
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowColor: '#cacaca',
    shadowOffset: { height: 0, width: 0 },
    marginTop:10,
    display:'none'
  },
  Btn03: {
    
    backgroundColor: "rgb(255,255,255)",
    width: '25%',
    height: 100,
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowColor: '#cacaca',
    shadowOffset: { height: 0, width: 0 },
    marginTop:10,
    display:'none'
  },
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: 'rgba(255,255,255,1)',
    
  }
});
