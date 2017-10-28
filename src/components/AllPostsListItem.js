import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const AllPostsListItem = ({
  id, title, createdAt, shortBody, keywords, authorId
}) => (
  <div>
    <Link to={`${authorId}/read/${id}`}>
      <header>
        <h3>{title}</h3>
        <h5>Published {moment(createdAt).format('MMM Do, YYYY')}</h5>
      </header>
      <p>{shortBody}</p>
      <p>Keywords: {keywords}</p>
    </Link>
  </div>
);

export default AllPostsListItem;
