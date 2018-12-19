import React, { Component } from 'react';
import { Alert,  TextInput, View, StyleSheet, ImageBackground,Image   } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';



export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username}  ${password}`);
  }

  render() {
    return (
      <ImageBackground source={require('../asset/bg1.png')} style={ { flex: 1, width: null, height: null } }>
        <View style={styles.container}>
        <Image style={styles.imageIcon}
          source={require('../asset/msc1.png')}
        />
          <TextInput 
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Button rounded
            style={styles.btnLogin}
            onPress={this.onLogin.bind(this)}
          >
              <Text uppercase={false} style={{ fontSize: 18, fontWeight:'bold'}}>Login</Text>
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
    height: 44,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor:'rgba(255,255,255,0.5)'

  },
  btnLogin:{
      width: 300,
      height: 44,
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
