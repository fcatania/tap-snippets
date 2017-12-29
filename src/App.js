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
    fetch('https://655950f8-b131-4619-b207-078ebfc65b8e.mock.pstmn.io/snippets/react/').then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({allSnippets: json.snippets.react, currentSnippet: json.snippets.react[0]});
    });
  }

  sideBarClickHandler(index) {
    console.log(index);
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
