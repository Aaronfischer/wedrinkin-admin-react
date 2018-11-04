import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import decode from 'jwt-decode';
// import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from './store'
// import rootReducer from './rootReducer';
// import { userLoggedIn } from './actions/auth';
// import setAuthorizationHeader from './utils/setAuthorizationHeader';

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// if (localStorage.wedrinkinJWT) {
//   const payload = decode(localStorage.wedrinkinJWT);
//   console.log('payload', payload);
//   const user = {
//     token: localStorage.wedrinkinJWT,
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     email: payload.email,
//     confirmed: payload.confirmed
//   };
//   setAuthorizationHeader(localStorage.wedrinkinJWT);
//   store.dispatch(userLoggedIn(user));
// }

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
