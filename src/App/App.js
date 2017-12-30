import React, { Component } from 'react';
import './App.css';
import SideBar from '../SideBar/SideBar';
import Snippet from '../Snippet/Snippet';
import 'whatwg-fetch';
import AddSnippet from '../AddSnippet/AddSnippet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSnippets: [],
      currentSnippet: {},
      addNewSnippetPage: false
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
        <button className="add-snippet" onClick={() => this.setState({addNewSnippetPage: !this.state.addNewSnippetPage})}>Add Snippet</button>
        <SideBar snippets={this.state.allSnippets} clickHandler={this.sideBarClickHandler}/>

        {this.state.addNewSnippetPage ? <AddSnippet/> : <Snippet snippet={this.state.currentSnippet}/>}
      </div>
    );
  }
}

export default App;
