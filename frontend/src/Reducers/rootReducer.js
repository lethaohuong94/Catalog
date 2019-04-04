import { combineReducers } from 'redux';

import user from './userReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({ user, categories });

export default rootReducer;