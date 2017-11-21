import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import Header from './header/Header';
import PublicPostsList from './PublicPostsList';
import Footer from './Footer';

import { startSetPostsSample } from '../actions/readings';
import { HomeReadHeader } from './home/HomeReadHeader';

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
        <Header />
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <div>
            <div className="category__header">
              <h1>{this.props.match.params.id.toUpperCase()}</h1>
            </div>

            <HomeReadHeader />
            <PublicPostsList
              grid="grid-home-first"
              category={this.props.match.params.id}
              range={14}
            />
          </div>
        )}
        <Footer position="absolute" />
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
