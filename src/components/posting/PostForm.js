import React, { Component } from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ImageTools from '../functions/ImageTools';

import ImageUploader from './ImageUploader';

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    // bodyToEditor is a tweak as db does not handle delta format from quill Editor
    // body is the part sent to db and bodyToEditor the data used as the correct format
    // to display content ==> delta standard format: delta {ops: [array of data]}
    this.state = {
      title: props.post ? props.post.title : '',
      body: props.post ? props.post.body : '',
      keywords: props.post ? props.post.keywords : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      author: props.post ? props.post.author : '',
      readingTime: props.post ? props.post.readingTime : 0,
      cover: props.post ? props.post.cover : '',
      bodyToEditor: props.post ? { ops: [...this.props.post.body] } : '',
      miniCover: props.post ? props.post.miniCover : '',
      coverSrc: '',
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
      const readingTime = this.readingTime(this.refs.quill.editor.getText());

      this.setState(() => ({
        body: body.ops,
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
  // onCoverChange = e => {
  //   const cover = e.target.value;
  //   this.setState(() => ({ cover }));
  // };

  onCoverChange = e => {
    const cover = e.target.files[0];
    const img = new Image();

    img.onload = function() {
      var sizes = {
        width: this.width,
        height: this.height
      };
      URL.revokeObjectURL(this.src);
      const coeff = 1 / sizes.width * 500;
      const miniCover = ImageTools.resize(
        cover,
        { width: Math.round(sizes.width * coeff), height: Math.round(sizes.height * coeff) },
        (blob, didItResize) => {
          if (didItResize) {
            //image width > 640 => image resized
            updateState(cover, blob);
          } else {
            //image width < 640 => no need to resize, cover === miniCover
            updateState(cover, cover);
          }
        }
      );
    };

    const reader = new FileReader();
    const url = reader.readAsDataURL(cover);
    reader.onloadend = function(e) {
      updateCoverSrc([reader.result]);
    };

    const updateState = (cover, miniCover) => {
      this.setState(() => ({ cover, miniCover }));
    };
    const updateCoverSrc = coverSrc => {
      this.setState(() => ({ coverSrc }));
    };

    const objectURL = URL.createObjectURL(cover);
    img.src = objectURL;
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
        keywords: this.state.keywords.toLowerCase(),
        createdAt: this.state.createdAt.valueOf(),
        author: this.state.author,
        readingTime: this.state.readingTime,
        cover: this.state.cover,
        miniCover: this.state.miniCover
      });
    }
  };

  render() {
    return (
      <form className="content-container form" onSubmit={this.onSubmit}>
        <input
          autoFocus
          className="text-input"
          placeholder="title"
          type="text"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="author"
          value={this.state.author}
          onChange={this.onAuthorChange}
        />
        <input
          className="text-input"
          type="text"
          placeholder="keywords"
          value={this.state.keywords}
          onChange={this.onKeywordsChange}
        />

        {this.props.context === 'add' && <input type="file" onChange={this.onCoverChange} />}
        {this.state.coverSrc &&
          this.props.context === 'add' && <img src={this.state.coverSrc} className="image" />}
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

        <button className="button">Save Post</button>
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
