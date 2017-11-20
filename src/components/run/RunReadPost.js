import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Img from 'react-image';

import UserCard from '../UserCard';
import LoadingPage from '../LoadingPage';
import RunReadPostEditor from './RunReadPostEditor';

import { startSetAuthorFromUserId, startAddUserStar } from '../../actions/users';
import { startUpPostStar } from '../../actions/posts';

export class RunReadPost extends Component {
  state = {
    loading: true
  };

  componentWillMount() {
    const { id } = this.props.post.content;
    this.props.startSetAuthorFromUserId(this.props.post.content.authorId).then(() => {
      this.setState(() => ({
        loading: false
      }));
    });
  }

  onAddStar = () => {
    this.props.startAddUserStar(this.props.post.content.authorId, this.props.author.stars);
    this.props.startUpPostStar(this.props.post.content.id);
  };

  render() {
    if (this.state.loading) {
      return <LoadingPage />;
    }
    const Cover = () => (
      <Img
        className="image image--cover"
        src={cover}
        loader={
          <div className="loader">
            <img className="loader__image" src="/images/loader.gif" alt="Loading..." />
          </div>
        }
      />
    );
    const { title, body, keywords, cover, stars } = this.props.post.content;
    const delta = { ops: [...body] };
    return (
      <div>
        <header className="page-header page-header--read">
          <div className="content-container">
            <UserCard post={this.props.post.content} author={this.props.author} />{' '}
            <div className="read-header__stars">
              <span>{stars}</span>
              <button className="button button--star" onClick={this.onAddStar}>
                <i className="fa fa-star-o" />
              </button>
              <p> {this.props.postStars}</p>{' '}
            </div>{' '}
          </div>{' '}
        </header>
        <h2 className="read-header__title"> {title} </h2>
        <Cover />
        <RunReadPostEditor delta={delta} />

        <footer> keywords: {keywords} </footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startSetAuthorFromUserId: id => dispatch(startSetAuthorFromUserId(id)),
  startAddUserStar: (id, prevStars) => dispatch(startAddUserStar(id, prevStars)),
  startUpPostStar: id => dispatch(startUpPostStar(id))
});

const mapStateToProps = (state, props) => ({
  author: state.users.author
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunReadPost));
