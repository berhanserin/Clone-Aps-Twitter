import {combineReducers, createStore} from 'redux';
import {LoginReducer} from './reducers/LoginReducer';
import rootReducer from './reducers/rootReducer';

export const store = createStore(rootReducer);
