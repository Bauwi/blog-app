import React, { Component } from 'react';

import InlineListItem from './InlineListItem';

export default class InlineList extends Component {
  renderList() {
    return this.props.posts.map((post) => {
      const key = post.content ? post.content.id : post.id;

      return <InlineListItem key={key} post={post} />;
    });
  }

  render() {
    return (
      <div className="content-container">
        <p>InlineList</p>
        {this.renderList()}
      </div>
    );
  }
}
