import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View, ImageBackground, KeyBoardAvoidingView, TouchableOpacity, Modal, StatusBar } from 'react-native';
import { Card, Header, Text, Overlay, Button, Divider } from 'react-native-elements'
import { Font } from 'expo';
import LeftMenu from './LeftMenu';
import LogOut from './LogOut';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { toggleRules } from '../actions';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            fontLoaded: false
        }
    }

    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    async componentDidMount() {
        await Font.loadAsync({
            'met': require('../assets/fonts/Metropolis-Regular.otf')
        });
    
        this.setState({ fontLoaded: true });
    }

    onRulesPress() {
        this.props.toggleRules();
    }

    renderHeader() {
        if (this.props.showRules) {
            return (
                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'RULES', style: { color: 'white', fontFamily: 'Arial', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenu/>}
                />
            )
        }
    }

    renderForms() {
        if (this.state.fontLoaded) {
            return (
                <View>
                    {/* <Modal
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
                    </Modal> */}
    
                    {this.toggleView()}
                </View>
            )
        } else {
            return (
                <Text />
            )
        }
    }

    toggleView() {
        if (this.props.showRules) {
            return(
                <View style={{ alignItems: 'center', marginTop: '10%' }}>
                <View style={{ marginTop: '8%', alignItems: 'center', width: '85%' }}>
                <Text style={{ fontFamily: 'met', fontSize: 60, color: 'white', letterSpacing: -3 }}>how to play</Text>
                
                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>
                
                <Text style={{ fontFamily: 'Arial', color: 'white', textAlign: 'center', fontSize: 14, lineHeight: 24 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit, nulla ac vulputate aliquam, magna urna ultricies nulla, vel scelerisque nulla sem eget felis. Donec a mauris tellus. Donec sem lectus, condimentum eu justo sed, viverra varius lectus. Maecenas mi lacus, maximus in leo vel, lacinia cursus massa. Sed a vulputate sapien, quis varius nisi. Ut mattis nec libero quis euismod. Praesent eget hendrerit libero, nec sollicitudin quam. In hac habitasse platea dictumst. Phasellus vulputate consequat sem a dictum. Fusce elementum neque sed mauris molestie, et tincidunt purus gravida. Fusce congue neque ut finibus commodo. Duis vitae nisi at tortor eleifend facilisis vitae at velit. Nulla sit amet erat pretium, eleifend nisi a, tincidunt quam. Mauris a augue aliquet massa volutpat rhoncus. Aenean in varius magna.
                </Text>
                </View>
                
                </View>
            )
        } else {
            return (
                <View style={{ marginTop: '8%', alignItems: 'center' }}>
                <Ionicons name='md-contact' color="white" size={100} />

                <Text style={{ color: 'white', fontFamily: 'met', fontSize: 60, letterSpacing: -3 }}>welcome</Text>

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 5 }}/>

                <Text style={{ color: 'white', fontFamily: 'met', fontSize: 60, letterSpacing: -3 }}>human</Text>

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 30 }}/>

                <Button
                    title='NEW GAME'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.main}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    large
                    containerViewStyle={{ width: '85%' }}
                />

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                <Button
                    title='PROFILE'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.profile}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    large
                    containerViewStyle={{ width: '85%' }}
                />

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                <Button
                    title='FRIENDS'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.friends}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    large
                    containerViewStyle={{ width: '85%' }}                
                />

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                <Button
                    title='HOW TO PLAY'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={this.onRulesPress.bind(this)}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    large
                    containerViewStyle={{ width: '85%' }}
                />

                <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                <Button
                    title='LOG OUT'
                    textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                    raised
                    onPress={Actions.auth}
                    backgroundColor="rgba(0,0,0,0)"
                    style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                    large
                    containerViewStyle={{ width: '85%' }}
                />

                </View>
            )
        }
    }

    render() {
        return (
            <ImageBackground 
            source={require('../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >
            <StatusBar hidden />
                {this.renderHeader()}

                {/* <Header
                    backgroundColor='#000'
                    opacity={0.8}
                    outerContainerStyles={{borderBottomWidth: 0}}
                    // centerComponent={{ text: 'DECKARD.IO', style: { color: '#b7bfcc', fontSize: 18, fontWeight: 'bold' } }}
                    // leftComponent={<LeftMenu/>}
                /> */}

                {this.renderForms()}
            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { showRules } = auth;
    return { showRules };
}

export default connect(mapStateToProps, { toggleRules })(HomePage);
