import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message } from 'antd';
import AvatarEditor from 'react-avatar-editor';

import { startUpdateUser, uploadAvatar, getAvatarBlob } from '../../actions/users';

export class Preferences extends Component {
  state = {
    avatar: this.props.preferences.avatar ? this.props.preferences.avatar : '',
    avatarPreview: '',
    username: this.props.preferences.username ? this.props.preferences.username : 'Anonymous',
    topCategory1: this.props.preferences.topCategories
      ? this.props.preferences.topCategories[0]
      : '',
    topCategory2: this.props.preferences.topCategories
      ? this.props.preferences.topCategories[1]
      : '',
    topCategory3: this.props.preferences.topCategories
      ? this.props.preferences.topCategories[2]
      : '',
    error: ''
  };

  handleImageChange = e => {
    const avatar = e.target.files[0];
    const img = new Image();

    const reader = new FileReader();
    const url = reader.readAsDataURL(avatar);
    const objectURL = URL.createObjectURL(avatar);

    this.setState(() => ({ avatarPreview: objectURL }));
  };

  handleUsernameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  };

  handleCat1Change = e => {
    const topCategory1 = e.target.value;
    this.setState(() => ({ topCategory1 }));
  };
  handleCat2Change = e => {
    const topCategory2 = e.target.value;
    this.setState(() => ({ topCategory2 }));
  };
  handleCat3Change = e => {
    const topCategory3 = e.target.value;
    this.setState(() => ({ topCategory3 }));
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.username) {
      this.setState(() => ({ error: 'Please provide a username.' }));
    } else {
      this.setState(() => ({ error: '' }));
      const topCategories = [
        this.state.topCategory1,
        this.state.topCategory2,
        this.state.topCategory3
      ];
      return this.editor.getImage().toBlob(blob =>
        this.setState(
          () => ({ avatar: blob }),
          () => {
            this.props.uploadAvatar(this.props.userId, this.state.avatar);
            this.props.startUpdateUser(this.props.userId, {
              username: this.state.username,
              topCategories
            });
          }
        )
      );
    }
  };

  handleSaveAvatar = () => {
    this.editor.getImage().toBlob(blob =>
      this.setState(
        () => ({ avatar: blob }),
        () => {
          this.props
            .uploadAvatar(this.props.userId, this.state.avatar)
            .then(url => this.setState(() => ({ avatar: url, avatarPreview: '' })));
        }
      )
    );
  };

  setEditorRef = editor => (this.editor = editor);

  render() {
    const avatarPreview = this.state.avatarPreview;
    return (
      <div>
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
                <i className="fa fa-floppy-o" /> Save
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
              <button
                className="button button--preferences"
                onClick={this.handleSaveAvatar}
                disabled
              >
                <i className="fa fa-floppy-o" /> Save
              </button>
            </div>
          )}
        </div>

        <form className="form" onSubmit={this.onSubmit}>
          <label htmlFor="title">
            <p>Username: </p>
            <p>Your username can not exceed 14 characters</p>

            <input
              autoFocus
              className="text-input"
              placeholder="Athos"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </label>
          <label htmlFor="title">
            <p>Favorite categories: </p>
            <p>Customize your homepage by setting up your interests</p>
            <label htmlFor="category 1">
              <p>1: </p>
              <input
                autoFocus
                className="text-input"
                placeholder="Sport"
                type="text"
                value={this.state.topCategory1}
                onChange={this.handleCat1Change}
              />
            </label>
            <label htmlFor="category 2">
              <p>2: </p>
              <input
                autoFocus
                className="text-input"
                placeholder="Litterature"
                type="text"
                value={this.state.topCategory2}
                onChange={this.handleCat2Change}
              />
            </label>
            <label htmlFor="category 3">
              <p>3: </p>
              <input
                autoFocus
                className="text-input"
                placeholder="Third Category"
                type="text"
                value={this.state.topCategory3}
                onChange={this.handleCat3Change}
              />
            </label>
          </label>
          <button className="button">Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startUpdateUser: (id, updates) => dispatch(startUpdateUser(id, updates)),
  uploadAvatar: (userId, avatar) => dispatch(uploadAvatar(userId, avatar)),
  getAvatarBlob: url => dispatch(getAvatarBlob(url))
});

const mapStateToProps = state => ({
  preferences: state.users.preferences,
  userId: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
