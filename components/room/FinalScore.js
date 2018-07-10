import React from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { List, Text } from 'react-native-elements';

class FinalScore extends React.Component {
    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash.png')}
            style={{ width: '100%', height: '100%', flex: 1 }}
            >
            <Text
                style={{ color: '#b7bfcc', marginTop: '32%', marginLeft: '25%' }}
            >Should be final scores</Text>
            </ImageBackground>
        )
    }
}

export default FinalScore;
