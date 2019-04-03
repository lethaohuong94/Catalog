/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import localStorage from 'local-storage';
import { combineReducers } from 'redux';

// function user(state = localStorage.get('state'), action) {
//   console.log('user reducer');
//   console.log(state);
//   switch (action.type) {
//     case 'LOGIN':
//       let newState = { user: { ...action.userInfo, loggedIn: true }, categories: {} };
//       console.log('login');
//       console.log(newState);
//       localStorage.set('state', newState);
//       return newState;
//     case 'LOGOUT':
//       const user = { loggedIn: false, userName: '', userId: 0, accessToken: '' };
//       newState = { user, categories: {} };
//       localStorage.set('state', newState);
//       console.log('logout');
//       console.log(newState);
//       return newState;
//     default: return state;
//   }
// }

function user(state = localStorage.get('user'), action) {
  console.log('user reducer');
  console.log(state);
  switch (action.type) {
    case 'LOGIN':
      let newState = { ...action.userInfo, loggedIn: true };
      console.log('login');
      console.log(newState);
      localStorage.set('user', newState);
      return newState;
    case 'LOGOUT':
      newState = { loggedIn: false, userName: '', userId: 0, accessToken: '' };
      //newState = { user, categories: {} };
      localStorage.set('user', newState);
      console.log('logout');
      console.log(newState);
      return newState;
    default: return state;
  }
}

function categories(state = {}, action) {
  return state;
}

const rootReducer = combineReducers({ user, categories });

export default rootReducer;

//state = localStorage.get('state')