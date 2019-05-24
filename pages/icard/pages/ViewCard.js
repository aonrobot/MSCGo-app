import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert, Linking } from 'react-native';
import { Container, Content, Button, Text, Icon} from 'native-base';

import LayoutHeader from '../layout/LayoutHeader'
import LayoutFooter from '../layout/LayoutFooter'

export default class ViewCard extends Component {
  constructor(props){
      super(props)
      this.state = {
        headerTiile : 'View Card',
        headerPage : 'viewcard',
        qrImageUrl : 'not have image'
      }
  }

  _onPressDeleteBtn (){
    this._deleteCard()
  }
  
  _onPressOpenLinkBtn(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  async _deleteCard() {

    const { navigation } = this.props;
    let username = navigation.getParam('userLogin')
    let cardId = navigation.getParam('cardId')

    Alert.alert(
      'คุณแน่ใจนะว่าต้องการ ลบ card นี้',
      'กดปุ่ม Ok เพื่อลบ card',
      [
        {text: 'Cancel', onPress: () => false, style: 'cancel'},
        {text: 'OK', onPress: () => {
          
          fetch('https://fora.metrosystems.co.th/icard/api/card/delete', {
              method: 'POST',
              timeout: 1,
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username : username,
                  cardId : cardId
              })
          })
          .then((response) => {
              return response.json()
          })
          .then(async(responseJSON)=>{
              let result = responseJSON.result
              if(result == true || result == 'true'){
                  this.props.navigation.navigate('IcardHome')
              }
          })
          .catch((error) => {
              alert('ไม่สามารถลบ card ได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
          })

        }},
      ], { cancelable: false }
    )

  }

  _getCard() {

    const { navigation } = this.props;

    fetch('https://fora.metrosystems.co.th/icard/api/card/' + navigation.getParam('cardId'), {
        method: 'GET'
    })
    .then((response) => {
        return response.json()
    })
    .then(async(responseJSON)=>{
        
        let result = responseJSON.result
        let data = responseJSON.data[0]
        if(result == true || result == 'true'){          
          this.setState({
            qrImageUrl : data.qrcode_url,
            headerTiile : data.nameEN + ' ' + data.lastnameEN
          })
        }
    })
    .catch((error) => {
        alert('ไม่สามารถดึงข้อมมูล card มาได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
    })
  }

  componentWillMount(){
    this._getCard()
  }

  render() {

    const { navigation } = this.props;

    return (
    <Container>
  		<LayoutHeader 
        title={this.state.headerTiile} 
        page={this.state.headerPage}
        navigation={this.props.navigation}
        />

    	<Content style={styles.container}>
        <Text style={styles.title}><Icon name="md-card" style={styles.titleIcon} />   นี่คือ QR Code ของคุณ</Text>
        <View style={styles.btnWrapper}>
          <Button style={styles.btn} rounded iconLeft info onPress={() => this._onPressOpenLinkBtn('https://fora.metrosystems.co.th/icard/card/' + navigation.getParam('cardId'))}>
            <Icon name='md-eye' />
            <Text>View</Text>
          </Button>
          <Button style={styles.btn} rounded iconLeft danger onPress={() => this._onPressDeleteBtn()}>
            <Icon name='md-trash' />
            <Text>Delete</Text>
          </Button>
        </View>
        <View style={styles.qrWrapper}>
          <Image source={{uri: this.state.qrImageUrl}}
                  style={{width: 350, height: 350}} />
        </View>
      </Content>

      <LayoutFooter 
        navigation={this.props.navigation}
      />
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : '#EEE',
    paddingTop : 15,
    paddingBottom: 15
  },
  title : {
    paddingBottom : 20,
    paddingLeft : 15,
    fontSize : 16
  },
  qrWrapper : {
    flex : 1,
    paddingBottom : 30,
    flexDirection : 'row',
    justifyContent : 'center',
    padding : 10
  },
  btn : {
    marginRight : 8
  },
  btnWrapper : {
    paddingTop : 15,
    paddingBottom : 10,
    paddingRight : 15,
    flex : 1,
    flexDirection: 'row',
    justifyContent : 'flex-end'
  }
})