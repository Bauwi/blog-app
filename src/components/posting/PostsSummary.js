import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectPosts from '../../selectors/posts';

export const PostsSummary = ({ selectedPosts }) => (
  <div className="page-header">
    <div className="page-header__actions">
      <Link className="button" to="/create">
        New Post
      </Link>
    </div>
    <h1 className="page-header__title">Viewing {selectedPosts.length} posts totalling</h1>
    <h3 className="page-header__subtitle">2 hidden posts</h3>
  </div>
);

const mapStateToProps = state => ({
  selectedPosts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps)(PostsSummary);
