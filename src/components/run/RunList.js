import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RunListItem from './RunListItem';

export default class RunList extends Component {
  renderList() {
    return this.props.posts.map((post) => {
      const key = post.content ? post.content.id : post.id;

      return <RunListItem key={key} post={post} state={post.state} />;
    });
  }

  render() {
    return (
      <div className="content-container run-list">
        <p>RunList</p>
        {this.props.posts ? (
          this.renderList()
        ) : (
          <div>Add a post to your run to start a session</div>
        )}
      </div>
    );
  }
}

RunList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
};

RunList.defaultProps = {
  posts: []
};
