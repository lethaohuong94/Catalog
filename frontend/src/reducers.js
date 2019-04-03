/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import localStorage from 'local-storage';
import { combineReducers } from 'redux';
import { get } from './Helpers/fetchHelpers';

function user(state = localStorage.get('user'), action) {
  let newState = {};
  switch (action.type) {
    case 'LOG_IN':
      newState = { ...action.userInfo, loggedIn: true };
      localStorage.set('user', newState);
      return newState;
    case 'LOG_OUT':
      newState = { loggedIn: false, userName: '', userId: 0, accessToken: '' };
      localStorage.set('user', newState);
      return newState;
    default: return state;
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ user, categories });

export default rootReducer;