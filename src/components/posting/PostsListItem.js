import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

export class PostsListItem extends Component {
  render() {
    const {
      id, title, shortBody, keywords, createdAt
    } = this.props;
    return (
      <div>
        <Link to={`/edit/${id}`}>
          <header>
            <h3>{title}</h3>
            <h5>Published {moment(createdAt).format('MMM Do, YYYY')}</h5>
          </header>
          <p>{shortBody}</p>
          <p>Keywords: {keywords}</p>
        </Link>
      </div>
    );
  }
}

export default connect()(PostsListItem);
