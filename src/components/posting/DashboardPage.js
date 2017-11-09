import React, { Component } from 'react';

import Header from '../Header';
import PostsList from './PostsList';
import PostsSummary from './PostsSummary';

export class DashboardPage extends Component {
  state = { goTopIcon: false };
  render() {
    return (
      <div>
        <h1 className="content-container">/ Dashboard</h1>
        <PostsSummary />
        <PostsList />
      </div>
    );
  }
}

export default DashboardPage;
