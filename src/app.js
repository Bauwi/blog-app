import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';

import { startSetPosts } from './actions/posts';
import { login, logout } from './actions/auth';
import { startSetUserPreferences } from './actions/users';
import LoadingPage from './components/LoadingPage';

import 'normalize-css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// check if app has already been rendered to avoid useless re-rendering
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// manage redirecting when user is authenticated
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetUserPreferences());
    store.dispatch(startSetPosts(user.uid, 16)).then(() => {
      renderApp();
    });
  } else if (
    !history.location.pathname.includes('/read') &&
    history.location.pathname !== '/home'
  ) {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  } else {
    store.dispatch(logout());
    renderApp();
  }
});
