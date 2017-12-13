import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import selectPosts from '../../selectors/posts';

export const PostsSummary = ({ selectedPosts, totalUserPosts }) => {
  const totalInMinutes = selectedPosts.reduce((total, post) => (total += post.readingTime), 0);
  const hiddenPostsNum =
    totalUserPosts - selectedPosts.length >= 0 ? totalUserPosts - selectedPosts.length : 0;
  return (
    <div className="page-header__container">
      <div className="content-container">
        <div className="page-header__content">
          <div>
            <h1 className="page-header__title">Dashboard</h1>
            <p className="page-header__title">
              {selectedPosts.length} post{selectedPosts.length > 1 ? 's' : ''} totalling{' '}
              {totalInMinutes} minute{totalInMinutes > 1 ? 's' : ''} read.
            </p>
            <p className="page-header__subtitle">{hiddenPostsNum} hidden posts</p>
          </div>
          <div className="page-header__actions">
            <Link className="button button--icon" to="/create">
              <i className="fa fa-pencil-square-o" />
            </Link>
          </div>
        </div>
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
