import {SET_ALL_POST} from '../actions/actionsTpe';

const initialState = {
  itemList: [],
};

export const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_POST:
      return {
        ...state,
        itemList: state.itemList.concat({
          name: action.payload,
        }),
      };

    default:
      return state;
  }
};
