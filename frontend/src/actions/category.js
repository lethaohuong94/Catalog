/* eslint-disable import/prefer-default-export */
import { UPDATE_CATEGORIES } from '../constants/actionTypes';

//category update
export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    categories,
  };
}