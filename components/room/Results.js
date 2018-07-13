import React from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { List, Text } from 'react-native-elements';

class Results extends React.Component {
    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
            <Text
                style={{ color: '#b7bfcc', marginTop: '32%', marginLeft: '25%' }}
            >Waiting on other bots to vote...</Text>
            </ImageBackground>
        )
    }
}

export default Results;
