import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class InlineList extends Component {
  renderKeywords() {
    const keywordsList = this.props.post.content
      ? this.props.post.content.keywords.split(',')
      : this.props.post.keywords.split(',');
    return keywordsList.map((keyword) => {
      const keywordFormatted = keyword.trim();
      return <li key={keyword}>{keywordFormatted}</li>;
    });
  }

  render() {
    const {
      id, title, createdAt, author, keywords, authorId, miniCover, stars
    } =
      this.props.post.content || this.props.post;
    return (
      <Link to={`/${authorId}/read/${id}`} className="no-decoration">
        <div className="inline-list-item">
          <header className="inline-list-item__left">
            <img src={miniCover} className="inline-list-item__cover" alt="post cover" />
          </header>
          <div className="inline-list-item__right">
            <section className="inline-list-item__header">
              <div>
                <i className="fa fa-star" /> {stars}
              </div>
              <p className="inline-list-item__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
            </section>
            <div className="inline-list-item__infos">
              <h3 className="inline-list-item__title">{title}</h3>

              <div className="inline-list-item__subtitle">
                <p className="inline-list-item__author">{author}</p>
              </div>
              <ul className="inline-list-item__keywords-list">{this.renderKeywords()}</ul>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
