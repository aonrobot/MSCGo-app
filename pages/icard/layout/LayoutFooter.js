import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Footer, FooterTab, Button, Icon, Text, StyleProvider } from 'native-base';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/platform';

export default class LayoutFooter extends Component {
  constructor(props) {
      super(props)
      console.log('current state (footer)', this.props.navigation.state.routeName)
      this.state = { current : this.props.navigation.state.routeName }
  }

  _onPressFooterMenu(menu){
    switch(menu){
      case 'mycard' :
        //this.setState({ current : '' })
        this.props.navigation.navigate('IcardHome')
      break;
      case 'newcard' :
        //this.setState({ current : '' })
        this.props.navigation.navigate('IcardNewCardInfo')
      break;
      // case 'profile' :
      //   this.setState({ current : 'profile' })
      //   Actions.state.index = 0    
      //   Actions.profile()
      // break;
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Footer>
          <FooterTab style={{backgroundColor : "#FFF"}}>
            <Button vertical active={this.state.current === 'IcardHome' || this.state.current === 'IcardViewCard' ? true : false} onPress={() => this._onPressFooterMenu('mycard')}>
              <Icon style={styles.icon} name="md-card" />
              <Text style={styles.text}>My Card</Text>
            </Button>
            <Button vertical active={this.state.current === 'IcardNewCardInfo' || this.state.current === 'IcardNewCardPreview' ? true : false} onPress={() => this._onPressFooterMenu('newcard')}>
              <Icon style={styles.icon} name="md-add-circle" />
              <Text style={styles.text}>Create</Text>
            </Button>
            {/* <Button vertical active={this.state.current === 'profile' ? true : false} >
              <Icon style={styles.icon} name="md-person" />
              <Text style={styles.text}>Me</Text>
            </Button> */}
          </FooterTab>
        </Footer>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({
  
})
