import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { startAddStar } from '../actions/posts';

export class PostsListItem extends Component {
  onAddStar = () => {
    this.props.startAddStar(this.props.id, this.props.authorId, this.props.stars + 1);
  };

  render() {
    const { id, title, shortBody, keywords, createdAt } = this.props;
    const pathTo = this.props.isAuthenticated
      ? `/edit/${id}`
      : `/${this.props.authorId}/read/${id}`;
    return (
      <div>
        <Link to={pathTo}>
          <header>
            <h3>{title}</h3>
            <h5>Published {moment(createdAt).format('MMM Do, YYYY')}</h5>
          </header>
          <p>{shortBody}</p>
          <p>Keywords: {keywords}</p>
        </Link>
        <button onClick={this.onAddStar}>star</button>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   startAddStar: id => dispatch(startAddStar(id)),
//   startAddPost: post => dispatch(startAddPost(post))
// });

const mapDispatchToProps = dispatch => ({
  startAddStar: (id, authorId, count) => dispatch(startAddStar(id, authorId, count))
});

export default connect(undefined, mapDispatchToProps)(PostsListItem);
