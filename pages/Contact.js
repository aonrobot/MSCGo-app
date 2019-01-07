import React, { Component } from 'react';
import { View, StyleSheet, Alert,AsyncStorage } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Input ,Item ,  Content, List, ListItem, Thumbnail, Text, rounded ,Spinner } from 'native-base';
export default class Contact extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            empData : [],
            empDataTemp : [],
            token: '',
            loading: false,
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
                                <Thumbnail  style={styles.imgbox} source={{ uri: item.imgPath }} />
                            </Left>
                            <Body>
                                <Text>
                                {
                                    (item.NickName != "") ?
                                    "("+item.NickName+") ": ""
                                }
                                {item.FullName}
                                </Text>
                                <Text>{item.email}</Text>
                                <Text note numberOfLines={1}> { item.Phone3 }  </Text>
                                
                            </Body>
                            </ListItem>
                        )
                    })
                }
            </List> 
    }

    render() {

        return (

        <Container>
            <Header  style={styles.header}>
                <Left>
                    <Button transparent onPress={() => {  this.props.navigation.navigate('Home'); }}>
                    <Icon name='arrow-back' style={styles.backbtn} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.textheader}>Contacts</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Icon name='menu' />
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={[styles.searchbox]}>
                    <Item rounded style={{ height: 35 }}>
                        <Icon name="ios-search" style={styles.listicon} />
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
        marginTop: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        // margin: 10,
    },

    imgbox: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#d6d7da',
        height:40,
        width:40,
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

});
