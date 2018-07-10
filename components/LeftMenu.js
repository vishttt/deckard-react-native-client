import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

class LeftMenu extends React.Component {
    onLeftPress() {
        Actions.home();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
                <Ionicons name='ios-home' color='#b7bfcc' size={23} />
            </TouchableOpacity>
        )
    }
}

export default LeftMenu;
