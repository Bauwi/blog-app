import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'antd';

import RunListDropdown from './RunListDropdown';
import LoginModal from './LoginModal';

import { startLogout } from '../../actions/auth';
import { startSetRunPosts } from '../../actions/run';

export class HeaderNavBar extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.startSetRunPosts();
    }
  }

  render() {
    const { isAuthenticated, runCount = 0, startLogout } = this.props;
    if (isAuthenticated) {
      return (
        <nav className="header__navbar">
          <NavLink to="/">
            <i className="fa fa-home" />
          </NavLink>
          <NavLink to="/dashboard">
            <i className="fa fa-pencil" />
          </NavLink>
          <nav to="/run">
            <Badge className="header__navbar__run__badge" showZero count={runCount} />
            <RunListDropdown />
          </nav>
          <NavLink to="/preferences">
            <i className="fa fa-cog" />
          </NavLink>
          <button className="button button--navbar" onClick={startLogout}>
            <i className="fa fa-sign-out" />
          </button>
        </nav>
      );
    }
    return (
      <nav className="header__navbar">
        <NavLink to="/">
          <i className="fa fa-home" />
        </NavLink>
        <LoginModal />
      </nav>
    );
  }
}

HeaderNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  runCount: PropTypes.number,
  startLogout: PropTypes.func.isRequired,
  startSetRunPosts: PropTypes.func.isRequired
};

HeaderNavBar.defaultProps = { runCount: 0 };

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
  startSetRunPosts: () => dispatch(startSetRunPosts())
});

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
  runCount: state.run.posts ? state.run.posts.length : 0
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavBar);
