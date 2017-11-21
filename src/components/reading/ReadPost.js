import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';

import Header from '../header/Header';
import UserCard from '../UserCard';
import LoadingPage from '../LoadingPage';
import KeywordsList from '../KeywordsList';
import Footer from '../Footer';

import { startSetOnePost } from '../../actions/readings';
import { startSetAuthorFromUserId, startAddUserStar } from '../../actions/users';
import { startUpPostStar } from '../../actions/posts';

export class ReadPost extends Component {
  state = { loading: true };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props
      .startSetOnePost(id)
      .then(ref => this.props.startSetAuthorFromUserId(ref.post.authorId))
      .then(() => {
        this.setState(() => ({ loading: false }));
      });
  }

  onAddStar = () => {
    this.props.startAddUserStar(this.props.post.authorId, this.props.author.stars);
    this.props.startUpPostStar(this.props.match.params.id);
  };

  render() {
    return (
      <div>
        <Header />
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <div>
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
            <h2 className="read-header__title">{this.props.post.title}</h2>
            <img className="image image--cover" src={this.props.post.cover} />
            <div className="content-container read-only">
              <ReactQuill
                theme="snow"
                value={{ ops: [...this.props.post.body] }}
                readOnly
                modules={ReadPost.modules}
                bounds=".app"
                placeholder="Add a post to your blog"
              />
            </div>

            <footer className="keywords-list__read-post-container ">
              <KeywordsList keywords={this.props.post.keywords} />
            </footer>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetOnePost: id => dispatch(startSetOnePost(id)),
  startSetAuthorFromUserId: id => dispatch(startSetAuthorFromUserId(id)),
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
