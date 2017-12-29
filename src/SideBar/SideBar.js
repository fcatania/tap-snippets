import React, { Component } from 'react';
import './SideBar.css';

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        {this.props.snippets.map((snippet, index) => {
          return <a key={index} onClick={() => {this.props.clickHandler(index)}}>{snippet.title}</a>;
        })}
      </div>
    );
  }
}

export default SideBar;