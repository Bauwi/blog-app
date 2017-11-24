import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RunReadNavItem from './RunReadNavItem';

const RunReadNav = ({ previousRead, nextRead }) => (
  <nav className="post-nav content-container">
    <ul>
      <RunReadNavItem post={previousRead} />
      <RunReadNavItem post={nextRead} />
    </ul>
  </nav>
);

RunReadNav.propTypes = {
  previousRead: PropTypes.object,
  nextRead: PropTypes.object
};

const mapStateToProps = (state, props) => {
  const currentPostIndex = state.run.posts.findIndex(post => post.content.id === props.currentRead.content.id);
  return {
    previousRead: state.run.posts[currentPostIndex - 1],
    nextRead: state.run.posts[currentPostIndex + 1]
  };
};

export { RunReadNav };
export default connect(mapStateToProps)(RunReadNav);
