import React from 'react';
import { connect } from 'react-redux';

import RunSummaryHeader from './RunSummaryHeader';
import RunList from './RunList';
import LoadingPage from '../LoadingPage';

const RunSummary = ({ run, isLoading }) => {
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="page-container">
      <RunSummaryHeader run={run} />
      <RunList posts={run.posts} />
    </div>
  );
};

const mapStateToProps = state => ({
  run: state.run,
  isLoading: state.run.isLoading
});
export { RunSummary };
export default connect(mapStateToProps)(RunSummary);
