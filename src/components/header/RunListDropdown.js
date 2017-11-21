import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Dropdown, Icon, message } from 'antd';

import { setCurrentPostRun } from '../../actions/run';

const warning = () => {
  message.warning('You have already read all the posts contained in your run.');
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

  render() {
    console.log(this.props);
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <button className="button" onClick={this.handleResumeClick}>
            Resume
          </button>
          <button className="button">Reset</button>
        </Menu.Item>
        {this.props.posts && this.renderDropdownPosts()}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomCenter" className="dropdown">
        <Link className="ant-dropdown-link" to="/run">
          <i className="fa fa-book" />
        </Link>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id))
});

const mapStateToProps = state => ({
  posts: state.run.posts
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunListDropdown));
