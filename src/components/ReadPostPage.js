import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import PublicPostsLists from './PublicPostsList';

import PostSListFilters from './PostListFilters';
import selectPosts from '../selectors/posts';
import LoadingPage from './LoadingPage';

import { startSetSpecificUserPosts } from '../actions/readings';

export class ReadPostPage extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const userId = this.props.location.pathname.slice(1, 29);
    this.props.startSetSpecificUserPosts(userId).then(() => {
      this.setState(() => ({ loading: false }));
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <Header />
        <PublicPostsLists posts={this.props.posts} />
        <p>Read Post Page</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetSpecificUserPosts: id => dispatch(startSetSpecificUserPosts(id))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.readings.currentUserPosts, state.filters),
  test: state.readings
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadPostPage);
