import {SET_USER} from '../actions/actionsTpe';

const initialState = {
  kullaniciAd: '',
  id: '',
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        kullaniciAd: action.payload.kullaniciAd,
        id: action.payload.id,
      };

    default:
      return state;
  }
};
