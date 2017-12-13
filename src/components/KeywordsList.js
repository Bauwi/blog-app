import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class KeywordsList extends Component {
  renderKeywords() {
    const keywordsList = this.props.keywords.split(',');
    return keywordsList.map((keyword) => {
      const keywordFormatted = keyword.trim();
      return (
        <Link to={`/category/${keywordFormatted}`} key={keyword}>
          {keywordFormatted}
        </Link>
      );
    });
  }

  render() {
    return <ul className="keywords-list">{this.renderKeywords()}</ul>;
  }
}
