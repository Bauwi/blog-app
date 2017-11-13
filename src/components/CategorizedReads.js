import React, { Component } from 'react';
import { connect } from 'react-redux';

import PublicPostsList from './PublicPostsList';

import { startSetPostsSample } from '../actions/readings';

export class CategorizedReads extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    if (this.props.readings.length === 0) {
      this.props.startSetPostsSample(50).then(() => {
        this.setState(() => ({ loading: false }));
      });
    } else {
      this.setState(() => ({ loading: false }));
    }
  }

  render() {
    console.log(this.props);
    if (this.state.loading) {
      return <p>loading</p>;
    }
    return (
      <div>
        <p>Category {this.props.match.params.id}</p>
        <PublicPostsList grid="grid-home-first" category={this.props.match.params.id} range={14} />
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
