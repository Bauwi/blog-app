import React, { Component } from 'react';
import { connect } from 'react-redux';

import selectPosts from '../../selectors/posts';

import PostListFilters from '../PostListFilters';
import PostsListItem from './PostsListItem';

export class PostsList extends Component {
  renderPosts = () => {
    return this.props.posts.reverse().map(post => <PostsListItem key={post.id} {...post} />);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <PostListFilters />
        {this.renderPosts()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps)(PostsList);
