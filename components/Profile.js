import React from 'react';
import { Actions } from 'react-native-router-flux';
import { ImageBackground, View, Image, Text } from 'react-native';
import { Header, Card, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import LeftMenuForProfile from './LeftMenuForProfile';
import { Ionicons } from '@expo/vector-icons';

class Profile extends React.Component {
    render() {
        return(
            <ImageBackground 
            source={require('../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'PROFILE', style: { color: 'white', fontFamily: 'Arial', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenuForProfile/>}
                />

                <View style={{ marginTop: '21%', alignItems: 'center' }}>
                    <Ionicons name='md-contact' color="white" size={100} />

                    <Button
                        title={this.props.user.email}
                        textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                        raised
                        backgroundColor="rgba(0,0,0,0)"
                        style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                        large
                        containerViewStyle={{ width: '85%' }}
                    />

                    <Button
                        title='GAMES PLAYED: 0'
                        textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                        raised
                        backgroundColor="rgba(0,0,0,0)"
                        style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                        large
                        containerViewStyle={{ width: '85%' }}
                    />

                    <Button
                        title='GAMES WON: 0'
                        textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                        raised
                        backgroundColor="rgba(0,0,0,0)"
                        style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                        large
                        containerViewStyle={{ width: '85%' }}
                    />

                    <Button
                        title='LIFETIME SCORE: 0'
                        textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                        raised
                        backgroundColor="rgba(0,0,0,0)"
                        style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                        large
                        containerViewStyle={{ width: '85%' }}
                    />

                    {/* <Image
                        style={{ width: 75, height: 75 }}
                        source={{uri: `https://robohash.org/${this.props.user.email}?set=set4`}}
                    /> */}

                    {/* <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8, width: '75%', borderRadius: 35 }}>
                    <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>{this.props.user.email}</Text>
                    </Card>

                    <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8, width: '75%', borderRadius: 35 }}>
                    <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>Games Played: 0</Text>
                    </Card>

                    <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8, width: '75%', borderRadius: 35 }}>
                    <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>Games Won: 0</Text>
                    </Card>

                    <Card containerStyle={{ backgroundColor: '#000', opacity: 0.8, width: '75%', borderRadius: 35 }}>
                    <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>Lifetime Score: 0</Text>
                    </Card> */}
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user }
}

export default connect(mapStateToProps)(Profile);
