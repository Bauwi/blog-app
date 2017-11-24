import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';

import HeaderNavBar from './HeaderNavBar';

const Header = () => (
  <Headroom>
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <label className="header__search">
            <i className="fa fa-search" />
          </label>

          <Link className="header__title" to="/">
            <h1>BLOYSTER</h1>
          </Link>
          <HeaderNavBar />
        </div>
      </div>
    </header>
  </Headroom>
);

export default Header;
