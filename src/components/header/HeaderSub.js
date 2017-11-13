import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderSub = () => (
  <nav className="header__navbarsub">
    <NavLink to="/category/music">Music</NavLink>
    <NavLink to="/category/movie">Movie</NavLink>
    <NavLink to="/category/litterature">Litterature</NavLink>
    <NavLink to="/category/life">Life</NavLink>
    <NavLink to="/category/programming">Programming</NavLink>
    <NavLink to="/category/history">History</NavLink>
    <NavLink to="/category/sport">Sport</NavLink>
    <NavLink to="/category/business">Business</NavLink>
  </nav>
);

export default HeaderSub;
