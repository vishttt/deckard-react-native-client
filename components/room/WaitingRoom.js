import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class WaitingRoom extends React.Component {
    componentWillMount() {
        console.log('componentwillmount');
        this.props.socket.on('all users ready', () => {
            console.log('received emit from server all users are ready');
            Actions.room();
        });
    }

    render() {
        return (
            <ImageBackground 
                source={require('../../assets/splash_blur.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
            >
                <View style={{ marginTop: '28%' }}>
                    <Text
                        style={{ color: '#b7bfcc'}}
                    >Waiting for other bots to join...</Text>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { socket } = auth;
    return { socket };
}

export default connect(mapStateToProps)(WaitingRoom);
