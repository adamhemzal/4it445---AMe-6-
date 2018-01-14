import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

import api from '../api';

import { rootReducer } from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () =>
	createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk.withExtraArgument({ api }))),
	);
