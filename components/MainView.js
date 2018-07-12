import React from 'react';
import { View, Text, FlatList, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
    createRoom, 
    searchedUsernameTextChange, 
    addUser,
    removeUser,
    connectSocket,
    setSocketRoom,
    setTimer,
    setAcceptedUsers,
} from '../actions';
import { FormInput, FormValidationMessage, Button, Header, Card, Divider, Slider } from 'react-native-elements';
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
            if (data.addedUsers.includes(this.props.user.email.toLowerCase()) && this.props.user.email !== data.roomCreator) {
                this.props.setTimer(data.timer);
                this.setState({ 
                    invited: true,
                    invitedToRoomID: data.roomID,
                    invitedToRoomName: data.roomName,
                    addedUsers: data.addedUsers,
                    roomCreator: data.roomCreator,
                });
            }
        });

        this.socket.on('all users ready', data => {
            this.props.setAcceptedUsers(data.acceptedUsersAliases);
            this.setState({
                waiting: false
            });
            Actions.room();
        })
    }

    toggleInviteView() {
        if (this.state.invited) {
            return (
                <Text/>
            )
        } else {
            return (
                <View style={{ marginTop: '3%' }}>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', width: '80%', marginLeft: '10%' }}>
                    <Slider
                        value={this.props.timer}
                        maximumValue={60}
                        step={1}
                        onValueChange={this.setTime.bind(this)}
                    />
                </View>
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 15 }}/>
                <Text
                style={{ color: '#b7bfcc' }}
                >Game Timer: {this.props.timer}</Text>
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 5 }}/>
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
            </View>
            )
        }
    }

    ifWaiting() {
        if (this.state.waiting) {
            return (
            <ImageBackground 
            source={require('../assets/splash.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
                <Card
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 90, borderWidth: 0 }}
                    title={'Waiting for other bots to join...'}
                    titleStyle={{ color: '#b7bfcc' }}
                >

                </Card>
            </ImageBackground>
            )
        } else {
            return (
                <ImageBackground 
                source={require('../assets/splash.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >

                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.invited}
                    >
                        <Card
                            containerStyle={{ backgroundColor: '#000', opacity: 0.9, marginTop: 90, borderWidth: 0 }}
                            title={`INVITED TO ROOM ${this.state.invitedToRoomName} by ${this.state.roomCreator}!`}
                            titleStyle={{ color: '#b7bfcc' }}
                            >
                            <Button 
                                title='Accept'
                                titleStyle={{ color: '#b7bfcc' }}
                                containerStyle={{ marginTop: 90 }}
                                backgroundColor='#000000'
                                outline
                                rounded
                                onPress={() => {
                                    this.socket.emit('join', {roomID: this.state.invitedToRoomID, addedUsers: this.state.addedUsers});
                                    this.socket.emit('accept or decline', {reply: 'accept', user: this.props.user.email.toLowerCase()});
                                    this.setState({
                                        waiting: true,
                                        invited: false
                                    });
                                }}
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 5 }}/>

                            <Button
                                title='Decline'
                                titleStyle={{ color: '#b7bfcc' }}
                                containerStyle={{ marginTop: 90, opacity: 0.5}}
                                backgroundColor='#000000'
                                outline
                                rounded
                                onPress={() => {
                                    this.socket.emit('accept or decline', {reply: 'decline', user: this.props.user.email.toLowerCase()});
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
                    </Modal>

                    <Header
                        backgroundColor='rgba(0,0,0,0)'
                        outerContainerStyles={{borderBottomWidth: 0}}
                        centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                        leftComponent={<LeftMenu/>}
                    />

                    {this.toggleInviteView()}
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

    setTime(time) {
        this.props.setTimer(time);
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
            roomCreator: this.props.user.email,
            timer: this.props.timer,
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
        timer,

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
        timer,

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
    setSocketRoom,
    setTimer,
    setAcceptedUsers
})(MainView);
