import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import { Badge, Popover } from 'antd';

import { startLogout } from '../../actions/auth';
import RunListDropdown from './RunListDropdown';

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
      <div>
        {this.state.goTopIcon && (
          <div className="header__go-top" onClick={() => scrollToTop(1000)}>
            <i className="fa fa-arrow-up" />
          </div>
        )}
        <Headroom
          onUnfix={() => this.setState(() => ({ goTopIcon: false }))}
          onPin={() => this.setState(() => ({ goTopIcon: true }))}
        >
          <header className={context === 'write-mode' ? 'header--write-mode' : 'header'}>
            <div className="content-container">
              <div className="header__content">
                <label className="header__search">
                  <i className="fa fa-search" />
                </label>

                <Link className="header__title" to="/dashboard">
                  <h1>Blog</h1>
                </Link>
                {isAuthenticated ? (
                  <nav className="header__navbar">
                    <NavLink to="/home">
                      <i className="fa fa-home" />
                    </NavLink>
                    <NavLink to="/dashboard">
                      <i className="fa fa-tachometer" />
                    </NavLink>
                    <nav to="/run">
                      <Badge
                        className="header__navbar__run__badge"
                        showZero
                        count={this.props.runCount}
                      />
                      <RunListDropdown />
                    </nav>
                    <NavLink to="/preferences">
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid,
  runCount: state.run.posts ? state.run.posts.length : 0
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
