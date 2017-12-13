import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startSetCurrentPostRun } from '../../actions/run';

export class RunReadNavItem extends Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  scrollToTop(scrollDuration) {
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
  }
  handleChangeCurrent = () => {
    this.scrollToTop(1000);
    setTimeout(() => this.props.startSetCurrentPostRun(this.props.post.content.id), 1200);
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
  stars: PropTypes.number,
  startSetCurrentPostRun: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startSetCurrentPostRun: id => dispatch(startSetCurrentPostRun(id))
});

export default connect(undefined, mapDispatchToProps)(RunReadNavItem);
