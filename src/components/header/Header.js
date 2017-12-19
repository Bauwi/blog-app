import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';

import HeaderNavBar from './HeaderNavBar';

const Header = () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>_TEKKNE_</h1>
        </Link>
        <HeaderNavBar />
      </div>
    </div>
  </header>
);

export default Header;
