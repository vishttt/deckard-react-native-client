import React from "react";
import { onChangeMessage, clearInputBox, receivedMessage } from '../../actions';
import CountdownCircle from 'react-native-countdown-circle';
import { Actions } from 'react-native-router-flux';
import { View, Text, ImageBackground, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, Button, ListItem, List } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import axios from 'axios';
import IP from '../../IP';

class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = {
        messages: []
    }
  }

  componentWillMount() {
    console.ignoredYellowBox = ['Remote debugger'];
  }

  componentDidMount() {
    // received a message from socket
    this.props.socket.on('received new message', data => {
        this.setState({
            messages: [ ...this.state.messages, { message: data.message, user: data.user }]
        })
    });
  }

  sendMessageToMitsuku() {
    console.log('sendMessageToMitsuku hit');

    axios.post(`http://${IP}/api/mitsuku`, {message: 'Hello'})
    .then(response => {
        console.log('got a response', response.data);
    });

    // axios.get(`http://${IP}/api/mitsuku`)
    //   .then(response => {
    //       console.log(response);
    //   })
    //   .catch(err => {
    //       console.log('promise error: ', error);
    //   })

    // axios.post(`http://${IP}/api/mitsuku`, this.props.message)
    //   .then(response => {
    //       console.log('mitsukue client side response: ', response);
    //   });

    //   console.log('sendMessageToMitsuku hit');
    //   this.props.socket.emit('mitsuku', this.props.message);
  }

  // send message to socket (called when submit button pressed)
  sendMessage() {
    // console.log('sendMessage hit');
    // this.sendMessageToMitsuku();

    console.log('sendMessage second function hit');
    this.props.socket.emit('send new message', {message: this.props.message, user: this.props.user.email.toLowerCase()});
    this.props.clearInputBox();

    // fetch('https://kakko.pandorabots.com/pandora/talk?botid=87437a824e345a0d&skin=chat', {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     mode: "cors", // no-cors, cors, *same-origin
    //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: "same-origin", // include, same-origin, *omit
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         // "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     redirect: "follow", // manual, *follow, error
    //     referrer: "no-referrer", // no-referrer, *client
    //     body: JSON.stringify({ message: this.props.message }), // body data type must match "Content-Type" header
    // })
    // .then(response => console.log(response)) // parses response to JSON
    // .catch(error => console.error(`Fetch Error =\n`, error));
  }

  onChangeMessage(text) {
    this.props.onChangeMessage(text);
  }

  onTimeout() {
      this.setState({
          messages: []
      });
      Actions.votemain();
  }

  render() {
    return (
        <ImageBackground 
            source={require('../../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
        >
            <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
                <View style={{ paddingTop: '8%', paddingLeft: '8%' }}>
                    <CountdownCircle
                        seconds={this.props.timer}
                        radius={15}
                        borderWidth={5}
                        color="#ff356e"
                        bgColor="#000"
                        textStyle={{ fontSize: 12, color: 'white' }}
                        onTimeElapsed={this.onTimeout.bind(this)}
                    />
                </View>

                <FormLabel labelStyle={{ color: 'white' }}>{this.props.roomName}</FormLabel>

                <View style={{ width: '85%', height: '70%', alignSelf: 'center' }}>
                    <ScrollView
                        containerStyle={{ backgroundColor: 'rgba(0,0,0,0)' }}
                    >
                        {this.state.messages.map(message => {
                            return (
                            <ListItem
                                key={Math.random()*Math.random()}
                                title={`${this.props.acceptedUsersAliases[message.user]}: ${message.message}`}
                                titleStyle={{ color: 'white'}}
                                textInputStyle={{ color: 'white' }}
                                hideChevron
                            />
                            )
                        })}
                    </ScrollView>
                </View>

                {/* <FormInput
                    placeholder='Say something...'
                    placeholderTextColor='black'
                    onChangeText={this.onChangeMessage.bind(this)}
                    imputStyle={{ color: 'black' }}
                    borderRadius={35}
                    value={this.props.message}  
                /> */}
                <View style={{ 
                    position: 'absolute', 
                    top: '86%', 
                    alignItems: 'center', 
                    width: '100%', 
                    // flex: 1, 
                    // flexDirection: 'row', 
                    // justifyContent: 'center', 
                    // alignItems: 'stretch', 
                    // backgroundColor: 'rgba(0,0,0,0)'  
                }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch', backgroundColor: 'rgba(0,0,0,0)' }}>
                        <TextInput 
                            placeholder='Say something...'
                            placeholderTextColor='black'
                            borderRadius={35}
                            style={{ color: 'black', paddingLeft: 15 }}
                            backgroundColor='white'
                            minWidth='70%'
                            height={50}
                            onChangeText={this.onChangeMessage.bind(this)}
                            value={this.props.message}  
                        />

                        <TouchableOpacity 
                            style={{ paddingTop: 7, paddingLeft: 7 }}
                            onPress={this.sendMessage.bind(this)}
                        >
                            <Ionicons name='ios-arrow-dropright' size={35} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const {
      socket,
      roomName,
      addedUsers,
      message,
      messages,
      timer,
      acceptedUsersAliases,
      user
  } = auth;

  return {
      socket,
      roomName,
      addedUsers,
      message,
      messages,
      timer,
      acceptedUsersAliases,
      user
  };
}

export default connect(mapStateToProps, { 
onChangeMessage, 
clearInputBox,
receivedMessage 
})(ChatRoom);
