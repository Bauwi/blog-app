import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, message } from 'antd';

import { setCurrentPostRun, startResetRun } from '../../actions/run';

const warning = () => {
  message.warning('You have no unread post left.');
};

export class RunListDropdown extends Component {
  renderDropdownPosts = () => {
    return this.props.posts.map(post => {
      return (
        <Menu.Item key={post.content.id}>
          <div
            className="dropdown-line"
            onClick={() => {
              this.props.setCurrentPostRun(post.content.id);
              this.props.history.push('/run/start');
            }}
          >
            <img src={post.content.miniCover} alt="minicover" />
            {post.state === 'read' ? (
              <p className="dropdown__check">
                <i className="fa fa-check" />
              </p>
            ) : (
              <p className="dropdown__check" />
            )}
            <p>{post.content.title}</p>
          </div>
        </Menu.Item>
      );
    });
  };

  handleResumeClick = () => {
    const firstUnreadIndex = this.props.posts.findIndex(post => post.state === 'unread');
    if (firstUnreadIndex === -1) {
      warning();
      this.props.setCurrentPostRun(this.props.posts[0].content.id);
      return this.props.history.push('/run');
    }
    this.props.setCurrentPostRun(this.props.posts[firstUnreadIndex].content.id);
    return this.props.history.push('/run/start');
  };

  handleResetClick = () => {
    this.props.startResetRun();
    if (this.props.history.location.pathname === '/run/start') {
      this.props.history.push('/');
    }
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <button className="button" onClick={this.handleResumeClick}>
            Resume
          </button>
          <button className="button" onClick={this.handleResetClick}>
            Reset
          </button>
        </Menu.Item>

        {this.props.posts && this.renderDropdownPosts()}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomCenter" className="dropdown" trigger={['click']}>
        <Link className="ant-dropdown-link" to="/run">
          <i className="fa fa-book" />
        </Link>
      </Dropdown>
    );
  }
}

RunListDropdown.propTypes = {
  posts: PropTypes.array,
  setCurrentPostRun: PropTypes.func.isRequired,
  startResetRun: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id)),
  startResetRun: () => dispatch(startResetRun())
});

const mapStateToProps = state => ({
  posts: state.run.posts
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunListDropdown));
