import React from 'react';
import { View, Text, FlatList, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Font } from 'expo';
import { 
    createRoom, 
    searchedUsernameTextChange, 
    addUser,
    removeUser,
    connectSocket,
    setSocketRoom,
    setTimer,
    setAcceptedUsers,
    addAcceptedUser,
    setRoomname,
} from '../actions';
import { FormInput, FormValidationMessage, Button, Header, Card, Divider, Slider } from 'react-native-elements';
import AddedUser from './AddedUser';
import LeftMenuForProfile from './LeftMenuForProfile';
import axios from 'axios';
import IP from '../IP';
import { Ionicons } from '@expo/vector-icons';

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
            if (data.addedUsers.includes(this.props.user.email.toLowerCase()) && this.props.user.email !== data.roomCreator) {
                this.props.setTimer(data.timer);
                this.props.addAcceptedUser(data.roomCreator);
                this.props.setRoomname(data.roomName);
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
            for (let acceptedUser of data.acceptedUsers) {
                this.props.addAcceptedUser(acceptedUser);
            }
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
            <View style={{ marginTop: '5%', flex: 1 }}>
                <View style={{ alignContent: 'center', width: '85%', marginLeft: '8%' }}>
                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
                        To start a new game, create a room name and invite players using their email addresses. Then set a timer for your game.
                    </Text>
                </View>

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 5 }}/>
                
                <FormInput
                    placeholder="Room Name"
                    placeholderTextColor='white'
                    borderBottomColor='white'
                    inputStyle={{ color: 'white' }}
                    onChangeText={this.onRoomChange.bind(this)}
                    value={this.props.roomName}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FormInput
                        placeholder="Add Users to Room"
                        placeholderTextColor='white'
                        borderBottomColor='white'
                        inputStyle={{ color: 'white' }}
                        onChangeText={this.onSearchedUsernameChange.bind(this)}
                        value={this.props.searchedUsername}
                        ref={input => this.input = input}
                        containerStyle={{ width: '80%' }}
                    />
                    <TouchableOpacity onPress={this.addUser.bind(this)}>
                        <Ionicons name='ios-add' size={35} color='white' />
                    </TouchableOpacity>
                </View>

                {this.renderSelfError()}
                {this.renderError()}

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Arial', fontWeight: 'bold' }}>
                    Users {this.props.totalUsersInRoom}/5
                </Text>
                </View>

                <View style={{ width: '90%', alignSelf: 'center' }}>
                {this.props.addedUsers.map(user => (
                    <AddedUser
                        user={user}
                        key={user}
                    />
                ))}
                </View>


                <View style={{ position: 'absolute', top: '75%', alignItems: 'center', width: '100%' }}>
                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 14, fontWeight: 'bold' }}>Game Timer: {this.props.timer}</Text>

                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>

                    <Slider
                        value={this.props.timer}
                        maximumValue={60}
                        step={1}
                        onValueChange={this.setTime.bind(this)}
                        thumbStyle={{ backgroundColor: '#b13c61', borderColor: 'white', borderWidth: 1.5 }}
                        trackStyle={{ backgroundColor: 'white', height: 5 }}
                        minimumTrackTintColor='#b13c61'
                        style={{ width: '80%' }}
                    />

                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 15 }}/>

                    <Button
                        title='CREATE'
                        textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                        raised
                        onPress={this.createRoom.bind(this)}
                        backgroundColor='#b13c61'
                        containerViewStyle={{ borderRadius: 35, borderWidth: 0 }}
                        // containerStyle={{ borderRadius: 35, borderWidth: 0 }}
                        // style={{ borderWidth: 0, borderRadius: 35 }}
                        large
                        rounded
                        // containerViewStyle={{ width: '25%' }}
                    />
                </View>
            </View>
            )
        }
    }

    ifWaiting() {
        if (this.state.waiting) {
            return (
            <ImageBackground 
            source={require('../assets/splash_blur.png')}
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
                source={require('../assets/splash_blur.png')}
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
                        centerComponent={{ text: 'NEW GAME', style: { color: 'white', fontSize: 18, fontFamily: 'Arial', fontWeight: 'bold' } }}
                        leftComponent={<LeftMenuForProfile/>}
                        containerStyle={{ marginTop: '5%'}}
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
    setAcceptedUsers,
    addAcceptedUser,
    setRoomname,
})(MainView);
