import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startEditPost, startRemovePost } from '../../actions/posts';

import PostForm from './PostForm';

export class EditPost extends Component {
  onSubmit = post => {
    this.props.startEditPost(this.props.post.id, post);
    this.props.history.push('/dashboard');
  };
  onRemovePost = () => {
    this.props.startRemovePost(this.props.post.id);
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <PostForm
          onSubmit={this.onSubmit}
          post={this.props.post}
          author={this.props.user}
          context="edit"
        />
        <button onClick={this.onRemovePost}>Remove Post</button>
      </div>
    );
  }
}

EditPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    authorId: PropTypes.string.isRequired,
    body: PropTypes.arrayOf(PropTypes.object).isRequired,
    cover: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    keywords: PropTypes.string.isRequired,
    miniCover: PropTypes.string.isRequired,
    readingTime: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    stars: PropTypes.number.isRequired,
    topCategories: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string
  }).isRequired,
  startEditPost: PropTypes.func.isRequired,
  startRemovePost: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find(post => {
      return post.id === props.match.params.id;
    }),
    user: state.users.preferences
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (id, post) => dispatch(startEditPost(id, post)),
  startRemovePost: id => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
