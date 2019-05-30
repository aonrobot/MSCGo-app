import React, { Component } from 'react';
import { Alert,  TextInput, View, StyleSheet, ImageBackground, Image, AsyncStorage  } from 'react-native';
import { Container, Header, Content, Button, Text, Icon, Thumbnail } from 'native-base';
import Config from 'react-native-config'

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      usernameColor: 'rgba(0 ,0 ,0 , 0.1)',
      passwordColor: 'rgba(0 ,0 ,0 , 0.1)',
      alertMessage : ''
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    if ( username.length === 0 && password.length === 0  ) {

      this.setState({
        usernameColor: 'rgba(255, 118, 117, 0.4)',
        passwordColor: 'rgba(255, 118, 117, 0.4)',
        alertMessage: 'กรุณาใส่ Username หรือ Password ให้ครบ'
        
      });
    }else if ( username.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(255, 118, 117, 0.4)',
        passwordColor: 'rgba(0 ,0 ,0 , 0.1)',
        alertMessage: 'กรุณาใส่ Username ให้ครบ'

      })
    }else if ( password.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(0 ,0 ,0 , 0.1)',
        passwordColor: 'rgba(255, 118, 117, 0.4)',
        alertMessage: 'กรุณาใส่ Password ให้ครบ'
      })
    }
    else {
      fetch('http://mis_test.metrosystems.co.th/mscgoapp/api/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: username,
            password:  password,
          }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          
          console.log("responseJson",responseJson)
          console.log("username", this.state.username)
          console.log("password", this.state.password)
          console.log("result",responseJson.result)

          if (responseJson.result) {

            AsyncStorage.setItem('@userInfo', JSON.stringify(responseJson.data));
            AsyncStorage.setItem('@userLogin', JSON.stringify(responseJson.data.userInfo.Login));
            AsyncStorage.setItem('@isLogin', 'true')

            const getUserToken = async () => {

              let userId = '';

              try {
                userId = await AsyncStorage.getItem('@userInfo') || 'NoData';
              } catch (error) {
                console.log(error.message);
              }
              return userId;
            }

            getUserToken().then((token) => {
              // TODO Change Page 
              this.props.navigation.navigate('Home');
        
            })  

          } else {
            if (responseJson.result == false) {
              alert(responseJson.message)
            }
            this.setState({
              alertMessage: 'Username หรือ Password ผิด'
            });
          }
      })
      .catch((error) => {
        console.error(error);
        alert(error)
      });

      this.setState({
        usernameColor: 'rgba(0 ,0 ,0 , 0.2)',
        passwordColor: 'rgba(0 ,0 ,0 , 0.2)',
      });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.loginBox}>
            {/* <Image style={styles.imageIcon}
              source={require('../asset/msc1.png')}
            /> */}
            <Image style={{height: 150, width: 150}} source={require('../asset/images/logo.png')} />
            <View style={styles.logoLabelBox}>
              <Text style={styles.logoLabel}>Metrosystems</Text>
              <Text style={[styles.logoLabel, styles.logoLabelGo]}>Go</Text>
            </View>
            <Text style={{ fontSize: 13 ,color:'#d63031',marginBottom:5  }}> { this.state.alertMessage } </Text>
            <TextInput
              value={this.state.username}
              autoFocus={true}
              textContentType={'username'}
              autoCapitalize={'none'}
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Username'}
              style={[styles.input, { borderColor: this.state.usernameColor, borderBottomWidth: 2 }]}
            />
            <TextInput
              value={this.state.password}
              textContentType={'password'}
              autoCapitalize={'none'}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Password'}
              secureTextEntry={true}
              style={[styles.input, { borderColor: this.state.passwordColor, borderBottomWidth: 2 }]}
            />

            <Button full
              style={styles.btnLogin}
              onPress={this.onLogin.bind(this)}>
                <Icon name='ios-log-in'/>
                <Text uppercase={false} style={styles.btnLoginLabel}>LOG IN</Text>
            </Button>

            <Button full bordered
              style={styles.btnForget}>
                <Icon name='ios-lock' style={styles.btnForgetIcon}/>
                <Text uppercase={false} style={styles.btnForgetLabel}>Forget Password</Text>
            </Button>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEFEFE'
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    borderWidth: 0.4,
    borderColor: 'rgba(0 ,0 ,0 , 0.5)'
  },
  logoLabelBox: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12
  },
  logoLabel: {
    fontFamily: 'Source Sans Pro',    
    fontSize: 25
  },
  logoLabelGo: {
    fontFamily: 'Source Sans Pro',
    paddingLeft: 3,
    color: '#2d98da'
  },
  loginBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLogin: {
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#3C40C5',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#6569d8',
    shadowOffset: { height: 0, width: 0 },
  },
  btnLoginLabel: {
    fontFamily: 'Source Sans Pro',
    color: '#FFF',
    fontSize: 18,
    fontWeight:'bold',
    marginLeft: -20
  },
  btnForget: {
    borderRadius: 20,
    marginTop: 20,
    borderColor: '#3C40C5'
  },
  btnForgetIcon: {
    color:'#3C40C5',
    fontSize: 16
  },
  btnForgetLabel: {
    color: '#6c5ce7',
    fontSize: 12,
    marginLeft: -25
  },
  bgColor: {
    backgroundColor: '#C6FFDD',
  },
  imageIcon: {
    width:150,
    height:75,
    marginBottom:50,
  }
});
