import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';

import KeywordsList from './KeywordsList';

import { startAddPostToRun, startRemovePostToRun } from '../actions/run';

const success = () => {
  message.success('Post added to your run.');
};

const error = () => {
  message.error('Your run can not contain more than 20 reads.');
};

export class PublicPostsListItem extends Component {
  handleAddPostToRun = () => {
    if (this.props.isInRun) {
      this.props.startRemovePostToRun(this.props.post.id, this.props.DBid);
    } else if (this.props.run.length < 20) {
      this.props.startAddPostToRun({ content: this.props.post, state: 'unread' });
      this.props.success();
    } else {
      this.props.error();
    }
  };

  render() {
    const { id, title, createdAt, author, keywords, authorId, miniCover, stars } = this.props.post;
    const buttonClassName = this.props.isInRun
      ? 'button--pin button--pin--selected'
      : 'button--pin';
    return (
      <div className="homelist-item">
        <Link to={`/${authorId}/read/${id}`} className="no-decoration">
          <div className="homelist-item__content">
            <header>
              <img
                src={miniCover}
                className="list-item__img homelist-item__content__cover"
                alt="post cover"
              />
            </header>
            <section className="homelist-item__content__header">
              <div>
                <i className="fa fa-star" /> {stars}
              </div>
              <p className="homelist-item__content__date">
                {moment(createdAt).format('MMM Do, YYYY')}
              </p>
            </section>
            <div className="homelist-item__content__infos">
              <h3 className="homelist-item__content__title">{title}</h3>

              <div className="homelist-item__content__subtitle">
                <p className="homelist-item__content__author">{author}</p>
              </div>
            </div>
          </div>
        </Link>

        <footer className="homelist-item__footer">
          <KeywordsList keywords={keywords} />
          <div className="">
            <div className="button--pin__container">
              <p className="homelist-item__footer__index">{this.props.index}</p>
              <button className={buttonClassName} onClick={this.handleAddPostToRun}>
                <i className="fa fa-book" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPostToRun: post => dispatch(startAddPostToRun(post)),
  startRemovePostToRun: (id, DBid) => dispatch(startRemovePostToRun(id, DBid)),
  success: () => success(),
  error: () => error()
});

const mapStateToProps = (state, props) => {
  const isInRun = state.run.posts
    ? !!state.run.posts.find(post => props.post.id === post.content.id)
    : undefined;
  const DBid = isInRun
    ? state.run.posts.find(post => props.post.id === post.content.id).DBid
    : undefined;
  return {
    run: state.run.posts || 0,
    isInRun,
    index: isInRun ? state.run.posts.findIndex(post => props.post.id === post.content.id) + 1 : '',
    DBid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicPostsListItem);
