import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTextFilter, searchByAuthor, searchByKeyword, searchByTitle } from '../actions/filters';

export class PostListFilters extends Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };
  onSearchByChange = e => {
    if (e.target.value === 'title') {
      this.props.searchByTitle();
    } else if (e.target.value === 'author') {
      this.props.searchByAuthor();
    } else {
      this.props.searchByKeyword();
    }
  };

  render() {
    return (
      <div>
        <select value={this.props.filters.searchBy} onChange={this.onSearchByChange}>
          <option value="title">Title</option>
          <option value="keyword">Keyword</option>
          <option value="author">Author</option>
        </select>
        <input type="text" onChange={this.onTextChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ filters: state.filters });

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  searchByAuthor: () => dispatch(searchByAuthor()),
  searchByTitle: () => dispatch(searchByTitle()),
  searchByKeyword: () => dispatch(searchByKeyword())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListFilters);
