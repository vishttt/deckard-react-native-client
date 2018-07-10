import React from 'react';
import { View, Text, FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, Modal } from 'react-native-router-flux';
import { 
    createRoom, 
    searchedUsernameTextChange, 
    addUser,
    removeUser,
    connectSocket,
    setSocketRoom
} from '../actions';
import { FormInput, FormValidationMessage, Button, Header, Card } from 'react-native-elements';
import AddedUser from './AddedUser';
import LeftMenu from './LeftMenu';
import axios from 'axios';
import IP from '../IP';

window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            invited: false,
            addedUsers: null,
            invitedToRoomID: null,
            invitedToRoomName: null,
            roomCreator: null,
            waiting: false,
        }
    }

    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
        this.setState({
            waiting: false
        });
    }

    componentDidMount() {
        console.log(IP);
        this.socket = io(IP);
        this.props.connectSocket(this.socket);

        this.socket.on('invite', data => {
            // console.log('invite data: ', data);
            // console.log('this.props.user email', this.props.user.email);
            if (data.addedUsers.includes(this.props.user.email.toUpperCase()) && this.props.user.email !== data.roomCreator) {
                this.setState({ 
                    invited: true,
                    invitedToRoomID: data.roomID,
                    invitedToRoomName: data.roomName,
                    addedUsers: data.addedUsers,
                    roomCreator: data.roomCreator,
                });
            }
            // this.socket.emit('join', data.room);
        });

        this.socket.on('all users ready', () => {
            this.setState({
                waiting: false
            });
            Actions.room();
        })
    }

    ifInvited() {
        if (this.state.invited) {
            return (
                // <View style={{ marginTop: 22 }}>
                //     <Modal
                //         animationType='slide'
                //         transparent={false}
                //         visible={this.state.invited}
                //     >
                //         <Text>`INVITED TO ROOM ${this.state.invitedToRoomName} by ${this.state.roomCreator}!`</Text>
                //         <Button 
                //             title='Accept'
                //             onPress={() => {
                //                 this.socket.emit('join', {roomID: this.state.invitedToRoomID, addedUsers: this.state.addedUsers});
                //                 this.socket.emit('accept or decline', {reply: 'accept', user: this.props.user.email.toUpperCase()});
                //                 this.setState({
                //                     waiting: true
                //                 });
                //             }}
                //         />
                //         <Button
                //             title='Decline'
                //             onPress={() => {
                //                 this.socket.emit('accept or decline', {reply: 'decline', user: this.props.user.email.toUpperCase()});
                //                 this.setState({
                //                     invited: false,
                //                     addedUsers: null,
                //                     invitedToRoomID: null,
                //                     invitedToRoomName: null,
                //                     roomCreator: null,
                //                 });
                //             }}
                //         />
                //     </Modal>
                // </View>




                <Card
                    title={`INVITED TO ROOM ${this.state.invitedToRoomName} by ${this.state.roomCreator}!`}
                >
                <Button 
                    title='Accept'
                    onPress={() => {
                        this.socket.emit('join', {roomID: this.state.invitedToRoomID, addedUsers: this.state.addedUsers});
                        this.socket.emit('accept or decline', {reply: 'accept', user: this.props.user.email.toUpperCase()});
                        this.setState({
                            waiting: true
                        });
                    }}
                />
                <Button
                    title='Decline'
                    onPress={() => {
                        this.socket.emit('accept or decline', {reply: 'decline', user: this.props.user.email.toUpperCase()});
                        this.setState({
                            invited: false,
                            addedUsers: null,
                            invitedToRoomID: null,
                            invitedToRoomName: null,
                            roomCreator: null,
                        });
                    }}
                />
                </Card>
            )
        }
    }

    ifWaiting() {
        if (this.state.waiting) {
            return (
            <ImageBackground 
            source={require('../assets/splash.png')}
            style={{ flex: 1 }}
            >
                <Card
                    containerStyle={{ marginTop: '25%', backgroundColor: '#fff', opacity: 0 }}
                    // titleStyle={{ color: '#b7bfcc' }}
                    // title='Waiting for other bots to join...'
                >
                    <Text style={{ color: '#b7bfcc' }}> Waiting for other bots to join... </Text>
                </Card>
            </ImageBackground>
            )
        } else {
            return (
                <ImageBackground 
                source={require('../assets/splash.png')}
                style={{ flex: 1 }}
                >

                    <Header
                        backgroundColor='rgba(0,0,0,0)'
                        outerContainerStyles={{borderBottomWidth: 0}}
                        centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                        leftComponent={<LeftMenu/>}
                    />

                    <KeyboardAvoidingView style={{ marginTop: '8%' }}>
    
                        {this.ifInvited()}
    
                        <FormInput
                            placeholder="Room Name"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onRoomChange.bind(this)}
                            value={this.props.roomName}
                        />
    
                        <FormInput
                            placeholder="Add Users to Room"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onSearchedUsernameChange.bind(this)}
                            value={this.props.searchedUsername}
                            ref={input => this.input = input}
                        />
    
                        {this.renderSelfError()}
                        {this.renderError()}
    
                        <Button
                            title='Add User'
                            raised
                            onPress={this.addUser.bind(this)}
                            backgroundColor="rgba(0, 0, 0, 0.5)"
                        />
    
                        <Button
                            title='Create Room'
                            raised
                            onPress={this.createRoom.bind(this)}
                            backgroundColor="rgba(0, 0, 0, 0.5)"
                        />
    
                        <Text
                            style={{ color: '#b7bfcc' }}
                        >Users {this.props.totalUsersInRoom}/5</Text>
    
                        {this.props.addedUsers.map(user => (
                            <AddedUser
                                user={user}
                                key={user}
                            />
                        ))}
                    </KeyboardAvoidingView>
                </ImageBackground>
            )
        }
    }

    onRoomChange(text) {
        this.props.createRoom(text);
    }

    onSearchedUsernameChange(text) {
        this.props.searchedUsernameTextChange(text);
    }

    addUser() {
        this.props.addUser(this.props.searchedUsername);
        this.input.clearText();
    }

    renderError() {
        if (this.props.maxCapacity) {
            return (
                <FormValidationMessage>
                    {this.props.maxUsersError}
                </FormValidationMessage>
            );
        }
    }

    renderSelfError() {
        if (this.props.removeSelf) {
            return (
                <FormValidationMessage>
                    {this.props.selfRemoveError}
                </FormValidationMessage>
            );
        }
    }

    createRoom() {
        this.socket.emit('create new room', { 
            roomName: this.props.roomName, 
            addedUsers: this.props.addedUsers,
            roomCreator: this.props.user.email
        });
        this.setState({
            waiting: true
        })
    }



    render() {
        return (
            this.ifWaiting()
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { 
        addedUsers, 
        currentUser,
        email,
        rooms,
        socketRoom,

        user,
        roomName, 
        searchedUsername, 
        totalUsersInRoom,  
        maxCapacity,
        maxUsersError,
        selfRemoveError,
        removeSelf
    } = auth;

    return { 
        addedUsers, 
        currentUser,
        email,
        rooms,
        socketRoom,

        user,
        roomName, 
        searchedUsername, 
        totalUsersInRoom,
        maxCapacity,
        maxUsersError,
        selfRemoveError,
        removeSelf
    };
}

export default connect(mapStateToProps, { 
    createRoom, 
    searchedUsernameTextChange, 
    addUser,
    removeUser,
    connectSocket,
    setSocketRoom
})(MainView);
