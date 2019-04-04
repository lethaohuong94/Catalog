import localStorage from 'local-storage';

function user(state = { initial: true, loggedIn: false }, action) {
  let newState = localStorage.get('user');
  switch (action.type) {
    case 'LOG_IN':
      newState = { ...action.userInfo, loggedIn: true };
      localStorage.set('user', newState);
      return newState;
    case 'LOG_OUT':
      newState = { loggedIn: false, userName: '', userId: 0, accessToken: '' };
      localStorage.set('user', newState);
      return newState;
    default:
      if (newState) return newState;
      return state;
  }
}

export default user;