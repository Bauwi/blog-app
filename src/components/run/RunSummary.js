import React, { Component } from 'react';
import { connect } from 'react-redux';

import RunSummaryHeader from './RunSummaryHeader';
import RunList from './RunList';
import LoadingPage from '../LoadingPage';

export class RunSummary extends Component {
  render() {
    return (
      <div className="page-container">
        <RunSummaryHeader run={this.props.run} />
        <RunList posts={this.props.run.posts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  run: state.run
});

export default connect(mapStateToProps)(RunSummary);
