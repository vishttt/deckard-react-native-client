import React from 'react';
import { ImageBackground, View } from 'react-native';
import { connect } from 'react-redux';
import VoteOnUser from './VoteOnUser';
import { List, Text, Button, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

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
            titleStyle={{ color: '#b7bfcc' }}
            >

        </Card>
        } else {
            return (
                <View>
                    <List
                        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', marginTop: '25%' }}
                    >
                        {this.props.acceptedUsers.map(user => {
                            if (user !== this.props.user.email.toLowerCase()) {
                                return (
                                    <VoteOnUser user={user} key={Math.random()*Math.random()}/>
                                )
                            }
                        })}
                    </List>

                    <Button
                        title='Submit'
                        titleStyle={{ color: '#b7bfcc' }}
                        containerStyle={{ marginTop: 90, opacity: 0.5}}
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
            source={require('../../assets/splash.png')}
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
