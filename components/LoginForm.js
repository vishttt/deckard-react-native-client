import React from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { emailChanged, passwordChanged, loginUser, signupUser, githubLogin } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            main: true,
            login: false,
            signup: false,
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'met': require('../assets/fonts/Metropolis-Regular.otf')
        });
    
        this.setState({ fontLoaded: true });
    }

    componentWillMount() {
        console.ignoredYellowBox = ['Remote debugger'];
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    onSignUpButtonPress() {
        const { email, password } = this.props;
        this.props.signupUser({ email, password });
    }

    onLoginToggle() {
        this.setState({
            main: false,
            login: true,
        })
    }

    onSignupToggle() {
        this.setState({
            main: true,
            login: false
        })
    }

    renderError() {
        if (this.props.error) {
            return (
                <FormValidationMessage style={{ fontFamily: 'cind' }}>
                    {this.props.error}
                </FormValidationMessage>
            );
        }
    }

    renderForms() {
        if (this.state.fontLoaded) {
            if (this.state.main) {
                return(
                    <ImageBackground
                    source={require('../assets/splash_opaque.png')}
                    style={{ flex: 1, backgroundColor: 'black'}}
                    >
                        <KeyboardAvoidingView style={{ top: '23%' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'met', fontSize: 50, color: 'white', letterSpacing: -3 }}>deckard.io</Text>
                                {/* <FormLabel labelStyle={{ fontFamily: 'met', fontSize: 50, color: '#fcfeff' }}>deckard.io</FormLabel> */}
                            </View>

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 50 }}/>

                            <FormInput
                                placeholder="Name"
                                placeholderTextColor='white'
                                inputStyle={{ color: 'white' }}
                                style={{ color: 'white' }}
                                containerStyle={{ borderBottomColor: 'white' }}
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>
                    
                            <FormInput
                                placeholder="Email"
                                placeholderTextColor='white'
                                onChangeText={this.onEmailChange.bind(this)}
                                inputStyle={{ color: 'white' }}
                                value={this.props.email}
                                style={{ color: 'white' }}
                                containerStyle={{ borderBottomColor: 'white' }}
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                            <FormInput
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor='white'
                                onChangeText={this.onPasswordChange.bind(this)}
                                inputStyle={{ color: 'white' }}
                                value={this.props.password}
                                style={{ color: 'white' }}
                                containerStyle={{ borderBottomColor: 'white' }}
                            />

                            {this.renderError()}

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 60 }}/>

                            <Button
                                title='SIGNUP'
                                textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                                loading={this.props.loading}
                                raised
                                onPress={this.onSignUpButtonPress.bind(this)}
                                backgroundColor="rgba(0,0,0,0)"
                                style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                                // opacity={0.85}
                                rounded
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 60 }}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <SocialIcon
                                type='facebook'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={}
                            />

                            <SocialIcon
                                type='twitter'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={this.props.githubLogin.bind(this)}
                            />

                            <SocialIcon
                                type='github-alt'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={}
                            />
                            </View>

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>

                            <TouchableOpacity onPress={this.onLoginToggle.bind(this)}>
                                <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>Already have an account?</Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                )
            }

            if (this.state.login) {
                return (
                    <ImageBackground
                    source={require('../assets/splash_opaque.png')}
                    style={{ flex: 1, backgroundColor: '#000' }}
                    >
                        <KeyboardAvoidingView style={{ top: '23%' }}>
                        <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'met', fontSize: 50, color: 'white', letterSpacing: -3 }}>deckard.io</Text>
                                {/* <FormLabel labelStyle={{ fontFamily: 'met', fontSize: 50, color: '#fcfeff' }}>deckard.io</FormLabel> */}
                            </View>

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 50 }}/>

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>
                    
                            <FormInput
                                placeholder="Email"
                                placeholderTextColor='white'
                                onChangeText={this.onEmailChange.bind(this)}
                                inputStyle={{ color: 'white' }}
                                value={this.props.email}
                                style={{ color: 'white' }}
                                containerStyle={{ borderBottomColor: 'white' }}
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 20 }}/>

                            <FormInput
                                secureTextEntry
                                placeholder="Password"
                                placeholderTextColor='white'
                                onChangeText={this.onPasswordChange.bind(this)}
                                inputStyle={{ color: 'white' }}
                                value={this.props.password}
                                style={{ color: 'white' }}
                                containerStyle={{ borderBottomColor: 'white' }}
                            />

                            {this.renderError()}

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 60 }}/>

                            <Button
                                title='LOGIN'
                                textStyle={{ fontSize: 10, fontWeight: 'bold', fontFamily: 'Arial'}}
                                loading={this.props.loading}
                                raised
                                onPress={this.onButtonPress.bind(this)}
                                backgroundColor="rgba(0,0,0,0)"
                                style={{ borderWidth: 1, borderColor: 'white', borderRadius: 35 }}
                                // opacity={0.85}
                                rounded
                            />

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 60 }}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <SocialIcon
                                type='facebook'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={}
                            />

                            <SocialIcon
                                type='twitter'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={this.props.githubLogin.bind(this)}
                            />

                            <SocialIcon
                                type='github-alt'
                                light
                                raised
                                style={{ borderWidth: 1, borderColor: 'white' }}
                                // onPress={}
                            />
                            </View>

                            <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>

                            <TouchableOpacity onPress={this.onSignupToggle.bind(this)}>
                                <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>Signup for an account</Text>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                )
            }
        } else {
            return (
                <ImageBackground
                source={require('../assets/splash_opaque.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
                </ImageBackground>
            )
        }
    }

    render() {
        return (
            this.renderForms()
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, signupLoading } = auth;

    return { email, password, error, loading, signupLoading };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser, signupUser, githubLogin,
})(LoginForm);
