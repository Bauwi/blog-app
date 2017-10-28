import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { startAddPost, startAddStar } from '../../actions/posts';

export class AddPost extends Component {
  onSubmit = post => {
    this.props.startAddPost(post);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Link to="/dashboard">Back to dashboard</Link>
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
