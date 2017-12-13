import React, { Component } from 'react';
import moment from 'moment';

export class JumbotronSlide extends Component {
  render() {
    const category = this.props.post.keywords.split(',')[0].trim();
    return (
      <div className="carousel-item">
        <div className="carousel-item__image">
          <img src={this.props.post.miniCover} alt="suggestion cover" />
        </div>
        <div className="carousel-item__infos">
          <header>
            <div>
              <p>
                <i className="fa fa-star" /> {this.props.post.stars}
              </p>
              <p className={`category border-${category}`}>{category}</p>
            </div>
            <p>{moment(this.props.post.createdAt).format('MMM Do, YYYY')}</p>
          </header>
          <h2 className="carousel-item_title">{this.props.post.title}</h2>
          <footer>
            <p>by {this.props.post.author}</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default JumbotronSlide;
