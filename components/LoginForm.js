import React from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider } from 'react-native-elements';

class LoginForm extends React.Component {
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

    renderError() {
        if (this.props.error) {
            return (
                <FormValidationMessage>
                    {this.props.error}
                </FormValidationMessage>
            );
        }
    }

    render() {
        return (
            <ImageBackground
            source={require('../assets/splash.png')}
            style={{ flex: 1 }}
            >
                <KeyboardAvoidingView style={{ top: '23%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <FormLabel labelStyle={{ fontSize: 25 }}>DECKARD.IO</FormLabel>
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
                        title='Login'
                        loading={this.props.loading}
                        raised
                        onPress={this.onButtonPress.bind(this)}
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                    />

                    <Button
                        title='Sign Up'
                        loading={this.props.signupLoading}
                        raised
                        onPress={this.onSignUpButtonPress.bind(this)}
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                    />
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}


const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    LoginFormStyle: {
    }
}
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, signupLoading } = auth;

    return { email, password, error, loading, signupLoading };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser, signupUser
})(LoginForm);
