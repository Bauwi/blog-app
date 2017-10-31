import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import PublicPostsList from './PublicPostsList';

import { startSetPostsSample } from '../actions/posts';
import selectPosts from '../selectors/posts';

export class HomeRead extends Component {
  componentWillMount() {
    this.props.startSetPostsSample(20);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Header />HomeRead
        <PublicPostsList posts={this.props.posts} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize))
});

const mapStateToProps = state => ({
  posts: selectPosts(state.posts, state.filters)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRead);
