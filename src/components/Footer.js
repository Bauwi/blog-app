import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <div className="footer__top">
      <nav className="footer__nav">
        <NavLink to="/category/music">Music</NavLink>
        <NavLink to="/dashboard">Movie</NavLink>
        <NavLink to="/category/litterature">Litterature</NavLink>
        <NavLink to="/category/life">Life</NavLink>
      </nav>
      <nav className="footer__nav">
        <NavLink to="/category/Programming">Programming</NavLink>
        <NavLink to="/category/history">History</NavLink>
        <NavLink to="/category/sport">Sport</NavLink>
        <NavLink to="/category/business">Business</NavLink>
      </nav>

      <nav className="footer__nav">
        <NavLink to="/">
          <i className="fa fa-home" /> Home
        </NavLink>
        <NavLink to="/dashboard">
          <i className="fa fa-tachometer" /> Dashboard
        </NavLink>
        <NavLink to="/run">
          <i className="fa fa-book" /> Run
        </NavLink>
        <NavLink to="/preferences">
          <i className="fa fa-cog" /> Preferences
        </NavLink>
      </nav>
      <nav className="footer__nav">
        <NavLink to="/contact">
          <i className="fa fa-address-card" /> Contact
        </NavLink>
        <NavLink to="/about">
          <i className="fa fa-question" /> About
        </NavLink>
        <NavLink to="/job">
          <i className="fa fa-handshake-o" /> Hire me!
        </NavLink>
      </nav>
    </div>
    <div className="footer__license">
      <p>2017 - License MIT</p>
    </div>
  </div>
);

export default Footer;
