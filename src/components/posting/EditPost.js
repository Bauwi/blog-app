import React, { Component } from 'react';
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
        <PostForm onSubmit={this.onSubmit} post={this.props.post} />
        <button onClick={this.onRemovePost}>Remove Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post: state.posts.find(post => {
      return post.id === props.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startEditPost: (id, post) => dispatch(startEditPost(id, post)),
  startRemovePost: id => dispatch(startRemovePost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
