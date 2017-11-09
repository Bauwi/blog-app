//manage postsLists that redirects vers public read mode
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PublicPostsListItem from './PublicPostsListItem';

import selectPosts from '../selectors/posts';

export class PublicPostsList extends Component {
  renderListItem = () => {
    return this.props.posts.map(post => {
      return <PublicPostsListItem key={post.id} {...post} />;
    });
  };
  capitalized = str => {
    const arr = str.split('');
    return [arr[0].toUpperCase(), ...arr.slice(1, arr.length)].join('');
  };
  render() {
    return (
      <div className="content-container">
        <h3 className="homelist__title">
          {this.props.category && this.capitalized(this.props.category)}
        </h3>
        <div className={this.props.grid}>{this.renderListItem()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const category = props.category || '';
  const posts = props.posts ? props.posts : state.readings;
  return {
    posts: selectPosts(posts, state.filters, props.category).slice(0, props.range)
  };
};

export default connect(mapStateToProps)(PublicPostsList);
