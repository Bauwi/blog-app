import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startSetPosts } from '../../actions/posts';
import { sortByDate } from '../../actions/filters';
import selectPosts from '../../selectors/posts';

import PostsListItem from './PostsListItem';
import SmallLoader from '../SmallLoader';

export class PostsList extends Component {
  static defaultProps = {
    isNotFiltered: true,
    numberOfPosts: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.MorePostsOnScrollDown);
    this.props.sortByDate();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.MorePostsOnScrollDown);
  }

  MorePostsOnScrollDown = event => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      this.props.numberOfPosts !== this.props.totalPostsInState &&
      this.props.isNotFiltered &&
      this.props.isLoading === false
    ) {
      this.props.startSetPosts(undefined, this.props.posts.length, this.props.posts.length + 6);
    }
  };

  renderPosts = () => {
    return this.props.posts.map(post => <PostsListItem key={post.id} {...post} />);
  };

  render() {
    return (
      <div className="content-container post-list">
        {this.props.posts.length === 0 && (
          <div className="list__empty">
            <p>Nothing found !</p>
          </div>
        )}
        <div className="grid-dashboard">{this.renderPosts()}</div>
        {this.props.numberOfPosts !== this.props.posts.length && this.props.isLoading ? (
          <SmallLoader />
        ) : (
          <div className="loader loader--small loader--empty" />
        )}
      </div>
    );
  }
}

PostsList.propTypes = {
  isNotFiltered: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  startSetPosts: PropTypes.func.isRequired,
  sortByDate: PropTypes.func.isRequired,
  numberOfPosts: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
  startSetPosts: (id, rangeMin, rangeMax) => dispatch(startSetPosts(id, rangeMin, rangeMax)),
  sortByDate: () => dispatch(sortByDate())
});

const mapStateToProps = state => ({
  isNotFiltered: state.filters.text === '' && state.filters.sortBy === 'date',
  posts: selectPosts(state.posts.posts, state.filters),
  numberOfPosts: state.users.preferences ? state.users.preferences.numberOfPosts : 0,
  isLoading: state.posts.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
