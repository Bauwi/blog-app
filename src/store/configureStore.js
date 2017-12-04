import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts';
import filtersReducer from '../reducers/filters';
import readingsReducer from '../reducers/readings';
import usersReducer from '../reducers/users';
import runReducer from '../reducers/run';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// STORE CREATION
// The combineReducers function turns an object whose values are
// different reducing functioins into a single reducing function you
// can pass to createStore

// rootReducer is used to re-initialize store when users logs out.

const appReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  filters: filtersReducer,
  readings: readingsReducer,
  users: usersReducer,
  run: runReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default () => {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
