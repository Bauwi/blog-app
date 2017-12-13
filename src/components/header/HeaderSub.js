import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderSub = () => (
  <nav className="header__navbarsub">
    <NavLink to="/category/architecture" activeClassName="architecture">
      architecture
    </NavLink>
    <NavLink to="/category/sculpture" activeClassName="sculpture">
      scuplture
    </NavLink>
    <NavLink to="/category/visuals" activeClassName="visuals">
      visuals
    </NavLink>
    <NavLink to="/category/music" activeClassName="music">
      music
    </NavLink>
    <NavLink to="/category/literature" activeClassName="literature">
      literature
    </NavLink>
    <NavLink to="/category/performings" activeClassName="performings">
      performings
    </NavLink>
    <NavLink to="/category/cinema" activeClassName="cinema">
      cinema
    </NavLink>
    <NavLink to="/category/photography" activeClassName="photography">
      photography
    </NavLink>
  </nav>
);

export default HeaderSub;
