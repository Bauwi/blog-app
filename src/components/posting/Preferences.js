import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message, Input } from 'antd';

import PreferencesAvatar from './PreferencesAvatar';

import { startUpdateUser, uploadAvatar } from '../../actions/users';

const { TextArea } = Input;
const success = () => {
  message.success('Your informations have been successfully updated.');
};

const error = () => {
  message.error('Oops, something went wrong.');
};

const validationMax = {
  username: 20,
  categories: 20,
  description: 200
};

export class Preferences extends Component {
  state = {
    avatar:
      this.props.preferences && this.props.preferences.avatar ? this.props.preferences.avatar : '',
    username:
      this.props.preferences && this.props.preferences.username
        ? this.props.preferences.username
        : 'Anonymous',
    topCategory1:
      this.props.preferences && this.props.preferences.topCategories
        ? this.props.preferences.topCategories[0]
        : '',
    topCategory2:
      this.props.preferences && this.props.preferences.topCategories
        ? this.props.preferences.topCategories[1]
        : '',
    topCategory3:
      this.props.preferences && this.props.preferences.topCategories
        ? this.props.preferences.topCategories[2]
        : '',
    description:
      this.props.preferences && this.props.preferences.description
        ? this.props.preferences.description
        : '',
    proceeding: false
  };

  handleUsernameChange = e => {
    const username = e.target.value;
    if (username.length <= validationMax.username) {
      this.setState(() => ({ username }));
    }
  };

  handleCat1Change = e => {
    const topCategory1 = e.target.value;
    if (topCategory1.length <= validationMax.categories) {
      this.setState(() => ({ topCategory1 }));
    }
  };
  handleCat2Change = e => {
    const topCategory2 = e.target.value;
    if (topCategory2.length <= validationMax.categories) {
      this.setState(() => ({ topCategory2 }));
    }
  };
  handleCat3Change = e => {
    const topCategory3 = e.target.value;
    if (topCategory3.length <= validationMax.categories) {
      this.setState(() => ({ topCategory3 }));
    }
  };

  handleDescriptionChange = e => {
    const description = e.target.value;
    if (description.length <= validationMax.description) {
      this.setState(() => ({ description }));
    }
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.username) {
      return this.setState(() => ({ error: 'Please provide a username.' }));
    } else {
      this.setState(() => ({ error: '', proceeding: true }));
      const topCategories = [
        this.state.topCategory1,
        this.state.topCategory2,
        this.state.topCategory3
      ];
      return this.props
        .startUpdateUser(this.props.userId, {
          username: this.state.username,
          topCategories,
          description: this.state.description
        })
        .then(
          () => {
            this.setState(() => ({ proceeding: false }));
            success();
          },
          () => {
            this.setState(() => ({ proceeding: false }));
            error();
          }
        );
    }
  };

  render() {
    const avatarPreview = this.state.avatarPreview;
    const topCategories = [
      this.state.topCategory1,
      this.state.topCategory2,
      this.state.topCategory3
    ];
    return (
      <div>
        <div className="page-header__container">
          <div className="content-container">
            <div className="page-header__content">
              <div>
                <h1 className="preferences__title">Preferences</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="preferences">
          <PreferencesAvatar
            upload={this.props.uploadAvatar}
            userId={this.props.userId}
            avatar={
              this.props.preferences && this.props.preferences.avatar
                ? this.props.preferences.avatar
                : ''
            }
          />

          <form className="form preferences__form" onSubmit={this.onSubmit}>
            <label htmlFor="title" className="preferences__form__block">
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
            <label htmlFor="title" className="preferences__form__block">
              <p>Interests: </p>
              <p>Customize your homepage by setting up your interests</p>
              <select
                className="select"
                value={this.state.topCategory1}
                onChange={this.handleCat1Change}
              >
                <option value="architecture">Architecture</option>
                <option value="sculpture">Sculpture</option>
                <option value="visuals">Visuals</option>
                <option value="music">Music</option>
                <option value="literature">Literature</option>
                <option value="performing">Performing</option>
                <option value="cinema">Cinema</option>
                <option value="photography">Photography</option>
              </select>
              <select
                className="select"
                value={this.state.topCategory2}
                onChange={this.handleCat2Change}
              >
                <option
                  value="architecture"
                  disabled={() => topCategories.includes('architecture')}
                >
                  Architecture
                </option>
                <option value="sculpture" disabled>
                  Sculpture
                </option>
                <option value="visuals">Visuals</option>
                <option value="music">Music</option>
                <option value="literature">Literature</option>
                <option value="performing">Performing</option>
                <option value="cinema">Cinema</option>
                <option value="photography">Photography</option>
              </select>
              <select
                className="select"
                value={this.state.topCategory3}
                onChange={this.handleCat3Change}
              >
                <option value="architecture" disabled={this.shouldBeDisabled}>
                  Architecture
                </option>
                <option value="sculpture">Sculpture</option>
                <option value="visuals">Visuals</option>
                <option value="music">Music</option>
                <option value="literature">Literature</option>
                <option value="performing">Performing</option>
                <option value="cinema">Cinema</option>
                <option value="photography">Photography</option>
              </select>
            </label>
            <label htmlFor="title" className="preferences__form__block">
              <p>Description: </p>
              <p>Your description can not exceed 200 characters</p>
              <p>
                {this.state.description.length} / {validationMax.description}
              </p>
              <TextArea
                placeholder="I had three chairs in my house; one for solitude, two for friendship, three for society."
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            </label>
            <button className="button">
              {this.state.proceeding ? 'Saving...' : 'Save Preferences'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Preferences.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  topCategories: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  userId: PropTypes.string.isRequired,
  startUpdateUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startUpdateUser: (id, updates) => dispatch(startUpdateUser(id, updates)),
  uploadAvatar: (userId, avatar) => dispatch(uploadAvatar(userId, avatar))
});

const mapStateToProps = state => ({
  preferences: state.users.preferences,
  userId: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
