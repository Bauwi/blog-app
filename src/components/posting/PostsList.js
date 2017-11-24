import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startSetPosts } from '../../actions/posts';
import selectPosts from '../../selectors/posts';

import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import PostsListItem from './PostsListItem';

export class PostsList extends Component {
  handleMorePosts = () => {
    this.props.startSetPosts(undefined, this.props.posts.length + 10);
  };

  renderPosts = () => {
    return this.props.posts.map(post => <PostsListItem key={post.id} {...post} />);
  };

  render() {
    return (
      <div className="content-container post-list">
        <CompleteFiltersBar />
        {this.props.posts.length === 0 && (
          <div className="list__empty">
            <p>Nothing found !</p>
          </div>
        )}
        <div className="grid-dashboard">{this.renderPosts()}</div>
        <button className="button button--more" onClick={this.handleMorePosts}>
          Load more
        </button>
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  startSetPosts: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetPosts: (id, rangeMax) => dispatch(startSetPosts(id, rangeMax))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
