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
    // CHAT TYPES -------------
    CHANGE_MESSAGE,
    CLEAR_INPUT_BOX,
    RECEIVED_MESSAGE,
    // Voting Types -----------
    GUESS_AI,
    GUESS_HUMAN,
    // New Game Types -----------
    NEW_GAME
} from '../actions/types';

const INITIAL_STATE = { 
    //
    // ─── AUTH STATE ─────────────────────────────────────────────────────────────────
    //  
    email: '', 
    password: '', 
    loading: false,
    error: '',

    user: null,
    uid: '',
    loggedIn: false,
    signupLoading: false,
    //
    // ─── ROOM STATE ─────────────────────────────────────────────────────────────────
    //    
    roomName: '',
    searchedUsername: '',
    addedUsers: [],
    totalUsersInRoom: 1,
    maxCapacity: false,
    removeSelf: false,
    maxUsersError: '',
    selfRemoveError: '',

    socket: null,
    socketRoom: null,

    currentUser: null,
    rooms: null,
    
    message: '',
    messages: [],

    //
    // ─── VOTE STATE ─────────────────────────────────────────────────────────────────
    // 
    votes: {},
    finishedVoting: false
};

const SECOND_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    //
    // Auth Reducers ----------------------------------------------------------------
    //
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case SIGNUP_USER:
            return { ...state, signupLoading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            SECOND_STATE = { ...state, ...INITIAL_STATE, user: action.payload, uid: action.payload.uid, addedUsers: [state.email.toUpperCase()], loggedIn: true };
            return { ...state, ...INITIAL_STATE, user: action.payload, uid: action.payload.uid, addedUsers: [state.email.toUpperCase()], loggedIn: true };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Authentication Failed.', loading: false, signupLoading: false };
        case LOGOUT_USER:
            return { ...state, loggedIn: false};
    //
    // Room Reducers ----------------------------------------------------------------
    //
        case CREATE_ROOM:
            return { ...state, roomName: action.payload, removeSelf: false };
        case SEARCHED_USERNAME:
            return { ...state, searchedUsername: action.payload, removeSelf: false }
        case ADD_USER:
            if (state.totalUsersInRoom === 5) {
                return {
                    ...state,
                    maxCapacity: true,
                    removeSelf: false,
                    maxUsersError: 'Max Room Capacity Reached!'
                }
            } else {
                return { 
                    ...state, 
                    totalUsersInRoom: state.totalUsersInRoom + 1, 
                    removeSelf: false,
                    addedUsers: [ ...state.addedUsers, action.payload.toUpperCase() ]
                };
            }
        case REMOVE_USER:
            console.log(action.payload);
            console.log(state.addedUsers[0]);
            if (action.payload === state.addedUsers[0]) {
                return {
                    ...state, removeSelf: true, selfRemoveError: 'Cannot remove yourself from the game!'
                }
            } else {
                return { 
                    ...state,
                    addedUsers: [ 
                        ...state.addedUsers.slice(0, state.addedUsers.indexOf(action.payload)),
                        ...state.addedUsers.slice(state.addedUsers.indexOf(action.payload) + 1, ...state.addedUsers.length + 1)
                    ],
                    removeSelf: false,
                    totalUsersInRoom: state.totalUsersInRoom - 1,
                    maxCapacity: false
                };
            }
        case CONNECT_SOCKET:
            console.log('reducer socket', action.payload);
            return {
                ...state,
                socket: action.payload
            }
        case SET_SOCKET_ROOM:
            console.log('reducer socket room: ', action.payload);
            return {
                ...state,
                socketRoom: action.payload
            }

    //
    // Chat Reducers ----------------------------------------------------------------
    //
        case CHANGE_MESSAGE:
            return { ...state, message: action.payload };
        case CLEAR_INPUT_BOX:
            return { ...state, message: '' };
        case RECEIVED_MESSAGE:
            console.log('reducer message received: ', action.payload);
            return { ...state, messages: [ ...state.messages, action.payload ] }

    //
    // Voting Reducers ----------------------------------------------------------------
    //
        case GUESS_AI:
            let votesCopyAI = state.votes;
            votesCopyAI[action.payload] = 'AI'

            if (Object.entries(votesCopyAI).length === state.totalUsersInRoom - 2) {
                return { ...state, votes: votesCopyAI, finishedVoting: true }
            } else {
                return { ...state, votes: votesCopyAI }
            }
        case GUESS_HUMAN:
            let votesCopy = state.votes;
            votesCopy[action.payload] = 'HUMAN';

            if (Object.entries(votesCopy).length === state.totalUsersInRoom - 2) {
                return { ...state, votes: votesCopy, finishedVoting: true }
            } else {
                return { ...state, votes: votesCopy }
            }

    //
    // New Game Reducers ----------------------------------------------------------------
    //
        case NEW_GAME:
            return { ...SECOND_STATE };

    //
    // Default ----------------------------------------------------------------------
    //
        default:
            return state;
    }
}
