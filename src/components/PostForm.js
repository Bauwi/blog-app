import React, { Component } from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
      shortBody: props.post ? props.post.shortBody : '',
      keywords: props.post ? props.post.keywords : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      author: props.post ? props.post.author : '',
      error: ''
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onBodyChange = html => {
    if (this.refs.quill) {
      const plainBody = this.refs.quill.editor.getText();
      const shortBody = plainBody.length > 250 ? plainBody.slice(0, 250).concat('...') : plainBody;

      this.setState(() => ({ body: html, shortBody }));
    }
  };

  onAuthorChange = e => {
    const author = e.target.value;
    this.setState(() => ({ author }));
  };

  onKeywordsChange = e => {
    const keywords = e.target.value;
    this.setState(() => ({ keywords }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.body) {
      this.setState(() => ({ error: 'Please provide a title and body to your post.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        title: this.state.title,
        body: this.state.body,
        shortBody: this.state.shortBody,
        keywords: this.state.keywords,
        createdAt: this.state.createdAt.valueOf(),
        author: this.state.author
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
        <input
          type="text"
          placeholder="author"
          value={this.state.author}
          onChange={this.onAuthorChange}
        />
        <input
          type="text"
          placeholder="keywords"
          value={this.state.keywords}
          onChange={this.onKeywordsChange}
        />

        <ReactQuill
          ref="quill"
          theme="snow"
          value={this.state.body}
          modules={PostForm.modules}
          formats={PostForm.formats}
          bounds={'.app'}
          placeholder="Add a post to your blog"
          onChange={this.onBodyChange}
        />
        <button>Save Post</button>
      </form>
    );
  }
}

PostForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],

    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }],
    ['link', 'video'],
    [{ align: [] }],
    ['clean']
  ]
};

PostForm.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'blockquote',
  'list',
  'link',
  'video',
  'align'
];
