import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostForm from './PostForm';

import { startAddPost } from '../../actions/posts';
import { startUpdateUser, upPostsCount } from '../../actions/users';

export class AddPost extends Component {
  onSubmit = post => {
    this.props.startAddPost(post);
    this.props.startUpdateUser(undefined, {
      numberOfPosts: this.props.preferences.numberOfPosts
        ? this.props.preferences.numberOfPosts + 1
        : 1
    });
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <header className="content-container">
            <Link to="/dashboard">Back to dashboard</Link>
          </header>
        </div>
        <PostForm onSubmit={this.onSubmit} context="add" author={this.props.preferences} />
      </div>
    );
  }
}

AddPost.propTypes = {
  preferences: PropTypes.object.isRequired,
  startAddPost: PropTypes.func.isRequired,
  startUpdateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startAddPost: post => dispatch(startAddPost(post)),
  startUpdateUser: (id, updates) => dispatch(startUpdateUser(id, updates)),
  upPostsCount: id => dispatch(upPostsCount(id))
});

const mapStateToProps = state => ({
  preferences: state.users.preferences,
  userId: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
