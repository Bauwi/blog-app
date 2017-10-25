import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsList from './PostsList';

import Header from './Header';

export class ReadPostPage extends Component {
  render() {
    // const {id}
    return (
      <div>
        <Header />
        <PostsList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps)(ReadPostPage);
