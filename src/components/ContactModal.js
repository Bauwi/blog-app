import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export class ContactModal extends Component {
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
          <i className="fa fa-address-card" /> Contact
        </div>
        <Modal
          title="Contact"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="footer__modal">
            <h1>TEKKNE</h1>
            <p>47 rue des ecoles</p>
            <p>75005 Paris</p>
            <p>0140506080</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ContactModal;
