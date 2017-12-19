import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderSub from '../header/HeaderSub';
import Jumbotron from '../header/Jumbotron';
import PublicPostsList from '../PublicPostsList';
import LoadingPage from '../LoadingPage';
import PopularLasttFilter from '../filters/PopularLastFilter';

import { startSetPostsSample } from '../../actions/readings';

export class HomeRead extends Component {
  componentDidMount() {
    this.props.startSetPostsSample();
  }

  renderCustomCategories() {
    return this.props.categories.map((category, i) => {
      const grid = i === 0 ? 'grid-home-second' : 'grid-home-first';
      const range = i === 0 ? 11 : i === 1 ? 9 : i === 2 ? 6 : 0;
      return <PublicPostsList key={category} grid={grid} category={category} range={range} />;
    });
  }

  render() {
    return (
      <div className="page-container">
        <HeaderSub />
        <Jumbotron />

        {this.props.isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <div className="popular-last-filterbar__container">
              <div className="content-container">
                <PopularLasttFilter relative />
              </div>
            </div>
            <PublicPostsList grid="grid-home-first" category="all" range={15} />
          </div>
        )}
        {!this.props.isLoading && this.renderCustomCategories()}
      </div>
    );
  }
}

HomeRead.propTypes = {
  categories: PropTypes.array.isRequired,
  startSetPostsSample: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: () => dispatch(startSetPostsSample())
});

const mapStateToProps = state => ({
  categories: state.users.preferences
    ? state.users.preferences.topCategories
    : ['litterature', 'music', 'life'],
  isLoading: state.readings.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRead);
