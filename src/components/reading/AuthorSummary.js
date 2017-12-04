import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserCard from '../UserCard';
import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import AuthorSummaryList from './AuthorSummaryList';

import selectPosts from '../../selectors/posts';
import LoadingPage from '../LoadingPage';

import { startSetSpecificUserPosts } from '../../actions/readings';

export class AuthorSummary extends Component {
  componentDidMount() {
    this.props.startSetSpecificUserPosts(this.props.userId);
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <div className="page-container">
          <div className="content-container">
            <UserCard author={this.props.author} userId={this.props.userId} />
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
  userId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  startSetSpecificUserPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetSpecificUserPosts: id => dispatch(startSetSpecificUserPosts(id))
});

const mapStateToProps = (state, props) => ({
  posts: selectPosts(state.readings.currentUserPosts, state.filters),
  author: state.users.author,
  isLoading: state.readings.isLoading,
  userId: props.location.pathname.slice(1, 29)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSummary);
