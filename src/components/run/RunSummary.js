import React from 'react';
import { connect } from 'react-redux';

import RunSummaryHeader from './RunSummaryHeader';
import RunList from './RunList';

const RunSummary = ({ run }) => (
  <div className="page-container">
    <RunSummaryHeader run={run} />
    <RunList posts={run.posts} />
  </div>
);

const mapStateToProps = state => ({
  run: state.run
});

export default connect(mapStateToProps)(RunSummary);
