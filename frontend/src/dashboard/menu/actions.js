import api from '../../api.js';

export const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
}

export const loginRequest = () => ({
  type: actions.LOGIN_REQUEST,
});

export const loginSuccess = (username) => ({
  type: actions.LOGIN_SUCCESS,
  username,
});

export const loginFailure = (message) => ({
  type: actions.LOGIN_FAILURE,
  message,
});

export const logoutSuccess = () => ({
  type: actions.LOGOUT_SUCCESS,
});


export const login = (username, password) => (dispatch) => {
  dispatch(loginRequest());

  api({
    method: 'post',
    url: 'login',
    headers: {'Content-Type': 'application/json'},
    data: {
      username: username,
      password: password,
    }
  }).then((res) => {
    const { success, message, username } = res.data;
    if (success) {
      dispatch(loginSuccess(username));
    } else {
      dispatch(loginFailure(message));
    }
  });
}

export const logout = () => (dispatch) => {
  console.log("logout");
  api('logout').then((res) => {
    const { success } = res.data;
    if (success) {
      dispatch(logoutSuccess());
    }
  })
}
