import React, { Component } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { startAddPost, startAddStar } from '../actions/posts';

export class AddPost extends Component {
  onSubmit = post => {
    this.props.startAddPost(post);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>New Post</h1>
        <PostForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPost: post => dispatch(startAddPost(post)),
  startAddStar: id => dispatch(startAddStar(id))
});

export default connect(undefined, mapDispatchToProps)(AddPost);
