import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import HeaderSub from '../header/HeaderSub';
import PublicPostsList from '../PublicPostsList';
import Footer from '../Footer';
import LoadingPage from '../LoadingPage';
import HomeReadHeader from './HomeReadHeader';

import { startSetPostsSample } from '../../actions/readings';

export class HomeRead extends Component {
  state = {
    loading: !this.props.areReadingsAlreadyLoaded
  };

  componentDidMount() {
    return this.props.startSetPostsSample(20).then(() => {
      this.setState(() => ({ loading: false }));
    });
  }

  renderCustomCategories() {
    return this.props.categories.map((category, i) => {
      const grid = i === 0 ? 'grid-home-second' : 'grid-home-first';
      const range = i === 0 ? 7 : i === 1 ? 6 : i === 2 ? 3 : 0;
      return <PublicPostsList key={category} grid={grid} category={category} range={range} />;
    });
  }

  render() {
    console.log(this.props.areReadingsAlreadyLoaded);
    return (
      <div className="page-container">
        <Header />
        <HeaderSub />
        <HomeReadHeader />
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <PublicPostsList grid="grid-home-first" category="all" range={14} />
        )}
        {!this.state.loading && this.renderCustomCategories()}

        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize))
});

const mapStateToProps = state => ({
  categories: state.users.preferences
    ? state.users.preferences.topCategories
    : ['litterature', 'music', 'life'],
  areReadingsAlreadyLoaded: state.readings.length !== 0
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRead);
