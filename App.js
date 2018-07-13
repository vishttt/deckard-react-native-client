import { StatusBar } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends React.Component {
  componentWillMount() {
    const config = {
        apiKey: "AIzaSyBcqy5tvh3bDIbUg2H_xhU_TIOqWO9jCrw",
        authDomain: "deckard-replicant-io-8b340.firebaseapp.com",
        databaseURL: "https://deckard-replicant-io-8b340.firebaseio.com",
        projectId: "deckard-replicant-io-8b340",
        storageBucket: "",
        messagingSenderId: "299670124373"
      };
      firebase.initializeApp(config);

  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    )
  }
}

export default App;
