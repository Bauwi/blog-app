import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startSetPosts } from '../../actions/posts';
import selectPosts from '../../selectors/posts';

import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import PostsListItem from './PostsListItem';

export class PostsList extends Component {
  state = {
    loaded: 10
  };
  handleMorePosts = () => {
    this.props.startSetPosts(undefined, this.state.loaded + 10);
    this.setState(prevState => ({ loaded: prevState + 12 }));
  };

  renderPosts = () => {
    return this.props.posts.map(post => <PostsListItem key={post.id} {...post} />);
  };

  render() {
    if (this.props.posts.length === 0) {
      return (
        <div className="content-container post-list">
          <CompleteFiltersBar />
          <p>No posts found here</p>
        </div>
      );
    }
    return (
      <div className="content-container post-list">
        <CompleteFiltersBar />
        <div className="grid-dashboard">{this.renderPosts()}</div>
        <button className="button button--more" onClick={this.handleMorePosts}>
          Load more
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPosts: (id, rangeMax) => dispatch(startSetPosts(id, rangeMax))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
