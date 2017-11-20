import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

export class RunListDropdown extends Component {
  renderDropdownPosts = () => {
    return this.props.posts.map(post => {
      return (
        <Menu.Item key={post.content.id}>
          <div className="dropdown-line">
            <img src={post.content.miniCover} alt="minicover" />
            <p>{post.content.title}</p>
          </div>
        </Menu.Item>
      );
    });
  };

  render() {
    console.log(this.props.posts);
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <button className="button">Resume</button>
          <button className="button">Reset</button>
        </Menu.Item>
        {this.props.posts && this.renderDropdownPosts()}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomCenter" className="dropdown">
        <a className="ant-dropdown-link" href="/run">
          <i className="fa fa-book" />
        </a>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.run.posts
});

export default connect(mapStateToProps)(RunListDropdown);
