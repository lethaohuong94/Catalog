//log in
export function login(userInfo) {
  return {
    type: 'LOGIN',
    userInfo,
  };
}

//log out
export function logout() {
  return {
    type: 'LOGOUT',
  };
}
