import {SET_LOGIN_STATE} from '../actions/actionsTpe';
import {initialState} from './../initialState';

export const LoginReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {...state, ...action.payload, isLoggedIn: true};

    default:
      return state;
  }
};
