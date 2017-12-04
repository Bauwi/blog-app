import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderSub = () => (
  <nav className="header__navbarsub">
    <div className="header-navbarsub--three">
      <NavLink to="/category/music" activeClassName="header__navbarsub__tab--selected">
        Music
      </NavLink>
      <NavLink to="/category/movie" activeClassName="header__navbarsub__tab--selected">
        Movie
      </NavLink>
      <NavLink to="/category/litterature" activeClassName="header__navbarsub__tab--selected">
        Litterature
      </NavLink>
    </div>
    <div className="header-navbarsub--three">
      <NavLink to="/category/life" activeClassName="header__navbarsub__tab--selected">
        Life
      </NavLink>
      <NavLink to="/category/programming" activeClassName="header__navbarsub__tab--selected">
        Programming
      </NavLink>
      <NavLink to="/category/history" activeClassName="header__navbarsub__tab--selected">
        History
      </NavLink>
    </div>
    <div className="header-navbarsub--three">
      <NavLink to="/category/sport" activeClassName="header__navbarsub__tab--selected">
        Sport
      </NavLink>
      <NavLink to="/category/business" activeClassName="header__navbarsub__tab--selected">
        Business
      </NavLink>
    </div>
  </nav>
);

export default HeaderSub;
