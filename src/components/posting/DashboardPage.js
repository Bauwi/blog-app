import React from 'react';

import PostsList from './PostsList';
import PostsSummary from './PostsSummary';

export const DashboardPage = () => (
  <div>
    <PostsSummary />
    <PostsList />
  </div>
);

export default DashboardPage;
