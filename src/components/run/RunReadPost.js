import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Img from 'react-image';
import moment from 'moment';

import UserCard from '../UserCard';
import LoadingPage from '../LoadingPage';
import RunReadPostEditor from './RunReadPostEditor';
import KeywordsList from '../KeywordsList';

import { startSetAuthorFromUserId } from '../../actions/users';
import { startUpPostStar } from '../../actions/posts';

export class RunReadPost extends Component {
  componentDidMount() {
    this.props.startSetAuthorFromUserId(this.props.post.content.authorId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.content.id !== nextProps.post.content.id) {
      const { id } = this.props.post.content;
      this.props.startSetAuthorFromUserId(nextProps.post.content.authorId);
    }
  }

  onAddStar = () => {
    const { id, authorId } = this.props.post.content;
    const { stars } = this.props.author;
    this.props.startUpPostStar(id, authorId, stars);
  };

  render() {
    if (this.props.isLoading) {
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
    const { title, body, keywords, cover, stars, createdAt, readingTime } = this.props.post.content;
    const delta = { ops: [...body] };
    return (
      <div>
        <header className="page-header page-header--read">
          <div className="content-container">
            <UserCard post={this.props.post} author={this.props.author} />
            <div className="read-header__datereadingtime">
              <p>{moment(createdAt).format('MMM Do, YYYY')}</p>
              <p>
                <i className="fa fa-clock-o" />{' '}
                {`${readingTime} ${readingTime >= 2 ? 'minutes' : 'minute'} read`}
              </p>
              <div className="read-header__stars">
                <button className="button button--star" onClick={this.onAddStar}>
                  {stars}
                  <i className="fa fa-star-o" />
                </button>
                <p>{this.props.postStars}</p>
              </div>
            </div>
          </div>
        </header>
        <h2 className="read-header__title"> {title} </h2>
        <Cover />
        <RunReadPostEditor delta={delta} />

        <footer className="content-container">
          {' '}
          <KeywordsList keywords={keywords} />{' '}
        </footer>
      </div>
    );
  }
}

RunReadPost.propTypes = {
  author: PropTypes.object,
  startSetAuthorFromUserId: PropTypes.func.isRequired,
  startUpPostStar: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetAuthorFromUserId: id => dispatch(startSetAuthorFromUserId(id)),
  startUpPostStar: (id, authorId, stars) => dispatch(startUpPostStar(id, authorId, stars))
});

const mapStateToProps = (state, props) => ({
  author: state.users.author,
  isLoading: state.run.isLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RunReadPost));
