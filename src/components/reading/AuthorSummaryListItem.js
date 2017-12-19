import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import KeywordsList from '../KeywordsList';

export default class AuthorSummaryListItem extends Component {
  render() {
    const {
      id, title, createdAt, author, keywords, authorId, miniCover, stars
    } =
      this.props.post.content || this.props.post;
    return (
      <div>
        <Link to={`/${authorId}/read/${id}`} className="no-decoration">
          <img src={miniCover} alt="post cover" />
          <div className="masonry-layer">
            <header className="masonry-layer__header">
              <div>
                <i className="fa fa-star" /> {stars}
              </div>
              <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
            </header>
            <section className="masonry-layer__section">
              <h3 className="masonry-layer__title">{title}</h3>
            </section>

            <footer className="keywords-list__list-item-container">
              <p className="masonry-layer__author">{author}</p>
              <KeywordsList keywords={keywords} />
            </footer>
          </div>
        </Link>
      </div>
    );
  }
}
