import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startSetPosts } from '../../actions/posts';
import { sortByDate } from '../../actions/filters';
import selectPosts from '../../selectors/posts';

import CompleteFiltersBar from '../filters/CompleteFiltersBar';
import PostsListItem from './PostsListItem';
import SmallLoader from '../SmallLoader';

export class PostsList extends Component {
  state = {
    loading: false,
    rangeMin: 0,
    rangeMax: 9
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
      this.state.loading === false
    ) {
      this.setState(() => ({ loading: true }));
      this.props
        .startSetPosts(undefined, this.props.posts.length, this.props.posts.length + 6)
        .then(() => {
          this.setState(() => ({ loading: false }));
        });
    }
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
        {this.props.numberOfPosts !== this.props.posts.length &&
          this.state.loading && <SmallLoader />}
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
  posts: selectPosts(state.posts, state.filters),
  numberOfPosts: state.users.preferences.numberOfPosts
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
