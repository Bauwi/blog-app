import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PublicPostList from '../PublicPostsList';
import { Carousel } from 'antd';

import JumbotronSlide from './JumbotronSlide';

import selectCarouselPosts from '../../selectors/carousel';

export class Jumbotron extends Component {
  state = {
    currentSlide: 1
  };
  renderSlides = slideIndex => {
    const post = this.props.posts[slideIndex];
    return <JumbotronSlide post={post} />;
  };
  handleClick = () => {
    const pathname = `${this.props.posts[this.state.currentSlide - 1].authorId}/read/${this.props
      .posts[this.state.currentSlide - 1].id}`;
    this.props.history.push(pathname);
  };
  render() {
    if (this.props.isLoading || this.props.posts.length === 0) {
      return <p />;
    }
    return (
      <div className="carousel">
        <Carousel
          effect="fade"
          autoplay
          autoplaySpeed={7000}
          afterChange={currentSlide => {
            if (this.state.currentSlide === 6) {
              return this.setState(() => ({ currentSlide: 1 }));
            }
            this.setState({ currentSlide: currentSlide + 1 });
          }}
        >
          <div onClick={this.handleClick}>{this.renderSlides(0)}</div>
          <div onClick={this.handleClick}>{this.renderSlides(1)}</div>
          <div onClick={this.handleClick}>{this.renderSlides(2)}</div>
          <div onClick={this.handleClick}>{this.renderSlides(3)}</div>
          <div onClick={this.handleClick}>{this.renderSlides(4)}</div>
          <div onClick={this.handleClick}>{this.renderSlides(5)}</div>
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: selectCarouselPosts(
    state.readings.posts,
    !!state.users.preferences
      ? state.users.preferences.topCategories
      : ['music', 'literature', 'cinema']
  ),
  isLoading: state.readings.isLoading
});

export default withRouter(connect(mapStateToProps)(Jumbotron));
