import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//REDUX__________________________
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

//reducers
import user from './reducers/user.reducer'
import isLogged from './reducers/isLogged.reducer'
import boards from './reducers/boards.reducer'
import userCircle from './reducers/userCircle.reducer'
import circles from './reducers/circles.reducer'
import mask from './reducers/mask.reducer'

//WEBSOCKETS______________________________
import socketIOClient from 'socket.io-client'

//ENVIRONMENT CONFIG________________________
global.BACKEND = 'https://yiqi-backend-test.herokuapp.com'

if (process.env.REACT_APP_ENV === "development") {
  global.BACKEND = 'http://localhost:3000'
}

global.SOCKET_URI = 'https://yiqi-backend-test.herokuapp.com'

global.SOCKET = socketIOClient(global.SOCKET_URI, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax : 5000,
  reconnectionAttempts: Infinity
} );

const store = createStore(combineReducers({ user, isLogged, boards, userCircle, circles, mask }), /* preloadedState, */ devToolsEnhancer({}))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
