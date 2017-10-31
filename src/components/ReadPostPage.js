import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from './Header';
import PublicPostsLists from './PublicPostsList';

import PostSListFilters from './PostListFilters';
import selectPosts from '../selectors/posts';

import { startSetUserPosts } from '../actions/posts';

export class ReadPostPage extends Component {
  componentWillMount() {
    const userId = this.props.location.pathname.slice(1, 29);
    this.props.startSetUserPosts(userId);
  }

  render() {
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
  startSetUserPosts: id => dispatch(startSetUserPosts(id))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadPostPage);
