import React, {Component} from 'react';
import { Alert, Platform, StyleSheet, View, ImageBackground,
        SafeAreaView, Image, AsyncStorage, StatusBar, Linking} from 'react-native';
import { Container, Header, Title, Left, Right, Body, Button, Content, ActionSheet, Text, Icon} from "native-base";
import Config from 'react-native-config'

export default class Index extends Component {

  constructor(props) {
      super(props);
      
      this.state = {
          userInfo : {},   
      };
  }

  componentDidMount() {
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
        let firstName = userInfo.userInfo.FirstNameEng.toLowerCase();
        let lastName = userInfo.userInfo.LastNameEng.toLowerCase();
        userInfo.userInfo.FirstNameEng = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        userInfo.userInfo.LastNameEng = lastName.charAt(0).toUpperCase() + lastName.substr(1, 2);
        this.setState({
          userInfo: userInfo.userInfo
        })
      }

    })
  }

  async logout() {
    //await AsyncStorage.setItem('UserInfo', 'NoData');
    //this.props.navigation.navigate('Login');
    Linking.openURL('tel://+66838692401').catch(err => console.error('An error occurred', err));
  }

  logout2() {
    //await AsyncStorage.setItem('UserInfo', 'NoData');
    //this.props.navigation.navigate('Login');
    Linking.openURL('CISCOTEL://+66838692401').catch(err => console.error('An error occurred', err));
  }

  callNumber = (url) =>{
      Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      console.log('Can\'t handle url: ' + url);
      } else {
      return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const handlePress = () => false
    var firstName = this.state.userInfo.FirstNameEng;
    var lastName = this.state.userInfo.LastNameEng;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fefefe'}}>
        <StatusBar backgroundColor="#000" />
        <ImageBackground source={require('../asset/images/Phonebook-Header.jpg')} style={ { height: 100 } }>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexGrow: 1, paddingLeft: 15, paddingBottom:0,}}>      
              <Text style={styles.title}> 
                Hello, {firstName} {lastName}
              </Text>
              <Text style={styles.subTitle}> { this.state.userInfo.PositionNameEng } </Text>
              <Button danger style={styles.btnLogout} onPress={() => { this.logout() }}>
                <Icon name='ios-log-out' style={styles.btnLogoutIcon}/>
              </Button>
              <Button danger style={styles.btnLogout} onPress={() => { this.logout2() }}>
                <Icon name='ios-log-out' style={styles.btnLogoutIcon}/>
              </Button>
            </View>
            <View style={{padding: 15}}>
              <Image source={{uri: this.state.userInfo.imgPath }} style={{width:70, height:70, borderRadius:40}}/>
            </View>
          </View>
        </ImageBackground>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.section}>
            <Text style={{fontSize: 19,marginLeft:10,marginTop:10,fontFamily: 'Source Sans Pro',fontWeight:'bold', color:'#282828'}}>Explore METRO Go</Text>
            <Text style={{fontSize: 12,marginLeft:10, fontFamily: 'Source Sans Pro', color:'#4a4a4a'}}>Checkout all 2 services</Text>
            <View style={styles.services}>
                <Button style={styles.Btn01} small onPress={() => {  this.props.navigation.navigate('Contact'); }}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../asset/images/contact.png')} style={{width: 65,height: 65}}/>
                    <Text style={{fontSize: 14, fontFamily: 'Source Sans Pro', color:'#282828'}}>Phone Book</Text>
                  </View>
                </Button>
            </View>
          </View>
          <View>
            <View style={styles.section}>
              <Text style={{fontSize: 18,marginLeft:10,fontWeight:'bold', color:'#282828'}}>METRO Happiness</Text>
              <View style={styles.boxs}>
                <View style={styles.boxSection}>
                
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <Button primary full onPress={()=> this.callNumber(`tel:+66838692401`)}>
          <Icon name='ios-phone' style={styles.btnLogoutIcon}/>
          <Text style={styles.btnLogoutLabel}>call</Text>
        </Button> */}
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
  title: {
    fontFamily: 'Source Sans Pro',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  subTitle: { 
    fontFamily: 'Source Sans Pro',
    fontSize: 12,
    color:'rgba(255, 255, 255, 0.7)',
    marginLeft: -2
  },
  section: {
    marginBottom: 45
  },
  welcome: {
    fontFamily: 'Source Sans Pro',
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
  btnLogout: {
    marginTop: 8,
    backgroundColor: 'rgba(231, 127, 103, 0.0)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    paddingTop: 0, paddingBottom: 0, height: 25, width: 25, justifyContent: "center"
  },
  btnLogoutIcon: {
    marginLeft: 0, marginRight: 0, fontSize: 13
    //color: '#d9534f',
    //fontSize: 16,
    //marginTop: 12
  },
  btnLogoutLabel: {
    fontFamily: 'Source Sans Pro',
    color: '#FFF',
    fontSize: 18,
    marginLeft: -25
  },
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  services: {
    
  },
  boxs: {
    paddingTop: 12
  },
  boxSection: {
    backgroundColor: '#fc5c65',
    width: '100%',
    height: 150
  }
});
