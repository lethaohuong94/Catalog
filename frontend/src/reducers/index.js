import { combineReducers } from 'redux';

import user from './user';
import categories from './category';

const rootReducer = combineReducers({ user, categories });

export default rootReducer;