import React, { Component } from 'react';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ImageTools from '../functions/ImageTools';
import UserCard from '../UserCard';

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

  renderCover() {
    if (this.props.context === 'add' && !this.state.coverSrc) {
      return (
        <label className="input__file--container">
          <div className="input__file">
            <i className="fa fa-picture-o" />
            <p>Add a cover...</p>
          </div>

          <input type="file" onChange={this.onCoverChange} />
        </label>
      );
    } else if (this.state.coverSrc && this.props.context === 'add') {
      return (
        <div>
          <img src={this.state.coverSrc} className="image" />
          <button>Change</button>
        </div>
      );
    } else if (this.state.cover && this.props.context === 'edit') {
      <img src={this.state.cover} alt="cover" />;
    }
  }

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
    const post = {
      author: this.state.author,
      authorId: 'todo',
      readingTime: this.state.readingTime,
      createdAt: this.state.createdAt
    };
    console.log(this.state.cover);
    return (
      <form className="content-container form" onSubmit={this.onSubmit}>
        <UserCard post={post} author={this.props.author} />
        <label htmlFor="alias">
          <p>Alias: </p>
          <p>What should stand for author name?</p>
          <input
            className="text-input"
            type="text"
            placeholder="D'Artagnan"
            value={this.state.author}
            onChange={this.onAuthorChange}
          />
        </label>
        <label htmlFor="title">
          <p>Title: </p>
          <p>What should stand for title?</p>

          <input
            autoFocus
            className="text-input"
            placeholder="Why is Athos sitting by himself?"
            type="text"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
        </label>

        {this.renderCover()}
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

        <input
          className="text-input"
          type="text"
          placeholder="keywords"
          value={this.state.keywords}
          onChange={this.onKeywordsChange}
        />
        <div>
          <button className="button">Save Post</button>
        </div>
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
