import {SET_USER} from './actionsTpe';

export const setUserName = data => {
  return {
    type: SET_USER,
    payload: data,
  };
};
