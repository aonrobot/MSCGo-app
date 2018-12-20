import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title ,Input ,Item ,  Content, List, ListItem, Thumbnail, Text, rounded ,Spinner} from 'native-base';
export default class Contact extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            empData : [],
        };
    }

    componentWillMount() {
        fetch('http://mis_test.metrosystems.co.th/mscgoapp/api/employees')
        .then((response) => response.json())
        .then((responseJson) => {
        Alert.alert(JSON.stringify(responseJson));
            // this.setState({
            //     empData : responseJson
            // });
        })
        .catch((error) => {
            Alert.alert(JSON.stringify(error));
            console.error(error);
        });
    }

    onSearchChange(text){ meeauon
        // fetch('http://mis_test.metrosystems.co.th/mscgoapp/api/employees/search')
        // .then((response) => response.json())
        // .then((responseJson) => {
        //     this.setState({
        //         empData : responseJson
        //     });
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
        Alert.alert("Value from event:",text)
    }


    render() {

        var items = [
            'Simon Mignolet',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Emre Can',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
            'Nathaniel Clyne',
            'Dejan Lovren',
            'Mama Sakho',
        ];

        return (

        <Container>
            <Header  style={styles.header}>
                <Left>
                    <Button transparent>
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
                <View style={[styles.loader]}>
                    <Spinner color='blue' />
                </View>
                <List >
                    {
                        this.state.empData.map(item => {
                            return ( 
                                <ListItem thumbnail style={styles.listitem}>
                                <Left>
                                    <Thumbnail  style={styles.imgbox} source={{ uri: item.imgPath }} />
                                </Left>
                                <Body>
                                    <Text>{item.FullName}</Text>
                                    
                                    <Text note numberOfLines={1}> { item.Phone3 }  </Text>
                                    
                                </Body>
                                </ListItem>
                            )
                        })
                    }
                </List> 
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
        marginLeft: -22,
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
