import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

const RunReadPostEditor = ({ delta }) => (
  <div className="content-container read-only">
    <ReactQuill
      theme="snow"
      value={delta}
      readOnly
      modules={RunReadPostEditor.modules}
      bounds=".app"
      placeholder="Add a post to your blog"
    />
  </div>
);

RunReadPostEditor.propTypes = {
  delta: PropTypes.object
};

RunReadPostEditor.modules = {
  toolbar: []
};

export default RunReadPostEditor;
