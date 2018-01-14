import { actions } from './actions';

const initialState = {
	username: null,
	loginMessage: null,
	isAuthenticated: false,
	isAuthenticating: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOGIN_REQUEST:
			return {
				...state,
				isAuthenticating: true,
			};

		case actions.LOGIN_SUCCESS:
			const { username } = action;
			return {
				...state,
				username,
				isAuthenticating: false,
				isAuthenticated: true,
			};

		case actions.LOGIN_FAILURE:
			const { message } = action;
			return {
				...state,
				isAuthenticating: false,
				loginMessage: message,
			};

		case actions.LOGOUT_SUCCESS:
			return {
				...state,
				username: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
};

export default reducer;

export const getLoginState = storeState => storeState.login;
export const isAuthenticated = state => state.isAuthenticated;
export const isAuthenticating = state => state.isAuthenticating;
export const getUser = state => state.username;
export const getLoginMessage = state => state.loginMessage;
