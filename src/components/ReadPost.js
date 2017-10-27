import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import moment from 'moment';

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
      <div className="content-container">
        <header>
          <button onClick={() => history.push(goBackPath)}>Back</button>
          <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
          <p>{author}</p>
          <h2>{title}</h2>
        </header>
      </div>

      <div className="content-container read-only">
        <ReactQuill
          theme="snow"
          value={body}
          readOnly
          modules={ReadPost.modules}
          toolBar={false}
          bounds=".app"
          placeholder="Add a post to your blog"
        />
      </div>

      <footer>keywords: {keywords}</footer>
      <p>Read unique Post</p>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.id === props.match.params.id)
});

export default withRouter(connect(mapStateToProps)(ReadPost));

ReadPost.modules = {
  toolbar: []
};
