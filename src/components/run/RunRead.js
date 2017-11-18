import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

import RunReadNav from './RunReadNav';
import RunReadPost from './RunReadPost';
import LoadingPage from '../LoadingPage';
import {
  startSetRunPosts,
  setCurrentPostRun,
  startUpdateRunPostToAlreadyRead
} from '../../actions/run';

export class RunRead extends Component {
  state = {
    loading: true
  };
  componentWillMount() {
    // if there is no run state set yet, set one. Then set current state too.
    if (this.props.run.length === 0) {
      this.props.startSetRunPosts().then(() => {
        const firstUnreadIndex = this.props.run.posts.findIndex(post => post.state === 'unread');
        this.props.setCurrentPostRun(this.props.run.posts[firstUnreadIndex].content.id);
        this.setState(() => ({ loading: false }));
      });
    } else {
      this.setState(() => ({ loading: false }));
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = event => {
    const DBid = this.props.current.DBid;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (this.props.current.state !== 'read') {
        const { id, title, author } = this.props.current.content;
        const openNotificationWithIcon = type => {
          notification[type]({
            message: title,
            description: `by ${author}`
          });
        };
        openNotificationWithIcon('success');
        this.props.startUpdateRunPostToAlreadyRead(id, DBid);
      }
    }
  };

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <RunReadPost post={this.props.current} />
        <RunReadNav
          currentRead={this.props.current}
          previousRead={this.props.previous}
          nextRead={this.props.next}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetRunPosts: () => dispatch(startSetRunPosts()),
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id)),
  startUpdateRunPostToAlreadyRead: (id, DBid) => dispatch(startUpdateRunPostToAlreadyRead(id, DBid))
});

const mapStateToProps = state => ({
  run: state.run,
  current: state.run.current
});

export default connect(mapStateToProps, mapDispatchToProps)(RunRead);
