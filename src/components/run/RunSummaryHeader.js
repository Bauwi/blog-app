import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentPostRun, startResetRun, startCleanRun } from '../../actions/run';

export class RunSummaryHeader extends Component {
  totalReadingTime = posts => {
    const totalInMinutes = posts.reduce((total, post) => {
      return (total += post.content.readingTime);
    }, 0);
    if (totalInMinutes < 60) {
      return `${totalInMinutes} minutes read`;
    } else {
      const hours = Math.floor(totalInMinutes / 60);
      const minutes = totalInMinutes - hours * 60;
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${totalInMinutes} minutes read`;
    }
  };

  toFirstUnread = () => {
    const firstUnreadIndex = this.props.run.posts.findIndex(post => post.state === 'unread');
    this.props.setCurrentPostRun(this.props.run.posts[firstUnreadIndex].content.id);
    this.props.history.push('/run/start');
  };

  handleCleanRun = () => {
    // get an array of ids of already read posts
    const alreadyRead = this.props.run.posts
      .filter(post => post.state === 'read')
      .map(post => post.DBid);
    this.props.startCleanRun(alreadyRead);
  };

  render() {
    return (
      <div className="run__summary">
        <div className="content-container">
          <h1>Current Run</h1>
          <p>{this.props.run.posts ? this.props.run.posts.length : 0} posts</p>
          <p>{this.props.run.posts ? this.totalReadingTime(this.props.run.posts) : '0 minute'}</p>
          <div>
            <button className="button" onClick={this.toFirstUnread}>
              Resume
            </button>
            <button className="button" onClick={this.props.startResetRun}>
              Reset
            </button>
            <button className="button" onClick={this.handleCleanRun}>
              Clean
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id)),
  startResetRun: () => dispatch(startResetRun()),
  startCleanRun: alreadyRead => dispatch(startCleanRun(alreadyRead))
});

export default withRouter(connect(undefined, mapDispatchToProps)(RunSummaryHeader));
