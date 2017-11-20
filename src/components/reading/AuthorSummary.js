import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from '../header/Header';
import UserCard from '../UserCard';
import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import InlineList from '../InlineList';
import Footer from '../Footer';

import selectPosts from '../../selectors/posts';
import LoadingPage from '../LoadingPage';

import { startSetSpecificUserPosts } from '../../actions/readings';
import { startSetAuthorFromUserId } from '../../actions/users';
import { resetFilters } from '../../actions/filters';

export class AuthorSummary extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
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

  componentWillUnmount() {
    this.props.resetFilters();
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <Header />
        <div className="page-container">
          <div className="content-container">
            <UserCard author={this.props.author} />
            <CompleteFiltersBar />
          </div>
          <InlineList posts={this.props.posts} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetSpecificUserPosts: id => dispatch(startSetSpecificUserPosts(id)),
  startSetAuthorFromUserId: userId => dispatch(startSetAuthorFromUserId(userId)),
  resetFilters: () => dispatch(resetFilters())
});

const mapStateToProps = state => ({
  posts: selectPosts(state.readings.currentUserPosts, state.filters),
  author: state.users.author
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSummary);
