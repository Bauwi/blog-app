import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectPosts from '../selectors/posts';

import PostListFilters from './PostListFilters';
import PostsListItem from './PostsListItem';

export class PostsList extends Component {
  renderPosts = () => {
    return this.props.posts.map(post => (
      <PostsListItem key={post.id} isAuthenticated={this.props.isAuthenticated} {...post} />
    ));
  };

  render() {
    return (
      <div>
        <PostListFilters />
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters),
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PostsList);
