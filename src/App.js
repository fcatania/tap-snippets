import React, { Component } from 'react';
import './App.css';
import SideBar from './SideBar.js';
import Snippet from './Snippet.js';
import 'whatwg-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSnippets: [],
      currentSnippet: {}
    };
    this.sideBarClickHandler = this.sideBarClickHandler.bind(this);
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8080/snippets/react/').then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Connection to server failed.');
      }
    }).then((json) => {
      if (json.snippets.react.length > 0) {
        this.setState({allSnippets: json.snippets.react, currentSnippet: json.snippets.react[0]});
      } else {
        console.log('Empty DB');
      }
    });
  }

  sideBarClickHandler(index) {
    this.setState({currentSnippet: this.state.allSnippets[index]});
  }

  render() {
    return (
      <div className="App">
        <SideBar snippets={this.state.allSnippets} clickHandler={this.sideBarClickHandler}/>
        <Snippet snippet={this.state.currentSnippet}/>
      </div>
    );
  }
}

export default App;
