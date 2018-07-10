import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

class RightLogOut extends React.Component {
    onLogoutPress() {
        Actions.auth();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onLogoutPress}>
                <Ionicons name='ios-log-out' color='#b7bfcc' size={23} />
            </TouchableOpacity>
        )
    }
}

export default RightLogOut;
