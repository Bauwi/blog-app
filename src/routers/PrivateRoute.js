// PrivateRoute component is used to manage private only pages
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Footer';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  // get the rest of the props
  ...rest
}) => (
  <Route
    {...rest}
    component={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
