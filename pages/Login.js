import React, { Component } from 'react';
import { Alert,  TextInput, View, StyleSheet, ImageBackground, Image, AsyncStorage  } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      usernameColor: 'rgba(255,255,255,0.4)',
      passwordColor: 'rgba(255,255,255,0.4)',
      alertMessage : ''
    };
  }
  
  onLogin() {
    const { username, password } = this.state;
    if ( username.length === 0 && password.length === 0  ) {

      this.setState({
        usernameColor: 'rgba(255, 118, 117, 1)',
        passwordColor: 'rgba(255, 118, 117, 1)',
        alertMessage: 'กรุณาใส่ Username หรือ Password ให้ครบ'
        
      });
    }else if ( username.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(255, 118, 117, 1)',
        passwordColor: 'rgba(255,255,255,0.4)',
        alertMessage: 'กรุณาใส่ Username ให้ครบ'

      })
    }else if ( password.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(255,255,255,0.4)',
        passwordColor: 'rgba(255, 118, 117, 1)',
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

          if (responseJson.result) {

            AsyncStorage.setItem('UserInfo', JSON.stringify(responseJson.data));

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
              this.props.navigation.navigate('Home');
        
            })  

          }else {
            this.setState({
              alertMessage: 'Username หรือ Password ผิด'
            });
          }
        })
        .catch((error) => {
        console.error(error);
      });
      this.setState({
        usernameColor: 'rgba(255,255,255,0.4)',
        passwordColor: 'rgba(255,255,255,0.4)',
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
            <View style={styles.logoLabelBox}>
              <Text style={styles.logoLabel}>MSC</Text>
              <Text style={[styles.logoLabel, styles.logoLabelGo]}>Go</Text>
            </View>
            <Text style={{ fontSize: 13 ,color:'#d63031',marginBottom:5  }}> { this.state.alertMessage } </Text>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Username'}
              style={[styles.input, { borderBottomColor: this.state.usernameColor, borderBottomWidth: 2 }]}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Password'}
              secureTextEntry={true}
              style={[styles.input, { borderBottomColor: this.state.passwordColor, borderBottomWidth: 2 }]}
            />
            <Button full
              style={styles.btnLogin}
              onPress={this.onLogin.bind(this)}
            >
                <Text uppercase={false} style={styles.btnLoginLabel}>LOG IN</Text>
            </Button>
            <Button full bordered
              style={styles.btnForget}
            >
                <Text uppercase={false} style={styles.btnForgetLabel}>Register</Text>
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
    fontFamily: 'Source Sans Pro'
  },
  logoLabelBox: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 25
  },
  logoLabel: {
    fontSize: 40
  },
  logoLabelGo: {
    paddingLeft: 8,
    color: '#22CCDD'
  },
  loginBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLogin: {
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#6c5ce7'
  },
  btnLoginLabel: {
    fontFamily: 'Source Sans Pro',
    fontSize: 18,
    fontWeight:'bold'
  },
  btnForget: {
    borderRadius: 20,
    marginTop: 20,
    borderColor: '#6c5ce7'
  },
  btnForgetLabel: {
    color: '#6c5ce7',
    fontSize: 14
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
