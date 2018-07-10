import React from 'react';
import { View } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { guessAI, guessHuman } from '../../actions';
import { Actions } from 'react-native-router-flux';

class VoteOnUser extends React.Component {
    state = {
        AI: false,
        HUMAN: false
    }

    voteAI() {
        this.props.guessAI(this.props.user);
        console.log(this.props.votes);
        this.setState({
            AI: true,
            HUMAN: false
        });
        console.log('after setstate ai');
        if (this.props.finishedVoting) {
            Actions.results();
        }
    }

    voteHuman() {
        this.props.guessHuman(this.props.user);
        console.log(this.props.votes);
        this.setState({
            AI: false,
            HUMAN: true
        });
        console.log('after set state human');
        if (this.props.finishedVoting) {
            Actions.results();
        }
    }

    render() {
        return(
                <View>
                    <ListItem
                        key={Math.random()*Math.random()}
                        title={this.props.user}
                        titleStyle={{ color: '#b7bfcc' }}
                        hideChevron
                    />

                    <Button
                        title='A.I.'
                        raised
                        backgroundColor={this.state.AI ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
                        onPress={this.voteAI.bind(this)}
                    />

                    <Button
                        title='HYUMON'
                        raised
                        backgroundColor={this.state.HUMAN ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}                    
                        onPress={this.voteHuman.bind(this)}                
                    />
                </View>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { votes, finishedVoting } = auth;
    return { votes, finishedVoting };
}

export default connect(mapStateToProps, { guessAI, guessHuman })(VoteOnUser);
