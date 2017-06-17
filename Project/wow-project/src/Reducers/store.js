import { combineReducers } from 'redux';
import { regionReducer } from './regionReducer';
import { createStore } from 'redux';

const reducer = combineReducers({
  region: regionReducer
});


const store = createStore(reducer);

export default store;