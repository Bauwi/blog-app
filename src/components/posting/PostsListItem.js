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
      stars,
      miniCover
    } = this.props;

    return (
      <Link to={`/edit/${id}`}>
        <div className="homelist-item">
          <header>
            <img src={miniCover} className="list-item__img" alt="post cover" />
          </header>
          <section className="homelist-item__header">
            <div>
              <i className="fa fa-star" /> {stars}
            </div>
            <p className="homelist-item__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
          </section>
          <div className="homelist-item__infos">
            <h3 className="homelist-item__title">{title}</h3>
            <div className="homelist-item__subtitle">
              <p className="homelist-item__author">{author}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default connect()(PostsListItem);
