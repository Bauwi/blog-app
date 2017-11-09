import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import ReadPostSummaryToolbar from './ReadPostSummaryToolbar';

class ReadPostSummary extends Component {
  render() {
    const {
      id,
      author,
      authorId,
      title,
      createdAt,
      keywords,
      cover,
      readingTime
    } = this.props.post;
    const { avatar, stars } = this.props.author;
    return (
      <div className="read-header__container">
        <div className="read-header__avatar">
          <img className="image image--circle" src={avatar} alt={`${author}'s avatar`} />
        </div>
        <div className="read-header__infos">
          <div className="read-header__infos--data">
            <Link to={`/${authorId}/read/`}>
              <h4 className="read-header__infos--data--author">{author}</h4>
            </Link>
            <p>
              {' '}
              {stars} <i className="fa fa-star" />
            </p>
          </div>
          <div className="read-header__infos--description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed metus velit. Ut
              accumsan nulla ante, sed porta dolor condimentum vitae. Pellentesque eu dapibus
              tortor. Nullam congue nisi mi, ut vehicula neque fringilla sed.
            </p>
          </div>
          <footer className="read-header__infos--footer">
            <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
            <p>{readingTime} minutes</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default ReadPostSummary;
