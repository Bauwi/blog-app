import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostsList from './PostsList';
import PostsSummary from './PostsSummary';
import UserCard from '../UserCard';

const DashboardPage = ({ preferences, userId }) => (
  <div>
    <PostsSummary />

    <div className="content-container">
      <UserCard author={preferences} userId={userId} />
      <PostsList />
    </div>
  </div>
);

DashboardPage.propTypes = {
  preferences: PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    stars: PropTypes.number.isRequired,
    topCategories: PropTypes.arrayOf(PropTypes.string),
    username: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  preferences: state.users.preferences,
  userId: state.auth.uid
});

export { DashboardPage };
export default connect(mapStateToProps)(DashboardPage);
