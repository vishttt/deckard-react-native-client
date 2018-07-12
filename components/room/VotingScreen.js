import React from 'react';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import VoteOnUser from './VoteOnUser';
import { List, Text } from 'react-native-elements';

class VotingScreen extends React.Component {
    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
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
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { addedUsers, totalUsersInRoom, votes, user, acceptedUsers } = auth;
    return { addedUsers, totalUsersInRoom, votes, user, acceptedUsers };
}

export default connect(mapStateToProps)(VotingScreen);
