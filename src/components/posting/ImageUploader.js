import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/posts';

export class ImageUploader extends Component {
  handleChange = e => {
    const image = e.target.files[0];
    this.props.uploadImage(image);
  };

  render() {
    return (
      <div>
        <progress value="0" max="100">
          0%
        </progress>
        <input type="file" onChange={this.handleChange} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  uploadImage: image => dispatch(uploadImage(image))
});

export default connect(undefined, mapDispatchToProps)(ImageUploader);
