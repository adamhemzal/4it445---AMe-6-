export const actions = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
}

// export const login = (username, password) => ({
//   type: actions.LOGIN_REQUEST,
// });

export const loginSuccess = (user) => ({
  type: actions.LOGIN_SUCCESS,
  user,
});

export const loginFailure = (message) => ({
  type: actions.LOGIN_FAILURE,
  message,
});

export const logout = () => ({
  type: actions.LOGOUT,
});

export const login = (username, password, dispatch, { api }) => {
  api({
    method: 'post',
    url: 'login',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
    data: {
      username: username,
      password: password
    }
  }).then((res) => {
    const { success, message, user } = res.data;
    console.log(res);
    if (success) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure(message))
    }
  });
}
