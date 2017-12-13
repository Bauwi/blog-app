import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';

import RunReadNav from './RunReadNav';
import RunReadPost from './RunReadPost';
import LoadingPage from '../LoadingPage';
import { startUpdateRunPostToAlreadyRead } from '../../actions/run';

export class RunRead extends Component {
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
            description: `by ${author}`,
            style: {
              position: 'relative',
              top: '4rem'
            }
          });
        };
        openNotificationWithIcon('success');
        this.props.startUpdateRunPostToAlreadyRead(id, DBid);
      }
    }
  };

  render() {
    if (this.props.isLoading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <RunReadPost post={this.props.current} />
        <RunReadNav currentRead={this.props.current} />
      </div>
    );
  }
}

RunRead.propTypes = {
  current: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  startUpdateRunPostToAlreadyRead: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startUpdateRunPostToAlreadyRead: (id, DBid) => dispatch(startUpdateRunPostToAlreadyRead(id, DBid))
});

const mapStateToProps = state => ({
  current: state.run.current,
  isLoading: state.run.isLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunRead));
