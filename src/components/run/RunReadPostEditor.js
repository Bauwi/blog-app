import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactQuill from 'react-quill';

export default class RunReadPostEditor extends Component {
  componentDidMount() {
    const getTitlesPosition = (nodeClassName) => {
      const node = document.getElementsByClassName(nodeClassName)[0];
      const h1s = node.getElementsByTagName('h1');
      const h4s = node.getElementsByTagName('h4');

      const arrFromDOMNode = (domNode) => {
        const arr = [];
        for (let i = 0; i < domNode.length; i += 1) {
          arr.push(domNode[i]);
        }
        return arr;
      };

      const arrPosition = (arrOfDOMNodes, tagName) =>
        arrOfDOMNodes.map(DOMNode => [tagName, DOMNode.innerText, DOMNode.offsetTop]);

      const h1sPosition = arrPosition(arrFromDOMNode(h1s), 'h1');
      const h4sPosition = arrPosition(arrFromDOMNode(h4s), 'h4');
      console.log(h1sPosition);
      console.log(h4sPosition);
    };
    getTitlesPosition('ql-editor');
  }

  render() {
    console.log(this.props.delta);
    return (
      <div className="content-container read-only">
        <ReactQuill
          theme="snow"
          value={this.props.delta}
          readOnly
          modules={RunReadPostEditor.modules}
          bounds=".app"
          placeholder="Add a post to your blog"
        />
      </div>
    );
  }
}

RunReadPostEditor.modules = {
  toolbar: []
};
