import React, { Component } from 'react';
import { View, StyleSheet, Alert, AsyncStorage, StatusBar } from 'react-native';
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
            refreshing: false,
        };
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
            <ListItem circle thumbnail style={styles.listitem}>
                <Body>
                    <Text note numberOfLines={1}>No Result</Text>
                </Body>
            </ListItem>
        :
            <List>
                {   
                    empData.map(item => {
                        return ( 
                            <ListItem circle thumbnail style={styles.listitem}
                                // onScroll={event => { 
                                //     // this.yOffset = event.nativeEvent.contentOffset.y
                                //     console.log(event.nativeEvent.contentOffset.y);
                                // }}
                            >
                            <Left>
                                <Thumbnail style={styles.imgbox} source={{ uri: item.imgPath }} />
                            </Left>
                            <Body style={{paddingTop: 5,paddingBottom: 5}}>
                                <Text note numberOfLines={1} style={[{ fontSize:16,fontWeight: 'bold' },styles.text1color]} > 
                                { 
                                    ( item.Phone3  != "") ?
                                    " "+item.Phone3 : "     -"
                                }  
                                </Text> 
                                <Text numberOfLines={1} style={[{ fontSize:14 },styles.text2color]} >
                                {
                                    (item.NickName != "") ?
                                    "("+item.NickName+") ": ""
                                }
                                {item.FullName}
                                </Text>
                                <Text style={[{ fontSize:14 },styles.text3color]}> {item.email} </Text>                            
                            </Body>
                            <Right style={{marginRight: 14,padding:0}} >
                                <Button iconLeft transparent primary
                                    onPress={() => {
                                                this.onClickCall(item.Phone3)
                                            }
                                        }
                                    >
                                    <Icon type="FontAwesome" name="phone" style={{fontSize: 22, color: 'green'}} />
                                </Button>
                            </Right>
                            </ListItem>
                        )
                    })
                }
            </List> 
    }

    onClickCall = (Phone3) => {
        Alert.alert(
            'แจ้งเตือน',
            'ต้องการโทรไปยังหมายเลข ' +Phone3+ ' หรือไม่',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
        )
    }

    render() {

        return (
            <Container>
                <Header androidStatusBarColor="#3C40C5" style={{display:'none'}} style={[{backgroundColor: '#ececec'},styles.header]} >
                    <Left style={[{flex: 1}]}>
                        <Button transparent onPress={() => {  this.props.navigation.navigate('Home'); }}>
                            <Icon type="Ionicons" name='ios-arrow-back' style={styles.backbtn} />
                        </Button>
                    </Left>
                    <Body style={[{flex: 9,flexDirection:'row', flexWrap:'wrap',justifyContent:'flex-start'}]}>
                        <Icon type="FontAwesome5" name='book' style={[styles.iconheader]} />
                        <Title style={[styles.textheader]}>Phone Book</Title>
                    </Body>
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

    iconheader: {
        // flex:1,
        paddingTop:3,
    },

    textheader: {
        flex:0,
        fontFamily: 'Source Sans Pro',
        color: '#000000', 
        fontSize: 23, 
        fontWeight: 'bold',
        marginLeft: 0,
        marginLeft: 12,
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
        fontFamily: 'Sarabun',
        // color: '#656262', 

        color: "#2b30db",
    },

    text2color: {
        fontFamily: 'Sarabun',
        color: '#37373a', 
    },

    text3color: {
        fontFamily: 'Source Sans Pro',
        color: '#949496', 
    },

});
