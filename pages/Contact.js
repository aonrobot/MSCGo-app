import React, { Component } from 'react';
import { View, StyleSheet, Alert,AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Input ,Item , Content, List, ListItem, Thumbnail, Text, rounded ,Spinner } from 'native-base';
import Config from 'react-native-config'

export default class Contact extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            empData : [],
            empDataTemp : [],
            token: '',
            loading: false,
            outerScrollEnable: true,
        };

        verticalScroll = (index) => {
            if(index !== 1 ){
                this.setStaut({
                outerScrollEnable: false
                })
            }else{
                this.setStaut({
                outerScrollEnable: true
                })
            }
        }
    }

    componentWillMount() {

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
        
            if (token === 'NoData'){ 

                this.props.navigation.navigate('Login');
            }else {
                let data = JSON.parse(token);
                this.setState({
                    token: data.token
                });
                this.getEmp();

            }

        })  

    }

    getEmp() {
        this.setState({
            loading : false
        });

        fetch('http://mis_test.metrosystems.co.th/mscgoapp/api/employees',{
            method: 'GET' , 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                empData : responseJson,
                empDataTemp : responseJson,
                loading : true
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    onSearchChange(text){ 
        this.setState({
            loading : false
        });
        fetch('http://mis_test.metrosystems.co.th/mscgoapp/api/employees/search?q='+text,{
            method: 'GET' , 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                empData : responseJson,
                loading : true
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    listEmployee(empData) {
        return (empData.length === 0) ?  
            <ListItem thumbnail style={styles.listitem}>
                <Body>
                    <Text note numberOfLines={1}>No Result</Text>
                </Body>
            </ListItem>
        :
            <List >
                {   
                    empData.map(item => {
                        return ( 
                            <ListItem thumbnail style={styles.listitem}>
                            <Left>
                                <Thumbnail style={styles.imgbox} source={{ uri: item.imgPath }} />
                            </Left>
                            <Body style={{paddingTop: 5,paddingBottom: 5}}>
                                <Text style={[styles.text1color]}>
                                {
                                    (item.NickName != "") ?
                                    "("+item.NickName+") ": ""
                                }
                                {item.FullName}
                                </Text>
                                <Text style={[{ fontSize:14 },styles.text2color]}> {item.email}</Text>
                                
                                    <Text note numberOfLines={1} style={[styles.text2color]} > 
                                    { 
                                        ( item.Phone3  != "") ?
                                        "("+item.Phone3+") ": "     -"
                                    }  
                                    </Text>                              
                            </Body>
                            <Right style={{marginRight: 14}} >
                                <Button iconLeft transparent primary>
                                    <Icon type="FontAwesome5" name="phone" style={{fontSize: 22, color: 'green'}} />
                                </Button>
                            </Right>
                            </ListItem>
                        )
                    })
                }
            </List> 
    }

    render() {

        return (

        <Container>
            <Header style={styles.header} >
                <Left style={[{flex: 1}]}>
                    <Button transparent onPress={() => {  this.props.navigation.navigate('Home'); }}>
                        <Icon type="Ionicons" name='ios-arrow-back' style={styles.backbtn} />
                    </Button>
                </Left>
                <Body style={[{flex: 9}]}>
                    <Title style={[styles.textheader]}>Phone Book</Title>
                </Body>
                {/* <Right style={{backgroundColor: 'black'}}>
                    <Button transparent>
                    <Icon name='menu' />
                    </Button>
                </Right> */}
            </Header>
            <Content>
                <View style={[styles.searchbox]}>
                    <Item rounded style={[{ height: 40 },{backgroundColor: '#ececec'}]}>
                        <Icon name="ios-search" style={[{marginLeft:7},styles.listicon]} />
                        <Input 
                        onChangeText = {(text) => this.onSearchChange(text)}
                        placeholder="Search" style={{ fontSize:14}} />
                    </Item>
                </View>
            {
                (this.state.loading == false) ?
                    <View style={[styles.loader]}>
                        <Spinner color='blue' />
                    </View>
                :
                this.listEmployee(this.state.empData)
            }
            </Content>
        </Container>
        ); 
    }   
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        height: 60,
    },

    backbtn: {
        color: '#000000',
        fontSize: 32,
    },

    textheader: {
        color: '#000000', 
        fontSize: 28, 
        fontWeight: 'bold',
        marginLeft: 0,
        // marginLeft: -22,

        // flex:1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    searchbox: {
        flex:1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        // margin: 10,
    },

    imgbox: {
        // borderWidth: 0.2,
        borderColor: 'black',
        backgroundColor: '#d6d7da',
        height:55,
        width:55,
    },

    listicon: {
        fontSize:18, 
        paddingLeft:10, 
        paddingRight:3,
    },

    listitem: {
        // height: 60,
        // paddingBottom: 0,
    },

    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text1color: {
        color: '#656262', 
    },

    text2color: {
        color: '#AAAAAA', 
    },

    text3color: {
        color: '#DDDDDD', 
    },

});
