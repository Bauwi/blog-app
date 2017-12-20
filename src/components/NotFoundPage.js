import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="not-found">
    <header>
      <Link to="/">Home</Link>
      <p>Sorry, we have not found anything here !</p>
    </header>

    <img className="image" src="/images/404.jpg" alt="404 not found" />
  </div>
);

export default NotFoundPage;
