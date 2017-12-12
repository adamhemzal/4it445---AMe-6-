import { combineReducers } from 'redux';

import loginReducer from '../dashboard/menu/reducer';

export const rootReducer = combineReducers({
  login: loginReducer,
});
