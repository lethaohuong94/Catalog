//user log in
export function login(userInfo) {
  return {
    type: 'LOG_IN',
    userInfo,
  };
}

//user log out
export function logout() {
  return {
    type: 'LOG_OUT',
  };
}

//category update
export function updateCategories(categories) {
  return {
    type: 'UPDATE_CATEGORIES',
    categories,
  };
}
