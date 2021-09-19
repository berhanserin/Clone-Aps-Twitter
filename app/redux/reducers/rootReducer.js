import {combineReducers} from 'redux';
import {LoginReducer} from './LoginReducer';
import {UserReducer} from './UserReducer';

export default combineReducers({
  login: LoginReducer,
  user: UserReducer,
});
