import localStorage from 'local-storage';
import { LOG_IN, LOG_OUT } from '../constants/actionTypes';

const defaultState = localStorage.get('user');

function user(state = { loggedIn: false }, action) {
  let newState = defaultState;
  switch (action.type) {
    case LOG_IN:
      newState = { ...state, ...action.userInfo, loggedIn: true };
      localStorage.set('user', newState);
      return newState;
    case LOG_OUT:
      newState = { ...state, loggedIn: false, userName: '', userId: 0, accessToken: '' };
      localStorage.set('user', newState);
      return newState;
    default:
      return (newState || state);
  }
}

export default user;