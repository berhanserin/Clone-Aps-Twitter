import {SET_LOGIN_STATE} from './actionsTpe';

const setLoginState = loginData => {
  return {
    type: SET_LOGIN_STATE,
    payload: loginData,
  };
};

export default {setLoginState};
