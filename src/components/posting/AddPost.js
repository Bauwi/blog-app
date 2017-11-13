import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import { startAddPost } from '../../actions/posts';
import { startUpdateUser } from '../../actions/users';

export class AddPost extends Component {
  onSubmit = post => {
    this.props.startAddPost(post);
    this.props.startUpdateUser(undefined, { username: post.author });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <header className="content-container">
            <Link to="/dashboard">Back to dashboard</Link>
          </header>
        </div>
        <PostForm onSubmit={this.onSubmit} context="add" author={this.props.user} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPost: post => dispatch(startAddPost(post)),
  startUpdateUser: (id, updates) => dispatch(startUpdateUser(id, updates))
});

const mapStateToProps = state => ({
  user: state.users.preferences
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
