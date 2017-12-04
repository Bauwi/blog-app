import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';

import LoadingPage from '../LoadingPage';

const noUnreadPostWarning = () => {
  message.warning('You have no unread post left.');
};

import { setCurrentPostRun, startResetRun, startCleanRun } from '../../actions/run';

export class RunSummaryHeader extends Component {
  static defaultProps = {
    run: { posts: [] }
  };

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
    if (this.props.run.posts.length === 0) {
      return this.props.noUnreadPostWarning();
    }
    const firstUnreadIndex = this.props.run.posts.findIndex(post => post.state === 'unread');
    if (firstUnreadIndex === -1) {
      return this.props.noUnreadPostWarning();
    }
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
    if (this.props.isLoading) {
      return <LoadingPage />;
    }
    return (
      <div className="run__summary">
        <div className="content-container">
          <header className="run__summary__header">
            <div>
              <h1>Current Run</h1>
              <p>{this.props.run.posts.length} posts</p>
              <p>{this.totalReadingTime(this.props.run.posts)}</p>
            </div>

            <div className="run__summary__buttons">
              <button className="button button--icon" onClick={this.toFirstUnread}>
                <i className="fa fa-play-circle" />
              </button>
              <div>
                <button className="button button--icon" onClick={this.handleCleanRun}>
                  <i className="fa fa-fire-extinguisher" />
                </button>
                <button className="button button--icon" onClick={this.props.startResetRun}>
                  <i className="fa fa-trash" />
                </button>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id)),
  startResetRun: () => dispatch(startResetRun()),
  startCleanRun: alreadyRead => dispatch(startCleanRun(alreadyRead)),
  noUnreadPostWarning: () => noUnreadPostWarning()
});

const mapStateToProps = state => ({
  isLoading: state.run.isLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunSummaryHeader));
