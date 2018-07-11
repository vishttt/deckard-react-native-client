import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

class LogOut extends React.Component {
    onLogoutPress() {
        Actions.auth();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onLogoutPress}>
                <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 15 }}>Log Out</Text>
            </TouchableOpacity>
        )
    }
}

export default LogOut;
