/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import rootReducer from './reducers';

//const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(rootReducer);

export default store;