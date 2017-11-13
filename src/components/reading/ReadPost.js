import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';

import Header from '../header/Header';
import UserCard from '../UserCard';
import LoadingPage from '../LoadingPage';

import { startSetOnePost, startSetPostsSample } from '../../actions/readings';
import { startSetAuthor, startAddUserStar } from '../../actions/users';
import { startUpPostStar } from '../../actions/posts';

export class ReadPost extends Component {
  state = { loading: true };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props
      .startSetPostsSample()
      .then(() => this.props.startSetOnePost(id))
      .then(ref => this.props.startSetAuthor(ref.post.authorId))
      .then(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  onAddStar = () => {
    this.props.startAddUserStar(this.props.post.authorId, this.props.author.stars);
    this.props.startUpPostStar(this.props.match.params.id);
  };

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    const { title, body, keywords, cover } = this.props.post;
    // parse the delta as expected by editor (necessary because Cloud Firestore is broken when it comes
    // to nested arrays)
    const delta = { ops: [...body] };
    return (
      <div>
        <Header />
        <header className="page-header page-header--read">
          <div className="content-container">
            <UserCard post={this.props.post} author={this.props.author} />
            <div className="read-header__stars">
              <button className="button button--star" onClick={this.onAddStar}>
                <i className="fa fa-star-o" />
              </button>
              <p>{this.props.postStars}</p>
            </div>
          </div>
        </header>
        <h2 className="read-header__title">{title}</h2>
        <img className="image" src={cover} />
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetOnePost: id => dispatch(startSetOnePost(id)),
  startSetPostsSample: () => dispatch(startSetPostsSample()),
  startSetAuthor: id => dispatch(startSetAuthor(id)),
  startAddUserStar: (id, prevStars) => dispatch(startAddUserStar(id, prevStars)),
  startUpPostStar: id => dispatch(startUpPostStar(id))
});

const mapStateToProps = (state, props) => ({
  post: state.readings.current,
  author: state.users.author
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadPost));

ReadPost.modules = {
  toolbar: []
};
