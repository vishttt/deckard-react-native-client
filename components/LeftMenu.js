import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

class LeftMenu extends React.Component {
    onLeftPress() {
        Actions.home();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
                {/* <Ionicons name='ios-home' color='#b7bfcc' size={23} /> */}
                <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 15 }}>Home</Text>
            </TouchableOpacity>
        )
    }
}

export default LeftMenu;
