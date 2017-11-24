import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { startLogin } from '../../actions/auth';

export class LoginModal extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div className="login__modal">
        <button className="button button--navbar" onClick={this.showModal}>
          <i className="fa fa-sign-in " />
        </button>
        <Modal
          title="Bloyster"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="login__container">
            <h1 className="login__title">Share !</h1>
            <button className="button" onClick={this.props.startLoginWithGoogle}>
              <i className="fa fa-google" /> Login With Google
            </button>
            <button className="button" onClick={this.props.startLoginWithGithub}>
              <i className="fa fa-github" /> Login With Github
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  startLoginWithGoogle: PropTypes.func.isRequired,
  startLoginWithGithub: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  startLoginWithGoogle: () => dispatch(startLogin('google')),
  startLoginWithGithub: () => dispatch(startLogin('github'))
});

export default connect(undefined, mapDispatchToProps)(LoginModal);
