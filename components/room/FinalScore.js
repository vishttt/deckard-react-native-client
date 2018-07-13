import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { List, Header } from 'react-native-elements';
import LeftMenuForProfile from '../LeftMenuForProfile';

class FinalScore extends React.Component {

    render() {
        return (
            <ImageBackground 
            source={require('../../assets/splash_blur.png')}
            style={{ flex: 1, backgroundColor: '#000' }}
            >

                <Header
                    backgroundColor='rgba(0,0,0,0)'
                    outerContainerStyles={{borderBottomWidth: 0}}
                    centerComponent={{ text: 'GG', style: { color: 'white', fontFamily: 'Arial', fontSize: 18, fontWeight: 'bold' } }}
                    leftComponent={<LeftMenuForProfile/>}
                />

                {/* <Text
                    style={{ color: '#b7bfcc', marginTop: '32%', marginLeft: '25%' }}
                >Should be final scores</Text> */}
                <View style={{ justifyContent: 'center' }}>

                {this.props.acceptedUsers.map(user => {
                    return (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '25%' }} key={Math.random()*Math.random()}>
                            <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 18, paddingTop: 10, fontWeight: 'bold', paddingRight: 7 }}>
                                {user}
                            </Text>
                            <Text style={{ color: 'white', fontFamily: 'Arial', fontSize: 18, paddingTop: 10, fontWeight: 'bold', paddingLeft: 7 }}>
                                Score: 5
                            </Text>
                        </View>
                    )
                })}

                </View>

            </ImageBackground>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { acceptedUsersAliases, acceptedUsers } = auth;
    return { acceptedUsersAliases, acceptedUsers };
}

export default connect(mapStateToProps)(FinalScore);
