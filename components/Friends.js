import React from 'react';
import { ImageBackground, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Card, Header, Text, SearchBar } from 'react-native-elements';
import LeftMenu from './LeftMenu';

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: [
                {email: 'friend1@gmail.com'}, 
                {email: 'friend2@gmail.com'}, 
                {email: 'friend3@gmail.com'}, 
                {email: 'friend4@gmail.com',},
                {email: 'friend5@gmail.com'}, 
                {email: 'friend6@gmail.com'}, 
                {email: 'friend7@gmail.com'}, 
                {email: 'friend8@gmail.com'}, 
                {email: 'friend9@gmail.com'}, 
                {email: 'friend10@gmail.com'}, 
            ]
        }
    }
    render() {
        return (
            <ImageBackground 
            source={require('../assets/splash.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >

                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenu/>}
                />

                <SearchBar
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    placeholder='Search for friends'
                />

                <Card
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', marginTop: '1.5%', height: '75%', borderWidth: 0 }}
                    title='Friendly Bots'
                    titleStyle={{ color: '#b7bfcc' }}
                >

                <FlatList
                    data={this.state.friends}
                    renderItem={(item) => {
                        return (
                            <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8 }}>
                            <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>{item.item.email}</Text>
                            </Card>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                </Card>
            </ImageBackground>
        )
    }
}

export default Friends;
