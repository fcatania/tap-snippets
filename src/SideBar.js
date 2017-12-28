import React, { Component } from 'react';
import './SideBar.css';

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <a>React</a>
        <a>Angularjs</a>
        <a>Sequelize</a>
      </div>
    );
  }
}

export default SideBar;