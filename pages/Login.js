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
        usernameColor: 'rgba(255,0,0,0.4)',
        passwordColor: 'rgba(255,0,0,0.4)',
        alertMessage: 'กรุณาใส่ Username หรือ Password ให้ครบ'
        
      });
    }else if ( username.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(255,0,0,0.4)',
        passwordColor: 'rgba(255,255,255,0.4)',
        alertMessage: 'กรุณาใส่ Username ให้ครบ'

      })
    }else if ( password.length === 0 ) {

      this.setState({
        usernameColor: 'rgba(255,255,255,0.4)',
        passwordColor: 'rgba(255,0,0,0.4)',
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
      <ImageBackground source={require('../asset/bg2.png')} style={ { flex: 1, width: null, height: null } }>
        <View style={styles.container}>
          <Image style={styles.imageIcon}
            source={require('../asset/msc1.png')}
          />
            <Text style={{ fontSize: 13 ,color:'red',marginBottom:5  }}> { this.state.alertMessage } </Text>

          <TextInput 
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={[styles.input, { backgroundColor: this.state.usernameColor }]}

          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={[styles.input, { backgroundColor: this.state.passwordColor }]}
          />
          
          <Button rounded
            style={styles.btnLogin}
            onPress={this.onLogin.bind(this)}
          >
              <Text uppercase={false} style={{ fontSize: 18, fontWeight:'bold'}}>LOG IN</Text>
          </Button>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,

        
  },
  btnLogin:{
      width: 300,
      height: 40,
      marginBottom: 10,
      alignSelf: "center",
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,

  },
  bgColor:{
    backgroundColor: '#C6FFDD',

  },
  imageIcon:{
    width:150,
    height:75,
    marginBottom:50,
    

  },

});
