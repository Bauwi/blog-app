import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import AllPostsList from './AllPostsList';

export class HomeRead extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Header />HomeRead
        <AllPostsList />
      </div>
    );
  }
}

export default connect()(HomeRead);
