import React from 'react'
import { ImageBackground, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CompanySplash extends React.Component {
    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    startTimer() {
        setTimeout(Actions.auth, 2000);
    }

    componentDidMount() {
        this.startTimer();
    }

    render() {
        return (
            <ImageBackground
                source={require('../assets/company_splash.png')}
                style={{ flex: 1, backgroundColor: '#000'}}
            >
            <StatusBar hidden/>
            </ImageBackground>
        )
    }
}

export default CompanySplash;
