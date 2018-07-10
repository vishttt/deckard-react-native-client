import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import { setCurrentRoom } from '../actions';
import { Actions } from 'react-native-router-flux';

class Room extends React.Component {
    onRowPress() {
        this.props.setCurrentRoom(this.props.room);
        Actions.room();
        // currentUser.joinRoom({ roomId: this.props.room.id })
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View style={styles.containerStyle}>
                    <Text>
                        {this.props.room.name}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    containerStyle: {
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative', 
    }
}

const mapStateToProps = ({ auth }) => {
    const { currentUser } = auth;
    return { currentUser };
}

export default connect(mapStateToProps, {
    setCurrentRoom
})(Room);
