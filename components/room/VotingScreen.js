import React from 'react';
import { ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import VoteOnUser from './VoteOnUser';
import { List, Text, Button, Card, Divider } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

class VotingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            finishedVoting: false
        }
    }

    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
        this.props.socket.on('voting complete', () => {
            Actions.finalscore();
        });
    }

    toggleView() {
        if (this.state.finishedVoting) {
            <Card
            containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 90, borderWidth: 0 }}
            title={'Waiting for other bots to vote...'}
            titleStyle={{ color: 'white' }}
            >

        </Card>
        } else {
            return (
                <View style={{ marginTop: '25%', justifyContent: 'center', alignItems: 'center' }}>

                <Ionicons name='ios-help-circle' color='white' size={100}/>

                    {/* <List
                        containerStyle={{ backgroundColor: '#000', opacity: 1, marginTop: '25%' }}
                    > */}
                        {this.props.acceptedUsers.map(user => {
                            if (user !== this.props.user.email.toLowerCase()) {
                                return (
                                    <VoteOnUser user={user} key={Math.random()*Math.random()}/>
                                )
                            }
                        })}
                    {/* </List> */}

                    <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                    <Button
                        title='Submit'
                        titleStyle={{ color: 'white' }}
                        containerStyle={{ marginTop: 90, opacity: 0.5}}
                        containerViewStyle={{ width: '85%' }}
                        backgroundColor='#000000'
                        outline
                        rounded
                        onPress={() => {
                            console.log(this.props.user.email);
                            this.props.socket.emit('user voted', { userWhoVotedEmail: this.props.user.email });
                            this.setState({
                                finishedVoting: true
                            });
                        }}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
                {this.toggleView()}
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { addedUsers, totalUsersInRoom, votes, user, acceptedUsers, socket } = auth;
    return { addedUsers, totalUsersInRoom, votes, user, acceptedUsers, socket };
}

export default connect(mapStateToProps)(VotingScreen);
