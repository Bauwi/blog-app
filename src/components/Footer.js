import React from 'react';
import ContactModal from './ContactModal';
import AboutModal from './AboutModal';
import HireMeModal from './HireMeModal';

const Footer = () => (
  <div className="footer__container">
    <div className="content-container">
      <div className="footer">
        <nav className="footer__nav">
          <ContactModal />
          <AboutModal />
          <HireMeModal />
        </nav>
        <div className="footer__license">
          <p>2017 - License MIT</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
