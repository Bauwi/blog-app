import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import PublicPostsList from './PublicPostsList';
import PopularLasttFilter from './filters/PopularLastFilter';
import HeaderSub from './header/HeaderSub';

import { startSetPostsSample } from '../actions/readings';

export class CategorizedReads extends Component {
  componentDidMount() {
    this.props.startSetPostsSample();
  }

  render() {
    return (
      <div>
        <HeaderSub category={this.props.category} />
        {this.props.isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <div className="content-container">
              <PopularLasttFilter relative />
            </div>
            <PublicPostsList grid="grid-home-first" category={this.props.category} range={14} />
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize))
});

const mapStateToProps = (state, props) => ({
  readings: state.readings.posts,
  isLoading: state.readings.isLoading,
  category: props.match.params.id.trim()
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorizedReads);
