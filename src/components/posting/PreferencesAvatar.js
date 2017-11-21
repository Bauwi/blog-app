import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import AvatarEditor from 'react-avatar-editor';

export default class PreferencesAvatar extends Component {
  state = {
    avatar: this.props.avatar,
    avatarPreview: ''
  };

  handleSaveAvatar = () => {
    this.editor.getImage().toBlob(blob =>
      this.setState(
        () => ({ avatar: blob }),
        () => {
          this.props
            .upload(this.props.userId, this.state.avatar)
            .then(url => this.setState(() => ({ avatar: url, avatarPreview: '' })));
        }
      )
    );
  };

  handleImageChange = e => {
    const avatar = e.target.files[0];
    const img = new Image();

    const reader = new FileReader();
    const url = reader.readAsDataURL(avatar);
    const objectURL = URL.createObjectURL(avatar);

    this.setState(() => ({ avatarPreview: objectURL }));
  };

  setEditorRef = editor => (this.editor = editor);

  render() {
    const avatarPreview = this.state.avatarPreview;
    return (
      <div className="preferences__avatar__container">
        {avatarPreview ? (
          <div>
            <AvatarEditor
              crossOrigin="anonymous"
              ref={this.setEditorRef}
              image={this.state.avatarPreview}
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={1.2}
              rotate={0}
            />
            <label htmlFor="file-upload" className="button button--preferences">
              <i className="fa fa-picture-o" /> New Avatar
              <input
                id="file-upload"
                className="button"
                type="file"
                onChange={this.handleImageChange}
              />
            </label>
            <button className="button button--preferences" onClick={this.handleSaveAvatar}>
              <i className="fa fa-floppy-o" /> Save Avatar
            </button>
          </div>
        ) : (
          <div>
            <div className="preferences__avatar">
              <img src={this.state.avatar} alt="avatar" height="250px" width="250px" />
            </div>
            <label htmlFor="file-upload" className="button button--preferences">
              <i className="fa fa-picture-o" /> New Avatar
              <input
                id="file-upload"
                className="button button--preferences"
                type="file"
                onChange={this.handleImageChange}
              />
            </label>
            <button className="button button--preferences" onClick={this.handleSaveAvatar} disabled>
              <i className="fa fa-floppy-o" /> Save Avatar
            </button>
          </div>
        )}
      </div>
    );
  }
}
