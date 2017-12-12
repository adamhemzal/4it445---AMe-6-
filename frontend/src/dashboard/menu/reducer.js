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
        isAuthenticating: false,
        isAuthenticated: true,
      }

    case actions.LOGIN_FAILURE:
      const { message } action;
      return {
        ...state,
        isAuthenticating: false,
        loginMessage: message,
      }
  }
}
