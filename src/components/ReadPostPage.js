import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';

export class ReadPostPage extends Component {
  render() {
    // const {id}
    return (
      <div>
        <Header />
        <p>Read Post Page</p>
      </div>
    );
  }
}

export default connect()(ReadPostPage);
