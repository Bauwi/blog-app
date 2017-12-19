import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import KeywordsList from '../KeywordsList';

const PostsListItem = ({
  id, title, createdAt, author, stars, miniCover, keywords
}) => {
  const category = keywords.split(',')[0].trim();
  return (
    <div className="homelist-item">
      <div className={`homelist-item__content border-bottom-item-${category}`}>
        <header>
          <div className="category-container">
            <div className="category-container-bis">
              <p className={`category border-${category}`}>{category}</p>
            </div>
          </div>
          <img
            src={miniCover}
            className="list-item__img homelist-item__content__cover"
            alt="post cover"
          />
        </header>

        <div className="homelist-item__content__container">
          <Link to={`/edit/${id}`} className="no-decoration infos-link">
            <div className="homelist-item__content__infos">
              <section className="homelist-item__content__header">
                <div>
                  <i className="fa fa-star" /> {stars}
                </div>
                <p className="homelist-item__content__date">
                  {moment(createdAt).format('MMM Do, YYYY')}
                </p>
              </section>
              <h3 className="homelist-item__content__title">{title}</h3>
              <div />
            </div>
          </Link>
          <footer className="homelist-item__footer">
            <KeywordsList keywords={keywords} sliced />
            <div className="homelist-item__footer__bottom">
              <div className="homelist-item__content__subtitle">
                <p className="homelist-item__content__author">{author}</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

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
