/* eslint-disable import/prefer-default-export */
//category update
export function updateCategories(categories) {
  return {
    type: 'UPDATE_CATEGORIES',
    categories,
  };
}