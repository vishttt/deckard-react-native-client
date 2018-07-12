import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    // Auth Types ------------
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    SIGNUP_USER,
    LOGOUT_USER,
    // Room Types ------------
    CREATE_ROOM, 
    SEARCHED_USERNAME, 
    ADD_USER,
    REMOVE_USER,
    CONNECT_SOCKET,
    SET_SOCKET_ROOM,
    SET_TIMER,
    SET_ACCEPTED_USERS,
    ADD_ACCEPTED_USER,
    SET_ROOM_NAME,
    // CHAT TYPES -------------
    CHANGE_MESSAGE,
    CLEAR_INPUT_BOX,
    RECEIVED_MESSAGE,
    // Voting types -----------
    GUESS_AI,
    GUESS_HUMAN,
    // New Game types -----------
    NEW_GAME
} from './types';

//
// Auth Actions --------------------------------------------------------------------
//

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
}

export const githubLogin = () => {
    return (dispatch) => {
        let provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                losingUserSuccess(dispatch, user);
                // ...
            }).catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                loginUserFail(dispatch);
            });
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
              console.log('action user result: ', user);
              loginUserSuccess(dispatch, user);
          })
          .catch(() => {
                loginUserFail(dispatch);
          });
    }
};

export const signupUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER });

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
              loginUserSuccess(dispatch, user);
          })
          .catch(() => {
              loginUserFail(dispatch);
          });
    }
}

const loginUserSuccess = (dispatch, user) => {
    console.log('action user: ', user.user);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user.user
    });

    Actions.home();
}

const loginUserFail = (dispatch) => {
    dispatch({ 
        type: LOGIN_USER_FAIL,
    });
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

//
// Room Actions --------------------------------------------------------------------
//

export const createRoom = (text) => {
    return {
        type: CREATE_ROOM,
        payload: text
    };
}

export const searchedUsernameTextChange = (text) => {
    return {
        type: SEARCHED_USERNAME,
        payload: text
    }
}

export const addUser = (text) => {
    return {
        type: ADD_USER,
        payload: text
    }
}

export const removeUser = (text) => {
    return {
        type: REMOVE_USER,
        payload: text
    }
}

export const connectSocket = (socket) => {
    return {
        type: CONNECT_SOCKET,
        payload: socket
    }
}

export const setSocketRoom = (text) => {
    return {
        type: SET_SOCKET_ROOM,
        payload: text
    }
}

export const setTimer = (time) => {
    return {
        type: SET_TIMER,
        payload: time
    }
}

export const setAcceptedUsers = (users) => {
    return {
        type: SET_ACCEPTED_USERS,
        payload: users
    }
}

export const addAcceptedUser = (user) => {
    return {
        type: ADD_ACCEPTED_USER,
        payload: user
    }
}

export const setRoomname = (roomname) => {
    return {
        type: SET_ROOM_NAME,
        payload: roomname
    }
}

//
// Chat Actions --------------------------------------------------------------------
//

export const onChangeMessage = (text) => {
    return {
        type: CHANGE_MESSAGE,
        payload: text
    }
}

export const clearInputBox = () => {
    return {
        type: CLEAR_INPUT_BOX
    }
}

export const receivedMessage = (text) => {
    return {
        type: RECEIVED_MESSAGE,
        payload: text
    }
}

//
// Voting Actions --------------------------------------------------------------------
//

export const guessAI = (user) => {
    return {
        type: GUESS_AI,
        payload: user
    }
}

export const guessHuman = (user) => {
    return {
        type: GUESS_HUMAN,
        payload: user
    }
}

//
// New Game Actions --------------------------------------------------------------------
//

export const newGame = () => {
    return {
        type: NEW_GAME
    }
}
