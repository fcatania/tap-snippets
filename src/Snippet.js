import React, { Component } from 'react';
import './Snippet.css';

class Snippet extends Component {
  render() {
    return (
      <div className="Snippet">
        <h6 className="Snippet-title">{this.props.snippet.title}</h6>
        <div className="Snippet-body">{this.props.snippet.snippetBody}</div>
        <a className="Snippet-link-to-docs" target="_blank" href={'http://' + this.props.snippet.linkdocs}>Official Docs</a>
      </div>
    );
  }
}

export default Snippet;