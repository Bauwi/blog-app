import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserCard extends Component {
  static defaultProps = {
    author: {
      username: 'Anonymous',
      avatar:
        'https://www.timeshighereducation.com/sites/default/files/byline_photos/default-avatar.png',
      stars: 0,
      description:
        'I had three chairs in my house; one for solitude, two for friendship, three for society.'
    }
  };

  render() {
    const { createdAt, readingTime } = this.props.post ? this.props.post : '';
    const authorId = this.props.post ? this.props.post.authorId : this.props.userId;
    const { username, avatar, stars, description } = this.props.author;
    return (
      <div className="usercard__container">
        <div className="usercard__avatar">
          <img className="image image--circle" src={avatar} alt={`${username}'s avatar`} />
        </div>
        <div className="usercard__infos">
          <div className="usercard__infos--data">
            <Link to={`/${authorId}/read/`}>
              <h4 className="usercard__infos--data--author">{username}</h4>
            </Link>
            <p>
              {' '}
              {stars} <i className="fa fa-star" />
            </p>
          </div>
          <div className="usercard__infos--description">
            <p>{description}</p>
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
