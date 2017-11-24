import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostsList from './PostsList';
import PostsSummary from './PostsSummary';
import UserCard from '../UserCard';

const DashboardPage = ({ user }) => (
  <div className="content-container">
    <div>
      <UserCard author={user} />
      <PostsSummary />
      <PostsList />
    </div>
  </div>
);

DashboardPage.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    stars: PropTypes.number.isRequired,
    topCategories: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.users.preferences
});

export { DashboardPage };
export default connect(mapStateToProps)(DashboardPage);
