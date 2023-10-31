import { combineReducers } from 'redux';
import { userReducer } from './reducers/user';

const appReducer = combineReducers({
  user: userReducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);
