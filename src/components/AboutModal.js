import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export class AboutModal extends Component {
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
          <i className="fa fa-question" /> About
        </div>
        <Modal
          title="About"
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div className="footer__modal">
            <p>This website's single purpose is to talk about art.</p>
            <br />
            <p>This website is a learning project.</p>
            <br />
            <p>
              All rights of articles are reserved to their author, who are credited at the beginning
              of each article.
            </p>
            <br />
            <p>
              If you are an author and want one of the article to be removed, please contact us via
              the contact page.
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AboutModal;
