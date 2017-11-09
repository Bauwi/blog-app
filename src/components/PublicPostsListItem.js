import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class PublicPostsListItem extends Component {
  render() {
    const {
      id, title, createdAt, author, keywords, authorId, miniCover, stars
    } = this.props;

    return (
      <Link to={`/${authorId}/read/${id}`}>
        <div className="homelist-item">
          <header>
            <img src={miniCover} className="list-item__img" />
          </header>
          <p className="homelist-item__stars">
            <i className="fa fa-star" /> {stars}
          </p>
          <div className="homelist-item__infos">
            <h3 className="homelist-item__title">{title}</h3>
            <div className="homelist-item__subtitle">
              <p>{author},</p>
              <p className="homelist-item__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
            </div>
            <p className="homelist-item__keywords">Keywords: {keywords}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default connect()(PublicPostsListItem);
