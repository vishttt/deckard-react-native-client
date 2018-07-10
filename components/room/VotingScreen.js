import React from 'react';
import { ImageBackground } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { connect } from 'react-redux';
import VoteOnUser from './VoteOnUser';
import { List, Text } from 'react-native-elements';

class VotingScreen extends React.Component {
    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    renderItem({ item }) {
        return <VoteOnUser user={item} />;
    }

    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash.png')}
            style={{ width: '100%', height: '100%', flex: 1 }}
            >
                <List
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', marginTop: '25%' }}
                >
                    {this.props.addedUsers.map(user => {
                        console.log(user);
                        console.log(this.props.user);
                        if (user !== this.props.user.email.toUpperCase()) {
                            return (
                                <VoteOnUser user={user} key={Math.random()*Math.random()}/>
                            )
                        }
                    })}
                </List>
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { addedUsers, totalUsersInRoom, votes, user } = auth;
    return { addedUsers, totalUsersInRoom, votes, user };
}

export default connect(mapStateToProps)(VotingScreen);
