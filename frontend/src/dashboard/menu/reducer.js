import { actions } from './actions';

const initialState = {
  user: null,
  loginMessage: null,
  isAuthenticated: false,
  isAuthenticating: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
    return {
      ...state,
      isAuthenticating: true,
    }

    case actions.LOGIN_SUCCESS:
    const { user } = action;
    return {
      ...state,
      user,
      isAuthenticating: false,
      isAuthenticated: true,
    }

    case actions.LOGIN_FAILURE:
    const { message } = action;
    return {
      ...state,
      isAuthenticating: false,
      loginMessage: message,
    }

    case actions.LOGOUT:
    return {
      ...state,
      isAuthenticated: false,
    }

    default:
    return state;
  }
};

export default reducer;

export const getLoginState = (storeState) => storeState.login;
export const isAuthenticated = (state) => state.isAuthenticated;
export const isAuthenticating = (state) => state.isAuthenticating;
export const getUser = (state) => state.user;
export const getLoginMessage = (state) => state.loginMessage;
