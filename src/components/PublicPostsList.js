//manage postsLists that redirects vers public read mode
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PublicPostsListItem from './PublicPostsListItem';
import LoadingPage from './LoadingPage';

import selectPosts from '../selectors/posts';

export class PublicPostsList extends Component {
  renderListItem = () => {
    return this.props.posts.map(post => {
      return <PublicPostsListItem key={post.id} post={post} />;
    });
  };
  capitalized = str => {
    const arr = str.split('');
    return [arr[0].toUpperCase(), ...arr.slice(1, arr.length)].join('');
  };
  render() {
    if (this.props.isLoading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <div className="homelist__header">
          <div className="content-container">
            <h3 className="homelist__header__title">
              {this.props.category && this.capitalized(this.props.category)}
            </h3>
          </div>
        </div>

        {this.props.posts.length === 0 && (
          <div className="content-container homelist__empty">
            <p>
              Nothing matches! Please check you spelled correctly the category name in your
              preferences or choose a more generic term.{' '}
              <span>
                <Link to="/preferences">Check my preferences</Link>
              </span>
            </p>
          </div>
        )}
        <div className="content-container content-container--border">
          <div className={this.props.grid}>{this.renderListItem()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const category = props.category || '';
  const posts = props.posts ? props.posts : state.readings.posts;
  return {
    posts: selectPosts(posts, state.filters, props.category).slice(0, props.range),
    isLoading: state.readings.isLoading
  };
};

export default connect(mapStateToProps)(PublicPostsList);
