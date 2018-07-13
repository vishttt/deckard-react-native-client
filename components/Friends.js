import React from 'react';
import { ImageBackground, TouchableOpacity, ScrollView, FlatList, View } from 'react-native';
import { Card, Header, Text, SearchBar, Button } from 'react-native-elements';
import LeftMenu from './LeftMenu';

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            friends: [
                {email: 'alex_the_don@hotmail.com'}, 
                {email: 'mitchbones@gmail.com'}, 
                {email: 'trajansmith@gmail.com'}, 
                {email: 'yikes_joe@yahoo.com'}, 
                {email: 'snyperyflechui@gmail.com',},
                {email: 'jacobi@gmail.com'}, 
                {email: 'gitmoneygithub@gmail.com'}, 
                {email: 'netters@gmail.com'}, 
                {email: 'trevvvvv@gmail.com'}, 
                {email: 'ironmanraph@gmail.com'}, 
                {email: 'matt_the_dad@aol.com'}, 
            ]
        }
    }
    render() {
        return (
            <ImageBackground 
            source={require('../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >

                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenu/>}
                />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                <SearchBar
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', minWidth: '65%' }}
                    placeholder='Search for friends'
                />
                <Button
                 title='Add'
                 raised
                 backgroundColor="rgba(0, 0, 0, 0.5)"
                />
                </View>

                <Card
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', height: '80%', borderWidth: 0 }}
                    title='Friendly Bots'
                    titleStyle={{ color: '#b7bfcc' }}
                >

                <FlatList
                    data={this.state.friends}
                    renderItem={(item) => {
                        return (
                            <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8, borderRadius: 35 }}>
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
