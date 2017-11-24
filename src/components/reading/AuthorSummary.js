import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserCard from '../UserCard';
import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import AuthorSummaryList from './AuthorSummaryList';

import selectPosts from '../../selectors/posts';
import LoadingPage from '../LoadingPage';

import { startSetSpecificUserPosts } from '../../actions/readings';
import { startSetAuthorFromUserId } from '../../actions/users';

export class AuthorSummary extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const userId = this.props.location.pathname.slice(1, 29);
    return this.props
      .startSetSpecificUserPosts(userId)
      .then(() => {
        return this.props.startSetAuthorFromUserId(userId);
      })
      .then(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <div className="page-container">
          <div className="content-container">
            <UserCard author={this.props.author} />
            <CompleteFiltersBar />
          </div>
          <AuthorSummaryList posts={this.props.posts} />
        </div>
      </div>
    );
  }
}

AuthorSummary.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  author: PropTypes.object,
  startSetAuthorFromUserId: PropTypes.func.isRequired,
  startSetSpecificUserPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetSpecificUserPosts: id => dispatch(startSetSpecificUserPosts(id)),
  startSetAuthorFromUserId: userId => dispatch(startSetAuthorFromUserId(userId))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.readings.currentUserPosts, state.filters),
  author: state.users.author
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSummary);
