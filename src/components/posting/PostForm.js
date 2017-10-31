import React, { Component } from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    // bodyToEditor is a tweak as db does not handle delta format from quill Editor
    // body is the part sent to db and bodyToEditor the data used as the correct format
    // to display content ==> delta standard format: delta {ops: [array of data]}
    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
      bodyToEditor: props.post ? { ops: [...this.props.post.body] } : '',
      shortBody: props.post ? props.post.shortBody : '',
      keywords: props.post ? props.post.keywords : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      author: props.post ? props.post.author : '',
      readingTime: props.post ? props.post.readingTime : 0,
      cover: props.post ? props.post.cover : '',
      error: ''
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onBodyChange = body => {
    if (this.refs.quill) {
      const body = this.refs.quill.editor.editor.delta;
      const bodyToEditor = { ops: [...body] };

      const shortBody =
        this.refs.quill.editor.getText().length > 250
          ? this.refs.quill.editor
              .getText()
              .slice(0, 250)
              .concat('...')
          : this.refs.quill.editor.getText();
      const readingTime = this.readingTime(this.refs.quill.editor.getText());

      this.setState(() => ({
        body: body.ops,
        shortBody,
        bodyToEditor,
        readingTime
      }));
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
  onCoverChange = e => {
    const cover = e.target.value;
    this.setState(() => ({ cover }));
  };

  readingTime = str => {
    return Math.floor(str.split(' ').length / 250);
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
        author: this.state.author,
        readingTime: this.state.readingTime,
        cover: this.state.cover
      });
    }
  };

  render() {
    return (
      <form className="content-container" onSubmit={this.onSubmit}>
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
        <input
          type="text"
          placeholder="cover"
          value={this.state.cover}
          onChange={this.onCoverChange}
        />
        <div>
          <ReactQuill
            ref="quill"
            theme="snow"
            defaultValue={this.state.bodyToEditor}
            modules={PostForm.modules}
            formats={PostForm.formats}
            bounds={'.app'}
            placeholder="Add a post to your blog"
            onChange={this.onBodyChange}
          />
        </div>

        <button>Save Post</button>
      </form>
    );
  }
}

PostForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],

    ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
    [{ size: ['small', false, 'large', 'huge'] }],

    [{ color: [] }, { background: [] }],

    [{ list: 'ordered' }],
    ['link', 'image', 'video'],
    [{ align: [] }],
    ['clean']
  ]
};

PostForm.formats = [
  'header',
  'bold',
  'size',
  'color',
  'background',
  'italic',
  'underline',
  'blockquote',
  'code-block',
  'list',
  'link',
  'image',
  'video',
  'align'
];
