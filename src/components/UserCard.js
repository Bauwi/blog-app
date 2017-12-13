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
    const authorId = this.props.post ? this.props.post.authorId : this.props.userId;
    const { username, avatar, stars, description } = this.props.author;
    return (
      <Link to={`/${authorId}/read/`}>
        <div className="usercard__container">
          <div className="usercard__avatar">
            <img className="image image--circle" src={avatar} alt={`${username}'s avatar`} />
          </div>
          <div className="usercard__infos">
            <div className="usercard__infos--data">
              <h4 className="usercard__infos--data--author">{username}</h4>

              <p>
                {' '}
                {stars} <i className="fa fa-star" />
              </p>
            </div>
            <div className="usercard__infos--description">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default UserCard;
