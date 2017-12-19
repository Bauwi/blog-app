import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import moment from 'moment';

import UserCard from '../UserCard';
import LoadingPage from '../LoadingPage';
import KeywordsList from '../KeywordsList';

import { startSetOnePost } from '../../actions/readings';
import { startUpPostStar } from '../../actions/posts';

export class ReadPost extends Component {
  static defaultProps = {
    post: {
      title: '',
      cover: '',
      body: [],
      keywords: ''
    }
  };
  componentDidMount() {
    this.props.startSetOnePost(this.props.postId);
  }

  onAddStar = () => {
    const { postId } = this.props;
    const { authorId } = this.props.post;
    const { stars } = this.props.author;
    this.props.startUpPostStar(postId, authorId, stars);
  };

  render() {
    if (this.props.isLoading) {
      return <LoadingPage />;
    }
    const { title, cover, body, keywords, stars, readingTime, createdAt } = this.props.post;
    const category = keywords.split(',')[0].trim();
    return (
      <div>
        <div>
          <header className="page-header page-header--read">
            <div className="content-container">
              <UserCard post={this.props.post} author={this.props.author} />
              <div className={`read-header__datereadingtime border-top-item-${category}`}>
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
          <h2 className="read-header__title">{title}</h2>

          <img className="image image--cover" src={cover} />
          <div className="content-container read-only">
            <ReactQuill
              theme="snow"
              value={{ ops: [...body] }}
              readOnly
              modules={ReadPost.modules}
              bounds=".app"
              placeholder="Add a post to your blog"
            />
          </div>

          <footer className={`keywords-list__read-post-container border-top-item-${category}`}>
            <KeywordsList keywords={keywords} />
          </footer>
        </div>
      </div>
    );
  }
}

ReadPost.propTypes = {
  post: PropTypes.object,
  author: PropTypes.object,
  postId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  startSetOnePost: PropTypes.func.isRequired,
  startUpPostStar: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetOnePost: id => dispatch(startSetOnePost(id)),
  startUpPostStar: (id, authorId, stars) => dispatch(startUpPostStar(id, authorId, stars))
});

const mapStateToProps = (state, props) => ({
  post: state.readings.current,
  postId: props.match.params.id,
  author: state.users.author,
  isLoading: state.readings.isLoading
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReadPost));

ReadPost.modules = {
  toolbar: []
};
