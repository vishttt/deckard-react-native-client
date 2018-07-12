import React from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
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
        }
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
            signup: false
        })
    }

    onSignupToggle() {
        this.setState({
            main: false,
            login: false,
            signup: true
        })
    }

    renderError() {
        if (this.props.error) {
            return (
                <FormValidationMessage>
                    {this.props.error}
                </FormValidationMessage>
            );
        }
    }

    renderForms() {
        if (this.state.main) {
            return(
                <ImageBackground
                source={require('../assets/splash.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
                    <KeyboardAvoidingView style={{ top: '23%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <FormLabel labelStyle={{ fontSize: 25, color: '#fcfeff' }}>DECKARD.IO</FormLabel>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title='Login'
                                onPress={this.onLoginToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />

                            <Button
                                title='Signup'
                                onPress={this.onSignupToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            )
        }

        if (this.state.login) {
            return (
                <ImageBackground
                source={require('../assets/splash.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
                    <KeyboardAvoidingView style={{ top: '23%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <FormLabel labelStyle={{ fontSize: 25, color: '#fcfeff' }}>DECKARD.IO</FormLabel>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title='Login'
                                onPress={this.onLoginToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />

                            <Button
                                title='Signup'
                                onPress={this.onSignupToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />
                        </View>
                   
                        <FormInput
                            placeholder="email"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                            style={{ color: '#fcfeff' }}
                        />

                        <FormInput
                            secureTextEntry
                            placeholder="password"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />

                        {this.renderError()}

                        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>

                        <Button
                            title='Login'
                            loading={this.props.loading}
                            raised
                            onPress={this.onButtonPress.bind(this)}
                            backgroundColor="#232323"
                            // opacity={0.85}
                            rounded
                        />

                        <SocialIcon
                            button
                            raised
                            type='google-plus-official'
                            title='Sign in with Google'
                            // onPress={}
                        />

                        <SocialIcon
                            button
                            raised
                            type='facebook'
                            title='Sign in with Facebook'
                            // onPress={}
                        />

                        <SocialIcon
                            button
                            raised
                            type='github-alt'
                            title='Sign in with Github'
                            onPress={this.props.githubLogin.bind(this)}
                        />
                    </KeyboardAvoidingView>
                </ImageBackground>
            )
        }

        if (this.state.signup) {
            return (
                <ImageBackground
                source={require('../assets/splash.png')}
                style={{ flex: 1, backgroundColor: '#000' }}
                >
                    <KeyboardAvoidingView style={{ top: '23%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <FormLabel labelStyle={{ fontSize: 25, color: '#fcfeff' }}>DECKARD.IO</FormLabel>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                title='Login'
                                onPress={this.onLoginToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />

                            <Button
                                title='Signup'
                                onPress={this.onSignupToggle.bind(this)}
                                raised
                                backgroundColor="rgba(0, 0, 0, 0.5)"
                            />
                        </View>

                        <FormInput
                            placeholder="email"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />

                        <FormInput
                            secureTextEntry
                            placeholder="password"
                            placeholderTextColor='#b7bfcc'
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}
                        />

                        {this.renderError()}

                        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0)', height: 10 }}/>

                        <Button
                            title='Sign Up'
                            loading={this.props.signupLoading}
                            raised
                            onPress={this.onSignUpButtonPress.bind(this)}
                            backgroundColor="rgba(0, 0, 0, 0.5)"
                        />
                    </KeyboardAvoidingView>
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
