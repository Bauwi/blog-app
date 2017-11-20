import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserCard extends Component {
  render() {
    const {
      author, authorId, createdAt, readingTime
    } = this.props.post ? this.props.post : '';
    const { avatar, stars } = this.props.author;
    return (
      <div className="usercard__container">
        <div className="usercard__avatar">
          <img className="image image--circle" src={avatar} alt={`${author}'s avatar`} />
        </div>
        <div className="usercard__infos">
          <div className="usercard__infos--data">
            <Link to={`/${authorId}/read/`}>
              <h4 className="usercard__infos--data--author">{author}</h4>
            </Link>
            <p>
              {' '}
              {stars} <i className="fa fa-star" />
            </p>
          </div>
          <div className="usercard__infos--description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed metus velit. Ut
              accumsan nulla ante, sed porta dolor condimentum vitae. Pellentesque eu dapibus
              tortor. Nullam congue nisi mi, ut vehicula neque fringilla sed.
            </p>
          </div>
          {this.props.post && (
            <footer className="usercard__infos--footer">
              <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
              <p>{readingTime} minutes</p>
            </footer>
          )}
        </div>
      </div>
    );
  }
}

export default UserCard;
