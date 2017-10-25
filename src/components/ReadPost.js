import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './Header';

export const ReadPost = ({
  history, post: {
    id, author, title, body, createdAt, keywords
  }
}) => {
  const regEx = new RegExp(id, 'g');
  const goBackPath = history.location.pathname.replace(regEx, '');
  return (
    <div>
      <Header />
      <header>
        <button onClick={() => history.push(goBackPath)}>Back</button>
        <h2>{title}</h2>
        <p>{createdAt}</p>
        <p>{author}</p>
      </header>
      <section dangerouslySetInnerHTML={{ __html: body }} />
      <footer>keywords: {keywords}</footer>
      <p>Read unique Post</p>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.id === props.match.params.id)
});

export default withRouter(connect(mapStateToProps)(ReadPost));
