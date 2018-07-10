import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeUser } from '../actions';
import { CardSection } from './common';
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
                avatar={{ uri: `https://robohash.org/${this.props.user}?set=set4`}}
                titleStyle={{ color: '#b7bfcc' }}
                onPress={this.onRowPress.bind(this)}
                rightIcon={ <Ionicons name='ios-close' size={50} color='#b7bfcc' /> }
                containerStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            />
        )
    }
}

export default connect(null, { removeUser })(AddedUser);
