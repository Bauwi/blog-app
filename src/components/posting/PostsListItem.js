import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import KeywordsList from '../KeywordsList';

const PostsListItem = ({
  id, title, createdAt, author, stars, miniCover, keywords
}) => (
  <div className="list-item">
    <div className="list-item__content">
      <header>
        <img
          src={miniCover}
          className="list-item__img list-item__content__cover"
          alt="post cover"
        />
      </header>
      <section className="list-item__content__header">
        <div>
          <i className="fa fa-star" /> {stars}
        </div>
        <p className="list-item__content__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
      </section>
      <div className="list-item__content__infos">
        <Link to={`/edit/${id}`}>
          <h3 className="list-item__content__title">{title}</h3>
        </Link>
        <div className="list-item__content__subtitle">
          <p className="list-item__content__author">{author}</p>
        </div>
      </div>
      <KeywordsList keywords={keywords} />
      <div className="list-item__content__category">
        <p className={`category border-${keywords.split(',')[0].trim()}`}>
          {keywords.split(',')[0].trim()}
        </p>
      </div>
    </div>
  </div>
);

PostsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  keywords: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  miniCover: PropTypes.string.isRequired
};

export default PostsListItem;
