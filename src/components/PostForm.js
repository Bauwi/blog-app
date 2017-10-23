import React, { Component } from 'react';
import moment from 'moment';

export default class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
      error: '' 
    };
  }
  
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  }

  onBodyChange = (e) => {
    const body= e.target.value;
    this.setState(() => ({ body }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title || !this.state.body) {
      this.setState(() => ({ error: 'Please provide a title and body to your post.' }))
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        body: this.state.body
      });
    }
  }; 

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          autoFocus
          placeholder="title"
          type="text"
          value={this.state.title}
          onChange={this.onTitleChange}   
        />
        {this.state.title}
        <textarea 
          placeholder="Add a post to your blog."
          value={this.state.body}
          onChange={this.onBodyChange}
        >
        </textarea>
        {this.state.body}
        <button>Save Post</button>
      </form>
    )
  }
}