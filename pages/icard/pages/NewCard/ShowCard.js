import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Image, View, Alert, Platform } from 'react-native';
import { Container, Header, Content,
     Button, Text, Icon, Form, Item,
     Label, Input, List, Card, CardItem,
     Left, Right, Body, Thumbnail} from 'native-base';

import LayoutHeader from '../../layout/LayoutHeader'
import LayoutFooter from '../../layout/LayoutFooter'

export default class ShowCard extends Component {
  constructor(props){
      super(props)

      const { navigation } = this.props;

      this.state = {
        headerTiile : 'E-Business Card',
        headerPage : 'showcard',

        cards : [],

        nameTH : navigation.getParam('info').nameTH,
        lastnameTH : navigation.getParam('info').lastnameTH,
        nameEN : navigation.getParam('info').nameEN,
        lastnameEN : navigation.getParam('info').lastnameEN,
        position : navigation.getParam('info').position,
        department : navigation.getParam('info').department,
        contactTel : navigation.getParam('info').contactTel,
        contactDir : navigation.getParam('info').contactDir,
        contactFax : navigation.getParam('info').contactFax,
        email : navigation.getParam('info').email,
        company :  navigation.getParam('info').company,
        avatar : navigation.getParam('info').avatar,
        qrImageUrl : "uri",
      }

  }

  _onPressSuccessBtn (){
    this._addCard()
  }

  async _addCard() {

    const { navigation } = this.props;

    let userInfo = await AsyncStorage.getItem('@userInfo')
    userInfo = await JSON.parse(userInfo).userInfo

    fetch('https://fora.metrosystems.co.th/icard/api/card/create', {
      method: 'POST',
      timeout: 1,
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          u : userInfo.Login.toLowerCase(),
          c : navigation.getParam('info').company,
          nT : navigation.getParam('info').nameTH,
          lT : navigation.getParam('info').lastnameTH,
          nE : navigation.getParam('info').nameEN,
          lE : navigation.getParam('info').lastnameEN,
          p : navigation.getParam('info').position,
          d : navigation.getParam('info').department,
          cT : navigation.getParam('info').contactTel,
          cD : navigation.getParam('info').contactDir,
          cF : navigation.getParam('info').contactFax,
          e : navigation.getParam('info').email
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
        alert('ไม่สามารถบันทึก card ได้ในขนาดนี้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
    })

  }

  async genQr(){

    fetch('https://fora.metrosystems.co.th/icard/api/card/nextId', {method: 'GET'})
    .then((response) => {
        return response.json()
    })
    .then(async(responseJSON)=>{
        let result = responseJSON.result
        let data = responseJSON.data

        let lastCardId = 0
        let CARD_url = ''
        if(result == true || result == 'true'){                
          lastCardId = data.CARD_id
          CARD_url = data.CARD_url
        }

        let src = "https://chart.googleapis.com/chart?cht=qr&chs=350x350&chl=" + CARD_url +"&choe=UTF-8"

        this.setState({qrImageUrl : src})
    })
    .catch((error) => {
        alert('ไม่สามารถติดต่อ Server ได้')
        this.props.navigation.navigate('IcardHome')
    })

  }

  componentWillMount() {
    this.genQr()
  }

  render() {
    return (
    <Container>
      <LayoutHeader title={this.state.headerTiile} page={this.state.headerPage} />
      <Content style={styles.container}>
        <View style={styles.qrWrapper}>
          <Image source={{uri: this.state.qrImageUrl}}
                  style={{width: 350, height: 350}} />
        </View>
        <View style={styles.btnWrapper}>
          <Button rounded iconLeft success onPress={() => this._onPressSuccessBtn()}>
            <Icon name='md-checkmark-circle' />
            <Text>Save E-Business Card ของฉัน</Text>
          </Button>
        </View>
      </Content>
      <LayoutFooter navigation={this.props.navigation}/>
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
    flexDirection : 'row',
    justifyContent : 'center',
    padding : 10
  },
  btnWrapper : {
    paddingTop : 25,
    paddingBottom : 40,
    paddingRight : 15,
    flex : 1,
    flexDirection: 'row',
    justifyContent : 'flex-end'
  }
})