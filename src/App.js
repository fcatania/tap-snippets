import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar.js';
import Snippet from './Snippet.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSnippet: {title: 'Some Title', linkToDocs: 'https://reactjs.org', snippetBody: 'var culo = sucio;'}
    }
  }

  render() {
    return (
      <div className="App">
        <SideBar />
        <Snippet snippet={this.state.currentSnippet}/>
      </div>
    );
  }
}

export default App;
