import React, { Component } from 'react';

export default class KeywordsList extends Component {
  renderKeywords() {
    const keywordsList = this.props.keywords.split(',');
    return keywordsList.map((keyword) => {
      const keywordFormatted = keyword.trim();
      return <li key={keyword}>{keywordFormatted}</li>;
    });
  }

  render() {
    return <ul className="keywords-list">{this.renderKeywords()}</ul>;
  }
}
