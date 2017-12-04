import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
  <div className="footer__container">
    <div className="content-container">
      <div className="footer">
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
        <div className="footer__license">
          <p>2017 - License MIT</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
