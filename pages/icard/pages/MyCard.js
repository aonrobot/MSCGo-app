import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Button, Icon, H2 } from 'native-base';
import { NavigationEvents } from 'react-navigation';

import LayoutHeader from '../layout/LayoutHeader'
import LayoutFooter from '../layout/LayoutFooter'

// import {Actions} from 'react-native-router-flux'

export default class MyCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoad : false,
            headerTitle : 'My Card',
            userLogin : '',
            cards : []
        }
    }

    _onPressViewCard (id) {
        this.props.navigation.navigate('IcardViewCard', { cardId: id, userLogin: this.state.userLogin })
    }

    // _getUserLoginDetail(username){

    //     this.setState({isLoad : true})
        
    //     fetch('https://fora.metrosystems.co.th/icard/api/employee/' + username, {
    //         method: 'GET'
    //     })
    //     .then((response) => {
    //         if (response.status >= 400) {
    //             throw new Error("Bad response from server");
    //         }
    //         return response.json()
    //     })
    //     .then(async(responseJSON)=>{
            
    //         let result = responseJSON.result
    //         let data = responseJSON.data
    //         this.setState({isLoad : false})
    //         if(result == true || result == 'true'){                
    //             await AsyncStorage.setItem('@userInfo', JSON.stringify(data))
    //             this.setState({userLogin : data[0].Login})
    //         }else{
    //             alert('ไม่พบข้อมูลผู้ใช้งานในระบบ กรุณาติดต่อผู้ดูแลระบบ')
    //             await AsyncStorage.setItem('@userLogin', '')
    //             await AsyncStorage.setItem('@isLogin', 'false')
    //             this.props.navigation.navigate('Home')
    //         }
    //     })
    //     .catch((error) => {
    //         this.setState({isLoad : false})
    //         AsyncStorage.setItem('@userLogin', '')
    //         AsyncStorage.setItem('@isLogin', 'false')
    //         alert('ไม่สามารถติดต่อ Server ได้')
    //         this.props.navigation.navigate('Home')
    //     })
    // }

    async _checkLogin() {
        let isLogin = await AsyncStorage.getItem('@isLogin')
        let userLogin = await AsyncStorage.getItem('@userLogin')
        // TODO: where " come from
        userLogin = userLogin.replace(/"/g, '');
        if(isLogin == 'true' || isLogin === true) {
            //this._getUserLoginDetail(userLogin)
            this._updateList(userLogin)
        } else {
            alert("Don't login please login first!!")
            this.props.navigation.navigate('Home')
        }
    }

    _updateList(username) {

        axios.get('https://fora.metrosystems.co.th/icard/api/card/of/' + username)
        .then((responseJSON) => {
            
            let result = responseJSON.data.result
            let data = responseJSON.data.data

            this.setState({isLoad : false})

            if(result == true || result == 'true'){   
                this.setState({cards : data})
            }
        })
        .catch((error) => {
            this.setState({isLoad : false})
            console.log('errorrr', error)
            alert('ไม่สามารถดึงข้อมมูล card มาได้ กรุณาตรวจสอบการเชื่อมต่อ Internet')
        })

    }

    componentWillMount(){
        this._checkLogin()
    }

    componentDidMount(){
    }
    
    render() {

      var showCardContainer;

      if(this.state.cards.length <= 0) {
        showCardContainer = 
          (
            <View style={styles.noCardContainer}>
                <Icon style={styles.icon} name="md-cloud-outline" />
                <H2 style={styles.noCardLabel}>ยังไม่มี Card ที่สร้างไว้เลย :(</H2>
            </View>
          )
      } else {
        showCardContainer = 
          (
            <View>
                <NavigationEvents
                    onWillFocus={() => this._checkLogin()}
                />
                <List>
                    {
                        [...this.state.cards].map(
                            (x, i) => 
                            <ListItem key={i}>
                                <Thumbnail square source={{ uri: x.avatar_url }} />
                                <Body>
                                    <Text>{x.nameEN} {x.lastnameEN}</Text>
                                    <Text note>{x.position} ({x.department})</Text>
                                    <Text note>{x.companyName}</Text>
                                </Body>
                                <View style={styles.viewBtnWrapper}>
                                    <Button bordered onPress={() => this._onPressViewCard(x.id)}>
                                        <Text>View</Text>
                                    </Button>
                                </View>
                            </ListItem>
                        )
                    }
                </List>
            </View>
          )
      }
      
    return (
            <Container>
                {
                    <LayoutHeader title={this.state.headerTitle} navigation={this.props.navigation}/>
                }

                <Content style={styles.container}>

                {
                    this.state.isLoad ?

                    <View style={styles.activityIndicatior}>
                        <ActivityIndicator size="large" color="#3498db"/>
                    </View>

                    :

                    showCardContainer
                    
                }
                
                </Content>
                <LayoutFooter 
                    navigation={this.props.navigation}
                />

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    activityIndicatior : {
        marginTop : 20
    },
    container : {
        backgroundColor : '#FFF',
    },
    noCardContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 100
    },
    noCardLabel : {
        color : '#CCC'
    },
    icon:{
        color : '#DDD',
        fontSize : 58
    },
    avatar : {
        width: 100,
        height:100
    },
    viewBtnWrapper : {
        
    }
})