import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { toggleRules } from '../actions';

class LeftMenu extends React.Component {
    onLeftPress() {
        Actions.home();
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onLeftPress.bind(this)}>
                <Ionicons name='ios-arrow-round-back' color='white' size={50} />
            </TouchableOpacity>
        )
    }
}

export default connect(null, { toggleRules })(LeftMenu);
