import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startSetPostsSample } from '../actions/posts';
import selectPosts from '../selectors/posts';

import AllPostsListItem from './AllPostsListItem';
import PostListFilters from './PostListFilters';

export class AllPostsList extends Component {
  componentWillMount() {
    this.props.startSetPostsSample(20);
  }

  renderListItem = () => {
    return this.props.posts.map(post => {
      return <AllPostsListItem {...post} />;
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

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPostsList);
