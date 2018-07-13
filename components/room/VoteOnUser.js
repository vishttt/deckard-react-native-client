import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { guessAI, guessHuman } from '../../actions';

class VoteOnUser extends React.Component {
    state = {
        AI: false,
        HUMAN: false
    }

    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    voteAI() {
        this.props.guessAI(this.props.user);
        console.log(this.props.votes);
        this.setState({
            AI: true,
            HUMAN: false
        });
    }

    voteHuman() {
        this.props.guessHuman(this.props.user);
        console.log(this.props.votes);
        this.setState({
            AI: false,
            HUMAN: true
        });
    }

    render() {
        return(
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {/* <ListItem
                        key={Math.random()*Math.random()}
                        title={this.props.acceptedUsersAliases[this.props.user][0]}
                        titleStyle={{ color: 'white' }}
                        hideChevron
                    /> */}

                    <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 18, paddingTop: 10 }}>
                        {this.props.acceptedUsersAliases[this.props.user][0]}
                    </Text>

                    <Button
                        title='A.I.'
                        raised
                        backgroundColor={this.state.AI ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0)"}
                        onPress={this.voteAI.bind(this)}
                        // borderRadius={1}
                        color='white'
                        containerViewStyle={{ borderColor: 'white', borderWidth: 1, borderRadius: 35, height: 45, width: 100 }}
                        buttonStyle={{ borderRadius: 35, height: 45, width: 100 }}
                        fontFamily='Arial'
                        // fontSize='10'
                    />

                    <Button
                        title='HUMAN'
                        raised
                        backgroundColor={this.state.HUMAN ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0)"}   
                        onPress={this.voteHuman.bind(this)}                
                        color='white'       
                        containerViewStyle={{ borderColor: 'white', borderWidth: 1, borderRadius: 35, height: 45, width: 100  }}
                        buttonStyle={{ borderRadius: 35, height: 45, width: 100 }}
                        fontFamily='Arial'
                        // fontSize='10'
                    />
                </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { votes, finishedVoting, acceptedUsersAliases } = auth;
    return { votes, finishedVoting, acceptedUsersAliases };
}

export default connect(mapStateToProps, { guessAI, guessHuman })(VoteOnUser);
