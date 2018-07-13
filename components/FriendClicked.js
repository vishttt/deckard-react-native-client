import React from 'react';
import { ImageBackground, TouchableOpacity, ScrollView, FlatList, View, TextInput } from 'react-native';
import { Card, Header, Text, SearchBar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addUser, removeUser } from '../actions';
import LeftMenu from './LeftMenu';

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: false
        }
    }

    addFriend() {
        if (this.state.selected) {
            this.props.removeUser(this.props.email);
            this.setState({ selected: !this.state.selected });
        } else {
            this.props.addUser(this.props.email);
            this.setState({ selected: !this.state.selected });
        }
    }



    render() {
        return (
            <View>
            <Text>{this.props.email}</Text>
            <Button
            title={this.props.email}
            textStyle={{ color: 'white', textAlign: 'center', fontSize: 14 }}
            raised
            backgroundColor={this.state.selected ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, .5)"}
            onPress={this.addFriend.bind(this)}
            containerViewStyle={{ borderRadius: 35, borderColor: 'white' }}
            />
            </View>
        )
    }
}

export default connect(null, { addUser, removeUser })(Friends);
