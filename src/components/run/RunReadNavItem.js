import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentPostRun } from '../../actions/run';

export class RunReadNavItem extends Component {
  scrollToTop = scrollDuration => {
    const scrollHeight = window.scrollY,
      scrollStep = Math.PI / (scrollDuration / 15),
      cosParameter = scrollHeight / 2;
    let scrollCount = 0,
      scrollMargin,
      scrollInterval = setInterval(() => {
        if (window.scrollY != 0) {
          scrollCount += 1;
          scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
          window.scrollTo(0, scrollHeight - scrollMargin);
        } else clearInterval(scrollInterval);
      }, 15);
  };
  handleChangeCurrent = () => {
    this.scrollToTop();
    setTimeout(() => this.props.setCurrentPostRun(this.props.post.content.id), 100);
  };

  render() {
    if (!this.props.post) {
      return (
        <li>
          <p />
        </li>
      );
    }

    const {
      id,
      title,
      createdAt,
      author,
      authorId,
      keywords,
      miniCover,
      stars
    } = this.props.post.content;

    return (
      <li className="post-nav-item" onClick={this.handleChangeCurrent}>
        <div className="post-nav-item__arrow">
          <i className="fa fa-angle-left angle-left" />
        </div>
        <div className="post-nav-item__infoscover__container">
          <header className="post-nav-item__left">
            <img src={miniCover} className="post-nav-item__cover" alt="post cover" />
          </header>
          <div className="post-nav-item__right">
            <div className="post-nav-item__infos">
              <h3 className="post-nav-item__title">{title}</h3>

              <div className="post-nav-item__subtitle">
                {this.props.post.state === 'read' ? (
                  <p>
                    <i className="fa fa-check" />
                  </p>
                ) : (
                  <p />
                )}
                <p className="post-nav-item__author">{author}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="post-nav-item__arrow">
          <i className="fa fa-angle-right angle-right " />
        </div>
      </li>
    );
  }
}

RunReadNavItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.number,
  author: PropTypes.object,
  keywords: PropTypes.string,
  miniCover: PropTypes.string,
  stars: PropTypes.number
};

const mapDispatchToProps = dispatch => ({
  setCurrentPostRun: id => dispatch(setCurrentPostRun(id))
});

export default connect(undefined, mapDispatchToProps)(RunReadNavItem);
