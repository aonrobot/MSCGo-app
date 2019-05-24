import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';

// import {Actions} from 'react-native-router-flux'
export default class LayoutHeader extends Component {
  constructor(props){
    super(props)
    let callFrom = this.props.page || '' 
    this.state = {title : 'iCard', callFrom : callFrom}
  }

  componentWillMount() {
    this.setState({
      title: this.props.title
    });
  }

  render() {

    let backBtn
    
    if(this.state.callFrom === 'showcard' || this.state.callFrom === 'viewcard' || this.state.title === 'My Card'){
      backBtn = <Button transparent onPress={() => this.props.navigation.goBack()}><Icon style={{ fontSize:28, color: 'white', marginLeft: 10 }} name='md-arrow-back' /></Button>
    }
    
    return (
        <Header style={{backgroundColor : "#1abc9c"}}>
          <StatusBar backgroundColor="#1abc9c"barStyle="light-content" />
            <Left>{backBtn}</Left>
            <Body>
              <Title style={{fontSize:19, color:"white"}} transparent={true}> {this.state.title}</Title>
            </Body>
            <Right>
            </Right>
        </Header>
    );
  }
}