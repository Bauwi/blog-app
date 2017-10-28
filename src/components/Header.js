import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ isAuthenticated, startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Blog</h1>
        </Link>
        {isAuthenticated ? (
          <button className="button button--link" onClick={startLogout}>
            Logout
          </button>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </div>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
