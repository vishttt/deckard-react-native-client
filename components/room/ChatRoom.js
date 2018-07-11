import React from "react";
import { onChangeMessage, clearInputBox, receivedMessage } from '../../actions';
import CountdownCircle from 'react-native-countdown-circle';
import { Actions } from 'react-native-router-flux';
import { View, Text, ImageBackground, FlatList, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button, ListItem, List } from 'react-native-elements';
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
            messages: [ ...this.state.messages, data]
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
    console.log('sendMessage hit');
    this.sendMessageToMitsuku();

    console.log('sendMessage second function hit');
    this.props.socket.emit('send new message', this.props.message);
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
      Actions.votemain();
  }

  render() {
    return (
        <ImageBackground 
            source={require('../../assets/splash.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
        >
            <KeyboardAvoidingView style={{ marginTop: '20%' }}>
                <CountdownCircle
                    seconds={60}
                    radius={15}
                    borderWidth={5}
                    color="#ff356e"
                    bgColor="#000"
                    textStyle={{ fontSize: 12, color: '#b7bfcc' }}
                    onTimeElapsed={this.onTimeout.bind(this)}
                />

                <FormLabel>{this.props.roomName}</FormLabel>

                <List
                    containerStyle={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                >
                    {this.state.messages.map(message => {
                        return (
                        <ListItem
                            key={Math.random()*Math.random()}
                            title={message}
                            titleStyle={{ color: '#b7bfcc'}}
                            hideChevron
                        />
                        )
                    })}
                </List>

                <FormInput
                    placeholder='Be the Bot'
                    placeholderTextColor='#b7bfcc'
                    onChangeText={this.onChangeMessage.bind(this)}
                    value={this.props.message}  
                />

                <Button
                    title='Submit'
                    raised
                    onPress={this.sendMessage.bind(this)}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                />
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
      messages
  } = auth;

  return {
      socket,
      roomName,
      addedUsers,
      message,
      messages
  };
}

export default connect(mapStateToProps, { 
onChangeMessage, 
clearInputBox,
receivedMessage 
})(ChatRoom);
