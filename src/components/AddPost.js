import React, { Component } from 'react';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { startAddPost } from '../actions/posts';


export class AddPost extends Component {
  onSubmit = (post) => {
    this.props.startAddPost(post);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Create Post Page</h1> 
        <PostForm onSubmit={this.onSubmit}/>  
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddPost: (post) => dispatch(startAddPost(post))
});

export default connect(undefined, mapDispatchToProps)(AddPost);