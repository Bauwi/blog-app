import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import moment from 'moment';

import Header from './Header';
import LoadingPage from './LoadingPage';

import { startSetOnePost } from '../actions/posts';

export class ReadPost extends Component {
  state = { loading: true };

  componentWillMount() {
    const { pathname } = this.props.history.location;
    const id = pathname.slice(35, pathname.length);
    this.props.startSetOnePost(id).then(() => {
      this.setState(() => ({ loading: false }));
    });
  }

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    const { id, author, title, body, createdAt, keywords, authorId, cover } = this.props.post;
    const regEx = new RegExp(id, 'g');
    const goBackPath = this.props.history.location.pathname.replace(regEx, '');
    const delta = { ops: [...body] };
    return (
      <div>
        <Header />
        <img className="image" src={cover} />
        <header className="page-header">
          <div className="content-container">
            <button onClick={() => this.props.history.push(goBackPath)}>Back</button>
            <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
            <Link to={`/${authorId}/read/`}>
              <p>{author}</p>
            </Link>
            <h2>{title}</h2>
          </div>
        </header>
        <div className="content-container read-only">
          <ReactQuill
            theme="snow"
            value={delta}
            readOnly
            modules={ReadPost.modules}
            bounds=".app"
            placeholder="Add a post to your blog"
          />
        </div>

        <footer>keywords: {keywords}</footer>
        <p>Read unique Post</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetOnePost: id => dispatch(startSetOnePost(id))
});

const mapStateToProps = (state, props) => ({
  post: state.posts.find(post => post.id === props.match.params.id)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadPost));

ReadPost.modules = {
  toolbar: []
};
