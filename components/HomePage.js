import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ImageBackground, KeyBoardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { Card, Header, Text, Overlay } from 'react-native-elements'
import RightLogOut from './RightLogOut';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            showRules: false
        }
    }


    onRulesPress() {
        this.setState({
            showRules: !this.state.showRules
        });
    }

    toggleView() {
        if (this.state.showRules) {
            return(
                <Text/>
            )
        } else {
            return (
                <Card
                containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                title='Welcome Hyumon'
                titleStyle={{ color: '#b7bfcc' }}
                >
                    <TouchableOpacity onPress={this.onRulesPress.bind(this)}>
                        <Card containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>Rules</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Card containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>Profile</Text>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={Actions.main}>
                        <Card containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Text style={{ color: '#b7bfcc', textAlign: 'center', fontSize: 20 }}>New Game</Text>
                        </Card>
                    </TouchableOpacity>
                </Card>
            )
        }
    }

    render() {
        return (
            <ImageBackground 
            source={require('../assets/splash.png')}
            style={{ flex: 1 }}
            >

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.showRules}
                >
                    <TouchableOpacity onPress={this.onRulesPress.bind(this)}>
                    <Card
                        containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 90 }}
                        title='How To Play'
                        titleStyle={{ color: '#b7bfcc' }}
                    >
                        <Text style={{ color: '#b7bfcc' }}>
                            Put rules here...
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, nulla ac vulputate aliquam, magna urna ultricies nulla, vel scelerisque nulla sem eget felis. Donec a mauris tellus. Donec sem lectus, condimentum eu justo sed, viverra varius lectus. Maecenas mi lacus, maximus in leo vel, lacinia cursus massa. Sed a vulputate sapien, quis varius nisi. Ut mattis nec libero quis euismod. Praesent eget hendrerit libero, nec sollicitudin quam. In hac habitasse platea dictumst. Phasellus vulputate consequat sem a dictum. Fusce elementum neque sed mauris molestie, et tincidunt purus gravida. Fusce congue neque ut finibus commodo. Duis vitae nisi at tortor eleifend facilisis vitae at velit. Nulla sit amet erat pretium, eleifend nisi a, tincidunt quam. Mauris a augue aliquet massa volutpat rhoncus. Aenean in varius magna.
                            Pellentesque a sem erat. In venenatis accumsan mauris nec maximus. Phasellus bibendum tortor sapien, pellentesque consectetur magna hendrerit sed. Vestibulum dapibus ex vel lectus interdum mollis. Praesent vitae metus suscipit, efficitur mauris vitae, sodales nisl. Etiam gravida ac mi sed gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras consectetur tellus diam, non dictum magna feugiat molestie. Mauris faucibus, arcu eget venenatis ullamcorper, libero ligula lobortis ante, vitae rhoncus urna libero non nisl. Cras erat justo, consequat a consectetur in, ultrices in sem. Aliquam erat volutpat. Ut sed aliquam magna, eget porta odio.
                        </Text>
                    </Card>
                    </TouchableOpacity>
                </Modal>

                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<RightLogOut/>}
                />

                {this.toggleView()}
            </ImageBackground>
        )
    }
}

export default HomePage;
