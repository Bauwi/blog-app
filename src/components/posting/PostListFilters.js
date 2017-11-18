import React from 'react';

import ByTermFilter from '../filters/ByTermFilter';
import PopularLasttFilter from '../filters/PopularLastFilter';

const PostListFilters = () => (
  <div className="complete-filterbar">
    <ByTermFilter />
    <PopularLasttFilter />
  </div>
);
export default PostListFilters;
