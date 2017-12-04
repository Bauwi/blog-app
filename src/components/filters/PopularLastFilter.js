import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortByDate, sortByStars } from '../../actions/filters';

const PopularLasttFilter = ({
  filters, sortByStars, sortByDate, relative
}) => {
  const filtebarClassname = relative
    ? 'popular-last-filterbar popular-last-filterbar--relative'
    : 'popular-last-filterbar';
  const popularButtonCLass =
    filters.sortBy === 'stars' ? 'button button--simple is-selected' : 'button button--simple';
  const lastButtonCLass =
    filters.sortBy === 'date' ? 'button button--simple is-selected' : 'button button--simple';
  return (
    <div className={filtebarClassname}>
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
  relative: PropTypes.bool,
  sortByDate: PropTypes.func.isRequired,
  sortByStars: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  sortByStars: () => dispatch(sortByStars()),
  sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularLasttFilter);
