import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export class HireMeModal extends Component {
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
        <div onClick={this.showModal}>
          <i className="fa fa-handshake-o" /> Hire Me
        </div>
        <Modal
          title="Hire Me"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="footer__modal">
            <p>Portfolio in construction !</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default HireMeModal;
