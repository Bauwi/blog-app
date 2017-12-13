import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ImageTools from '../functions/ImageTools';
import { Input, message } from 'antd';
import UserCard from '../UserCard';

const { TextArea } = Input;
const error = () => {
  message.error('Your post should include a title, a cover, a body and a category');
};
const categories = [
  'architecture',
  'sculpture',
  'visuals',
  'music',
  'literature',
  'performings',
  'cinema',
  'photography'
];

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    // bodyToEditor is a tweak as db does not handle delta format from quill Editor
    // body is the part sent to db and bodyToEditor the data used as the correct format
    // to display content ==> delta standard format: delta {ops: [array of data]}

    this.state = {
      title: props.post ? props.post.title : '',
      category: props.post ? props.post.keywords.split(',')[0].trim() : '',
      body: props.post ? props.post.body : '',
      keywords: props.post
        ? props.post.keywords
            .split(',')
            .map(el => el.trim())
            .filter(el => !categories.includes(el))
            .join(', ')
        : '',
      createdAt: props.post ? moment(props.post.createdAt) : moment(),
      author: props.author.username,
      readingTime: props.post ? props.post.readingTime : 0,
      cover: props.post ? props.post.cover : '',
      bodyToEditor: props.post
        ? {
            ops: [...props.post.body]
          }
        : { ops: [] },
      miniCover: props.post ? props.post.miniCover : '',
      coverSrc: '',
      error: false
    };
  }

  onTitleChange = e => {
    const title = e.target.value;
    this.setState(() => ({
      title
    }));
  };

  onBodyChange = body => {
    if (this.refs.quill) {
      const body = this.refs.quill.editor.editor.delta;
      const bodyToEditor = {
        ops: [...body]
      };
      const readingTime = this.readingTime(this.refs.quill.editor.getText());

      this.setState(() => ({
        body: body.ops,
        bodyToEditor,
        readingTime
      }));
    }
  };

  onCategoryChange = e => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  };

  onKeywordsChange = e => {
    const keywords = e.target.value;
    this.setState(() => ({
      keywords
    }));
  };

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
        {
          width: Math.round(sizes.width * coeff),
          height: Math.round(sizes.height * coeff)
        },
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
      this.setState(() => ({
        cover,
        miniCover
      }));
    };
    const updateCoverSrc = coverSrc => {
      this.setState(() => ({
        coverSrc
      }));
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
            <p> Add a cover... </p>{' '}
          </div>
          <input type="file" onChange={this.onCoverChange} />{' '}
        </label>
      );
    } else if (this.state.coverSrc && this.props.context === 'add') {
      return (
        <div>
          <img src={this.state.coverSrc} className="image" />
          <button> Change </button>{' '}
        </div>
      );
    } else if (this.state.cover && this.props.context === 'edit') {
      <img src={this.state.cover} alt="cover" />;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.title || !this.state.body || !this.state.category) {
      this.setState(() => ({ error: true }));
      error();
    } else {
      this.setState(() => ({ error: false }));
      this.props.onSubmit({
        title: this.state.title,
        body: this.state.body,
        keywords: `${this.state.category}, ${this.state.keywords}`,
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
    return (
      <form className="content-container form form--post" onSubmit={this.onSubmit}>
        <UserCard post={post} author={this.props.author} />{' '}
        <label htmlFor="title">
          <p> Title: </p> <p> What should stand for title ? </p>
          <TextArea
            placeholder="As if you could kill time without injuring eternity."
            type="text"
            value={this.state.title}
            onChange={this.onTitleChange}
            autosize={{
              minRows: 2,
              maxRows: 6
            }}
          />{' '}
        </label>
        {this.renderCover()}{' '}
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
          />{' '}
        </div>
        <select className="select" value={this.state.category} onChange={this.onCategoryChange}>
          <option value="architecture">Architecture</option>
          <option value="sculpture">Sculpture</option>
          <option value="visuals">Visuals</option>
          <option value="music">Music</option>
          <option value="literature">Literature</option>
          <option value="performings">Performings</option>
          <option value="cinema">Cinema</option>
          <option value="photography">Photography</option>
        </select>
        <input
          className="text-input"
          type="text"
          placeholder="keywords"
          value={this.state.keywords}
          onChange={this.onKeywordsChange}
        />{' '}
        <div>
          <button className="button"> Save Post </button>{' '}
        </div>{' '}
      </form>
    );
  }
}

PostForm.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  keywords: PropTypes.string,
  createdAt: PropTypes.number,
  author: PropTypes.object,
  readingTime: PropTypes.number,
  cover: PropTypes.string,
  miniCover: PropTypes.string
};

PostForm.modules = {
  toolbar: [
    [
      {
        header: '1'
      },
      {
        header: '2'
      }
    ],

    ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
    [
      {
        size: ['small', false, 'large', 'huge']
      }
    ],

    [
      {
        color: []
      },
      {
        background: []
      }
    ],

    [
      {
        list: 'ordered'
      }
    ],
    ['link', 'image', 'video'],
    [
      {
        align: []
      }
    ],
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
