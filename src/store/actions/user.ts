import {
  LOG_OUT,
  SET_USER_INFO
} from '../constants/user';

export const setUserInfo = (payload: any) => {
  return {
    type: SET_USER_INFO,
    payload,
  };
};
export const logoutUser = () => {
  return {
    type: LOG_OUT
  }
}