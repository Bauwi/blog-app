import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectPosts from '../../selectors/posts';

export const PostsSummary = ({ selectedPosts, totalUserPosts }) => {
  const totalInMinutes = selectedPosts.reduce((total, post) => (total += post.readingTime), 0);
  const hiddenPostsNum = totalUserPosts - selectedPosts.length;
  return (
    <div className="page-header__container">
      <div className="content-container">
        <div className="page-header__actions">
          <Link className="button" to="/create">
            <i className="fa fa-pencil" /> New Post
          </Link>
        </div>
        <h1 className="page-header__title">
          {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''}. {totalInMinutes} minute{totalInMinutes > 1 ? 's' : ''}{' '}
          read.
        </h1>
        <h3 className="page-header__subtitle">{hiddenPostsNum} hidden posts</h3>
      </div>
    </div>
  );
};

PostsSummary.propTypes = {
  selectedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalUserPosts: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  selectedPosts: selectPosts(state.posts.posts, state.filters),
  totalUserPosts: state.users.preferences.numberOfPosts
});

export default connect(mapStateToProps)(PostsSummary);
