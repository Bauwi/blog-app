import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class KeywordsList extends Component {
  renderKeywords() {
    const keywordsList = this.props.sliced
      ? this.props.keywords.split(',').slice(0, 5)
      : this.props.keywords.split(',');
    return keywordsList.map((keyword) => {
      const keywordFormatted = keyword.trim();
      return (
        <Link to={`/category/${keywordFormatted}`} key={keyword}>
          {keywordFormatted.toUpperCase()}
        </Link>
      );
    });
  }

  render() {
    return (
      <ul className="keywords-list">
        {this.renderKeywords()}
        {this.props.keywords.split(',').length > 5 && this.props.sliced && <p>...</p>}
      </ul>
    );
  }
}
