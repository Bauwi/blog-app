import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';

import { startLogout } from '../actions/auth';

const scrollToTop = scrollDuration => {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (scrollDuration / 15),
    cosParameter = scrollHeight / 2;
  let scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(() => {
      if (window.scrollY != 0) {
        scrollCount += 1;
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        window.scrollTo(0, scrollHeight - scrollMargin);
      } else clearInterval(scrollInterval);
    }, 15);
};

export class Header extends Component {
  state = { goTopIcon: false };

  render() {
    const { isAuthenticated, startLogout, context, goTopIcon } = this.props;
    return (
      <Headroom
        onUnfix={() => this.setState(() => ({ goTopIcon: false }))}
        onPin={() => this.setState(() => ({ goTopIcon: true }))}
      >
        <header className={context === 'write-mode' ? 'header--write-mode' : 'header'}>
          <div className="content-container">
            <div className="header__content">
              <Link className="header__title" to="/dashboard">
                <h1>Blog</h1>
              </Link>
              {isAuthenticated ? (
                <nav className="header__navbar">
                  {this.state.goTopIcon && (
                    <nav onClick={() => scrollToTop(1000)}>
                      <i className="fa fa-arrow-up" />
                    </nav>
                  )}
                  <NavLink to="/home">
                    <i className="fa fa-home" />
                  </NavLink>
                  <NavLink to="/dashboard">
                    <i className="fa fa-tachometer" />
                  </NavLink>
                  <NavLink to="/dashboard">
                    <i className="fa fa-cog" />
                  </NavLink>
                  <button className="button button--navbar" onClick={startLogout}>
                    <i className="fa fa-sign-out" />
                  </button>
                </nav>
              ) : (
                <nav className="header__navbar">
                  {this.state.goTopIcon && (
                    <nav onClick={() => scrollToTop(1000)}>
                      <i className="fa fa-arrow-up" />
                    </nav>
                  )}
                  <NavLink to="/home">
                    <i className="fa fa-home" />
                  </NavLink>
                  <Link to="/">
                    <i className="fa fa-sign-in" />
                  </Link>
                </nav>
              )}
            </div>
          </div>
        </header>
      </Headroom>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
