import React, { Component } from 'react';
import { connect } from 'react-redux';

import RunSummaryHeader from './RunSummaryHeader';
import RunList from './RunList';
import LoadingPage from '../LoadingPage';

import { startSetRunPosts } from '../../actions/run';

export class RunSummary extends Component {
  state = {
    loading: true
  };
  componentWillMount() {
    if (this.props.run.length === 0) {
      this.props.startSetRunPosts().then(() => {
        this.setState(() => ({ loading: false }));
      });
    } else {
      this.setState(() => ({ loading: false }));
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <RunSummaryHeader run={this.props.run} />
        <RunList posts={this.props.run.posts} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetRunPosts: () => dispatch(startSetRunPosts())
});

const mapStateToProps = state => ({
  run: state.run
});

export default connect(mapStateToProps, mapDispatchToProps)(RunSummary);
