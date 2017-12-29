import React, { Component } from 'react';
import './Snippet.css';
import Clipboard from 'clipboard';

class Snippet extends Component {
  constructor(props) {
    super(props);
    new Clipboard('.clipboard-button'); 
  }

  render() {
    return (
      <div className="Snippet">
        <h6 className="Snippet-title">{this.props.snippet.title}</h6>
        <div className="Snippet-body">
          <button className="Snippet-copy-button clipboard-button" data-clipboard-target="#snippetBody">COPY</button>
          <pre><code id="snippetBody">{this.props.snippet.snippetBody}</code></pre>
        </div>
        
        <a className="Snippet-link-to-docs" target="_blank" href={this.props.snippet.linkdocs}>Official Docs</a>
      </div>
    );
  }
}

export default Snippet;