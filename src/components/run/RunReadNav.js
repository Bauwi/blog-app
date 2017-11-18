import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';

import RunReadNavItem from './RunReadNavItem';

import { updateRunPostToAlreadyRead, updateRunPostToNotAlreadyRead } from '../../actions/run';

export class RunReadNav extends Component {
  onNextClick = () => {
    this.props.updateRunPostToAlreadyRead(this.props.currentRead.content.id);
  };
  onPreviousClick = () => {
    this.props.updateRunPostToNotAlreadyRead(this.props.previousRead.content.id);
  };

  render() {
    return (
      <nav className="post-nav content-container">
        <ul>
          <RunReadNavItem post={this.props.previousRead} />
          <RunReadNavItem post={this.props.nextRead} />
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateRunPostToAlreadyRead: id => dispatch(updateRunPostToAlreadyRead(id)),
  updateRunPostToNotAlreadyRead: id => dispatch(updateRunPostToNotAlreadyRead(id))
});

const mapStateToProps = (state, props) => {
  const currentPostIndex = state.run.posts.findIndex(
    post => post.content.id === props.currentRead.content.id
  );
  return {
    previousRead: state.run.posts[currentPostIndex - 1],
    nextRead: state.run.posts[currentPostIndex + 1]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunReadNav);
