import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortByDate, sortByStars } from '../../actions/filters';

export class PopularLasttFilter extends Component {
  render() {
    const popularButtonCLass =
      this.props.filters.sortBy === 'stars'
        ? 'button button--simple is-selected'
        : 'button button--simple';
    const lastButtonCLass =
      this.props.filters.sortBy === 'date'
        ? 'button button--simple is-selected'
        : 'button button--simple';
    return (
      <div className="popular-last-filterbar">
        <p>{this.props.category}</p>
        <div>
          <button className={popularButtonCLass} onClick={this.props.sortByStars}>
            Popular
          </button>
          <button className={lastButtonCLass} onClick={this.props.sortByDate}>
            Last
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  sortByStars: () => dispatch(sortByStars()),
  sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularLasttFilter);
