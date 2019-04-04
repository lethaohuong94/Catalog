import { LOG_IN, LOG_OUT } from './types';

//user log in
export function login(userInfo) {
  return {
    type: LOG_IN,
    userInfo,
  };
}

//user log out
export function logout() {
  return {
    type: LOG_OUT,
  };
}