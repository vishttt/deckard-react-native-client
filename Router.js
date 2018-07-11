import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Friends from './components/Friends'
import MainView from './components/MainView';
import WaitingRoom from './components/room/WaitingRoom';
import ChatRoom from './components/room/ChatRoom';
import VotingScreen from './components/room/VotingScreen';
import Results from './components/room/Results';
import FinalScore from './components/room/FinalScore';
import { connect } from 'react-redux';
import { logoutUser, newGame } from './actions';

class RouterComponent extends React.Component {
    onLogoutButtonPress() {
        this.props.logoutUser();
        Actions.auth();
    }

    onNewGamePress() {
        this.props.newGame();
        Actions.main();
    }

    onHomeButtonPress() {
        Actions.home();
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene 
                            key="login" 
                            component={LoginForm} 
                            hideNavBar
                            initial 
                        />
                    </Scene>

                    <Scene key="homepage">
                        <Scene
                            key="home"
                            component={HomePage}
                            hideNavBar
                            initial
                        />
                    </Scene>

                    <Scene key="profilepage">
                        <Scene
                            key="profile"
                            component={Profile}
                            hideNavBar
                            initial
                        />
                    </Scene>

                    <Scene key="friendspage">
                        <Scene
                            key="friends"
                            component={Friends}
                            hideNavBar
                            initial
                        />
                    </Scene>
                    
                    <Scene key="main">
                        <Scene
                            // leftTitle="Home"
                            // onLeft={this.onHomeButtonPress.bind(this)}
                            key="mainView"
                            component={MainView}
                            // title="DECKARD.IO"
                            // titleStyle={{ color: '#b7bfcc' }}
                            // leftButtonTextStyle={{ color: '#b7bfcc' }}
                            // navTransparent
                            hideNavBar
                            initial
                        />
                    </Scene>

                    <Scene key="waiting">
                        <Scene
                            key="waitingroom"
                            component={WaitingRoom}
                            navTransparent
                            initial
                        />
                    </Scene>
                    
                    <Scene key="chatmain">
                        <Scene
                            leftTitle=""
                            onLeft={() => {}}
                            key="room"
                            component={ChatRoom}
                            title="Who's the bot?"
                            titleStyle={{ color: '#b7bfcc' }}
                            navTransparent
                        />
                    </Scene>
                    
                    <Scene key="votemain">
                        <Scene
                            key="voting"
                            component={VotingScreen}
                            title="Cast your votes!"
                            titleStyle={{ color: '#b7bfcc' }}
                            navTransparent
                        />
                    </Scene>

                    <Scene key="resultsmain">
                        <Scene
                            key="results"
                            component={Results}
                            title="Results"
                            navTransparent
                        />
                    </Scene>

                    <Scene key="resultsfinal">
                        <Scene
                            key="finalscore"
                            component={FinalScore}
                            titleStyle={{ color: '#b7bfcc' }}
                            leftTitle="New Game"
                            onLeft={this.onNewGamePress.bind(this)}
                            navTransparent
                        />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}

export default connect(null, { logoutUser, newGame })(RouterComponent);
