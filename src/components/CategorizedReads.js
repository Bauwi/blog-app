import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import PublicPostsList from './PublicPostsList';
import PopularLasttFilter from './filters/PopularLastFilter';

import { startSetPostsSample } from '../actions/readings';

export class CategorizedReads extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    if (this.props.readings.length === 0) {
      this.props.startSetPostsSample(50).then(() => {
        this.setState(() => ({ loading: false }));
      });
    } else {
      this.setState(() => ({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <div>
            <div className="category__header">
              <h1>{this.props.match.params.id.toUpperCase()}</h1>
            </div>
            <div className="content-container">
              <PopularLasttFilter />
            </div>
            <PublicPostsList
              grid="grid-home-first"
              category={this.props.match.params.id}
              range={14}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize))
});

const mapStateToProps = state => ({
  readings: state.readings
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorizedReads);
