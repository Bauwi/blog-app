import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderSub from '../header/HeaderSub';
import PublicPostsList from '../PublicPostsList';
import LoadingPage from '../LoadingPage';
import PopularLasttFilter from '../filters/PopularLastFilter';

import { startSetPostsSample } from '../../actions/readings';

export class HomeRead extends Component {
  state = {
    loading: !this.props.areReadingsAlreadyFetched
  };

  componentDidMount() {
    return this.props.startSetPostsSample().then(() => {
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
    return (
      <div className="page-container">
        <HeaderSub />
        <div className="content-container">
          <PopularLasttFilter />
        </div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <PublicPostsList grid="grid-home-first" category="all" range={14} />
        )}
        {!this.state.loading && this.renderCustomCategories()}
      </div>
    );
  }
}

HomeRead.propTypes = {
  categories: PropTypes.array.isRequired,
  areReadingsAlreadyFetched: PropTypes.bool.isRequired,
  startSetPostsSample: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetPostsSample: () => dispatch(startSetPostsSample())
});

const mapStateToProps = state => ({
  categories: state.users.preferences
    ? state.users.preferences.topCategories
    : ['litterature', 'music', 'life'],
  areReadingsAlreadyFetched: state.readings.length !== 0
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRead);
