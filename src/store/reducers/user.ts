import { LOG_OUT, SET_USER_INFO } from '../constants/user';

const initialState = {
  _id: '',
  username: '',
  fullname: '',
  role: '',
  auth: {
    token: '',
    expires_in: '',
  },
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER_INFO:
      action.payload = action.payload ? action.payload : initialState
      return {
        ...action.payload
      };
    case LOG_OUT:
      return initialState
    default:
      return state;
  }
};
