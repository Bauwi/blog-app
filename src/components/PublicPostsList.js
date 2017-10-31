//manage postsLists that redirects vers public read mode
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PublicPostsListItem from './PublicPostsListItem';
import PostListFilters from './PostListFilters';

export class AllPostsList extends Component {
  renderListItem = () => {
    return this.props.posts.map(post => {
      return <PublicPostsListItem key={post.id} {...post} />;
    });
  };

  render() {
    return (
      <div>
        <PostListFilters />
        <p>ALLpost List Here</p>
        {this.renderListItem()}
      </div>
    );
  }
}

export default connect()(AllPostsList);
