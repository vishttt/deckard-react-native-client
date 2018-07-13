import React from 'react';
import { ImageBackground, TouchableOpacity, ScrollView, FlatList, View, TextInput } from 'react-native';
import { Card, Header, Text, SearchBar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import LeftMenuForProfile from './LeftMenuForProfile';

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
            ],
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
                    centerComponent={{ text: 'FRIENDS', style: { color: 'white', fontFamily: 'Arial', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenuForProfile/>}
                />

                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'rgba(0,0,0,0)' }}>
                
                <TextInput 
                    placeholder='Search for friends'
                    placeholderTextColor='white'
                    borderStyle='solid'
                    borderWidth={1}
                    borderColor='white'
                    borderRadius={35}
                    style={{ color: 'white', paddingLeft: 15 }}
                    backgroundColor='rgba(0,0,0,0)'
                    minWidth='70%'
                    height={50}
                />
                <TouchableOpacity style={{ paddingTop: 7, paddingLeft: 7 }}>
                    <Ionicons name='ios-arrow-dropright' size={35} color='white' />
                </TouchableOpacity>
                </View>

                <Card
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', height: '80%', borderWidth: 0 }}
                    title='Friendly Bots'
                    titleStyle={{ color: 'white', fontFamily: 'Arial', fontSize: 14 }}
                    dividerStyle={{ borderWidth: 0 }}
                    borderBottomWidth={0}
                >

                <FlatList
                    data={this.state.friends}
                    renderItem={(item) => {
                        return (
                            <Card containerStyle={{ backgroundColor: 'rgba(0,0,0,0)', borderRadius: 35, borderColor: 'white' }}>
                            {/* <TouchableOpacity onPress={this.props.add}> */}
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>{item.item.email}</Text>
                            {/* </TouchableOpacity> */}
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

export default connect(null, { addUser })(Friends);
