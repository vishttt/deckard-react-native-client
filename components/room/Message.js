import React from 'react';
import { View, Text, Image } from 'react-native';
import { CardSection } from '../common';

class Message extends React.Component {
    render() {
        // console.log(this.props.message.item);
        return (
            <View>
                <CardSection>
                    {/* <Image 
                    style={{ width: 20, height: 20 }}
                    source={{ uri: this.props.message.user.avatar }} 
                    />
                    <Text>
                        {this.props.message.user.name}: {this.props.message.text}
                    </Text> */}
                    <Text>
                        {this.props.message.item}
                    </Text>
                </CardSection>
            </View>
        );
    }
}

export default Message;
