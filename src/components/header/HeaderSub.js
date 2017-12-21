import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderSub = () => (
  <nav className="header__navbarsub">
    <NavLink to="/category/architecture" activeClassName="architecture">
      ARCHITECTURE
    </NavLink>
    <NavLink to="/category/sculpture" activeClassName="sculpture">
      SCULPTURE
    </NavLink>
    <NavLink to="/category/visuals" activeClassName="visuals">
      VISUALS
    </NavLink>
    <NavLink to="/category/music" activeClassName="music">
      MUSIC
    </NavLink>
    <NavLink to="/category/literature" activeClassName="literature">
      LITERATURE
    </NavLink>
    <NavLink to="/category/performings" activeClassName="performings">
      PERFORMINGS
    </NavLink>
    <NavLink to="/category/cinema" activeClassName="cinema">
      CINEMA
    </NavLink>
    <NavLink to="/category/photography" activeClassName="photography">
      PHOTOGRAPHY
    </NavLink>
  </nav>
);

export default HeaderSub;
