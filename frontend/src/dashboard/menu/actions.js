import api from '../../api.js';

export const actions = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
}

export const loginRequest = () => ({
  type: actions.LOGIN,
});

export const loginSuccess = (username) => ({
  type: actions.LOGIN_SUCCESS,
  username,
});

export const loginFailure = (message) => ({
  type: actions.LOGIN_FAILURE,
  message,
});

export const logout = () => ({
  type: actions.LOGOUT,
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
      dispatch(loginFailure(message))
    }
  });
}
