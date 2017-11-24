import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByDate, sortByStars } from '../../actions/filters';

const PopularLasttFilter = ({ filters, sortByStars, sortByDate }) => {
  const popularButtonCLass =
    filters.sortBy === 'stars' ? 'button button--simple is-selected' : 'button button--simple';
  const lastButtonCLass =
    filters.sortBy === 'date' ? 'button button--simple is-selected' : 'button button--simple';
  return (
    <div className="popular-last-filterbar">
      <p />
      <div>
        <button className={popularButtonCLass} onClick={sortByStars}>
          Popular
        </button>
        <button className={lastButtonCLass} onClick={sortByDate}>
          Last
        </button>
      </div>
    </div>
  );
};

PopularLasttFilter.propTypes = {
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  sortByDate: PropTypes.func.isRequired,
  sortByStars: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  sortByStars: () => dispatch(sortByStars()),
  sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularLasttFilter);
