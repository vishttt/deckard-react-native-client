import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeUser } from '../actions';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

class AddedUser extends React.Component {
    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];        
    }

    onRowPress() {
        console.log('pressed username row');
        this.props.removeUser(this.props.user);
    }

    render() {
        return (
            <ListItem
                key={this.props.user}
                title={this.props.user}
                titleStyle={{ color: 'white' }}
                // titleContainerStyle={{ height: 12 }}
                onPress={this.onRowPress.bind(this)}
                rightIcon={ <Ionicons name='ios-close' size={35} color='white' /> }
                containerStyle={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    height: 45
                }}
                subtitleNumberOfLines={0}
                rightTitleNumberOfLines={0}
            />
        )
    }
}

export default connect(null, { removeUser })(AddedUser);
