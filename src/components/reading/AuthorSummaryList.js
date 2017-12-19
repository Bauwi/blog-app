import React, { Component } from 'react';

import AuthorSummaryListItem from './AuthorSummaryListItem';

export default class AuthorSummaryList extends Component {
  renderList() {
    return this.props.posts.map((post) => {
      const key = post.content ? post.content.id : post.id;

      return <AuthorSummaryListItem key={key} post={post} />;
    });
  }

  render() {
    return (
      <div className="content-container">
        <div className="masonry">{this.renderList()}</div>;
      </div>
    );
  }
}
