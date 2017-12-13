import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import KeywordsList from '../KeywordsList';

import { setCurrentPostRun } from '../../actions/run';

export class RunListItem extends Component {
  handleItemClick = () => {
    this.props.history.push('/run/start');
    this.props.setCurrentPostRun(this.props.post.content.id);
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
      <div>
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
            <div onClick={this.handleItemClick} className="inline-list-item__infos">
              <h3 className="inline-list-item__title">{title}</h3>
            </div>
            <footer className="inline-list-item__footer">
              <p className="inline-list-item__author">{author}</p>
              <KeywordsList keywords={keywords} />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

RunListItem.propTypes = {
  post: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  setCurrentPostRun: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id))
});

export default withRouter(connect(undefined, mapDispatchToProps)(RunListItem));
