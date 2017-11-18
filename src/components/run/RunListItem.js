import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

import { setCurrentPostRun } from '../../actions/run';

export class RunListItem extends Component {
  renderKeywords() {
    const keywordsList = this.props.post.content.keywords.split(',');
    return keywordsList.map(keyword => {
      const keywordFormatted = keyword.trim();
      return <li key={keyword}>{keywordFormatted}</li>;
    });
  }

  handleItemClick = () => {
    this.props.setCurrentPostRun(this.props.post.content.id);
    this.props.history.push('/run/start');
  };

  render() {
    const {
      id,
      title,
      createdAt,
      author,
      keywords,
      authorId,
      miniCover,
      stars
    } = this.props.post.content;
    return (
      <div onClick={this.handleItemClick}>
        <div className="inline-list-item">
          <header className="inline-list-item__left">
            <img src={miniCover} className="inline-list-item__cover" alt="post cover" />
          </header>
          <div className="inline-list-item__right">
            <section className="inline-list-item__header">
              <div>
                <i className="fa fa-star" /> {stars}
              </div>
              <div className="inline-list-item__header--right">
                {this.props.state === 'read' && (
                  <p>
                    <i className="fa fa-check" />
                  </p>
                )}
                <p className="inline-list-item__date">{moment(createdAt).format('MMM Do, YYYY')}</p>
              </div>
            </section>
            <div className="inline-list-item__infos">
              <h3 className="inline-list-item__title">{title}</h3>

              <div className="inline-list-item__subtitle">
                <p className="inline-list-item__author">{author}</p>
              </div>
              <ul className="inline-list-item__keywords-list">{this.renderKeywords()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id))
});

export default withRouter(connect(undefined, mapDispatchToProps)(RunListItem));
