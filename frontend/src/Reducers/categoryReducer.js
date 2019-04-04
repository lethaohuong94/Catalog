function categories(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
}

export default categories;