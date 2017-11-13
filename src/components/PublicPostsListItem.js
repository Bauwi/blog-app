import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startAddPostToRun, startRemovePostToRun } from '../actions/run';

export class PublicPostsListItem extends Component {
  state = {
    error: ''
  };
  renderKeywords() {
    const keywordsList = this.props.post.keywords.split(',');
    return keywordsList.map(keyword => {
      const keywordFormatted = keyword.trim();
      return <li key={keyword}>{keywordFormatted}</li>;
    });
  }

  handleAddPostToRun = () => {
    if (this.props.isInRun) {
      this.props.startRemovePostToRun(this.props.post.id, this.props.DBid);
      console.log('should be removed');
    } else if (this.props.run.length < 20) {
      this.props.startAddPostToRun({ content: this.props.post, state: 'unread' });
    } else {
      this.setState(() => ({ error: 'your read list must not contain more than 20 reads' }));
      setTimeout(() => this.setState(() => ({ error: '' })), 1000);
    }
  };

  render() {
    const { id, title, createdAt, author, keywords, authorId, miniCover, stars } = this.props.post;
    return (
      <div className="homelist-item">
        <header>
          <img src={miniCover} className="list-item__img" alt="post cover" />
        </header>
        <section className="homelist-item__header">
          <div>
            <i className="fa fa-star" /> {stars}
          </div>
          <p className="homelist-item__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
        </section>
        <div className="homelist-item__infos">
          <Link to={`/${authorId}/read/${id}`} className="no-decoration">
            <h3 className="homelist-item__title">{title}</h3>
          </Link>
          <div className="homelist-item__subtitle">
            <p className="homelist-item__author">{author}</p>
          </div>
          <ul className="homelist-item__keywords-list">{this.renderKeywords()}</ul>
          <button onClick={this.handleAddPostToRun}>Add to run</button>
          <p>{this.state.error}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddPostToRun: post => dispatch(startAddPostToRun(post)),
  startRemovePostToRun: (id, DBid) => dispatch(startRemovePostToRun(id, DBid))
});

const mapStateToProps = (state, props) => ({
  run: state.run,
  isInRun: !!state.run.find(post => props.post.id === post.content.id),
  DBid: state.run.find(post => props.post.id === post.content.id)
    ? state.run.find(post => props.post.id === post.content.id).DBid
    : ''
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicPostsListItem);
