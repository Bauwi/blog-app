import React from 'react';

import ByTermFilter from './ByTermFilter';
import PopularLasttFilter from './PopularLastFilter';

const PostListFilters = () => (
  <div className="complete-filterbar">
    <ByTermFilter />
    <PopularLasttFilter />
  </div>
);
export default PostListFilters;
