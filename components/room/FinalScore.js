import React from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { List, Text } from 'react-native-elements';

class FinalScore extends React.Component {
    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
            <Text
                style={{ color: '#b7bfcc', marginTop: '32%', marginLeft: '25%' }}
            >Should be final scores</Text>
            </ImageBackground>
        )
    }
}

export default FinalScore;
