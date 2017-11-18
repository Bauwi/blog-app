import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../header/Header';
import HeaderSub from '../header/HeaderSub';
import PublicPostsList from '../PublicPostsList';
import Footer from '../Footer';
import LoadingPage from '../LoadingPage';
import HomeReadHeader from './HomeReadHeader';

import { startSetPostsSample } from '../../actions/readings';
import { startSetRunPosts } from '../../actions/run';

export class HomeRead extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.props.startSetPostsSample(20).then(() => {
      this.setState(() => ({ loading: false }));
    });
    this.props.startSetRunPosts();
  }

  renderCustomCategories() {
    if (this.props.categories.length === 0) {
      return (
        <p>
          No matching post. Please check you spelled correctly the category name in your settings or
          choose a more generic term
        </p>
      );
    }
    return this.props.categories.map((category, i) => {
      const grid = i === 0 ? 'grid-home-second' : 'grid-home-first';
      const range = i === 0 ? 7 : i === 1 ? 6 : i === 2 ? 3 : 0;
      return <PublicPostsList key={category} grid={grid} category={category} range={range} />;
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    return (
      <div className="page-container">
        <Header />
        <HeaderSub />
        <HomeReadHeader />
        <PublicPostsList grid="grid-home-first" category="all" range={14} />
        {this.renderCustomCategories()}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: sampleSize => dispatch(startSetPostsSample(sampleSize)),
  startSetRunPosts: () => dispatch(startSetRunPosts())
});

const mapStateToProps = state => ({
  categories: state.users.preferences
    ? state.users.preferences.topCategories
    : ['litterature', 'music', 'life']
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRead);
