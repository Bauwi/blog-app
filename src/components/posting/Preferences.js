import React, { Component } from 'react';

export default class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.preferences ? this.props.preferences.username : 'Anonymous',
      description: this.props.preferences ? this.props.preferences.description : 'haiku'
    };
  }
  render() {
    return (
      <div>
        <p>These are my preferences</p>
      </div>
    );
  }
}
