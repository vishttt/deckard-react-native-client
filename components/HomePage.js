import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ImageBackground, KeyBoardAvoidingView, TouchableOpacity, Modal } from 'react-native';
import { Card, Header, Text, Overlay, Button } from 'react-native-elements'
import LogOut from './LogOut';
import Ionicons from '../node_modules/@expo/vector-icons/Ionicons';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            showRules: false,
            fontLoaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'met': require('../assets/fonts/Metropolis-Regular.otf')
        });
    
        this.setState({ fontLoaded: true });
    }

    onRulesPress() {
        this.setState({
            showRules: !this.state.showRules
        });
    }

    renderForms() {
        if (this.state.fontLoaded) {
            return (
                <ImageBackground 
                source={require('../assets/splash_blur.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
    
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.showRules}
                    >
                        <TouchableOpacity onPress={this.onRulesPress.bind(this)}>
                        <Card
                            containerStyle={{ backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 90, borderWidth: 0 }}
                            title='How To Play'
                            titleStyle={{ color: '#b7bfcc' }}
                        >
                            <Text style={{ color: '#b7bfcc' }}>
                                Put rules here...
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, nulla ac vulputate aliquam, magna urna ultricies nulla, vel scelerisque nulla sem eget felis. Donec a mauris tellus. Donec sem lectus, condimentum eu justo sed, viverra varius lectus. Maecenas mi lacus, maximus in leo vel, lacinia cursus massa. Sed a vulputate sapien, quis varius nisi. Ut mattis nec libero quis euismod. Praesent eget hendrerit libero, nec sollicitudin quam. In hac habitasse platea dictumst. Phasellus vulputate consequat sem a dictum. Fusce elementum neque sed mauris molestie, et tincidunt purus gravida. Fusce congue neque ut finibus commodo. Duis vitae nisi at tortor eleifend facilisis vitae at velit. Nulla sit amet erat pretium, eleifend nisi a, tincidunt quam. Mauris a augue aliquet massa volutpat rhoncus. Aenean in varius magna.
                                Pellentesque a sem erat. In venenatis accumsan mauris nec maximus. Phasellus bibendum tortor sapien, pellentesque consectetur magna hendrerit sed. Vestibulum dapibus ex vel lectus interdum mollis. Praesent vitae metus suscipit, efficitur mauris vitae, sodales nisl. Etiam gravida ac mi sed gravida.
                            </Text>
                        </Card>
                        </TouchableOpacity>
                    </Modal>
    
                    {this.toggleView()}
                </ImageBackground>
            )
        } else {
            return (
                <ImageBackground 
                source={require('../assets/splash_blur.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
                </ImageBackground>
            )
        }
    }

    toggleView() {
        if (this.state.showRules) {
            return(
                <Text/>
            )
        } else {
            return (
                <View style={{ marginTop: '23%', justifyContent: 'center' }}>
                <Ionicons name='ios-user' />
                <Text style={{ color: 'white', fontFamily: 'met', fontSize: '50', letterSpacing: -3 }}>WELCOME</Text>
                <Text style={{ color: 'white', fontFamily: 'met', fontSize: '50', letterSpacing: -3 }}>HUMAN</Text>

                <Button
                    title='NEW GAME'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.main}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    rounded
                />

                <Button
                    title='PROFILE'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.profile}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    rounded
                />

                <Button
                    title='FRIENDS'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.friends}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    rounded
                />

                <Button
                    title='HOW TO PLAY'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.friends}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    rounded
                />

                <Button
                    title='LOG OUT'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.auth}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    rounded
                />

                </View>
            )
        }
    }

    render() {
        return (
        )
    }
}

export default HomePage;
