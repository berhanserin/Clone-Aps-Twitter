import {SET_LOGIN_STATE} from '../actions/actionsTpe';
import {initialState} from './../initialState';

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {...state, isLoggedIn: action.payload};

    default:
      return state;
  }
};
