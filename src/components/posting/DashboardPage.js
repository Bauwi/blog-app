import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import PostsList from './PostsList';
import PostsSummary from './PostsSummary';
import UserCard from '../UserCard';

export class DashboardPage extends Component {
  state = { goTopIcon: false };
  render() {
    return (
      <div className="content-container">
        <UserCard author={this.props.user} />
        <PostsSummary />
        <PostsList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.preferences
});

export default connect(mapStateToProps)(DashboardPage);
