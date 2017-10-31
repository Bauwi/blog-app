import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import KeywordsListItem from './KeywordsListItem';

export class PostsListItem extends Component {
  renderKeywordsList = () => {
    if (this.props.keywords.length === 0) {
      return <li>No keyword provided</li>;
    }
    return this.props.keywords
      .split(',')
      .map(keyword => <KeywordsListItem key={keyword} keyword={keyword.trim()} />);
  };

  render() {
    const {
      id,
      title,
      shortBody,
      keywords,
      createdAt,
      author,
      readingTime,
      cover,
      category = 'miscellaneous'
    } = this.props;
    return (
      <Link to={`/edit/${id}`}>
        <div className="list-item">
          <div>
            <header>
              <img src={cover} className="list-item__img" />
            </header>
            <div className="list-item__infos">
              <h3 className="list-item__title block-with-text-3">{title}</h3>
              <ul>{this.renderKeywordsList()}</ul>
            </div>
          </div>
          <footer className="list-item__footer">
            <h5>
              by {author.toUpperCase()} | {category.toUpperCase()} | 254{' '}
              <i className="fa fa-star" />
            </h5>
          </footer>
        </div>
      </Link>
    );
  }
}

export default connect()(PostsListItem);
